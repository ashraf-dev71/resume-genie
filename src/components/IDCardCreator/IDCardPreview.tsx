import React, { useState, useRef } from 'react';
import { 
  Printer, 
  RotateCw, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Check, 
  ShieldCheck,
  Download,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { StudentIDData, Language } from '../../types';
import { IDCardRenderer } from './IDCardRenderer';
import { TRANSLATIONS } from '../../data/i18n';
import { triggerPrint } from '../../utils/helpers';
import { downloadElementAsPDF, downloadElementAsPNG } from '../../utils/exportUtils';

interface IDCardPreviewProps {
  data: StudentIDData;
  lang: Language;
  onOpenTemplates?: () => void;
}

export const IDCardPreview: React.FC<IDCardPreviewProps> = ({
  data,
  lang,
  onOpenTemplates,
}) => {
  const [isBackSide, setIsBackSide] = useState(false);
  const [showBoth, setShowBoth] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isExporting, setIsExporting] = useState<'pdf' | 'png' | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);
  const cardStageRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  const handlePrint = () => {
    triggerPrint(`${data.studentName || 'Student'}_ID_Card`);
  };

  const handleDownloadPDF = async () => {
    if (!cardStageRef.current || isExporting) return;
    setIsExporting('pdf');
    try {
      const filename = `${data.studentName || 'Student'}_ID_Card`;
      const ok = await downloadElementAsPDF(cardStageRef.current, filename, {
        orientation: data.layout === 'vertical' ? 'portrait' : 'landscape',
        format: showBoth ? 'a4' : 'cr80',
        pixelRatio: 3,
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
    if (!cardStageRef.current || isExporting) return;
    setIsExporting('png');
    try {
      const filename = `${data.studentName || 'Student'}_ID_Card`;
      const ok = await downloadElementAsPNG(cardStageRef.current, filename, 3);
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
      
      {/* Top Controls Toolbar */}
      <div className="no-print sticky top-16 z-20 flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-xs">
        
        {/* Flip & View Modes */}
        <div className="flex items-center gap-2">
          {onOpenTemplates && (
            <button
              onClick={onOpenTemplates}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>72+ Templates</span>
            </button>
          )}

          <button
            onClick={() => {
              setShowBoth(false);
              setIsBackSide((prev) => !prev);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-800 transition"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isBackSide ? t.actions.frontSide : t.actions.backSide}</span>
          </button>

          <button
            onClick={() => setShowBoth((prev) => !prev)}
            className={`px-3 py-1.5 rounded-lg font-semibold border transition ${
              showBoth
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            Dual Side View
          </button>
        </div>

        {/* Zoom & Print */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Actions: Download PDF, Download PNG, Print */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {exportSuccess && (
              <span className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Downloaded!</span>
              </span>
            )}

            <button
              id="btn-idcard-download-pdf"
              onClick={handleDownloadPDF}
              disabled={isExporting !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white shadow-xs transition active:scale-95 cursor-pointer"
              title="Download ID Card as PDF"
            >
              {isExporting === 'pdf' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>PDF</span>
            </button>

            <button
              id="btn-idcard-download-png"
              onClick={handleDownloadPNG}
              disabled={isExporting !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 disabled:opacity-60 transition active:scale-95 cursor-pointer"
              title="Download as High-Res PNG Image"
            >
              {isExporting === 'png' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ImageIcon className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">PNG</span>
            </button>

            <button
              id="btn-idcard-print"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition active:scale-95 cursor-pointer"
              title="Print ID Card"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.actions.print}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Main Card Stage */}
      <div className="flex-1 overflow-auto p-6 sm:p-10 flex flex-col items-center justify-center min-h-[500px]">
        <div 
          ref={cardStageRef}
          id="idcard-print-stage"
          className="transition-transform duration-200 flex flex-wrap gap-8 items-center justify-center"
          style={{ transform: `scale(${zoom})` }}
        >
          {showBoth ? (
            <>
              {/* Dual Side: Front & Back side-by-side */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Front Side (CR80)
                </span>
                <IDCardRenderer data={data} isBackSide={false} lang={lang} />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Back Side (CR80)
                </span>
                <IDCardRenderer data={data} isBackSide={true} lang={lang} />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {isBackSide ? 'Back Side (Verification & QR)' : 'Front Side (Student Identity)'}
              </span>
              <IDCardRenderer data={data} isBackSide={isBackSide} lang={lang} />
            </div>
          )}
        </div>

        {/* Legal Disclaimer Pill for ID cards */}
        <div className="mt-8 max-w-md p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 text-center text-[11px] text-amber-800 dark:text-amber-300">
          <ShieldCheck className="w-4 h-4 inline mr-1 text-amber-600" />
          Standard CR80 dimensions (85.6mm × 53.98mm). Strictly intended for personal, educational, and authorized campus identification.
        </div>
      </div>

    </div>
  );
};
