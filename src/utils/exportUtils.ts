import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

/**
 * Downloads a DOM element as a high-resolution PNG image file
 */
export const downloadElementAsPNG = async (
  element: HTMLElement,
  filename: string,
  pixelRatio = 2
): Promise<boolean> => {
  try {
    let dataUrl = '';
    try {
      dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio,
        cacheBust: true,
      });
    } catch {
      // Fallback in sandboxes where font embedding causes security or network warnings
      dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio,
        fontEmbedCSS: '',
      });
    }

    if (!dataUrl) return false;

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
 * Downloads a DOM element as a formatted PDF file
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
    let dataUrl = '';
    try {
      dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio,
        cacheBust: true,
      });
    } catch {
      dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio,
        fontEmbedCSS: '',
      });
    }

    if (!dataUrl) return false;

    const cleanFilename = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

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

    // A4 Standard
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = orientation === 'landscape' ? 297 : 210;
    const pageHeight = orientation === 'landscape' ? 210 : 297;

    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const imgWidth = pageWidth;
    const imgHeight = (img.height * pageWidth) / img.width;

    if (imgHeight <= pageHeight + 2) {
      pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight), undefined, 'FAST');
    } else {
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }
    }

    pdf.save(cleanFilename);
    return true;
  } catch (error) {
    console.error('Error in downloadElementAsPDF:', error);
    return false;
  }
};
