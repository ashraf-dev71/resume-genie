import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  Printer,
  Download,
  Image as ImageIcon,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { CVData, Language } from '../../types';
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
  const [docHeight, setDocHeight] = useState(1123);
  const [isExporting, setIsExporting] = useState<'pdf' | 'png' | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cvDocumentRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  const currentTemplate = CV_TEMPLATES.find((t) => t.id === data.selectedTemplateId) || CV_TEMPLATES[0];

  // Auto-fit scale calculation
  const getOptimalFitScale = useCallback(() => {
    if (!containerRef.current) return 0.85;
    const containerW = containerRef.current.clientWidth;
    if (containerW <= 0) return 0.85;
    const padding = containerW < 640 ? 16 : 48;
    const availableW = Math.max(160, containerW - padding);
    const a4PxWidth = 794;
    const scale = availableW / a4PxWidth;
    return Number(Math.min(1.15, Math.max(0.25, scale)).toFixed(2));
  }, []);

  // Update rendered height of document dynamically
  useEffect(() => {
    if (!cvDocumentRef.current) return;
    const updateDimensions = () => {
      if (cvDocumentRef.current) {
        setDocHeight(cvDocumentRef.current.offsetHeight || 1123);
      }
    };
    updateDimensions();
    const ro = new ResizeObserver(updateDimensions);
    ro.observe(cvDocumentRef.current);
    return () => ro.disconnect();
  }, [data]);

  // Initial responsive auto-fit on mount & on container/screen resize
  useEffect(() => {
    const handleAutoFit = () => {
      const optimal = getOptimalFitScale();
      setZoom(optimal);
    };

    const timer = setTimeout(handleAutoFit, 60);

    const handleWindowResize = () => {
      if (window.innerWidth < 1024) {
        setZoom(getOptimalFitScale());
      }
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [getOptimalFitScale]);

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(Math.max(0.25, Number((prev + delta).toFixed(2))), 1.4));
  };

  const handleFitScreen = () => {
    setZoom(getOptimalFitScale());
  };

  const handleActualSize = () => {
    setZoom(1.0);
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

      {/* Preview Action Toolbar (Pinned to top of preview, zero offset) */}
      <div className="no-print sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2.5 px-3 sm:px-4 py-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-xs">

        {/* Template & Color Selector button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-800 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span className="truncate max-w-[110px] sm:max-w-[180px]">{currentTemplate.name}</span>
            <span className="text-[10px] bg-indigo-200/60 dark:bg-indigo-900/80 px-1.5 py-0.2 rounded font-mono">112+</span>
          </button>

          {/* Quick Color Picker */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            {['#0f172a', '#1e3a8a', '#047857', '#ea580c', '#7c3aed', '#1c1917'].map((color) => (
              <button
                key={color}
                onClick={() => onChange({ ...data, primaryColor: color })}
                style={{ backgroundColor: color }}
                className={`w-3.5 h-3.5 rounded-full border transition ${
                  data.primaryColor === color ? 'ring-2 ring-indigo-500 scale-110' : 'border-transparent'
                }`}
                title={`Accent ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Zoom & Fit Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => handleZoom(-0.08)}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition"
              title={t.actions.zoomOut}
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFitScreen}
              className="px-1 text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-200 min-w-[38px] text-center hover:text-indigo-400"
              title="Click to Fit to Screen"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={() => handleZoom(0.08)}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition"
              title={t.actions.zoomIn}
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <div className="w-px h-3.5 bg-slate-300 dark:bg-slate-700 mx-0.5" />

            {/* Fit to Screen Button */}
            <button
              onClick={handleFitScreen}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                Math.abs(zoom - getOptimalFitScale()) < 0.04
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
              }`}
              title="Fit Full CV width to screen"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Fit</span>
            </button>

            {/* 100% Actual Size Button */}
            <button
              onClick={handleActualSize}
              className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                Math.abs(zoom - 1.0) < 0.04
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
              }`}
              title="View at 100% full scale"
            >
              100%
            </button>
          </div>

          {/* Actions: Download PDF, Download PNG, Print */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {exportSuccess && (
              <span className="hidden md:flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Downloaded!</span>
              </span>
            )}

            <button
              id="btn-cv-download-pdf"
              onClick={handleDownloadPDF}
              disabled={isExporting !== null}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white shadow-xs transition active:scale-95 cursor-pointer"
              title="Download CV as PDF"
            >
              {isExporting === 'pdf' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>PDF</span>
            </button>

            <button
              id="btn-cv-download-png"
              onClick={handleDownloadPNG}
              disabled={isExporting !== null}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 disabled:opacity-60 transition active:scale-95 cursor-pointer"
              title="Download as PNG Image"
            >
              {isExporting === 'png' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ImageIcon className="w-3.5 h-3.5" />
              )}
              <span className="hidden xs:inline sm:inline">PNG</span>
            </button>

            <button
              id="btn-cv-print"
              onClick={handlePrint}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition active:scale-95 cursor-pointer"
              title="Print CV"
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
        className="flex-1 overflow-auto p-2 sm:p-6 flex flex-col items-center justify-start bg-slate-200/60 dark:bg-slate-950/90"
      >
        <div
          className="transition-all duration-150 shadow-2xl rounded-sm border border-slate-300/80 dark:border-slate-800 bg-white relative shrink-0 my-2 sm:my-4"
          style={{
            width: `${Math.round(794 * zoom)}px`,
            height: `${Math.round(docHeight * zoom)}px`,
          }}
        >
          <div
            ref={cvDocumentRef}
            id="cv-document-node"
            className="bg-white origin-top-left absolute top-0 left-0"
            style={{
              width: '794px',
              minWidth: '794px',
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
            }}
          >
            <CVRenderer data={data} />
          </div>
        </div>
      </div>

    </div>
  );
};
