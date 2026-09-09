import React, { useState, useRef, useEffect } from 'react';
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
  Maximize2,
  Download,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  Star,
  Shield,
  Palette,
  QrCode,
  Cpu,
  Leaf,
  Trophy,
  Dumbbell,
  BadgeCheck
} from 'lucide-react';
import { CertificateData, Language, CertificateLayoutType } from '../../types';
import { TRANSLATIONS } from '../../data/i18n';
import { INITIAL_CERTIFICATE_DATA } from '../../data/initialData';
import { triggerPrint } from '../../utils/helpers';
import { downloadElementAsPDF, downloadElementAsPNG } from '../../utils/exportUtils';
import { CERTIFICATE_TEMPLATES } from '../../data/certificateTemplates';

interface CertificateMakerProps {
  data: CertificateData;
  onChange: (updated: CertificateData) => void;
  onOpenSignature: (signerKey: 'sign1' | 'sign2') => void;
  onOpenTemplates?: () => void;
  lang?: Language;
}

export const CertificateMaker: React.FC<CertificateMakerProps> = ({
  data,
  onChange,
  onOpenSignature,
  onOpenTemplates,
  lang = 'en',
}) => {
  const [zoom, setZoom] = useState(0.85);
  const [isExporting, setIsExporting] = useState<'pdf' | 'png' | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const certificateCardRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Responsive Auto-Scaling Calculation
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const availableW = rect.width - 48;
      const availableH = rect.height - 48;
      if (availableW > 0 && availableH > 0) {
        const scaleW = availableW / 842;
        const scaleH = availableH / 595;
        const optimalScale = Math.min(scaleW, scaleH);
        setZoom(Math.max(0.35, Math.min(optimalScale, 1.05)));
      }
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    return () => ro.disconnect();
  }, []);

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

  const handleFitScreen = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const availableW = rect.width - 48;
    const availableH = rect.height - 48;
    const scaleW = availableW / 842;
    const scaleH = availableH / 595;
    setZoom(Math.max(0.35, Math.min(Math.min(scaleW, scaleH), 1.05)));
  };

  const primaryColor = data.primaryColor || '#b45309';
  const secondaryColor = data.secondaryColor || '#78350f';
  const accentColor = data.accentColor || '#fef3c7';
  const backgroundColor = data.backgroundColor || '#fcfbf7';
  const borderStyle = data.borderStyle || 'double-gold';
  const sealType = data.sealType || 'gold-sunburst';
  const fontPairing = data.fontPairing || 'serif-regal';

  // Determine effective layout archetype
  const effectiveLayoutType: CertificateLayoutType = data.layoutType || (
    borderStyle === 'vintage-guilloche' ? 'classic-royal'
    : borderStyle === 'modern-geometric' ? 'modern-bauhaus'
    : borderStyle === 'ribbon-frame' ? 'corporate-sash'
    : borderStyle === 'cyber-bracket' ? 'cyber-matrix'
    : borderStyle === 'diploma-classic' ? 'academic-diploma'
    : borderStyle === 'botanical-ivy' ? 'botanical-ivy'
    : borderStyle === 'minimalist-line' ? 'minimalist-monoline'
    : 'classic-royal'
  );

  // Determine font family classes
  const getHeadingFont = () => {
    if (fontPairing === 'cinzel-academic') return 'font-cinzel';
    if (fontPairing === 'playfair-modern') return 'font-serif-display';
    if (fontPairing === 'sans-tech') return 'font-mono uppercase';
    return 'font-serif';
  };

  const getRecipientFont = () => {
    if (fontPairing === 'cinzel-academic') return 'font-cinzel';
    if (fontPairing === 'playfair-modern') return 'font-serif-display italic';
    if (fontPairing === 'sans-tech') return 'font-mono font-bold tracking-widest';
    return 'font-serif font-bold';
  };

  // Render Seal Graphic
  const renderSeal = () => {
    if (sealType === 'silver-star') {
      return (
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-2 border-slate-300 bg-gradient-to-tr from-slate-200 via-slate-100 to-white flex flex-col items-center justify-center p-1 shadow-md text-center">
            <Star className="w-5 h-5 mb-0.5 text-slate-700 fill-slate-700" />
            <span className="text-[7px] font-bold uppercase tracking-widest leading-none text-slate-800">
              ACCREDITED
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-400 mt-1">ID: {data.certificateId || 'CERT-2026'}</span>
        </div>
      );
    }

    if (sealType === 'emerald-shield') {
      return (
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-2 border-emerald-600 bg-gradient-to-tr from-emerald-100 to-emerald-50 flex flex-col items-center justify-center p-1 shadow-md text-center">
            <ShieldCheck className="w-5 h-5 mb-0.5 text-emerald-700" />
            <span className="text-[7px] font-bold uppercase tracking-widest leading-none text-emerald-800">
              EXCELLENCE
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-400 mt-1">ID: {data.certificateId || 'CERT-2026'}</span>
        </div>
      );
    }

    if (sealType === 'sapphire-ribbon') {
      return (
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-2 border-blue-600 bg-gradient-to-tr from-blue-100 to-blue-50 flex flex-col items-center justify-center p-1 shadow-md text-center">
            <CheckCircle2 className="w-5 h-5 mb-0.5 text-blue-700" />
            <span className="text-[7px] font-bold uppercase tracking-widest leading-none text-blue-800">
              VERIFIED
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-400 mt-1">ID: {data.certificateId || 'CERT-2026'}</span>
        </div>
      );
    }

    // Default Gold Sunburst Seal
    return (
      <div className="flex flex-col items-center">
        <div 
          className="w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center p-1 shadow-inner text-center relative"
          style={{ borderColor: primaryColor, backgroundColor: accentColor }}
        >
          <Award className="w-5 h-5 mb-0.5" style={{ color: primaryColor }} />
          <span className="text-[7px] font-bold uppercase tracking-widest leading-none" style={{ color: primaryColor }}>
            OFFICIAL SEAL
          </span>
        </div>
        <span className="text-[9px] font-mono text-slate-400 mt-1">
          ID: {data.certificateId || 'CERT-2026-001'}
        </span>
        <span className="text-[9px] text-slate-500">
          {data.issueDate || 'Issued 2026'}
        </span>
      </div>
    );
  };

  // =========================================================================
  // SUB-LAYOUT: MODERN BAUHAUS (Asymmetric Split Architecture)
  // =========================================================================
  const renderBauhausLayout = () => (
    <div className="flex h-full w-full">
      {/* Left 230px Solid Color Block */}
      <div 
        className="w-[230px] h-full p-8 flex flex-col justify-between text-white shrink-0 relative overflow-hidden"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="space-y-2">
          <div className="w-10 h-10 rounded bg-white/20 flex items-center justify-center backdrop-blur-xs">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-widest text-white/90">
            {data.organization || 'DESIGN ACADEMY'}
          </h3>
        </div>

        {/* Rotated Vertical Title */}
        <div className="my-auto transform -rotate-90 origin-left translate-y-24 translate-x-4">
          <span className="text-xl font-black uppercase tracking-[0.3em] whitespace-nowrap text-white/95">
            HONORARY AWARD // 2026
          </span>
        </div>

        <div className="space-y-1 font-mono text-[10px] text-white/80 border-t border-white/20 pt-3">
          <div>CREDENTIAL ID:</div>
          <div className="font-bold text-white">{data.certificateId || 'CERT-2026-001'}</div>
          <div>DATE: {data.issueDate || '2026'}</div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-10 flex flex-col justify-between bg-white text-slate-900">
        <div className="space-y-1">
          <div className="w-6 h-6 bg-rose-600 mb-2" />
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
            {data.title || 'Certificate of Excellence'}
          </h1>
          <p className="text-xs text-slate-500 font-medium">This is officially conferred upon:</p>
        </div>

        <div className="my-auto py-4">
          <h2 
            className="text-4xl font-black tracking-tight text-slate-950 pb-2 border-b-4 inline-block"
            style={{ borderColor: primaryColor }}
          >
            {data.recipientName || 'Candidate Full Name'}
          </h2>
          <p className="max-w-xl text-xs text-slate-600 mt-4 leading-relaxed font-sans">
            {data.description || 'For outstanding architectural design and exceptional dedication to creative research.'}
          </p>
        </div>

        {/* Bottom Signatories + Minimalist Stamp */}
        <div className="flex items-end justify-between pt-4 border-t border-slate-200">
          <div className="space-y-1">
            {data.signatory1Signature ? (
              <img src={data.signatory1Signature} alt="Sign" className="h-8 object-contain" />
            ) : (
              <div className="h-6 w-32 border-b-2 border-slate-900" />
            )}
            <span className="font-bold text-xs block text-slate-900">{data.signatory1Name || 'Signatory Name'}</span>
            <span className="text-[10px] text-slate-500 block">{data.signatory1Title || 'Director of Academy'}</span>
          </div>

          <div className="w-16 h-16 rounded-full border-4 border-slate-900 flex items-center justify-center p-1 text-center font-bold text-[8px] uppercase tracking-wider">
            OFFICIAL STAMP
          </div>

          <div className="space-y-1 text-right">
            {data.signatory2Signature ? (
              <img src={data.signatory2Signature} alt="Sign" className="h-8 object-contain ml-auto" />
            ) : (
              <div className="h-6 w-32 border-b-2 border-slate-900 ml-auto" />
            )}
            <span className="font-bold text-xs block text-slate-900">{data.signatory2Name || 'Lead Authority'}</span>
            <span className="text-[10px] text-slate-500 block">{data.signatory2Title || 'Program Dean'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // SUB-LAYOUT: CORPORATE SASH (Executive Diagonal Banner Sash & Medallion)
  // =========================================================================
  const renderCorporateSashLayout = () => (
    <div className="relative h-full w-full p-10 flex flex-col justify-between bg-white text-slate-900 overflow-hidden border-8 border-slate-800">
      {/* 45-Degree Diagonal Ribbon Sash in Corner */}
      <div 
        className="absolute -top-7 -left-12 w-48 py-2 text-white text-center font-bold text-[10px] tracking-widest uppercase shadow-lg transform -rotate-45"
        style={{ backgroundColor: primaryColor }}
      >
        ★ EXCELLENCE ★
      </div>

      {/* Corporate Header */}
      <div className="text-center pt-2 pl-12 pr-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: primaryColor }}>
          {data.organization || 'EXECUTIVE LEADERSHIP COUNCIL'}
        </h3>
        <h1 className="text-3xl font-serif font-bold text-slate-900 mt-1 uppercase tracking-wide">
          {data.title || 'Corporate Achievement Award'}
        </h1>
        <div className="w-24 h-0.5 mx-auto mt-2" style={{ backgroundColor: primaryColor }} />
      </div>

      {/* Recipient */}
      <div className="text-center my-auto py-2">
        <span className="text-xs text-slate-500 italic block mb-1">Presented with distinction to</span>
        <h2 
          className="text-4xl font-serif font-bold tracking-tight pb-2 inline-block px-8"
          style={{ color: secondaryColor }}
        >
          {data.recipientName || 'Candidate Full Name'}
        </h2>
        <p className="max-w-xl mx-auto text-xs text-slate-600 mt-3 leading-relaxed">
          {data.description || 'For demonstrating peerless leadership, corporate vision, and transformative milestones.'}
        </p>
      </div>

      {/* Bottom Signatures + Medallion */}
      <div className="flex items-end justify-between px-6 pb-2">
        <div className="text-center w-44">
          {data.signatory1Signature ? (
            <img src={data.signatory1Signature} alt="Sign" className="h-8 max-w-[120px] object-contain mx-auto" />
          ) : (
            <div className="h-7 w-28 border-b border-slate-400 mx-auto" />
          )}
          <div className="border-t border-slate-300 pt-1 mt-1">
            <span className="font-bold text-xs block text-slate-900">{data.signatory1Name || 'Chief Executive'}</span>
            <span className="text-[10px] text-slate-500">{data.signatory1Title || 'Managing Director'}</span>
          </div>
        </div>

        {renderSeal()}

        <div className="text-center w-44">
          {data.signatory2Signature ? (
            <img src={data.signatory2Signature} alt="Sign" className="h-8 max-w-[120px] object-contain mx-auto" />
          ) : (
            <div className="h-7 w-28 border-b border-slate-400 mx-auto" />
          )}
          <div className="border-t border-slate-300 pt-1 mt-1">
            <span className="font-bold text-xs block text-slate-900">{data.signatory2Name || 'Board Chair'}</span>
            <span className="text-[10px] text-slate-500">{data.signatory2Title || 'Executive Vice President'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // SUB-LAYOUT: CYBER MATRIX (Tech & Bootcamp Developer Certificate)
  // =========================================================================
  const renderCyberMatrixLayout = () => (
    <div className="relative h-full w-full p-8 flex flex-col justify-between bg-slate-950 text-cyan-300 font-mono border-2 border-cyan-500/80 overflow-hidden select-none">
      {/* HUD Reticle Corners */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-800 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-6 h-6 text-cyan-400" />
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-cyan-200">
              {data.organization || 'QUANTUM CODE FOUNDATION'}
            </h3>
            <p className="text-[9px] text-cyan-500">ENGINEERING CREDENTIAL VERIFICATION NODE</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500 text-[10px] text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>VERIFIED ON-CHAIN</span>
        </div>
      </div>

      {/* Center Body */}
      <div className="text-center my-auto py-2">
        <span className="text-[10px] text-cyan-500 tracking-widest uppercase block mb-1">
          // CERTIFICATE OF MASTERY //
        </span>
        <h1 className="text-2xl font-bold tracking-wider text-white uppercase mb-4">
          {data.title || 'Fullstack Cloud Architect'}
        </h1>

        <span className="text-xs text-slate-400 block mb-1">CONFERRED UNTO OPERATOR:</span>
        <h2 className="text-3xl font-black tracking-widest text-cyan-300 uppercase py-1 border-b border-cyan-800 inline-block px-8">
          {data.recipientName || 'ALEX CHEN'}
        </h2>
        <p className="max-w-xl mx-auto text-[11px] text-slate-400 mt-3 leading-relaxed">
          {data.description || 'Demonstrated master-level competencies in distributed algorithms, cryptographic systems, and microservices.'}
        </p>
      </div>

      {/* Cryptographic Verification Box + Signatures */}
      <div className="flex items-end justify-between border-t border-cyan-900 pt-3 text-[10px]">
        <div className="space-y-0.5">
          <span className="text-slate-500 block">AUTHORIZED LEAD:</span>
          <span className="font-bold text-white block">{data.signatory1Name || 'Principal Engineer'}</span>
          <span className="text-cyan-600 block">{data.signatory1Title || 'Core Kernel'}</span>
        </div>

        <div className="p-2 bg-slate-900 rounded border border-cyan-700 text-center font-mono">
          <div className="text-[8px] text-slate-400">SHA-256 HASH VERIFICATION</div>
          <div className="text-[10px] text-emerald-400 font-bold">8f4b-2a99-10e3-4c91</div>
          <div className="text-[8px] text-cyan-500 mt-0.5">ID: {data.certificateId || 'CERT-CYBER-01'}</div>
        </div>

        <div className="space-y-0.5 text-right">
          <span className="text-slate-500 block">SECURITY CHAIR:</span>
          <span className="font-bold text-white block">{data.signatory2Name || 'Chief Architect'}</span>
          <span className="text-cyan-600 block">{data.signatory2Title || 'Security Fellow'}</span>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // SUB-LAYOUT: ART DECO (1920s Gatsby Stepped Border & Obsidian Luxury)
  // =========================================================================
  const renderArtDecoLayout = () => (
    <div className="relative h-full w-full p-10 flex flex-col justify-between bg-slate-900 text-amber-300 border-8 border-amber-600 select-none">
      {/* Stepped Art Deco Corners */}
      <div className="absolute inset-2 border-2 border-amber-500/60 pointer-events-none" />
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-400" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400" />

      {/* Header */}
      <div className="text-center pt-2">
        <h3 className="text-xs font-bold uppercase tracking-[0.35em] text-amber-400">
          {data.organization || 'THE SOCIETY OF HONORS'}
        </h3>
        <h1 className="text-3xl font-serif font-black tracking-widest text-amber-200 mt-2 uppercase">
          {data.title || 'Distinguished Fellow Award'}
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="w-8 h-px bg-amber-500" />
          <div className="w-2 h-2 rotate-45 bg-amber-400" />
          <div className="w-8 h-px bg-amber-500" />
        </div>
      </div>

      {/* Recipient */}
      <div className="text-center my-auto py-2">
        <span className="text-xs text-amber-500 italic block mb-1 tracking-widest">IS BESTOWED WITH ADMIRATION UPON</span>
        <h2 className="text-4xl font-serif font-bold tracking-wider text-amber-100 pb-2 inline-block px-10 border-b-2 border-amber-500">
          {data.recipientName || 'Candidate Full Name'}
        </h2>
        <p className="max-w-xl mx-auto text-xs text-amber-200/80 mt-4 leading-relaxed font-serif">
          {data.description || 'For unparalleled merit, enduring stewardship, and exemplary contributions to the profession.'}
        </p>
      </div>

      {/* Bottom Signatures + Deco Starburst */}
      <div className="flex items-end justify-between px-6 pb-2 text-xs">
        <div className="text-center w-44">
          <div className="h-7 w-28 border-b border-amber-500/60 mx-auto" />
          <span className="font-bold text-amber-300 block text-xs mt-1">{data.signatory1Name || 'Grand Chancellor'}</span>
          <span className="text-[10px] text-amber-500">{data.signatory1Title || 'Presiding Fellow'}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border-2 border-amber-400 bg-amber-500/10 flex items-center justify-center">
            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
          </div>
          <span className="text-[8px] font-mono text-amber-500 mt-1">{data.certificateId || 'HONOR-2026'}</span>
        </div>

        <div className="text-center w-44">
          <div className="h-7 w-28 border-b border-amber-500/60 mx-auto" />
          <span className="font-bold text-amber-300 block text-xs mt-1">{data.signatory2Name || 'Secretary General'}</span>
          <span className="text-[10px] text-amber-500">{data.signatory2Title || 'Executive Dean'}</span>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // SUB-LAYOUT: BOTANICAL IVY (Creative / Arts / Wellness Natural Watercolor Frame)
  // =========================================================================
  const renderBotanicalLayout = () => (
    <div className="relative h-full w-full p-10 flex flex-col justify-between bg-amber-50/40 text-emerald-950 border-4 border-emerald-800 select-none">
      <div className="absolute inset-3 border border-emerald-700/40 pointer-events-none" />

      {/* Corner leaf icons */}
      <Leaf className="absolute top-4 left-4 w-7 h-7 text-emerald-700/60 transform -rotate-45" />
      <Leaf className="absolute top-4 right-4 w-7 h-7 text-emerald-700/60 transform rotate-45" />
      <Leaf className="absolute bottom-4 left-4 w-7 h-7 text-emerald-700/60 transform rotate-45" />
      <Leaf className="absolute bottom-4 right-4 w-7 h-7 text-emerald-700/60 transform -rotate-45" />

      <div className="text-center pt-2">
        <h3 className="text-xs font-serif uppercase tracking-[0.25em] text-emerald-800 font-semibold">
          {data.organization || 'INSTITUTE OF ARTS & DESIGN'}
        </h3>
        <h1 className="text-3xl font-serif italic text-emerald-900 mt-1">
          {data.title || 'Certificate of Artistry'}
        </h1>
      </div>

      <div className="text-center my-auto py-2">
        <span className="text-xs text-emerald-700 italic block mb-1 font-serif">Graciously presented to</span>
        <h2 className="text-4xl font-serif font-bold tracking-tight text-emerald-950 pb-2 inline-block px-10 border-b border-emerald-600">
          {data.recipientName || 'Candidate Full Name'}
        </h2>
        <p className="max-w-xl mx-auto text-xs text-emerald-800 mt-3 leading-relaxed font-serif">
          {data.description || 'For completing the master culinary & botanic design curriculum with highest distinction.'}
        </p>
      </div>

      <div className="flex items-end justify-between px-6 pb-2 text-xs font-serif">
        <div className="text-center w-44">
          <div className="h-6 w-28 border-b border-emerald-600 mx-auto" />
          <span className="font-bold text-emerald-900 block text-xs mt-1">{data.signatory1Name || 'Lead Master'}</span>
          <span className="text-[10px] text-emerald-700">{data.signatory1Title || 'Program Curator'}</span>
        </div>

        {renderSeal()}

        <div className="text-center w-44">
          <div className="h-6 w-28 border-b border-emerald-600 mx-auto" />
          <span className="font-bold text-emerald-900 block text-xs mt-1">{data.signatory2Name || 'Dean of Arts'}</span>
          <span className="text-[10px] text-emerald-700">{data.signatory2Title || 'Honorary Trustee'}</span>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // SUB-LAYOUT: SPORTS CHAMPIONSHIP (Athletic Laurel Trophy & Racing Stripes)
  // =========================================================================
  const renderSportsLayout = () => (
    <div className="relative h-full w-full p-10 flex flex-col justify-between bg-slate-950 text-white border-8 border-amber-500 overflow-hidden select-none">
      {/* Speed slashes in background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, #f59e0b, #f59e0b 12px, transparent 12px, transparent 36px)`
        }}
      />

      <div className="text-center pt-2 z-10">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Trophy className="w-8 h-8 text-amber-400" />
        </div>
        <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">
          {data.organization || 'CHAMPIONSHIP ATHLETIC FEDERATION'}
        </h3>
        <h1 className="text-3xl font-black uppercase tracking-wider text-white mt-1">
          {data.title || 'FIRST PLACE • CHAMPION'}
        </h1>
      </div>

      <div className="text-center my-auto py-2 z-10">
        <span className="text-xs text-amber-300 uppercase tracking-widest font-bold block mb-1">
          AWARDED TO ATHLETE
        </span>
        <h2 className="text-4xl font-black tracking-wider text-amber-400 uppercase pb-2 inline-block px-10 border-b-4 border-amber-500">
          {data.recipientName || 'MARCUS VANCE'}
        </h2>
        <p className="max-w-xl mx-auto text-xs text-slate-300 mt-3 leading-relaxed font-sans">
          {data.description || 'For outstanding endurance, championship sportsmanship, and record-breaking performance in the National Tournament.'}
        </p>
      </div>

      <div className="flex items-end justify-between px-6 pb-2 text-xs font-mono z-10">
        <div className="text-center w-44">
          <div className="h-6 w-28 border-b border-amber-400 mx-auto" />
          <span className="font-bold text-white block text-xs mt-1">{data.signatory1Name || 'Tournament Referee'}</span>
          <span className="text-[10px] text-slate-400">{data.signatory1Title || 'Chief Official'}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 flex flex-col items-center justify-center font-black shadow-lg">
            <Award className="w-5 h-5 mb-0.5 text-slate-950" />
            <span className="text-[8px] tracking-widest">GOLD</span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1 font-mono">RECORD ID: {data.certificateId || 'ATH-2026'}</span>
        </div>

        <div className="text-center w-44">
          <div className="h-6 w-28 border-b border-amber-400 mx-auto" />
          <span className="font-bold text-white block text-xs mt-1">{data.signatory2Name || 'Federation President'}</span>
          <span className="text-[10px] text-slate-400">{data.signatory2Title || 'Commissioner'}</span>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // SUB-LAYOUT: MINIMALIST MONOLINE (Contemporary Gallery & Studio Aesthetic)
  // =========================================================================
  const renderMinimalistLayout = () => (
    <div className="relative h-full w-full p-12 flex flex-col justify-between bg-white text-slate-900 border border-slate-300 select-none font-sans">
      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
        <span className="font-mono text-xs font-bold text-slate-900 tracking-widest">
          {data.organization || 'STUDIO MONOLINE'}
        </span>
        <span className="font-mono text-xs text-slate-400">CREDENTIAL ARCHIVE // 2026</span>
      </div>

      <div className="my-auto py-4">
        <h1 className="text-2xl font-light tracking-[0.2em] text-slate-900 uppercase">
          {data.title || 'CERTIFICATE OF COMPLETION'}
        </h1>
        <div className="mt-8">
          <span className="text-xs text-slate-400 block mb-1">CONFERRED UPON</span>
          <h2 className="text-4xl font-bold tracking-tight text-slate-950">
            {data.recipientName || 'Candidate Full Name'}
          </h2>
          <p className="max-w-lg text-xs text-slate-500 mt-4 leading-relaxed">
            {data.description || 'For completing the specialized program and demonstrating rigorous conceptual proficiency.'}
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between border-t border-slate-200 pt-4 text-xs font-mono">
        <div className="space-y-1">
          <span className="text-slate-400 block text-[10px]">SIGNATURE 01</span>
          <span className="font-bold text-slate-900 block">{data.signatory1Name || 'Authorized Signatory'}</span>
          <span className="text-slate-500 block text-[10px]">{data.signatory1Title || 'Lead Curator'}</span>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 rounded-full border border-slate-900 flex items-center justify-center text-[8px] font-bold">
            SEAL
          </div>
          <span className="text-[9px] text-slate-400 mt-1 block">ID: {data.certificateId || 'CERT-001'}</span>
        </div>

        <div className="space-y-1 text-right">
          <span className="text-slate-400 block text-[10px]">SIGNATURE 02</span>
          <span className="font-bold text-slate-900 block">{data.signatory2Name || 'Executive Dean'}</span>
          <span className="text-slate-500 block text-[10px]">{data.signatory2Title || 'Academy Director'}</span>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // SUB-LAYOUT: CLASSIC ROYAL (Traditional Ornate Guilloche Frame)
  // =========================================================================
  const renderClassicRoyalLayout = () => (
    <div 
      className="relative h-full w-full p-12 flex flex-col justify-between select-none border-12"
      style={{
        borderColor: primaryColor,
        borderStyle: 'double',
        backgroundColor: backgroundColor,
      }}
    >
      {/* Inner Decorative Border Frame */}
      <div 
        className="absolute inset-3 border-2 pointer-events-none"
        style={{ borderColor: primaryColor }}
      />

      {/* Corner Ornaments */}
      <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2" style={{ borderColor: primaryColor }} />
      <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2" style={{ borderColor: primaryColor }} />
      <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2" style={{ borderColor: primaryColor }} />
      <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2" style={{ borderColor: primaryColor }} />

      {/* Top Certificate Header */}
      <div className="text-center pt-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Award className="w-8 h-8" style={{ color: primaryColor }} />
        </div>
        <h3 className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: primaryColor }}>
          {data.organization || 'ACADEMIC EXCELLENCE COUNCIL'}
        </h3>
        <h1 className={`text-3xl ${getHeadingFont()} font-bold text-slate-900 mt-2 tracking-wide uppercase`}>
          {data.title || 'Certificate of Achievement'}
        </h1>
        <p className="text-xs italic text-slate-500 mt-1">
          This acknowledgment is honorably presented to:
        </p>
      </div>

      {/* Recipient Full Name */}
      <div className="text-center my-auto py-2">
        <h2 
          className={`text-4xl ${getRecipientFont()} font-bold tracking-tight pb-2 inline-block border-b-2 px-12`}
          style={{ color: secondaryColor, borderColor: primaryColor }}
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
        {renderSeal()}

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
  );

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
      
      {/* Left Controls Sidebar (Hidden during print) */}
      <div className="no-print w-full lg:w-[420px] overflow-y-auto p-4 sm:p-6 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{t.certificate.title}</span>
            </h3>
            <p className="text-slate-500">{t.certificate.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            {onOpenTemplates && (
              <button
                type="button"
                onClick={onOpenTemplates}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>75+ Templates</span>
              </button>
            )}

            <button
              onClick={() => onChange(INITIAL_CERTIFICATE_DATA)}
              className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              title={t.actions.loadSample}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Design Architecture Selector */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Design Layout Architecture</span>
            </span>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-semibold">
              {effectiveLayoutType}
            </span>
          </label>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {[
              { id: 'classic-royal', label: 'Classic Royal Guilloche' },
              { id: 'modern-bauhaus', label: 'Modern Bauhaus Split' },
              { id: 'corporate-sash', label: 'Corporate Corner Sash' },
              { id: 'cyber-matrix', label: 'Cyber Tech Matrix' },
              { id: 'art-deco', label: '1920s Art Deco Gatsby' },
              { id: 'botanical-ivy', label: 'Botanical Leaf Frame' },
              { id: 'sports-championship', label: 'Athletic Championship' },
              { id: 'minimalist-monoline', label: 'Minimalist Monoline' },
            ].map((arch) => (
              <button
                key={arch.id}
                type="button"
                onClick={() => onChange({ ...data, layoutType: arch.id as CertificateLayoutType })}
                className={`px-2 py-1.5 rounded-lg text-left text-[11px] font-medium border transition ${
                  effectiveLayoutType === arch.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold shadow-2xs ring-1 ring-indigo-500'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {arch.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Style Palette Swatches */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-indigo-500" />
              <span>Color Themes</span>
            </label>
            {onOpenTemplates && (
              <button
                type="button"
                onClick={onOpenTemplates}
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Browse all 75
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'gold-classic', label: 'Gold Classic', p: '#b45309', s: '#78350f', a: '#fef3c7', b: '#fcfbf7' },
              { id: 'navy-ivy', label: 'Navy Ivy League', p: '#1e3a8a', s: '#172554', a: '#eff6ff', b: '#ffffff' },
              { id: 'emerald-modern', label: 'Emerald Modern', p: '#047857', s: '#064e3b', a: '#ecfdf5', b: '#f9fdfa' },
              { id: 'burgundy-royal', label: 'Royal Burgundy', p: '#831843', s: '#500724', a: '#fdf2f8', b: '#fcfafc' },
              { id: 'midnight-onyx', label: 'Midnight Onyx', p: '#09090b', s: '#d97706', a: '#fef3c7', b: '#fafafa' },
              { id: 'sapphire-executive', label: 'Sapphire Tech', p: '#0284c7', s: '#0369a1', a: '#e0f2fe', b: '#ffffff' },
            ].map((preset) => (
              <button
                key={preset.id}
                onClick={() => onChange({ 
                  ...data, 
                  primaryColor: preset.p, 
                  secondaryColor: preset.s,
                  accentColor: preset.a,
                  backgroundColor: preset.b 
                })}
                className={`flex items-center gap-2 p-2 rounded-lg border text-left transition ${
                  data.primaryColor === preset.p
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 font-semibold ring-1 ring-indigo-500'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: preset.p }} />
                <span className="truncate">{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Recipient Candidate Name
            </label>
            <input
              type="text"
              value={data.recipientName}
              onChange={(e) => onChange({ ...data, recipientName: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Certificate Title
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Issuing Organization / Institute
            </label>
            <input
              type="text"
              value={data.organization}
              onChange={(e) => onChange({ ...data, organization: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Citation / Description
            </label>
            <textarea
              rows={3}
              value={data.description}
              onChange={(e) => onChange({ ...data, description: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Date of Award</label>
              <input
                type="text"
                value={data.issueDate}
                onChange={(e) => onChange({ ...data, issueDate: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Credential ID</label>
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
                type="button"
                onClick={() => onOpenSignature('sign1')}
                className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline text-[11px]"
              >
                <PenTool className="w-3 h-3" />
                <span>Draw / Upload Signature</span>
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
                type="button"
                onClick={() => onOpenSignature('sign2')}
                className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline text-[11px]"
              >
                <PenTool className="w-3 h-3" />
                <span>Draw / Upload Signature</span>
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
              placeholder="Signer Title (e.g. Executive Dean)"
              value={data.signatory2Title}
              onChange={(e) => onChange({ ...data, signatory2Title: e.target.value })}
              className="w-full px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
            />
          </div>
        </div>

      </div>

      {/* Right Canvas / Preview Area */}
      <div className="flex-1 flex flex-col h-full bg-slate-200 dark:bg-slate-950 overflow-hidden">
        
        {/* Top Floating Viewport Toolbar (Hidden during print) */}
        <div className="no-print p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-500 font-semibold">A4 Landscape</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-500">Auto-Scale: {Math.round(zoom * 100)}%</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setZoom((z) => Math.max(0.3, z - 0.05))}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(1.2, z + 0.05))}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFitScreen}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200"
              title="Fit to Screen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            {/* Export PNG */}
            <button
              id="btn-certificate-export-png"
              onClick={handleDownloadPNG}
              disabled={isExporting !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition active:scale-95 disabled:opacity-50 cursor-pointer"
              title="Download High-Res PNG"
            >
              {isExporting === 'png' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
              <span>PNG</span>
            </button>

            {/* Export PDF */}
            <button
              id="btn-certificate-export-pdf"
              onClick={handleDownloadPDF}
              disabled={isExporting !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition active:scale-95 disabled:opacity-50 cursor-pointer"
              title="Download Vector PDF"
            >
              {isExporting === 'pdf' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>PDF</span>
            </button>

            {/* Print Button */}
            <button
              id="btn-certificate-print"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition active:scale-95 cursor-pointer"
              title="Print Certificate"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.actions.print}</span>
            </button>
          </div>
        </div>

        {/* Certificate Display Canvas */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center certificate-print-wrapper"
        >
          <div 
            className="certificate-outer-wrapper transition-transform duration-150 origin-center shadow-2xl rounded-sm"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* A4 Landscape Document Box: 297mm x 210mm (at screen ratio: 842px x 595px) */}
            <div 
              ref={certificateCardRef}
              id="certificate-print-node"
              className="certificate-print-box relative w-[842px] h-[595px] text-slate-900 select-none overflow-hidden"
              style={{
                boxSizing: 'border-box',
                backgroundColor: backgroundColor,
              }}
            >
              {/* Conditional Layout Architectures */}
              {effectiveLayoutType === 'modern-bauhaus' && renderBauhausLayout()}
              {effectiveLayoutType === 'corporate-sash' && renderCorporateSashLayout()}
              {effectiveLayoutType === 'cyber-matrix' && renderCyberMatrixLayout()}
              {effectiveLayoutType === 'art-deco' && renderArtDecoLayout()}
              {effectiveLayoutType === 'botanical-ivy' && renderBotanicalLayout()}
              {effectiveLayoutType === 'sports-championship' && renderSportsLayout()}
              {effectiveLayoutType === 'minimalist-monoline' && renderMinimalistLayout()}
              {effectiveLayoutType === 'classic-royal' && renderClassicRoyalLayout()}
              {effectiveLayoutType === 'academic-diploma' && renderClassicRoyalLayout()}
              {effectiveLayoutType === 'youth-achievement' && renderCorporateSashLayout()}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
