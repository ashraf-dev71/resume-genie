import React, { useEffect, useState } from 'react';
import {
  Shield,
  MapPin,
  Phone,
  Mail,
  Droplet,
  Calendar,
  AlertCircle,
  GraduationCap,
  Building,
  User,
  CheckCircle,
  QrCode,
  Sparkles,
  Cpu,
  Radio,
  Lock,
  Zap,
  Dumbbell,
  Fingerprint,
  ShieldCheck,
  Award,
  Star,
  Activity,
  Heart
} from 'lucide-react';
import { StudentIDData, Language, IDCardDesignType } from '../../types';
import { TRANSLATIONS } from '../../data/i18n';
import { generateQRCodeDataUrl } from '../../utils/helpers';

interface IDCardRendererProps {
  data: StudentIDData;
  isBackSide?: boolean;
  lang?: Language;
}

// 1. Realistic EMV Smart Chip Graphic
const EMVChipGraphic: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => (
  <div
    className={`${size === 'sm' ? 'w-8 h-6' : 'w-10 h-8'} rounded-md bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-600/80 shadow-xs relative overflow-hidden flex items-center justify-center`}
    title="EMV Smart Microchip"
  >
    {/* Microchip internal traces */}
    <div className="absolute inset-0 flex flex-col justify-between p-0.5 pointer-events-none opacity-60">
      <div className="w-full h-px bg-amber-800" />
      <div className="flex justify-between w-full h-full my-auto items-center">
        <div className="w-2.5 h-3 border border-amber-800 rounded-sm" />
        <div className="w-2.5 h-3 border border-amber-800 rounded-sm" />
      </div>
      <div className="w-full h-px bg-amber-800" />
    </div>
  </div>
);

// 2. Holographic Foil Security Badge
const HologramBadge: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <div
    className="rounded-full bg-gradient-to-tr from-cyan-400 via-purple-300 to-rose-400 opacity-90 border-2 border-white/90 shadow-xs flex items-center justify-center relative overflow-hidden"
    style={{ width: `${size}px`, height: `${size}px` }}
    title="Holographic Security Seal"
  >
    <div className="absolute inset-0 bg-white/20 transform -rotate-45" />
    <ShieldCheck className="w-3.5 h-3.5 text-white drop-shadow-xs" />
  </div>
);

// 3. Realistic Barcode Component
const BarcodeVisual: React.FC<{ code: string; width?: number; height?: number; dark?: boolean }> = ({
  code,
  width = 180,
  height = 32,
  dark = false
}) => {
  const bars = [
    3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 4, 2, 1, 3, 1, 4, 2, 1, 3, 2, 1, 2, 3, 1, 4, 1, 2, 3, 1, 2, 4, 1, 3
  ];
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex justify-between items-end overflow-hidden px-1"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {bars.map((bWidth, idx) => (
          <div
            key={idx}
            className={`${dark ? 'bg-cyan-300' : 'bg-slate-950'} h-full`}
            style={{ width: `${bWidth * 1.3}px` }}
          />
        ))}
      </div>
      <span className={`font-mono text-[9px] tracking-widest ${dark ? 'text-cyan-400' : 'text-slate-700'} font-bold mt-0.5`}>
        {code || '890123456789'}
      </span>
    </div>
  );
};

export const IDCardRenderer: React.FC<IDCardRendererProps> = ({
  data,
  isBackSide = false,
  lang = 'en',
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    let isMounted = true;
    const payload = data.qrPayload || `https://verify.edu/student/${data.idNumber || '2026'}`;
    generateQRCodeDataUrl(payload).then((url) => {
      if (isMounted) setQrDataUrl(url);
    });
    return () => {
      isMounted = false;
    };
  }, [data.qrPayload, data.idNumber]);

  const isVertical = data.layout === 'vertical';
  const primaryColor = data.primaryColor || '#1e3a8a';
  const secondaryColor = data.secondaryColor || '#0284c7';
  const accentColor = data.accentColor || '#38bdf8';
  const headerStyle = data.headerStyle || 'gradient';
  const bgPattern = data.bgPattern || 'none';
  const badgeText = data.badgeText || (isVertical ? 'STUDENT IDENTIFICATION' : 'CR80 STUDENT');

  // Determine effective design archetype
  const effectiveDesignType: IDCardDesignType = data.designType || (
    isVertical
      ? (headerStyle === 'cyber' ? 'cyber-keycard'
         : headerStyle === 'minimal' ? 'swiss-minimalist'
         : headerStyle === 'slanted' ? 'tech-silicon'
         : headerStyle === 'shield' ? 'police-security'
         : 'standard-corporate')
      : 'horizontal-dualcol'
  );

  // Background Pattern Overlay Generator
  const renderBackgroundPattern = () => {
    if (bgPattern === 'grid') {
      return (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />
      );
    }
    if (bgPattern === 'dots') {
      return (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(#000 1.2px, transparent 1.2px)`,
            backgroundSize: '12px 12px',
          }}
        />
      );
    }
    if (bgPattern === 'circuit') {
      return (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #000 1.5px, transparent 1.5px), linear-gradient(45deg, transparent 48%, #000 49%, #000 51%, transparent 52%)`,
            backgroundSize: '24px 24px',
          }}
        />
      );
    }
    if (bgPattern === 'hex') {
      return (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 100% 100%, #000 1px, transparent 1px), radial-gradient(circle at 0% 0%, #000 1px, transparent 1px)`,
            backgroundSize: '18px 18px',
          }}
        />
      );
    }
    if (bgPattern === 'stripes') {
      return (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #000, #000 1.5px, transparent 1.5px, transparent 10px)`,
          }}
        />
      );
    }
    return null;
  };

  // Corner radius class
  const cardCornerClass = data.borderStyle === 'rounded-xl'
    ? 'rounded-xl'
    : data.borderStyle === 'chamfer'
    ? 'rounded-md'
    : 'rounded-2xl';

  // Shared generic photo box
  const renderPhoto = (className: string, rounded = 'rounded-xl') => {
    if (data.studentPhotoUrl) {
      return (
        <img
          src={data.studentPhotoUrl}
          alt={data.studentName}
          className={`w-full h-full object-cover ${rounded}`}
        />
      );
    }
    return (
      <div
        className={`w-full h-full ${rounded} flex flex-col items-center justify-center text-slate-400`}
        style={{ backgroundColor: `${primaryColor}10` }}
      >
        <User className="w-12 h-12" style={{ color: `${primaryColor}60` }} />
      </div>
    );
  };

  // =========================================================================
  // ARCHETYPE 1: TECH SILICON (Silicon Valley Lanyard Badge with Asymmetric layout)
  // =========================================================================
  if (effectiveDesignType === 'tech-silicon') {
    if (isBackSide) {
      return (
        <div
          className={`id-card-print-vertical relative w-[320px] h-[500px] bg-slate-900 ${cardCornerClass} shadow-xl border border-slate-800 overflow-hidden flex flex-col justify-between p-5 text-white select-none`}
          style={{ boxSizing: 'border-box' }}
        >
          {/* Lanyard slot cutout simulation */}
          <div className="w-12 h-2.5 bg-slate-950 rounded-full mx-auto -mt-2.5 border border-slate-700 shadow-inner" />

          <div className="space-y-1.5 text-center mt-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 block font-bold">
              SYSTEM CREDENTIAL // R&D INFRASTRUCTURE
            </span>
            <p className="text-[10px] text-slate-400 leading-relaxed px-2 font-mono">
              Property of {data.instituteName || 'Technology Systems Corp'}. Access granted strictly to designated cardholder.
            </p>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Security Node:</span>
              <span className="font-bold text-indigo-400">HQ-PACIFIC-09</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Card ID:</span>
              <span className="font-bold text-white">{data.idNumber || 'UID-9901'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Emergency Desk:</span>
              <span className="text-rose-400 font-bold">{data.emergencyContact || '+1 (800) 555-TECH'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Expires:</span>
              <span className="text-emerald-400 font-bold">{data.validity || 'Dec 2026'}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2">
            {qrDataUrl && (
              <div className="p-1 bg-white rounded-lg shadow-sm">
                <img src={qrDataUrl} alt="QR Code" className="w-20 h-20" />
              </div>
            )}
            <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={200} height={26} dark />
          </div>

          <div className="text-center text-[9px] font-mono text-slate-500 flex items-center justify-center gap-1.5 border-t border-slate-800 pt-2">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>NFC 13.56 MHz • DESFire EV3 Encrypted</span>
          </div>
        </div>
      );
    }

    // FRONT
    return (
      <div
        className={`id-card-print-vertical relative w-[320px] h-[500px] bg-slate-900 ${cardCornerClass} shadow-xl border border-slate-800 overflow-hidden flex flex-col justify-between select-none text-white`}
        style={{ boxSizing: 'border-box' }}
      >
        {/* Lanyard slot cutout simulation */}
        <div className="w-12 h-2.5 bg-slate-950 rounded-full mx-auto mt-2 border border-slate-700 shadow-inner z-20" />

        {/* Big Ghost Watermark */}
        <div className="absolute right-2 top-24 text-7xl font-black text-slate-800/40 select-none pointer-events-none font-mono">
          DEV
        </div>

        {/* Left vertical accent rail */}
        <div
          className="absolute left-0 top-0 bottom-0 w-2.5 z-10"
          style={{ backgroundColor: primaryColor }}
        />

        {/* Header bar */}
        <div className="px-6 pt-2 pb-1 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            {data.instituteLogoUrl ? (
              <img src={data.instituteLogoUrl} alt="Logo" className="w-7 h-7 object-contain" />
            ) : (
              <Cpu className="w-6 h-6 text-indigo-400" />
            )}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                {data.instituteName || 'Silicon Systems Inc.'}
              </h3>
              <p className="text-[9px] text-indigo-300 font-mono">{data.instituteSub || 'Engineering & Research'}</p>
            </div>
          </div>
          <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700">
            PASS
          </span>
        </div>

        {/* Main Body: Photo + Name side-by-side / asymmetric */}
        <div className="px-6 pt-3 z-10">
          <div className="flex items-start gap-4">
            <div
              className="w-24 h-28 rounded-xl border-2 bg-slate-950 shadow-lg overflow-hidden shrink-0"
              style={{ borderColor: accentColor }}
            >
              {renderPhoto('w-full h-full', 'rounded-lg')}
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <span className="text-[9px] font-mono font-bold tracking-widest text-indigo-400 uppercase block">
                {badgeText || 'MEMBER BADGE'}
              </span>
              <h2 className="font-bold text-lg text-white tracking-tight leading-tight mt-0.5">
                {data.studentName || 'Alex Chen'}
              </h2>
              <div
                className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow-xs"
                style={{ backgroundColor: primaryColor }}
              >
                {data.idNumber || 'ENG-2026-99'}
              </div>
              <p className="text-[10px] text-slate-300 font-mono mt-1 line-clamp-1">
                {data.department || 'Cloud Systems Infrastructure'}
              </p>
            </div>
          </div>
        </div>

        {/* Tech Specs Grid */}
        <div className="px-6 space-y-1.5 text-[11px] font-mono z-10">
          <div className="flex justify-between border-b border-slate-800 pb-1">
            <span className="text-slate-400">Role / Program:</span>
            <span className="font-semibold text-indigo-200">{data.program || 'Senior Engineer'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-1">
            <span className="text-slate-400">Cohort / Batch:</span>
            <span className="font-semibold text-slate-300">{data.batch || 'Class 2026'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-1">
            <span className="text-slate-400">Blood Group:</span>
            <span className="font-bold text-rose-400 flex items-center gap-1">
              <Droplet className="w-3 h-3 text-rose-500 fill-rose-500" />
              {data.bloodGroup || 'O+'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Valid Through:</span>
            <span className="font-bold text-emerald-400">{data.validity || 'Dec 2026'}</span>
          </div>
        </div>

        {/* Bottom Barcode & Scan */}
        <div className="px-6 pb-4 pt-1 flex items-end justify-between z-10">
          <div className="flex flex-col">
            <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={160} height={22} dark />
          </div>
          {qrDataUrl && (
            <div className="p-1 bg-white rounded-md shadow-sm shrink-0">
              <img src={qrDataUrl} alt="QR" className="w-12 h-12" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE 2: EXECUTIVE SMART CHIP (Luxury Corporate ID with Gold Chip & Hologram)
  // =========================================================================
  if (effectiveDesignType === 'executive-smartchip') {
    if (isBackSide) {
      return (
        <div
          className={`id-card-print-vertical relative w-[320px] h-[500px] bg-slate-50 ${cardCornerClass} shadow-xl border border-slate-300 overflow-hidden flex flex-col justify-between p-5 text-slate-800 select-none`}
          style={{ boxSizing: 'border-box' }}
        >
          {/* Top Magnetic Stripe visual */}
          <div className="h-10 bg-slate-900 -mx-5 -mt-5" />

          <div className="space-y-1.5 text-center mt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-serif">
              Corporate Governance & Compliance
            </h4>
            <p className="text-[10px] text-slate-500 leading-relaxed px-2">
              This credential certifies authorization for executive access at {data.instituteName || 'the Corporation'}. Found cards must be returned to Security Dispatch.
            </p>
          </div>

          {/* Signature Strip */}
          <div className="my-2 bg-amber-50 border border-slate-300 p-2 rounded flex flex-col items-end">
            <span className="text-[8px] font-mono text-slate-400 self-start">CARDHOLDER SIGNATURE</span>
            {data.signatureUrl ? (
              <img src={data.signatureUrl} alt="Sign" className="h-6 object-contain" />
            ) : (
              <div className="h-6 w-full italic text-[10px] text-slate-400 font-serif flex items-center justify-center">
                Signature Required
              </div>
            )}
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Emergency Helpline:</span>
              <span className="font-bold text-rose-600 font-mono">{data.emergencyContact || '+1 800 900 1200'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Valid Until:</span>
              <span className="font-bold text-emerald-700 font-mono">{data.validity || 'Dec 2026'}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2">
            {qrDataUrl && (
              <div className="p-1 bg-white border border-slate-200 rounded-lg shadow-2xs">
                <img src={qrDataUrl} alt="QR Code" className="w-18 h-18" />
              </div>
            )}
            <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={190} height={24} />
          </div>

          <div className="text-center text-[9px] text-slate-400 flex items-center justify-center gap-1 border-t border-slate-200 pt-2 font-serif">
            <ShieldCheck className="w-3 h-3 text-amber-600" />
            <span>ISO 7810 ID-1 • Official Executive ID</span>
          </div>
        </div>
      );
    }

    // FRONT
    return (
      <div
        className={`id-card-print-vertical relative w-[320px] h-[500px] bg-gradient-to-b from-white via-slate-50 to-slate-100 ${cardCornerClass} shadow-xl border border-slate-300 overflow-hidden flex flex-col justify-between select-none text-slate-900`}
        style={{ boxSizing: 'border-box' }}
      >
        {renderBackgroundPattern()}

        {/* Top Header Banner */}
        <div
          className="px-5 pt-4 pb-3 text-white flex items-center justify-between relative z-10"
          style={{
            backgroundColor: primaryColor,
            backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
          }}
        >
          <div className="flex items-center gap-2">
            {data.instituteLogoUrl ? (
              <img src={data.instituteLogoUrl} alt="Logo" className="w-7 h-7 object-contain bg-white rounded-full p-0.5" />
            ) : (
              <Building className="w-6 h-6 text-white" />
            )}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                {data.instituteName || 'Executive Council Corp'}
              </h3>
              <p className="text-[9px] text-white/80 font-medium">{data.instituteSub || 'Global Headquarters'}</p>
            </div>
          </div>
          <HologramBadge size={26} />
        </div>

        {/* Smart Chip & Photo Row */}
        <div className="px-5 pt-3 flex items-center justify-between z-10">
          <div className="flex flex-col items-start gap-1">
            <EMVChipGraphic />
            <div className="flex items-center gap-1 text-[9px] text-slate-400 font-mono mt-0.5">
              <Radio className="w-3 h-3 text-amber-600" />
              <span>NFC SMART</span>
            </div>
          </div>

          <div
            className="w-24 h-28 rounded-xl border-2 bg-white shadow-md overflow-hidden p-0.5"
            style={{ borderColor: primaryColor }}
          >
            {renderPhoto('w-full h-full', 'rounded-lg')}
          </div>
        </div>

        {/* Executive Name & Title */}
        <div className="px-5 pt-1 text-center z-10">
          <h2 className="font-bold text-base text-slate-900 tracking-tight font-serif line-clamp-1">
            {data.studentName || 'Eleanor Vance'}
          </h2>
          <div
            className="inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-white shadow-xs uppercase"
            style={{ backgroundColor: secondaryColor }}
          >
            {badgeText || 'EXECUTIVE DIRECTOR'}
          </div>
        </div>

        {/* Details Table */}
        <div className="px-5 space-y-1 text-xs text-slate-700 z-10">
          <div className="flex justify-between border-b border-slate-200 pb-1">
            <span className="text-slate-400 font-medium">Cardholder ID:</span>
            <span className="font-mono font-bold text-slate-900">{data.idNumber || 'EXEC-8890'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1">
            <span className="text-slate-400 font-medium">Department:</span>
            <span className="font-semibold text-slate-800 truncate max-w-[170px]">{data.department || 'Strategic Planning'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1">
            <span className="text-slate-400 font-medium">Clearance:</span>
            <span className="font-bold text-indigo-700">{data.program || 'Tier 1 Access'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-medium">Valid Through:</span>
            <span className="font-bold text-emerald-700 font-mono">{data.validity || 'Dec 2026'}</span>
          </div>
        </div>

        {/* Bottom Embossed Card Serial & Barcode */}
        <div className="px-5 pb-3 pt-1 z-10 border-t border-slate-200 flex flex-col items-center">
          <span className="font-mono text-[10px] tracking-[0.25em] text-slate-500 font-semibold mb-1">
            4190 • 2026 • {data.idNumber ? data.idNumber.slice(-4) : '8831'}
          </span>
          <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={220} height={20} />
        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE 3: MEDICAL EMERGENCY (Hospital Doctor / Staff Identification)
  // =========================================================================
  if (effectiveDesignType === 'medical-emergency') {
    if (isBackSide) {
      return (
        <div
          className={`id-card-print-vertical relative w-[320px] h-[500px] bg-white ${cardCornerClass} shadow-xl border-2 border-rose-600 overflow-hidden flex flex-col justify-between select-none text-slate-900`}
          style={{ boxSizing: 'border-box' }}
        >
          {/* Top Medical Band */}
          <div className="bg-rose-600 text-white text-center py-2 px-3 shadow-sm z-10 flex items-center justify-between">
            <span className="font-bold text-[10px] tracking-widest uppercase">
              EMERGENCY PROTOCOL & CREDENTIALS
            </span>
            <Activity className="w-4 h-4 text-rose-200" />
          </div>

          <div className="px-5 pt-3 text-center z-10 space-y-1">
            <h4 className="font-bold text-xs uppercase tracking-wider text-rose-700">
              {data.instituteName || 'Memorial General Hospital'}
            </h4>
            <p className="text-[10px] text-slate-500 leading-relaxed px-1">
              Property of Hospital Authority. In case of emergency or card loss, immediately return to Security Desk or call Trauma Dispatch.
            </p>
          </div>

          {/* High Priority Medical Info Box */}
          <div className="px-5 z-10">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between items-center border-b border-rose-200/60 pb-1">
                <span className="text-slate-500 text-[10px]">Emergency Hotline:</span>
                <span className="font-black text-rose-700 font-mono text-[11px]">{data.emergencyContact || '911 / Trauma Desk'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-rose-200/60 pb-1">
                <span className="text-slate-500 text-[10px]">Blood Type:</span>
                <span className="font-bold text-rose-600 flex items-center gap-1 font-mono">
                  <Droplet className="w-3 h-3 fill-rose-600" />
                  {data.bloodGroup || 'O+'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-[10px]">Duty Pager / Tel:</span>
                <span className="font-semibold text-slate-800 font-mono text-[11px]">{data.studentPhone || '+1 (555) 019-4822'}</span>
              </div>
            </div>
          </div>

          {/* QR & Barcode */}
          <div className="px-5 flex items-center justify-between gap-3 z-10">
            <div className="flex flex-col items-center">
              {qrDataUrl && (
                <div className="p-1 bg-white border border-rose-200 rounded-lg shadow-2xs">
                  <img src={qrDataUrl} alt="QR" className="w-16 h-16" />
                </div>
              )}
              <span className="text-[8px] font-bold text-slate-400 mt-0.5">REGISTRY CHECK</span>
            </div>
            <div className="flex-1 flex flex-col items-end space-y-2">
              <div className="text-center w-full max-w-[120px] border-b border-slate-300 pb-0.5">
                <span className="text-[9px] font-serif italic text-slate-500 block">Dr. R. Vance, MD</span>
                <span className="text-[7px] text-slate-400 block uppercase">Chief Medical Officer</span>
              </div>
              <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={130} height={18} />
            </div>
          </div>

          <div className="px-5 py-2 bg-rose-600 text-white text-[8px] font-mono flex items-center justify-between z-10">
            <span>ER TRAUMA DISPATCH // CR80</span>
            <span>VERIFIED LEVEL-4</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`id-card-print-vertical relative w-[320px] h-[500px] bg-white ${cardCornerClass} shadow-xl border-2 border-rose-600 overflow-hidden flex flex-col justify-between select-none text-slate-900`}
        style={{ boxSizing: 'border-box' }}
      >
        {/* Top High-Contrast Role Banner */}
        <div className="bg-rose-600 text-white text-center py-2 px-3 shadow-sm z-10">
          <span className="font-black text-sm tracking-widest uppercase block">
            {badgeText || 'PHYSICIAN // SURGERY'}
          </span>
        </div>

        {/* Hospital Branding */}
        <div className="px-5 pt-2 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-rose-600" />
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                {data.instituteName || 'Memorial General Hospital'}
              </h3>
              <p className="text-[9px] text-slate-500">{data.instituteSub || 'Emergency Trauma Center'}</p>
            </div>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-300">
            ER ACCREDITED
          </span>
        </div>

        {/* Photo + Blood Group Callout */}
        <div className="px-5 pt-2 flex items-center justify-center gap-4 z-10">
          <div className="w-28 h-28 rounded-2xl border-3 border-rose-600 shadow-md overflow-hidden bg-white p-0.5">
            {renderPhoto('w-full h-full', 'rounded-xl')}
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex flex-col items-center justify-center shadow-md">
              <Droplet className="w-4 h-4 fill-white text-white mb-0.5" />
              <span className="text-base font-black leading-none font-mono">
                {data.bloodGroup || 'O+'}
              </span>
            </div>
            <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase">BLOOD TYPE</span>
          </div>
        </div>

        {/* Doctor Name & Credentials */}
        <div className="text-center px-5 z-10">
          <h2 className="font-bold text-base text-slate-900 tracking-tight">
            {data.studentName || 'Dr. Sarah Jenkins, MD'}
          </h2>
          <span className="text-[11px] font-semibold text-rose-700 block">
            {data.department || 'Trauma & Critical Care'}
          </span>
          <span className="text-[10px] font-mono text-slate-500">
            STAFF ID: {data.idNumber || 'MED-2026-44'}
          </span>
        </div>

        {/* Access Clearance Badges */}
        <div className="px-5 flex items-center justify-center gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-bold border border-slate-300">
            ICU ACCESS
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-bold border border-slate-300">
            OR LEVEL 4
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold border border-emerald-300">
            ON CALL
          </span>
        </div>

        {/* Footer Barcode */}
        <div className="px-5 pb-3 pt-1 border-t border-slate-200 flex items-center justify-between z-10">
          <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={180} height={20} />
          {qrDataUrl && (
            <img src={qrDataUrl} alt="QR" className="w-10 h-10 border border-slate-200 rounded" />
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE 4: CYBER SCI-FI KEYCARD (Chamfered Corners & Neon HUD Styling)
  // =========================================================================
  if (effectiveDesignType === 'cyber-keycard') {
    if (isBackSide) {
      return (
        <div
          className="id-card-print-vertical relative w-[320px] h-[500px] bg-slate-950 shadow-2xl border border-cyan-500/60 overflow-hidden flex flex-col justify-between select-none text-cyan-300 p-4"
          style={{
            boxSizing: 'border-box',
            clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)'
          }}
        >
          {/* HUD Grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          <div className="flex items-center justify-between border-b border-cyan-500/40 pb-2 z-10">
            <span className="font-mono font-bold text-[10px] tracking-widest text-cyan-200">
              SYS PROTOCOL // BIOMETRIC BACK
            </span>
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          <div className="p-3 bg-slate-900/90 border border-cyan-900 rounded-lg space-y-1.5 text-[10px] font-mono z-10">
            <div className="flex justify-between">
              <span className="text-slate-500">AUTH DIRECTIVE:</span>
              <span className="text-cyan-300 font-bold">LEVEL-5 RESTRICTED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">CIPHER HASH:</span>
              <span className="text-emerald-400">SHA256::0x88F9..C1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">SOS OVERRIDE:</span>
              <span className="text-rose-400 font-bold">{data.emergencyContact || 'SEC-NET 99'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">REVOCATION:</span>
              <span className="text-slate-300">{data.validity || 'AUTOMATIC 2026'}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 z-10 my-auto">
            {qrDataUrl && (
              <div className="p-1 bg-white rounded-lg shadow-sm">
                <img src={qrDataUrl} alt="QR" className="w-20 h-20" />
              </div>
            )}
            <span className="text-[8px] font-mono text-cyan-400 tracking-wider">
              NFC // SECURE CRYPTO ENCLAVE
            </span>
          </div>

          <div className="pt-2 border-t border-cyan-900/60 flex items-center justify-between z-10">
            <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={180} height={20} dark />
            <span className="text-[8px] font-mono text-cyan-500">TOKEN OK</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className="id-card-print-vertical relative w-[320px] h-[500px] bg-slate-950 shadow-2xl border border-cyan-500/60 overflow-hidden flex flex-col justify-between select-none text-cyan-300 p-4"
        style={{
          boxSizing: 'border-box',
          clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)'
        }}
      >
        {/* HUD Grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Top Cyber Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/40 pb-2 z-10">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-[11px] uppercase tracking-widest text-cyan-200 font-mono">
                {data.instituteName || 'NEURAL CYBERNETICS'}
              </h3>
              <p className="text-[8px] text-cyan-400 font-mono tracking-wider">CLEARANCE // LEVEL 05</p>
            </div>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500">
            SEC-PASS
          </span>
        </div>

        {/* Center HUD Photo Box */}
        <div className="flex flex-col items-center my-auto z-10">
          <div className="relative p-1 border-2 border-cyan-400 bg-slate-900 shadow-lg">
            {/* HUD Reticles */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-300" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-300" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-300" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-300" />

            <div className="w-24 h-28 overflow-hidden bg-slate-950">
              {renderPhoto('w-full h-full', 'rounded-none')}
            </div>
          </div>

          <h2 className="mt-2 font-bold text-base text-white tracking-widest uppercase font-mono">
            {data.studentName || 'OPERATOR K-9'}
          </h2>
          <span className="text-[10px] font-mono text-cyan-400 tracking-wider">
            UID: {data.idNumber || 'CYB-004-AX'}
          </span>
        </div>

        {/* Monospace Metadata */}
        <div className="space-y-1 text-[10px] font-mono border-t border-b border-cyan-900/60 py-2 z-10">
          <div className="flex justify-between">
            <span className="text-slate-400">SECTOR:</span>
            <span className="text-cyan-200">{data.department || 'QUANTUM CORE'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">HASH:</span>
            <span className="text-cyan-400">0x7F2A..9B</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">ACCESS:</span>
            <span className="text-emerald-400">BIOMETRIC UNLOCKED</span>
          </div>
        </div>

        {/* Bottom Barcode */}
        <div className="pt-2 flex items-center justify-between z-10">
          <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={180} height={20} dark />
          {qrDataUrl && (
            <div className="p-0.5 bg-white rounded">
              <img src={qrDataUrl} alt="QR" className="w-9 h-9" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE 5: CONFERENCE VIP PASS (Large Display Name & Front QR)
  // =========================================================================
  if (effectiveDesignType === 'conference-vip') {
    if (isBackSide) {
      return (
        <div
          className={`id-card-print-vertical relative w-[320px] h-[500px] bg-white ${cardCornerClass} shadow-xl border border-slate-300 overflow-hidden flex flex-col justify-between select-none text-slate-900`}
          style={{ boxSizing: 'border-box' }}
        >
          {/* Lanyard punch hole cutout */}
          <div className="w-14 h-3 bg-slate-900 rounded-full mx-auto mt-2 border border-slate-400 shadow-inner z-20" />

          <div className="text-center pt-2 px-4 z-10">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">
              EVENT RULES & VENUE ACCESS
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">All-Access Pass Holder Privileges</p>
          </div>

          <div className="px-5 space-y-2 text-xs z-10">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-[10px] uppercase text-indigo-700 block">Wi-Fi & Digital Lounge</span>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500">Network SSID:</span>
                <span className="font-mono font-bold text-slate-800">SummitVIP-5G</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500">Passcode:</span>
                <span className="font-mono font-bold text-indigo-600">INNOVATE2026</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-600 space-y-1">
              <p>• Badges must be visibly worn at all keynote sessions & workshops.</p>
              <p>• Valid for speaker green room, VIP networking lounge, and catered lunch.</p>
              <p className="font-bold text-rose-600">• Event Helpline: {data.emergencyContact || '+1 (800) 555-SUMMIT'}</p>
            </div>
          </div>

          <div className="px-5 flex flex-col items-center justify-center space-y-2 z-10">
            {qrDataUrl && (
              <div className="p-1.5 bg-white border-2 border-slate-900 rounded-xl shadow-xs">
                <img src={qrDataUrl} alt="QR" className="w-18 h-18" />
              </div>
            )}
            <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={180} height={20} />
          </div>

          <div
            className="py-2 text-center text-white font-bold text-[9px] uppercase tracking-wider z-10"
            style={{ backgroundColor: primaryColor }}
          >
            CREDENTIAL NON-TRANSFERABLE
          </div>
        </div>
      );
    }

    return (
      <div
        className={`id-card-print-vertical relative w-[320px] h-[500px] bg-white ${cardCornerClass} shadow-xl border border-slate-300 overflow-hidden flex flex-col justify-between select-none text-slate-900`}
        style={{ boxSizing: 'border-box' }}
      >
        {/* Lanyard punch hole cutout */}
        <div className="w-14 h-3 bg-slate-900 rounded-full mx-auto mt-2 border border-slate-400 shadow-inner z-20" />

        {/* Event Header */}
        <div className="text-center pt-2 px-4 z-10">
          <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: primaryColor }}>
            {data.instituteName || 'GLOBAL TECH SUMMIT 2026'}
          </h3>
          <p className="text-[10px] text-slate-500 font-medium">{data.instituteSub || 'Convention Center • San Francisco'}</p>
        </div>

        {/* Huge First Name */}
        <div className="text-center my-auto px-4 z-10">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
            {data.studentName ? data.studentName.split(' ')[0] : 'ALEXANDER'}
          </h1>
          <p className="text-sm font-semibold text-slate-600">
            {data.studentName ? data.studentName.split(' ').slice(1).join(' ') : 'WANG'}
          </p>
          <p className="text-xs text-indigo-600 font-bold mt-1">
            {data.department || 'Lead Speaker // Keynote'}
          </p>
        </div>

        {/* Front Scannable QR Code */}
        <div className="flex flex-col items-center justify-center my-auto z-10">
          {qrDataUrl && (
            <div className="p-2 bg-white border-2 border-slate-900 rounded-xl shadow-md">
              <img src={qrDataUrl} alt="QR Code" className="w-24 h-24" />
            </div>
          )}
          <span className="text-[9px] font-mono font-bold text-slate-400 mt-1">
            GATE TICKET: {data.idNumber || 'VIP-2026-01'}
          </span>
        </div>

        {/* Bottom VIP Ribbon */}
        <div
          className="py-2.5 text-center text-white font-black tracking-widest text-xs uppercase shadow-md z-10"
          style={{ backgroundColor: primaryColor }}
        >
          ★ {badgeText || 'VIP ALL-ACCESS PASS'} ★
        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE 6: SWISS MINIMALIST (Asymmetric Grid & Grotesque Typography)
  // =========================================================================
  if (effectiveDesignType === 'swiss-minimalist') {
    if (isBackSide) {
      return (
        <div
          className={`id-card-print-vertical relative w-[320px] h-[500px] bg-white ${cardCornerClass} shadow-xl border border-slate-300 overflow-hidden flex flex-col justify-between p-6 select-none text-slate-900 font-sans`}
          style={{ boxSizing: 'border-box' }}
        >
          <div className="flex items-center justify-between border-b-2 border-slate-950 pb-2">
            <span className="font-bold text-xs uppercase tracking-tight text-slate-950">
              REGULATIONS & NOTICE
            </span>
            <span className="font-mono text-xs font-bold text-slate-400">CR80-B</span>
          </div>

          <div className="space-y-2 text-xs">
            <p className="text-[10px] leading-relaxed text-slate-600">
              This card is the property of <strong className="text-slate-950">{data.instituteName || 'Design Studio Zurich'}</strong>. Cardholder accepts all institutional guidelines upon reception.
            </p>
            <div className="border-t border-b border-slate-200 py-2 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">EMERGENCY:</span>
                <span className="font-mono font-bold text-rose-600">{data.emergencyContact || '+41 44 632 1111'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">BLOOD TYPE:</span>
                <span className="font-mono font-bold text-slate-900">{data.bloodGroup || 'A+'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ISSUED:</span>
                <span className="font-mono text-slate-700">{data.dob || '2023'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {qrDataUrl && <img src={qrDataUrl} alt="QR" className="w-16 h-16 border border-slate-900 p-0.5" />}
            <div className="text-right">
              <span className="text-[8px] font-mono text-slate-400 block">CARDHOLDER SIGN</span>
              <div className="w-24 h-6 border-b border-slate-950 flex items-end justify-end italic text-[10px] font-serif text-slate-600">
                {data.studentName ? data.studentName.split(' ')[0] : 'Sign'}
              </div>
            </div>
          </div>

          <div className="border-t-2 border-slate-950 pt-2 flex items-center justify-between">
            <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={180} height={22} />
            <span className="text-[8px] font-mono font-bold">VERIFIED</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`id-card-print-vertical relative w-[320px] h-[500px] bg-white ${cardCornerClass} shadow-xl border border-slate-300 overflow-hidden flex flex-col justify-between p-6 select-none text-slate-900 font-sans`}
        style={{ boxSizing: 'border-box' }}
      >
        {/* Top Clean Rule & Electric Dot */}
        <div className="flex items-center justify-between border-b-2 border-slate-950 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-600" />
            <h3 className="font-bold text-xs uppercase tracking-tight text-slate-950">
              {data.instituteName || 'Design Studio Zurich'}
            </h3>
          </div>
          <span className="font-mono text-xs font-bold text-slate-400">CR80</span>
        </div>

        {/* Asymmetric layout with photo on left, title on right */}
        <div className="flex items-start gap-4 my-auto">
          <div className="w-24 h-28 bg-slate-100 border border-slate-900 overflow-hidden shrink-0">
            {renderPhoto('w-full h-full', 'rounded-none')}
          </div>

          <div className="flex-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block">
              IDENTIFIER
            </span>
            <h2 className="font-bold text-lg text-slate-950 tracking-tight leading-tight mt-1">
              {data.studentName || 'Helena Keller'}
            </h2>
            <p className="text-xs text-slate-600 mt-1">{data.department || 'Art Direction'}</p>
            <p className="font-mono text-xs font-bold text-slate-950 mt-2">{data.idNumber || 'ID-0091'}</p>
          </div>
        </div>

        {/* Minimalist Data Table */}
        <div className="border-t border-slate-200 pt-3 space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">ROLE:</span>
            <span className="font-bold text-slate-900">{badgeText || 'STAFF'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">VALID:</span>
            <span className="font-bold text-slate-900">{data.validity || '2026'}</span>
          </div>
        </div>

        {/* Bottom Barcode */}
        <div className="border-t-2 border-slate-950 pt-2 flex items-center justify-between">
          <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={180} height={22} />
          {qrDataUrl && <img src={qrDataUrl} alt="QR" className="w-8 h-8" />}
        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE 7: SPORTS ATHLETIC (Dynamic Diagonal Slashes & Active Club Pass)
  // =========================================================================
  if (effectiveDesignType === 'sports-athletic') {
    if (isBackSide) {
      return (
        <div
          className={`id-card-print-vertical relative w-[320px] h-[500px] bg-slate-950 ${cardCornerClass} shadow-xl border-2 border-amber-500 overflow-hidden flex flex-col justify-between select-none text-white p-5`}
          style={{ boxSizing: 'border-box' }}
        >
          <div className="flex items-center justify-between border-b border-amber-500/40 pb-2">
            <span className="font-black text-xs uppercase tracking-wider text-amber-400">
              CLUB ACCESS & SAFETY
            </span>
            <Dumbbell className="w-4 h-4 text-amber-500" />
          </div>

          <div className="space-y-2 text-xs">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Valid for training facilities, track & recovery suites at {data.instituteName || 'Athletic Club'}.
            </p>
            <div className="p-2.5 bg-slate-900 rounded-xl border border-amber-500/30 space-y-1 text-[11px] font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">TRAINER SOS:</span>
                <span className="font-bold text-amber-400">{data.emergencyContact || 'TRAINER-HOTLINE'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">BLOOD TYPE:</span>
                <span className="font-bold text-rose-400">{data.bloodGroup || 'O+'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">LOCKER CODE:</span>
                <span className="text-white font-bold">SEC-{data.idNumber ? data.idNumber.slice(-4) : '2026'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2">
            {qrDataUrl && (
              <div className="p-1 bg-white rounded-lg">
                <img src={qrDataUrl} alt="QR" className="w-18 h-18" />
              </div>
            )}
            <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={180} height={20} dark />
          </div>

          <div className="text-center text-[8px] font-mono text-slate-500 pt-1 border-t border-slate-800">
            OFFICIAL ATHLETE PASS • ALL-FACILITY ACCESS
          </div>
        </div>
      );
    }

    return (
      <div
        className={`id-card-print-vertical relative w-[320px] h-[500px] bg-slate-950 ${cardCornerClass} shadow-xl border-2 border-amber-500 overflow-hidden flex flex-col justify-between select-none text-white`}
        style={{ boxSizing: 'border-box' }}
      >
        {/* Dynamic diagonal speed stripes */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, #f59e0b, #f59e0b 8px, transparent 8px, transparent 24px)`
          }}
        />

        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-3 text-center z-10">
          <div className="flex items-center justify-center gap-1.5">
            <Dumbbell className="w-5 h-5 text-slate-950" />
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-950">
              {data.instituteName || 'OLYMPUS ATHLETIC CLUB'}
            </h3>
          </div>
        </div>

        {/* Member Photo & Jersey watermark */}
        <div className="flex flex-col items-center my-auto z-10 relative">
          <div className="absolute -top-6 text-7xl font-black text-amber-500/15 pointer-events-none">
            #26
          </div>
          <div className="w-28 h-28 rounded-full border-4 border-amber-500 overflow-hidden bg-slate-900 shadow-xl">
            {renderPhoto('w-full h-full', 'rounded-full')}
          </div>

          <h2 className="mt-3 font-black text-lg text-white uppercase tracking-wider">
            {data.studentName || 'MARCUS VANCE'}
          </h2>
          <span className="px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] tracking-widest uppercase mt-1">
            {badgeText || 'ELITE ATHLETE PASS'}
          </span>
        </div>

        {/* Membership Details */}
        <div className="px-6 py-2 bg-slate-900/80 border-t border-b border-amber-500/30 text-xs space-y-1 font-mono z-10">
          <div className="flex justify-between">
            <span className="text-slate-400">DISCIPLINE:</span>
            <span className="text-amber-300 font-bold">{data.department || 'CrossFit & Track'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">MEMBER ID:</span>
            <span className="text-white font-bold">{data.idNumber || 'ATH-8801'}</span>
          </div>
        </div>

        {/* Footer Barcode */}
        <div className="p-3 bg-slate-950 flex items-center justify-between z-10">
          <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={180} height={20} dark />
          {qrDataUrl && <img src={qrDataUrl} alt="QR" className="w-10 h-10 p-0.5 bg-white rounded" />}
        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE 8: POLICE / SECURITY OFFICER BADGE
  // =========================================================================
  if (effectiveDesignType === 'police-security') {
    if (isBackSide) {
      return (
        <div
          className={`id-card-print-vertical relative w-[320px] h-[500px] bg-slate-900 ${cardCornerClass} shadow-xl border-2 border-amber-600 overflow-hidden flex flex-col justify-between select-none text-white p-5`}
          style={{ boxSizing: 'border-box' }}
        >
          <div className="bg-amber-600 -mx-5 -mt-5 py-2 px-4 text-center">
            <span className="font-black text-[10px] uppercase tracking-widest text-slate-950">
              OFFICIAL ENFORCEMENT PROTOCOLS
            </span>
          </div>

          <div className="space-y-1.5 text-center pt-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400">
              {data.instituteName || 'SECURITY ENFORCEMENT BUREAU'}
            </h4>
            <p className="text-[9.5px] text-slate-400 leading-relaxed font-mono px-1">
              Bearer is authorized by law to carry designated service credentials. Unauthorized possession is a federal crime.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/40 text-xs font-mono space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">RADIO FREQ:</span>
              <span className="text-amber-400 font-bold">TAC-CH-04</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">DISPATCH SOS:</span>
              <span className="text-rose-400 font-bold">{data.emergencyContact || '911 / SEC-DISPATCH'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">BLOOD GROUP:</span>
              <span className="text-white font-bold">{data.bloodGroup || 'B+'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {qrDataUrl && (
              <div className="p-1 bg-white rounded-lg">
                <img src={qrDataUrl} alt="QR" className="w-16 h-16" />
              </div>
            )}
            <div className="flex flex-col items-center">
              <Fingerprint className="w-12 h-12 text-amber-400/80" />
              <span className="text-[7.5px] font-mono text-slate-400 mt-1">BIOMETRIC AUTH</span>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-2 flex items-center justify-between">
            <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={160} height={18} dark />
            <span className="text-[8px] font-mono text-amber-500 font-bold">ACTIVE</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`id-card-print-vertical relative w-[320px] h-[500px] bg-slate-900 ${cardCornerClass} shadow-xl border-2 border-amber-600 overflow-hidden flex flex-col justify-between select-none text-white`}
        style={{ boxSizing: 'border-box' }}
      >
        {/* Top Gold Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 py-2.5 px-4 text-center z-10 shadow-md">
          <h3 className="font-black text-xs uppercase tracking-widest text-slate-950">
            {data.instituteName || 'SECURITY ENFORCEMENT BUREAU'}
          </h3>
          <p className="text-[9px] text-slate-900 font-bold uppercase tracking-wider">OFFICIAL LAW CREDENTIAL</p>
        </div>

        {/* Metallic Shield Graphic & Photo */}
        <div className="flex flex-col items-center my-auto z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-14 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 rounded-b-3xl border-2 border-amber-300 flex flex-col items-center justify-center shadow-lg text-slate-950">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-[7px] font-black">OFFICER</span>
            </div>
            <div className="w-24 h-28 rounded-lg border-2 border-amber-400 bg-slate-950 shadow-md overflow-hidden">
              {renderPhoto('w-full h-full', 'rounded-md')}
            </div>
          </div>

          <h2 className="mt-3 font-bold text-base text-white tracking-wide">
            {data.studentName || 'Officer J. Callahan'}
          </h2>
          <span className="text-xs font-mono font-bold text-amber-400">
            BADGE #{data.idNumber || '7729-SEC'}
          </span>
        </div>

        {/* Bureau details */}
        <div className="px-6 py-2 bg-slate-950 border-t border-b border-slate-800 text-xs space-y-1 font-mono z-10">
          <div className="flex justify-between">
            <span className="text-slate-400">DIVISION:</span>
            <span className="text-slate-200">{data.department || 'Tactical Response Unit'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">CLEARANCE:</span>
            <span className="text-amber-400 font-bold">ARMED • LEVEL 4</span>
          </div>
        </div>

        {/* Footer Barcode */}
        <div className="p-4 flex items-center justify-between z-10">
          <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={170} height={20} dark />
          <Fingerprint className="w-8 h-8 text-amber-500/60" />
        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE 9: HORIZONTAL DUAL-COLUMN (Landscape Corporate / University)
  // =========================================================================
  if (!isVertical || effectiveDesignType === 'horizontal-dualcol' || effectiveDesignType === 'horizontal-campus' || effectiveDesignType === 'horizontal-transit') {
    if (isBackSide) {
      return (
        <div
          className={`id-card-print-horizontal relative w-[500px] h-[320px] bg-white ${cardCornerClass} shadow-xl border border-slate-200 overflow-hidden flex flex-col justify-between p-5 text-slate-800 select-none`}
          style={{ boxSizing: 'border-box' }}
        >
          {renderBackgroundPattern()}
          <div className="h-2.5 -mx-5 -mt-5" style={{ backgroundColor: primaryColor }} />

          <div className="grid grid-cols-2 gap-5 flex-1 items-center relative z-10">
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Institutional Regulations
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                This card is the property of {data.instituteName || 'the Institution'}. It must be produced on demand by authorized officers and surrendered upon request.
              </p>
              <div className="text-xs space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Emergency:</span>
                  <span className="font-bold text-rose-600 font-mono">{data.emergencyContact || '+1 800 555 0199'}</span>
                </div>
                {data.studentPhone && (
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Phone:</span>
                    <span className="font-semibold text-slate-700 font-mono">{data.studentPhone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2.5 pl-4 border-l border-slate-200">
              {qrDataUrl && (
                <div className="p-1 bg-white border border-slate-200 rounded-lg shadow-2xs">
                  <img src={qrDataUrl} alt="QR Code" className="w-22 h-22" />
                </div>
              )}
              <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={180} height={24} />
            </div>
          </div>

          <div className="text-center pt-2 border-t border-slate-100 text-[9px] text-slate-400 font-medium flex items-center justify-center gap-1 relative z-10">
            <Shield className="w-3 h-3 text-indigo-500" />
            <span>Standard CR80 Horizontal Card • Validated by Institute Authority</span>
          </div>
        </div>
      );
    }

    // HORIZONTAL FRONT
    return (
      <div
        className={`id-card-print-horizontal relative w-[500px] h-[320px] bg-white ${cardCornerClass} shadow-xl border border-slate-200 overflow-hidden flex flex-col justify-between select-none`}
        style={{ boxSizing: 'border-box' }}
      >
        {renderBackgroundPattern()}

        {/* Top Banner */}
        <div
          className="px-5 py-2.5 text-white flex items-center justify-between relative z-10"
          style={{
            backgroundColor: primaryColor,
            backgroundImage: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
          }}
        >
          <div className="flex items-center gap-2.5">
            {data.instituteLogoUrl ? (
              <img src={data.instituteLogoUrl} alt="Logo" className="w-7 h-7 object-contain bg-white rounded-full p-0.5" />
            ) : (
              <Building className="w-5 h-5 text-white" />
            )}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider">
                {data.instituteName || 'Institution Name'}
              </h3>
              <p className="text-[9px] text-white/80">{data.instituteSub || 'Student Identity Card'}</p>
            </div>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider">
            {badgeText}
          </span>
        </div>

        {/* Main 3-Column Content: Photo (Left) | Info (Center) | QR / Barcode (Right) */}
        <div className="px-5 py-3 flex items-center gap-5 flex-1 z-10">

          {/* Column 1: Photo & Chip */}
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div
              className="w-24 h-28 rounded-xl border-2 bg-slate-50 shadow-md overflow-hidden p-0.5"
              style={{ borderColor: primaryColor }}
            >
              {renderPhoto('w-full h-full', 'rounded-lg')}
            </div>
            <div className="flex items-center gap-1 text-[9px] font-mono text-slate-500">
              <EMVChipGraphic size="sm" />
              <span>SMART PASS</span>
            </div>
          </div>

          {/* Column 2: Details */}
          <div className="flex-1 space-y-1 text-xs">
            <div>
              <h2 className="font-bold text-base text-slate-900 tracking-tight leading-tight">
                {data.studentName || 'Student Full Name'}
              </h2>
              <span className="font-mono text-[11px] font-bold text-indigo-700">
                ID: {data.idNumber || 'STU-2026-001'}
              </span>
            </div>

            <div className="space-y-0.5 text-[11px] text-slate-600 pt-1">
              <div><span className="font-medium text-slate-400">Dept:</span> <span className="font-semibold text-slate-800">{data.department || 'Computer Science'}</span></div>
              <div><span className="font-medium text-slate-400">Batch:</span> <span className="font-semibold text-slate-800">{data.batch || '2023-2027'}</span></div>
              <div><span className="font-medium text-slate-400">Blood Group:</span> <span className="font-bold text-rose-600">{data.bloodGroup || 'B+'}</span></div>
              <div><span className="font-medium text-slate-400">Valid Till:</span> <span className="font-semibold text-emerald-700">{data.validity || 'Dec 2026'}</span></div>
            </div>
          </div>

          {/* Column 3: QR Code & Verification */}
          <div className="flex flex-col items-center justify-center shrink-0 pl-3 border-l border-slate-200">
            {qrDataUrl && (
              <div className="p-1 bg-white border border-slate-200 rounded-lg shadow-2xs mb-1">
                <img src={qrDataUrl} alt="QR Code" className="w-18 h-18" />
              </div>
            )}
            <span className="text-[8px] font-bold text-slate-400 uppercase">SCAN TO VERIFY</span>
          </div>
        </div>

        {/* Bottom Strip with Barcode */}
        <div className="px-5 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between z-10">
          <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={200} height={18} />
          {data.signatureUrl ? (
            <img src={data.signatureUrl} alt="Sign" className="h-5 max-w-[80px] object-contain" />
          ) : (
            <span className="text-[9px] font-serif italic text-slate-400">Authorized Officer</span>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // DEFAULT / STANDARD CORPORATE (Vertical Card)
  // =========================================================================
  if (isBackSide) {
    return (
      <div
        className={`id-card-print-vertical relative w-[320px] h-[500px] bg-white ${cardCornerClass} shadow-xl border border-slate-200 overflow-hidden flex flex-col justify-between select-none text-slate-800`}
        style={{ boxSizing: 'border-box' }}
      >
        {renderBackgroundPattern()}

        {/* Top Header / Magnetic Stripe & Institution Branding */}
        <div>
          {/* Simulated Magnetic Stripe */}
          <div className="h-9 bg-slate-900 w-full flex items-center justify-between px-4">
            <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase">
              CR80 MAGNETIC TRACK • ISO 7810
            </span>
            <span className="text-[8px] font-mono text-slate-500 font-bold">
              {data.idNumber || '2026'}
            </span>
          </div>

          {/* Sub Header Strip */}
          <div
            className="px-4 py-1.5 text-white flex items-center justify-between"
            style={{
              backgroundColor: primaryColor,
              backgroundImage: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            <div className="flex items-center gap-1.5 truncate max-w-[210px]">
              {data.instituteLogoUrl ? (
                <img
                  src={data.instituteLogoUrl}
                  alt="Logo"
                  className="w-4 h-4 rounded-full bg-white p-0.5 object-cover shrink-0"
                />
              ) : (
                <Building className="w-3.5 h-3.5 text-white shrink-0" />
              )}
              <span className="text-[10px] font-bold uppercase tracking-wider truncate">
                {data.instituteName || 'Institution Name'}
              </span>
            </div>
            <span className="text-[8px] font-mono font-bold bg-white/20 px-1.5 py-0.5 rounded text-white uppercase tracking-wider shrink-0">
              OFFICIAL ID
            </span>
          </div>
        </div>

        {/* Terms & Conditions / Regulations Section */}
        <div className="px-4 py-1.5 space-y-1 text-slate-600 relative z-10">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-800 uppercase tracking-wide">
            <AlertCircle className="w-3 h-3 text-indigo-600 shrink-0" />
            <span>Cardholder Instructions & Terms</span>
          </div>
          <div className="text-[9.5px] leading-relaxed space-y-1 text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
            <p className="line-clamp-2">
              • This card remains the property of <strong className="text-slate-800">{data.instituteName || 'the Institution'}</strong> and is strictly non-transferable.
            </p>
            <p className="line-clamp-2">
              • Must be carried at all times and produced on demand by campus authorities or examination halls.
            </p>
            <p className="text-[9px] text-indigo-800 dark:text-indigo-900 font-medium truncate">
              • If found, return to: <span className="underline">{data.address || 'Campus Security & Registrar Office'}</span>
            </p>
          </div>
        </div>

        {/* Essential Card Details: Emergency, Blood Group, Phone */}
        <div className="px-4 py-1 relative z-10">
          <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50/90 p-2 rounded-lg border border-slate-200">
            <div className="space-y-0.5">
              <span className="text-slate-400 block text-[9px] font-medium">Emergency Contact:</span>
              <span className="font-bold text-rose-600 font-mono block truncate">
                {data.emergencyContact || data.studentPhone || '+880 1700-000000'}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 block text-[9px] font-medium">Blood Group:</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 font-mono">
                <Droplet className="w-3 h-3 text-rose-500 fill-rose-500 shrink-0" />
                <span>{data.bloodGroup || 'B+'}</span>
                <span className="text-[8px] font-normal text-slate-400">({data.dob || 'Valid'})</span>
              </span>
            </div>
            {data.studentPhone && (
              <div className="space-y-0.5 col-span-2 pt-0.5 border-t border-slate-200/60 flex justify-between">
                <span className="text-slate-400 text-[9px]">Student Tel:</span>
                <span className="font-semibold text-slate-700 font-mono text-[9.5px]">{data.studentPhone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Verification Section: QR Code & Barcode */}
        <div className="px-4 py-1 flex items-center justify-between gap-3 relative z-10">
          <div className="flex flex-col items-center justify-center shrink-0">
            {qrDataUrl ? (
              <div className="p-1 bg-white border border-slate-300 rounded-lg shadow-2xs">
                <img src={qrDataUrl} alt="QR" className="w-16 h-16" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-[8px] text-slate-400">
                QR Code
              </div>
            )}
            <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">
              SCAN TO VERIFY
            </span>
          </div>

          <div className="flex-1 flex flex-col items-end justify-center space-y-1.5">
            {/* Signature Area */}
            <div className="text-center w-full max-w-[130px] border-b border-slate-300 pb-0.5">
              {data.signatureUrl ? (
                <img
                  src={data.signatureUrl}
                  alt="Signature"
                  className="h-6 object-contain mx-auto"
                />
              ) : (
                <div className="h-6 italic text-[9px] text-slate-400 flex items-end justify-center font-serif">
                  {data.studentName ? data.studentName.split(' ')[0] + "'s Sign" : 'Cardholder Signature'}
                </div>
              )}
              <span className="text-[7.5px] font-medium text-slate-400 block">Cardholder Signature</span>
            </div>

            {/* Barcode */}
            <div className="w-full flex justify-end">
              <BarcodeVisual
                code={data.barcodeNumber || data.idNumber || '890123456789'}
                width={130}
                height={16}
              />
            </div>
          </div>
        </div>

        {/* Bottom Security Footer */}
        <div
          className="px-4 py-1.5 text-white text-[8px] flex items-center justify-between"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-300" />
            <span className="font-semibold tracking-wide">ISO/IEC 7810 ID-1 COMPLIANT</span>
          </div>
          <span className="font-mono text-white/80">AUTHENTICATED</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`id-card-print-vertical relative w-[320px] h-[500px] bg-white ${cardCornerClass} shadow-xl border border-slate-200 overflow-hidden flex flex-col justify-between select-none`}
      style={{ boxSizing: 'border-box' }}
    >
      {renderBackgroundPattern()}

      {/* Header */}
      <div
        className="px-4 pt-4 pb-8 text-white text-center relative overflow-hidden"
        style={{
          backgroundColor: primaryColor,
          backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-1 relative z-10">
          {data.instituteLogoUrl ? (
            <img
              src={data.instituteLogoUrl}
              alt="Logo"
              className="w-8 h-8 rounded-full bg-white p-0.5 object-cover shadow-xs shrink-0"
            />
          ) : (
            <Building className="w-6 h-6 text-white/95 shrink-0" />
          )}
          <h3 className="font-bold text-xs uppercase tracking-wider line-clamp-1">
            {data.instituteName || 'Institution Name'}
          </h3>
        </div>
        <p className="text-[10px] text-white/85 font-medium tracking-wide relative z-10">
          {data.instituteSub || 'Student Identity Card'}
        </p>
      </div>

      {/* Center Portrait & Name */}
      <div className="flex flex-col items-center -mt-9 relative z-10">
        <div
          className="w-28 h-28 rounded-2xl border-4 bg-white shadow-md overflow-hidden p-0.5"
          style={{ borderColor: primaryColor }}
        >
          {renderPhoto('w-full h-full', 'rounded-xl')}
        </div>

        <h2 className="mt-2 font-bold text-base text-slate-900 tracking-tight text-center px-4 line-clamp-1">
          {data.studentName || 'Student Full Name'}
        </h2>

        <div
          className="mt-1 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider text-white shadow-xs font-mono"
          style={{ backgroundColor: secondaryColor }}
        >
          ID: {data.idNumber || 'STU-2026-001'}
        </div>

        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
          {badgeText}
        </span>
      </div>

      {/* Data Fields */}
      <div className="px-5 space-y-1.5 text-xs text-slate-700 relative z-10">
        <div className="flex justify-between border-b border-slate-100 pb-1">
          <span className="text-slate-400 font-medium">Department:</span>
          <span className="font-semibold text-slate-800 text-right truncate max-w-[170px]">
            {data.department || 'Computer Science'}
          </span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-1">
          <span className="text-slate-400 font-medium">Batch / Session:</span>
          <span className="font-semibold text-slate-800">{data.batch || '2023-2027'}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-1">
          <span className="text-slate-400 font-medium">Blood Group:</span>
          <span className="font-bold text-rose-600 flex items-center gap-0.5 font-mono">
            <Droplet className="w-3 h-3 text-rose-500 fill-rose-500" />
            {data.bloodGroup || 'B+'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 font-medium">Validity:</span>
          <span className="font-semibold text-emerald-700 font-mono">{data.validity || 'Dec 2026'}</span>
        </div>
      </div>

      {/* Bottom Signature & Verification Seal */}
      <div className="px-5 pb-3 pt-1 flex items-end justify-between relative z-10">
        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
          <Shield className="w-3.5 h-3.5 text-indigo-600" />
          <span>CR80 Verified</span>
        </div>

        <div className="text-center">
          {data.signatureUrl ? (
            <img
              src={data.signatureUrl}
              alt="Signature"
              className="h-7 max-w-[95px] object-contain mx-auto"
            />
          ) : (
            <div className="h-6 w-24 border-b border-slate-400 italic text-[10px] text-slate-400 flex items-end justify-center font-serif">
              Authorized Sign
            </div>
          )}
          <span className="text-[9px] font-semibold text-slate-500 block mt-0.5">Registrar / Authority</span>
        </div>
      </div>

      <div className="h-2 w-full" style={{ backgroundColor: primaryColor }} />
    </div>
  );
};
