import QRCode from 'qrcode';

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }
};

export const loadFromLocalStorage = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.warn('LocalStorage load failed:', err);
    return fallback;
  }
};

/**
 * Resizes and converts an uploaded user image to a clean compressed Data URL
 * to avoid exceeding localStorage limits while keeping crisp print resolution.
 */
export const processUploadedImage = (
  file: File,
  maxWidth = 600,
  maxHeight = 600,
  quality = 0.85
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Generates an SVG or PNG data URL for a QR Code
 */
export const generateQRCodeDataUrl = async (text: string): Promise<string> => {
  try {
    if (!text || text.trim() === '') {
      text = 'https://resumegenie.example.com';
    }
    const dataUrl = await QRCode.toDataURL(text, {
      width: 256,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    });
    return dataUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    return '';
  }
};

/**
 * Translates Western digits (0-9) to Bengali digits (০-৯)
 */
export const toBengaliDigits = (str: string | number): string => {
  const western = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const bengali = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  let res = String(str);
  western.forEach((w, i) => {
    res = res.replaceAll(w, bengali[i]);
  });
  return res;
};

/**
 * Triggers clean print dialog formatted specifically for A4 portrait, A4 landscape, or CR80 ID Card
 */
export const triggerPrint = (
  documentTitle = 'Resume',
  orientation: 'portrait' | 'landscape' = 'portrait'
): void => {
  const originalTitle = document.title;
  document.title = documentTitle;

  if (orientation === 'landscape') {
    document.body.classList.add('print-certificate');
  } else {
    document.body.classList.add('print-portrait');
  }

  window.print();

  setTimeout(() => {
    document.title = originalTitle;
    document.body.classList.remove('print-certificate', 'print-portrait');
  }, 1000);
};
