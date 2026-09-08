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
  CheckCircle
} from 'lucide-react';
import { StudentIDData, Language } from '../../types';
import { TRANSLATIONS } from '../../data/i18n';
import { generateQRCodeDataUrl } from '../../utils/helpers';

interface IDCardRendererProps {
  data: StudentIDData;
  isBackSide?: boolean;
  lang: Language;
}

export const IDCardRenderer: React.FC<IDCardRendererProps> = ({
  data,
  isBackSide = false,
  lang,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const t = TRANSLATIONS[lang];

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

  // Realistic Barcode Generator Component
  const BarcodeVisual: React.FC<{ code: string; width?: number; height?: number }> = ({ 
    code, 
    width = 180, 
    height = 36 
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
              className="bg-slate-950 h-full"
              style={{ width: `${bWidth * 1.4}px` }}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] tracking-widest text-slate-700 font-bold mt-0.5">
          {code || '890123456789'}
        </span>
      </div>
    );
  };

  // ================= 1. VERTICAL LAYOUT (PORTRAIT) =================
  if (isVertical) {
    if (isBackSide) {
      // VERTICAL BACK SIDE
      return (
        <div 
          className="id-card-print-vertical relative w-[320px] h-[500px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col justify-between p-5 text-slate-800 select-none"
          style={{ boxSizing: 'border-box' }}
        >
          {/* Top colored accent stripe */}
          <div className="h-2.5 -mx-5 -mt-5" style={{ backgroundColor: primaryColor }} />

          <div className="space-y-2 text-center mt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Institutional Regulations & Security
            </h4>
            <p className="text-[10.5px] text-slate-500 leading-relaxed px-1">
              This card is non-transferable and remains the official property of {data.instituteName || 'the Institution'}. If lost and found, please drop into any post box or notify campus security immediately.
            </p>
          </div>

          {/* Emergency & Address Container */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 text-xs space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Emergency Line:</span>
              <span className="font-bold text-rose-600">{data.emergencyContact || '+880 1XXXXXXXXX'}</span>
            </div>
            {data.studentPhone && (
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Student Phone:</span>
                <span className="font-semibold text-slate-800">{data.studentPhone}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Valid Until:</span>
              <span className="font-bold text-emerald-700">{data.validity || 'Dec 2026'}</span>
            </div>
            {data.address && (
              <div className="pt-1.5 border-t border-slate-200 text-[10px] text-slate-600">
                <span className="font-semibold text-slate-700 block mb-0.5">Permanent Address:</span>
                <p className="line-clamp-2 leading-tight">{data.address}</p>
              </div>
            )}
          </div>

          {/* QR Code & Barcode Section */}
          <div className="flex flex-col items-center justify-center space-y-2 pt-1">
            {qrDataUrl && (
              <div className="p-1 bg-white border border-slate-200 rounded-lg shadow-2xs">
                <img src={qrDataUrl} alt="QR Code" className="w-20 h-20" />
              </div>
            )}
            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
              Scan to Verify Institutional Credential
            </span>

            <BarcodeVisual code={data.barcodeNumber || data.idNumber || '890123456789'} width={200} height={28} />
          </div>

          {/* Bottom Accreditation */}
          <div className="text-center pt-2 border-t border-slate-100 text-[9px] text-slate-400 font-medium flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-indigo-500" />
            <span>CR80 Compliant • Official Academic Identification</span>
          </div>
        </div>
      );
    }

    // VERTICAL FRONT SIDE
    return (
      <div 
        className="id-card-print-vertical relative w-[320px] h-[500px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col justify-between select-none"
        style={{ boxSizing: 'border-box' }}
      >
        {/* Top Header Banner */}
        <div 
          className="px-4 pt-4 pb-8 text-white text-center relative overflow-hidden"
          style={{ backgroundColor: primaryColor }}
        >
          {/* Subtle background decorative shapes */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
          
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
            {data.studentPhotoUrl ? (
              <img 
                src={data.studentPhotoUrl} 
                alt={data.studentName} 
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div 
                className="w-full h-full rounded-xl flex flex-col items-center justify-center text-slate-400"
                style={{ backgroundColor: `${primaryColor}10` }}
              >
                <User className="w-12 h-12" style={{ color: `${primaryColor}60` }} />
              </div>
            )}
          </div>

          <h2 className="mt-2.5 font-bold text-base text-slate-900 tracking-tight text-center px-4 line-clamp-1">
            {data.studentName || 'Student Full Name'}
          </h2>

          <div 
            className="mt-1 px-3 py-0.5 rounded-full text-xs font-bold tracking-wider text-white shadow-xs"
            style={{ backgroundColor: secondaryColor }}
          >
            ID: {data.idNumber || 'STU-2026-001'}
          </div>
        </div>

        {/* Data Fields */}
        <div className="px-5 space-y-1.5 text-xs text-slate-700">
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-400 font-medium">Department:</span>
            <span className="font-semibold text-slate-800 text-right truncate max-w-[170px]">
              {data.department || 'Computer Science & Eng.'}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-400 font-medium">Batch / Session:</span>
            <span className="font-semibold text-slate-800">{data.batch || '2023-2027'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-400 font-medium">Blood Group:</span>
            <span className="font-bold text-rose-600 flex items-center gap-0.5">
              <Droplet className="w-3 h-3 text-rose-500 fill-rose-500" />
              {data.bloodGroup || 'B+'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-medium">Validity:</span>
            <span className="font-semibold text-emerald-700">{data.validity || 'Dec 2026'}</span>
          </div>
        </div>

        {/* Bottom Signature & Verification Seal */}
        <div className="px-5 pb-3.5 pt-1 flex items-end justify-between">
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
              <div className="h-6 w-24 border-b border-slate-400 italic text-[10px] text-slate-400 flex items-end justify-center">
                Authorized Sign
              </div>
            )}
            <span className="text-[9px] font-semibold text-slate-500 block mt-0.5">Registrar / Principal</span>
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <div className="h-2 w-full" style={{ backgroundColor: primaryColor }} />
      </div>
    );
  }

  // ================= 2. HORIZONTAL LAYOUT (LANDSCAPE) =================
  if (isBackSide) {
    // HORIZONTAL BACK SIDE
    return (
      <div 
        className="id-card-print-horizontal relative w-[500px] h-[320px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col justify-between p-5 text-slate-800 select-none"
        style={{ boxSizing: 'border-box' }}
      >
        <div className="h-2.5 -mx-5 -mt-5" style={{ backgroundColor: primaryColor }} />

        <div className="grid grid-cols-2 gap-5 flex-1 items-center">
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Institutional Regulations
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              This card is the property of {data.instituteName || 'the University'}. It must be produced on demand by authorized officers and surrendered upon completion of studies.
            </p>
            <div className="text-xs space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Emergency:</span>
                <span className="font-bold text-rose-600">{data.emergencyContact || '+880 1XXXXXXXXX'}</span>
              </div>
              {data.studentPhone && (
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Student Phone:</span>
                  <span className="font-semibold text-slate-700">{data.studentPhone}</span>
                </div>
              )}
              {data.address && (
                <div className="text-[10px] text-slate-600 line-clamp-1 pt-0.5 border-t border-slate-200">
                  <span className="font-medium">Address: </span>
                  {data.address}
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

        <div className="text-center pt-2 border-t border-slate-100 text-[9px] text-slate-400 font-medium flex items-center justify-center gap-1">
          <Shield className="w-3 h-3 text-indigo-500" />
          <span>Standard CR80 Horizontal Card • Validated by Institute Authority</span>
        </div>
      </div>
    );
  }

  // HORIZONTAL FRONT SIDE
  return (
    <div 
      className="id-card-print-horizontal relative w-[500px] h-[320px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col justify-between select-none"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Top Banner */}
      <div 
        className="px-5 py-3 text-white flex items-center justify-between"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex items-center gap-2.5">
          {data.instituteLogoUrl ? (
            <img 
              src={data.instituteLogoUrl} 
              alt="Logo" 
              className="w-8 h-8 rounded-full bg-white p-0.5 object-cover shrink-0 shadow-xs" 
            />
          ) : (
            <Building className="w-6 h-6 text-white shrink-0" />
          )}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider">
              {data.instituteName || 'Institution Name'}
            </h3>
            <p className="text-[10px] text-white/80">{data.instituteSub || 'Student Identity Card'}</p>
          </div>
        </div>

        <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-white/15">
          CR80 Student
        </span>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex items-center px-6 gap-6">
        {/* Photo */}
        <div 
          className="w-28 h-32 rounded-xl border-3 bg-white shadow-sm overflow-hidden shrink-0"
          style={{ borderColor: primaryColor }}
        >
          {data.studentPhotoUrl ? (
            <img 
              src={data.studentPhotoUrl} 
              alt={data.studentName} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div 
              className="w-full h-full flex flex-col items-center justify-center"
              style={{ backgroundColor: `${primaryColor}10` }}
            >
              <User className="w-12 h-12" style={{ color: `${primaryColor}60` }} />
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="flex-1 space-y-1 text-xs">
          <h2 className="font-bold text-base text-slate-900 line-clamp-1">
            {data.studentName || 'Student Full Name'}
          </h2>
          <div 
            className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold text-white mb-2 shadow-2xs"
            style={{ backgroundColor: secondaryColor }}
          >
            ID: {data.idNumber || 'CSE-2023-0482'}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] text-slate-700 pt-1">
            <div>
              <span className="text-slate-400 font-medium block text-[10px]">Department</span>
              <span className="font-semibold text-slate-800 truncate block">{data.department || 'Computer Science'}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[10px]">Batch / Session</span>
              <span className="font-semibold text-slate-800">{data.batch || '2023-2027'}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[10px]">Blood Group</span>
              <span className="font-bold text-rose-600 flex items-center gap-0.5">
                <Droplet className="w-3 h-3 text-rose-500 fill-rose-500" />
                {data.bloodGroup || 'B+'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[10px]">Validity</span>
              <span className="font-semibold text-emerald-700">{data.validity || 'Dec 2026'}</span>
            </div>
          </div>
        </div>

        {/* QR or Signature Column */}
        <div className="flex flex-col items-center justify-between h-32 shrink-0 pl-2">
          {qrDataUrl && (
            <div className="p-0.5 bg-white border border-slate-200 rounded shadow-2xs">
              <img src={qrDataUrl} alt="QR" className="w-16 h-16" />
            </div>
          )}
          <div className="text-center">
            {data.signatureUrl ? (
              <img 
                src={data.signatureUrl} 
                alt="Sig" 
                className="h-6 max-w-[85px] object-contain mx-auto" 
              />
            ) : (
              <div className="h-5 w-20 border-b border-slate-400" />
            )}
            <span className="text-[8px] font-semibold text-slate-500 block mt-0.5">Authorized Sign</span>
          </div>
        </div>
      </div>

      <div className="h-2 w-full" style={{ backgroundColor: primaryColor }} />
    </div>
  );
};
