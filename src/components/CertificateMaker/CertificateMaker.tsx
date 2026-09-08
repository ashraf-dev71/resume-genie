import React, { useState, useRef } from 'react';
import { 
  Award, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  PenTool, 
  ShieldCheck, 
  Check, 
  Calendar,
  Layers,
  ZoomIn, 
  ZoomOut,
  Download,
  Image as ImageIcon,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { CertificateData, Language } from '../../types';
import { TRANSLATIONS } from '../../data/i18n';
import { INITIAL_CERTIFICATE_DATA } from '../../data/initialData';
import { triggerPrint } from '../../utils/helpers';
import { downloadElementAsPDF, downloadElementAsPNG } from '../../utils/exportUtils';

interface CertificateMakerProps {
  data: CertificateData;
  onChange: (updated: CertificateData) => void;
  onOpenSignature: (signerKey: 'sign1' | 'sign2') => void;
  lang: Language;
}

export const CertificateMaker: React.FC<CertificateMakerProps> = ({
  data,
  onChange,
  onOpenSignature,
  lang,
}) => {
  const [zoom, setZoom] = useState(0.85);
  const [isExporting, setIsExporting] = useState<'pdf' | 'png' | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);
  const certificateCardRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  const handlePrint = () => {
    triggerPrint(`${data.recipientName || 'Certificate'}_Certificate`, 'landscape');
  };

  const handleDownloadPDF = async () => {
    if (!certificateCardRef.current || isExporting) return;
    setIsExporting('pdf');
    try {
      const filename = `${data.recipientName || 'Certificate'}_Certificate`;
      const ok = await downloadElementAsPDF(certificateCardRef.current, filename, {
        orientation: 'landscape',
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
    if (!certificateCardRef.current || isExporting) return;
    setIsExporting('png');
    try {
      const filename = `${data.recipientName || 'Certificate'}_Certificate`;
      const ok = await downloadElementAsPNG(certificateCardRef.current, filename, 2.5);
      if (ok) {
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 3000);
      }
    } finally {
      setIsExporting(null);
    }
  };

  const getBorderColor = () => {
    switch (data.theme) {
      case 'gold-classic': return { border: '#b45309', accent: '#fef3c7', text: '#78350f' };
      case 'navy-ivy': return { border: '#1e3a8a', accent: '#eff6ff', text: '#172554' };
      case 'emerald-modern': return { border: '#047857', accent: '#ecfdf5', text: '#064e3b' };
      case 'burgundy-royal': return { border: '#831843', accent: '#fdf2f8', text: '#500724' };
      default: return { border: '#b45309', accent: '#fef3c7', text: '#78350f' };
    }
  };

  const colors = getBorderColor();

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
      
      {/* Left / Top Controls Sidebar (Hidden during print) */}
      <div className="no-print w-full lg:w-[420px] overflow-y-auto p-4 sm:p-6 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{t.certificate.title}</span>
            </h3>
            <p className="text-slate-500">{t.certificate.subtitle}</p>
          </div>

          <button
            onClick={() => onChange(INITIAL_CERTIFICATE_DATA)}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-700"
            title={t.actions.loadSample}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Theme Picker */}
        <div className="space-y-2">
          <label className="font-bold text-slate-700 dark:text-slate-300 block">Certificate Border Theme</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'gold-classic', label: 'Gold Classic', color: '#b45309' },
              { id: 'navy-ivy', label: 'Navy Ivy League', color: '#1e3a8a' },
              { id: 'emerald-modern', label: 'Emerald Modern', color: '#047857' },
              { id: 'burgundy-royal', label: 'Royal Burgundy', color: '#831843' },
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => onChange({ ...data, theme: theme.id as any })}
                className={`flex items-center gap-2 p-2 rounded-lg border text-left transition ${
                  data.theme === theme.id
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: theme.color }} />
                <span className="truncate">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.certificate.recipientName}</label>
            <input
              type="text"
              value={data.recipientName}
              onChange={(e) => onChange({ ...data, recipientName: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.certificate.certTitle}</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.certificate.organization}</label>
            <input
              type="text"
              value={data.organization}
              onChange={(e) => onChange({ ...data, organization: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.certificate.description}</label>
            <textarea
              rows={3}
              value={data.description}
              onChange={(e) => onChange({ ...data, description: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.certificate.issueDate}</label>
              <input
                type="text"
                value={data.issueDate}
                onChange={(e) => onChange({ ...data, issueDate: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.certificate.certId}</label>
              <input
                type="text"
                value={data.certificateId}
                onChange={(e) => onChange({ ...data, certificateId: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono"
              />
            </div>
          </div>
        </div>

        {/* Signatures Configuration */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">
            Authorized Signatories
          </span>

          {/* Signer 1 */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Signatory 1</span>
              <button
                onClick={() => onOpenSignature('sign1')}
                className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline text-[11px]"
              >
                <PenTool className="w-3 h-3" />
                <span>Draw / Upload Sign</span>
              </button>
            </div>
            <input
              type="text"
              placeholder="Signer Name"
              value={data.signatory1Name}
              onChange={(e) => onChange({ ...data, signatory1Name: e.target.value })}
              className="w-full px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
            />
            <input
              type="text"
              placeholder="Signer Title (e.g. Program Director)"
              value={data.signatory1Title}
              onChange={(e) => onChange({ ...data, signatory1Title: e.target.value })}
              className="w-full px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
            />
          </div>

          {/* Signer 2 */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Signatory 2</span>
              <button
                onClick={() => onOpenSignature('sign2')}
                className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline text-[11px]"
              >
                <PenTool className="w-3 h-3" />
                <span>Draw / Upload Sign</span>
              </button>
            </div>
            <input
              type="text"
              placeholder="Signer Name"
              value={data.signatory2Name}
              onChange={(e) => onChange({ ...data, signatory2Name: e.target.value })}
              className="w-full px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
            />
            <input
              type="text"
              placeholder="Signer Title (e.g. Lead Instructor)"
              value={data.signatory2Title}
              onChange={(e) => onChange({ ...data, signatory2Title: e.target.value })}
              className="w-full px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
            />
          </div>
        </div>

      </div>

      {/* Right / Live Preview Stage */}
      <div className="flex-1 flex flex-col h-full bg-slate-100/90 dark:bg-slate-950/80">
        
        {/* Preview Toolbar */}
        <div className="no-print flex items-center justify-between px-6 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.3, z + 0.1))}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Actions: Download PDF, Download PNG, Print */}
          <div className="flex items-center gap-2">
            {exportSuccess && (
              <span className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ডাউনলোড সম্পন্ন!' : 'Downloaded!'}</span>
              </span>
            )}

            {/* Download PDF Button */}
            <button
              id="btn-certificate-download-pdf"
              onClick={handleDownloadPDF}
              disabled={isExporting !== null}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white shadow-xs transition active:scale-95 cursor-pointer"
              title={lang === 'bn' ? 'সার্টিফিকেট পিডিএফ ফাইল ডাউনলোড করুন' : 'Download Certificate as PDF'}
            >
              {isExporting === 'pdf' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{lang === 'bn' ? 'পিডিএফ ডাউনলোড' : 'Download PDF'}</span>
            </button>

            {/* Download PNG Button */}
            <button
              id="btn-certificate-download-png"
              onClick={handleDownloadPNG}
              disabled={isExporting !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 disabled:opacity-60 transition active:scale-95 cursor-pointer"
              title={lang === 'bn' ? 'উচ্চ রেজোলিউশন ছবি (PNG) হিসেবে ডাউনলোড করুন' : 'Download as High-Res PNG Image'}
            >
              {isExporting === 'png' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ImageIcon className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{lang === 'bn' ? 'ছবি (PNG)' : 'PNG'}</span>
            </button>

            {/* Print Button */}
            <button
              id="btn-certificate-print"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition active:scale-95 cursor-pointer"
              title={lang === 'bn' ? 'A4 ল্যান্ডস্কেপ প্রিন্ট' : 'Print Certificate'}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.actions.print}</span>
            </button>
          </div>
        </div>

        {/* Certificate Display Canvas */}
        <div className="flex-1 overflow-auto p-6 sm:p-10 flex items-center justify-center certificate-print-wrapper">
          <div 
            className="certificate-outer-wrapper transition-transform duration-150 origin-center shadow-2xl rounded-sm"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* A4 Landscape Document Box: 297mm x 210mm (at screen ratio: 842px x 595px) */}
            <div 
              ref={certificateCardRef}
              id="certificate-print-node"
              className="certificate-print-box relative w-[842px] h-[595px] bg-white text-slate-900 p-12 flex flex-col justify-between select-none border-12"
              style={{
                borderColor: colors.border,
                borderStyle: 'double',
                backgroundColor: '#fcfbf7',
              }}
            >
              {/* Inner Decorative Border Frame */}
              <div 
                className="absolute inset-3 border-2 pointer-events-none"
                style={{ borderColor: colors.border }}
              />

              {/* Corner Ornaments */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: colors.border }} />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: colors.border }} />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: colors.border }} />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: colors.border }} />

              {/* Top Certificate Header */}
              <div className="text-center pt-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-8 h-8" style={{ color: colors.border }} />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: colors.border }}>
                  {data.organization || 'ACADEMIC EXCELLENCE COUNCIL'}
                </h3>
                <h1 className="text-3xl font-serif font-bold text-slate-900 mt-2 tracking-wide uppercase">
                  {data.title || 'Certificate of Achievement'}
                </h1>
                <p className="text-xs font-serif italic text-slate-500 mt-1">
                  This acknowledgment is honorably presented to:
                </p>
              </div>

              {/* Recipient Full Name */}
              <div className="text-center my-auto py-2">
                <h2 
                  className="text-4xl font-serif font-bold tracking-tight pb-2 inline-block border-b-2 px-12"
                  style={{ color: colors.text, borderColor: colors.border }}
                >
                  {data.recipientName || 'Candidate Full Name'}
                </h2>
                <p className="max-w-xl mx-auto text-xs text-slate-600 mt-4 leading-relaxed font-sans">
                  {data.description || 'For demonstrating exceptional performance and proficiency in the prescribed coursework.'}
                </p>
              </div>

              {/* Bottom Signatories and Verification */}
              <div className="flex items-end justify-between px-6 pb-2 text-xs">
                
                {/* Signatory 1 */}
                <div className="text-center w-48">
                  {data.signatory1Signature ? (
                    <img src={data.signatory1Signature} alt="Signature 1" className="h-10 max-w-[130px] object-contain mx-auto" />
                  ) : (
                    <div className="h-9 w-32 border-b border-slate-400 mx-auto" />
                  )}
                  <div className="border-t border-slate-400 pt-1 mt-1">
                    <span className="font-bold text-slate-800 block text-xs">{data.signatory1Name || 'Authorized Signatory'}</span>
                    <span className="text-[10px] text-slate-500">{data.signatory1Title || 'Program Director'}</span>
                  </div>
                </div>

                {/* Central Seal / Badge */}
                <div className="flex flex-col items-center">
                  <div 
                    className="w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center p-1 shadow-inner text-center"
                    style={{ borderColor: colors.border, backgroundColor: colors.accent }}
                  >
                    <ShieldCheck className="w-5 h-5 mb-0.5" style={{ color: colors.border }} />
                    <span className="text-[7px] font-bold uppercase tracking-widest leading-none" style={{ color: colors.border }}>
                      OFFICIAL SEAL
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 mt-1">
                    ID: {data.certificateId || 'CERT-2024-001'}
                  </span>
                  <span className="text-[9px] text-slate-500">
                    {data.issueDate || 'Issued 2024'}
                  </span>
                </div>

                {/* Signatory 2 */}
                <div className="text-center w-48">
                  {data.signatory2Signature ? (
                    <img src={data.signatory2Signature} alt="Signature 2" className="h-10 max-w-[130px] object-contain mx-auto" />
                  ) : (
                    <div className="h-9 w-32 border-b border-slate-400 mx-auto" />
                  )}
                  <div className="border-t border-slate-400 pt-1 mt-1">
                    <span className="font-bold text-slate-800 block text-xs">{data.signatory2Name || 'Lead Authority'}</span>
                    <span className="text-[10px] text-slate-500">{data.signatory2Title || 'Executive Dean'}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
