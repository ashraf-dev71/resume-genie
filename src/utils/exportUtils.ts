import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

/**
 * Scans upward from targetSplitY on a canvas to find a horizontal row band
 * that has no text or bullet content, preventing text from being sliced in half across pages.
 */
function findCleanSplitPoint(
  ctx: CanvasRenderingContext2D,
  width: number,
  targetSplitY: number,
  searchRange: number
): number {
  const maxSearchY = Math.min(ctx.canvas.height - 10, targetSplitY - 10);
  const minSearchY = Math.max(100, targetSplitY - searchRange);

  let bestSplitY = targetSplitY;
  let minDarkPixels = Infinity;

  // Scan backwards by 2px steps
  for (let y = maxSearchY; y >= minSearchY; y -= 2) {
    const rowData = ctx.getImageData(0, y, width, 1).data;
    let darkPixelCount = 0;

    // Sample across the main content area (inner 80% to avoid frame borders)
    const startX = Math.floor(width * 0.1);
    const endX = Math.floor(width * 0.9);

    for (let x = startX; x < endX; x += 4) {
      const idx = x * 4;
      const r = rowData[idx];
      const g = rowData[idx + 1];
      const b = rowData[idx + 2];
      const a = rowData[idx + 3];

      // Dark text / bullet / element pixel
      if (a > 40 && (r < 220 || g < 220 || b < 220)) {
        darkPixelCount++;
      }
    }

    // Found a clean gap between paragraphs/sections with zero text pixels
    if (darkPixelCount === 0) {
      return y;
    }

    if (darkPixelCount < minDarkPixels) {
      minDarkPixels = darkPixelCount;
      bestSplitY = y;
    }
  }

  return bestSplitY;
}

/**
 * Temporarily removes any CSS transform (like scale(zoom)) from ancestor elements
 * so that html-to-image captures at true 1:1 unscaled dimensions without clipping.
 */
function resetAncestorTransforms(element: HTMLElement): () => void {
  const elementsToRestore: Array<{
    el: HTMLElement;
    transform: string;
    transition: string;
    marginBottom: string;
  }> = [];

  let curr: HTMLElement | null = element;
  while (curr && curr !== document.body) {
    const style = window.getComputedStyle(curr);
    if (style.transform && style.transform !== 'none') {
      elementsToRestore.push({
        el: curr,
        transform: curr.style.transform,
        transition: curr.style.transition,
        marginBottom: curr.style.marginBottom,
      });
      curr.style.transition = 'none';
      curr.style.transform = 'none';
      curr.style.marginBottom = '0';
    }
    curr = curr.parentElement;
  }

  return () => {
    for (const item of elementsToRestore) {
      item.el.style.transition = item.transition;
      item.el.style.transform = item.transform;
      item.el.style.marginBottom = item.marginBottom;
    }
  };
}

/**
 * Captures a live DOM element directly to a high-resolution PNG data URL.
 * Automatically un-scales any preview zoom during capture so that 100% of the
 * width is captured without right-side clipping, and without creating blank off-screen containers.
 */
async function captureElementDirect(
  element: HTMLElement,
  options: {
    pixelRatio?: number;
    width?: number;
    height?: number;
  } = {}
): Promise<string> {
  const { pixelRatio = 2 } = options;

  // Temporarily reset preview zoom transforms
  const restoreTransforms = resetAncestorTransforms(element);

  // Ensure element has unconstrained width
  const prevMaxWidth = element.style.maxWidth;
  element.style.maxWidth = 'none';

  try {
    // Allow DOM to layout at natural 1:1 scale
    await new Promise((resolve) => setTimeout(resolve, 60));

    const naturalWidth = element.offsetWidth || element.scrollWidth || 794;
    const naturalHeight = element.offsetHeight || element.scrollHeight || 1123;

    let dataUrl = '';
    try {
      dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio,
        cacheBust: false, // Prevents corrupting base64 signatures/QR codes
        width: naturalWidth,
        height: naturalHeight,
        backgroundColor: '#ffffff',
        filter: (node) => !(node instanceof HTMLElement && node.classList.contains('no-print')),
      });
    } catch (err1) {
      console.warn('Initial toPng failed, retrying with fontEmbedCSS fallback...', err1);
      dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio,
        cacheBust: false,
        fontEmbedCSS: '', // Bypass CORS font stylesheet access warnings
        width: naturalWidth,
        height: naturalHeight,
        backgroundColor: '#ffffff',
        filter: (node) => !(node instanceof HTMLElement && node.classList.contains('no-print')),
      });
    }

    return dataUrl;
  } finally {
    element.style.maxWidth = prevMaxWidth;
    restoreTransforms();
  }
}

/**
 * Downloads a DOM element as a high-resolution PNG image file
 */
export const downloadElementAsPNG = async (
  element: HTMLElement,
  filename: string,
  pixelRatio = 2
): Promise<boolean> => {
  try {
    const dataUrl = await captureElementDirect(element, { pixelRatio });
    if (!dataUrl || dataUrl.length < 1000) return false;

    const link = document.createElement('a');
    link.download = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error('Error in downloadElementAsPNG:', error);
    return false;
  }
};

/**
 * Downloads a DOM element as a formatted PDF file with guaranteed full-width content
 * (no right-side cutoff) and clean section-aware page splitting for multi-page documents.
 */
export const downloadElementAsPDF = async (
  element: HTMLElement,
  filename: string,
  options: {
    orientation?: 'portrait' | 'landscape';
    format?: 'a4' | 'cr80';
    pixelRatio?: number;
  } = {}
): Promise<boolean> => {
  const { orientation = 'portrait', format = 'a4', pixelRatio = 2 } = options;

  try {
    const dataUrl = await captureElementDirect(element, { pixelRatio });
    if (!dataUrl || dataUrl.length < 1000) {
      console.error('Captured image data is empty or invalid');
      return false;
    }

    const cleanFilename = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

    // 1. CR80 ID Card
    if (format === 'cr80') {
      const isLandscape = orientation === 'landscape';
      const width = isLandscape ? 85.6 : 53.98;
      const height = isLandscape ? 53.98 : 85.6;

      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: [width, height],
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, width, height, undefined, 'FAST');
      pdf.save(cleanFilename);
      return true;
    }

    // 2. A4 Landscape (Certificate)
    if (orientation === 'landscape') {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, 297, 210, undefined, 'FAST');
      pdf.save(cleanFilename);
      return true;
    }

    // 3. A4 Portrait (CV / Resume)
    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const imgWidth = 210; // A4 mm
    const totalHeightMm = (img.height * 210) / img.width;

    // Single-page CV
    if (totalHeightMm <= 297 + 5) {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, 210, Math.min(totalHeightMm, 297), undefined, 'FAST');
      pdf.save(cleanFilename);
      return true;
    }

    // Multi-page CV with intelligent empty-margin detection
    const fullCanvas = document.createElement('canvas');
    fullCanvas.width = img.width;
    fullCanvas.height = img.height;
    const ctx = fullCanvas.getContext('2d', { willReadFrequently: true });
    
    if (!ctx) {
      // Fallback to standard jsPDF multi-page flow if canvas context is unavailable
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      let heightLeft = totalHeightMm;
      let position = 0;
      pdf.addImage(dataUrl, 'PNG', 0, position, 210, totalHeightMm, undefined, 'FAST');
      heightLeft -= 297;
      while (heightLeft > 0) {
        position -= 297;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, 210, totalHeightMm, undefined, 'FAST');
        heightLeft -= 297;
      }
      pdf.save(cleanFilename);
      return true;
    }

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, fullCanvas.width, fullCanvas.height);
    ctx.drawImage(img, 0, 0);

    const a4Ratio = 297 / 210; // 1.4142857
    const pageCanvasHeight = Math.floor(fullCanvas.width * a4Ratio);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    let currentY = 0;
    let pageIndex = 0;

    while (currentY < fullCanvas.height) {
      const remainingHeight = fullCanvas.height - currentY;

      if (remainingHeight <= pageCanvasHeight + 20) {
        // Last page slice
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = fullCanvas.width;
        sliceCanvas.height = remainingHeight;
        const sliceCtx = sliceCanvas.getContext('2d');
        if (sliceCtx) {
          sliceCtx.fillStyle = '#ffffff';
          sliceCtx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
          sliceCtx.drawImage(
            fullCanvas,
            0, currentY, fullCanvas.width, remainingHeight,
            0, 0, sliceCanvas.width, remainingHeight
          );
        }

        if (pageIndex > 0) pdf.addPage();
        const sliceHeightMm = (remainingHeight * 210) / fullCanvas.width;
        const topMarginMm = pageIndex > 0 ? 8 : 0;
        pdf.addImage(
          sliceCanvas.toDataURL('image/png', 0.98),
          'PNG',
          0,
          topMarginMm,
          210,
          Math.min(sliceHeightMm, 297 - topMarginMm),
          undefined,
          'FAST'
        );
        break;
      }

      // Find clean section break in the bottom 18% of this page
      const targetSplitY = currentY + pageCanvasHeight;
      const searchRange = Math.floor(pageCanvasHeight * 0.18);
      const splitY = findCleanSplitPoint(ctx, fullCanvas.width, targetSplitY, searchRange);

      const sliceHeight = splitY - currentY;
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = fullCanvas.width;
      sliceCanvas.height = sliceHeight;
      const sliceCtx = sliceCanvas.getContext('2d');
      if (sliceCtx) {
        sliceCtx.fillStyle = '#ffffff';
        sliceCtx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        sliceCtx.drawImage(
          fullCanvas,
          0, currentY, fullCanvas.width, sliceHeight,
          0, 0, sliceCanvas.width, sliceHeight
        );
      }

      if (pageIndex > 0) pdf.addPage();
      const sliceHeightMm = (sliceHeight * 210) / fullCanvas.width;
      const topMarginMm = pageIndex > 0 ? 8 : 0;
      pdf.addImage(
        sliceCanvas.toDataURL('image/png', 0.98),
        'PNG',
        0,
        topMarginMm,
        210,
        Math.min(sliceHeightMm, 297 - topMarginMm),
        undefined,
        'FAST'
      );

      currentY = splitY;
      pageIndex++;
    }

    pdf.save(cleanFilename);
    return true;
  } catch (error) {
    console.error('Error in downloadElementAsPDF:', error);
    return false;
  }
};
