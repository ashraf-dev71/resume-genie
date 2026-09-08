import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Check, X, RotateCw } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/i18n';

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  shape: 'circle' | 'rounded' | 'square';
  onSaveCrop: (croppedDataUrl: string, shape: 'circle' | 'rounded' | 'square') => void;
  onClose: () => void;
  lang: Language;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imageSrc,
  shape: initialShape,
  onSaveCrop,
  onClose,
  lang,
}) => {
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [shape, setShape] = useState<'circle' | 'rounded' | 'square'>(initialShape);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImgElement(img);
      setZoom(1);
      setPanX(0);
      setPanY(0);
      setRotation(0);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    if (!imgElement || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 300;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Save context state
    ctx.save();

    // Clip to shape preview
    if (shape === 'circle') {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
      ctx.clip();
    } else if (shape === 'rounded') {
      const radius = 32;
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(size - radius, 0);
      ctx.quadraticCurveTo(size, 0, size, radius);
      ctx.lineTo(size, size - radius);
      ctx.quadraticCurveTo(size, size, size - radius, size);
      ctx.lineTo(radius, size);
      ctx.quadraticCurveTo(0, size, 0, size - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.clip();
    }

    // Apply translations & rotation
    ctx.translate(size / 2 + panX, size / 2 + panY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    // Calculate aspect fit base dimensions
    const scaleFactor = Math.max(size / imgElement.width, size / imgElement.height);
    const drawWidth = imgElement.width * scaleFactor;
    const drawHeight = imgElement.height * scaleFactor;

    ctx.drawImage(imgElement, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

    ctx.restore();
  }, [imgElement, zoom, panX, panY, rotation, shape]);

  const handleApply = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onSaveCrop(dataUrl, shape);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t.actions.cropPhoto}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Canvas Preview Area */}
          <div className="flex justify-center items-center py-4 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <canvas
              ref={canvasRef}
              className="w-[220px] h-[220px] shadow-md border-2 border-indigo-500/50 bg-white dark:bg-slate-950"
            />
          </div>

          {/* Shape Switcher */}
          <div className="flex items-center justify-center gap-2">
            {(['circle', 'rounded', 'square'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition ${
                  shape === s
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              title="Rotate 90 degrees"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1"><ZoomOut className="w-3.5 h-3.5" /> Scale</span>
              <span>{Math.round(zoom * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.6"
              max="2.5"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Pan X / Y Sliders */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Horizontal Pan</span>
              <input
                type="range"
                min="-120"
                max="120"
                value={panX}
                onChange={(e) => setPanX(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Vertical Pan</span>
              <input
                type="range"
                min="-120"
                max="120"
                value={panY}
                onChange={(e) => setPanY(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {t.actions.cancel}
          </button>
          <button
            onClick={handleApply}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>{t.actions.apply}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
