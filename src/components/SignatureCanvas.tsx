import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Check, Upload, PenTool } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/i18n';
import { processUploadedImage } from '../utils/helpers';

interface SignatureCanvasProps {
  isOpen?: boolean;
  onSave?: (signatureDataUrl: string) => void;
  onSaveSignature?: (signatureDataUrl: string) => void;
  onClose: () => void;
  lang: Language;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  isOpen = true,
  onSave,
  onSaveSignature,
  onClose,
  lang,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#0f172a');
  const t = TRANSLATIONS[lang];

  if (!isOpen) return null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 160;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = strokeColor;
  }, [strokeColor]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    if (onSave) onSave(dataUrl);
    if (onSaveSignature) onSaveSignature(dataUrl);
    onClose();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processUploadedImage(file, 400, 160);
      if (onSave) onSave(dataUrl);
      if (onSaveSignature) onSaveSignature(dataUrl);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <PenTool className="w-4 h-4 text-indigo-500" />
            <span>{t.actions.drawSignature}</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            {t.actions.close}
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="relative border-2 border-dashed border-indigo-300 dark:border-indigo-900 rounded-xl bg-white overflow-hidden shadow-inner">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-40 cursor-crosshair touch-none"
            />
            <div className="absolute bottom-2 left-4 text-[10px] text-slate-400 pointer-events-none select-none">
              Sign inside this box (Touch or Mouse)
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Ink:</span>
              {['#0f172a', '#1e3a8a', '#15803d'].map((color) => (
                <button
                  key={color}
                  onClick={() => setStrokeColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-5 h-5 rounded-full border-2 transition ${
                    strokeColor === color ? 'border-indigo-500 scale-110' : 'border-transparent'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>{t.actions.clearSignature}</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition">
              <Upload className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t.actions.uploadSignature}</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={handleSave}
              disabled={!hasDrawn}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition ${
                hasDrawn
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{t.actions.apply}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
