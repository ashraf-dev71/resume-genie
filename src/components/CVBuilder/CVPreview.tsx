import React, { useState, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Palette, 
  Sparkles, 
  Printer, 
  RotateCcw,
  Type,
  Download,
  Image as ImageIcon,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { CVData, Language, CVTemplate } from '../../types';
import { CVRenderer } from './CVRenderer';
import { TRANSLATIONS } from '../../data/i18n';
import { CV_TEMPLATES } from '../../data/templates';
import { triggerPrint } from '../../utils/helpers';
import { downloadElementAsPDF, downloadElementAsPNG } from '../../utils/exportUtils';

interface CVPreviewProps {
  data: CVData;
  onChange: (updated: CVData) => void;
  onOpenTemplates: () => void;
  lang: Language;
}

export const CVPreview: React.FC<CVPreviewProps> = ({
  data,
  onChange,
  onOpenTemplates,
  lang,
}) => {
  const [zoom, setZoom] = useState(0.85);
  const [isExporting, setIsExporting] = useState<'pdf' | 'png' | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cvDocumentRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  const currentTemplate = CV_TEMPLATES.find((t) => t.id === data.selectedTemplateId) || CV_TEMPLATES[0];

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(Math.max(0.45, prev + delta), 1.4));
  };

  const handleFitScreen = () => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth - 40;
    // Standard A4 in px at 96dpi is ~794px
    const a4PxWidth = 794;
    const newZoom = Math.min(1.0, Math.max(0.45, containerWidth / a4PxWidth));
    setZoom(Number(newZoom.toFixed(2)));
  };

  const handlePrint = () => {
    triggerPrint(`${data.profile.fullName || 'Resume'}_CV`, 'portrait');
  };

  const handleDownloadPDF = async () => {
    if (!cvDocumentRef.current || isExporting) return;
    setIsExporting('pdf');
    try {
      const filename = `${data.profile.fullName || 'Resume'}_CV`;
      const ok = await downloadElementAsPDF(cvDocumentRef.current, filename, {
        orientation: 'portrait',
        format: 'a4',
        pixelRatio: 2.5,
      });
      if (ok) {
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 3000);
      }
    } finally {
      setIsExporting(null);
    }
  };

  const handleDownloadPNG = async () => {
    if (!cvDocumentRef.current || isExporting) return;
    setIsExporting('png');
    try {
      const filename = `${data.profile.fullName || 'Resume'}_CV`;
      const ok = await downloadElementAsPNG(cvDocumentRef.current, filename, 2.5);
      if (ok) {
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 3000);
      }
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-100/90 dark:bg-slate-950/80 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800">
      
      {/* Preview Action Toolbar */}
      <div className="no-print sticky top-16 z-20 flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-xs">
        
        {/* Template & Color Selector button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-800 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span className="truncate max-w-[140px] sm:max-w-[200px]">{currentTemplate.name}</span>
            <span className="text-[10px] bg-indigo-200/60 dark:bg-indigo-900/80 px-1.5 py-0.2 rounded font-mono">112+</span>
          </button>

          {/* Quick Color Picker */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            {['#0f172a', '#1e3a8a', '#047857', '#ea580c', '#7c3aed', '#1c1917'].map((color) => (
              <button
                key={color}
                onClick={() => onChange({ ...data, primaryColor: color })}
                style={{ backgroundColor: color }}
                className={`w-4 h-4 rounded-full border transition ${
                  data.primaryColor === color ? 'ring-2 ring-indigo-500 scale-110' : 'border-transparent'
                }`}
                title={`Accent ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Zoom & Print Controls */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => handleZoom(-0.1)}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
              title={t.actions.zoomOut}
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-[11px] font-mono text-slate-600 dark:text-slate-300 w-10 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => handleZoom(0.1)}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
              title={t.actions.zoomIn}
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFitScreen}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
              title={t.actions.fitScreen}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Actions: Download PDF, Download PNG, Print */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {exportSuccess && (
              <span className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ডাউনলোড সম্পন্ন!' : 'Downloaded!'}</span>
              </span>
            )}

            <button
              id="btn-cv-download-pdf"
              onClick={handleDownloadPDF}
              disabled={isExporting !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white shadow-xs transition active:scale-95 cursor-pointer"
              title={lang === 'bn' ? 'রিজিউমে PDF ফাইল ডাউনলোড করুন' : 'Download CV as PDF'}
            >
              {isExporting === 'pdf' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{lang === 'bn' ? 'পিডিএফ' : 'PDF'}</span>
            </button>

            <button
              id="btn-cv-download-png"
              onClick={handleDownloadPNG}
              disabled={isExporting !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 disabled:opacity-60 transition active:scale-95 cursor-pointer"
              title={lang === 'bn' ? 'ছবি (PNG) হিসেবে ডাউনলোড' : 'Download as PNG Image'}
            >
              {isExporting === 'png' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ImageIcon className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{lang === 'bn' ? 'ছবি' : 'PNG'}</span>
            </button>

            <button
              id="btn-cv-print"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition active:scale-95 cursor-pointer"
              title={lang === 'bn' ? 'A4 প্রিন্ট করুন' : 'Print CV'}
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.actions.print}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Preview Scrollable Canvas Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start"
      >
        <div 
          className="transition-transform duration-150 origin-top shadow-2xl rounded-sm border border-slate-300/80 dark:border-slate-800 overflow-hidden bg-white"
          style={{
            transform: `scale(${zoom})`,
            marginBottom: `${(zoom - 1) * 350}px`,
          }}
        >
          <div ref={cvDocumentRef} id="cv-document-node" className="bg-white">
            <CVRenderer data={data} />
          </div>
        </div>
      </div>

    </div>
  );
};
