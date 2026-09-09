import React, { useRef } from 'react';
import { 
  CreditCard, 
  Upload, 
  PenTool, 
  RotateCcw, 
  Palette, 
  ShieldCheck, 
  QrCode, 
  Layout, 
  User,
  Crop,
  Trash2,
  Sparkles,
  Barcode,
  Building,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
  Layers
} from 'lucide-react';
import { StudentIDData, Language, IDCardLayout, IDCardTheme, IDCardDesignType } from '../../types';
import { TRANSLATIONS } from '../../data/i18n';
import { processUploadedImage } from '../../utils/helpers';
import { INITIAL_STUDENT_ID_DATA } from '../../data/initialData';
import { BANGLADESHI_UNIVERSITIES, BANGLADESHI_COLLEGES } from '../../data/bangladeshiData';

interface IDCardEditorProps {
  data: StudentIDData;
  onChange: (updated: StudentIDData) => void;
  onOpenCrop: (imageSrc: string) => void;
  onOpenSignature: () => void;
  onOpenTemplates?: () => void;
  lang: Language;
}

export const IDCardEditor: React.FC<IDCardEditorProps> = ({
  data,
  onChange,
  onOpenCrop,
  onOpenSignature,
  onOpenTemplates,
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const photoInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processUploadedImage(file, 500, 600);
      onChange({ ...data, studentPhotoUrl: dataUrl });
    } catch (err) {
      console.error('Failed to upload photo:', err);
    } finally {
      if (photoInputRef.current) photoInputRef.current.value = '';
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processUploadedImage(file, 300, 300);
      onChange({ ...data, instituteLogoUrl: dataUrl });
    } catch (err) {
      console.error('Failed to upload logo:', err);
    } finally {
      if (logoInputRef.current) logoInputRef.current.value = '';
    }
  };

  const generateRandomBarcode = () => {
    const randomNum = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    onChange({ ...data, barcodeNumber: randomNum });
  };

  const themePresets: { id: IDCardTheme; name: string; primary: string; secondary: string }[] = [
    { id: 'university-blue', name: 'University Blue', primary: '#1e3a8a', secondary: '#0284c7' },
    { id: 'tech-emerald', name: 'Tech Emerald', primary: '#047857', secondary: '#10b981' },
    { id: 'crimson-academy', name: 'Crimson Academy', primary: '#831843', secondary: '#be123c' },
    { id: 'midnight-gold', name: 'Midnight Onyx', primary: '#18181b', secondary: '#d97706' },
    { id: 'medical-cyan', name: 'Medical Cyan', primary: '#0e7490', secondary: '#06b6d4' },
    { id: 'cyber-slate', name: 'Cyber Slate', primary: '#334155', secondary: '#64748b' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 max-w-3xl mx-auto w-full">
      
      {/* Top Header Card */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-indigo-600" />
            <span>{t.idCard.title}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{t.idCard.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenTemplates && (
            <button
              type="button"
              onClick={onOpenTemplates}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>72+ Card Templates</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onChange(INITIAL_STUDENT_ID_DATA)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.actions.loadSample}</span>
          </button>
        </div>
      </div>

      {/* 1. Orientation & Layout Format */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-indigo-500" />
            Card Layout & Orientation (CR80 Standard)
          </span>
          <span className="text-[11px] text-slate-400 font-mono">85.6 × 53.98 mm</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange({ ...data, layout: 'vertical' })}
            className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border text-xs font-bold transition ${
              data.layout === 'vertical'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-700 dark:text-indigo-300 shadow-xs ring-2 ring-indigo-500/20'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="w-4 h-6 border-2 border-current rounded-sm" />
            <span>{t.idCard.vertical} (Portrait)</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...data, layout: 'horizontal' })}
            className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border text-xs font-bold transition ${
              data.layout === 'horizontal'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-700 dark:text-indigo-300 shadow-xs ring-2 ring-indigo-500/20'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="w-6 h-4 border-2 border-current rounded-sm" />
            <span>{t.idCard.horizontal} (Landscape)</span>
          </button>
        </div>

        {/* Design Layout Architecture (Structure Selector) */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Design Layout Archetype</span>
            </span>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-semibold">
              {data.designType || 'Auto-Detected'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { id: 'executive-smartchip', label: 'Executive Smartchip' },
              { id: 'tech-silicon', label: 'Tech Silicon Pass' },
              { id: 'cyber-keycard', label: 'Cyber Keycard' },
              { id: 'medical-emergency', label: 'Medical Emergency' },
              { id: 'conference-vip', label: 'VIP Pass & Lanyard' },
              { id: 'swiss-minimalist', label: 'Swiss Minimalist' },
              { id: 'sports-athletic', label: 'Athletic Varsity' },
              { id: 'police-security', label: 'Police / Security' },
              { id: 'horizontal-dualcol', label: 'Landscape Dual-Col' },
              { id: 'standard-corporate', label: 'Standard Corporate' },
            ].map((archetype) => (
              <button
                key={archetype.id}
                type="button"
                onClick={() => onChange({ 
                  ...data, 
                  designType: archetype.id as IDCardDesignType,
                  layout: archetype.id === 'horizontal-dualcol' ? 'horizontal' : data.layout
                })}
                className={`p-2 rounded-xl border text-left text-xs font-medium transition ${
                  data.designType === archetype.id
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {archetype.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color Theme Selector & Custom Color Pickers */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-indigo-500" />
            Theme Colors & Accents
          </span>

          {/* Presets */}
          <div className="flex flex-wrap gap-2">
            {themePresets.map((theme) => {
              const isActive = data.primaryColor === theme.primary && data.secondaryColor === theme.secondary;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...data,
                      theme: theme.id,
                      primaryColor: theme.primary,
                      secondaryColor: theme.secondary,
                    })
                  }
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                    isActive
                      ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 text-slate-900 dark:text-white font-bold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center -space-x-1">
                    <span className="w-3 h-3 rounded-full ring-1 ring-white" style={{ backgroundColor: theme.primary }} />
                    <span className="w-3 h-3 rounded-full ring-1 ring-white" style={{ backgroundColor: theme.secondary }} />
                  </div>
                  <span>{theme.name}</span>
                </button>
              );
            })}
          </div>

          {/* Custom Color Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Primary Header Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.primaryColor || '#1e3a8a'}
                  onChange={(e) => onChange({ ...data, primaryColor: e.target.value })}
                  className="w-7 h-7 rounded border border-slate-300 cursor-pointer p-0.5 bg-transparent"
                />
                <span className="text-xs font-mono text-slate-500 uppercase">
                  {data.primaryColor || '#1e3a8a'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Secondary Badge Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.secondaryColor || '#0284c7'}
                  onChange={(e) => onChange({ ...data, secondaryColor: e.target.value })}
                  className="w-7 h-7 rounded border border-slate-300 cursor-pointer p-0.5 bg-transparent"
                />
                <span className="text-xs font-mono text-slate-500 uppercase">
                  {data.secondaryColor || '#0284c7'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Academic Institution Details & Logo */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs uppercase tracking-wider flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-indigo-500" />
          Institution & Campus Information
        </span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{t.idCard.instituteName}</label>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">🇧🇩 BD Suggestions</span>
            </div>
            <input
              type="text"
              list="bd-idcard-institutions-list"
              value={data.instituteName}
              onChange={(e) => onChange({ ...data, instituteName: e.target.value })}
              placeholder="e.g. Bangladesh University of Engineering and Technology (BUET)"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <datalist id="bd-idcard-institutions-list">
              {BANGLADESHI_UNIVERSITIES.map((uni) => (
                <option key={uni} value={uni} />
              ))}
              {BANGLADESHI_COLLEGES.map((col) => (
                <option key={col} value={col} />
              ))}
            </datalist>

            {/* Quick BD University Pills */}
            <div className="flex flex-wrap gap-1 mt-2">
              {[
                'BUET',
                'University of Dhaka',
                'North South University (NSU)',
                'BRAC University',
                'Jahangirnagar University',
                'Rajshahi University',
                'Chittagong University',
                'SUST',
                'Dhaka Medical College',
                'Notre Dame College, Dhaka'
              ].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => onChange({ ...data, instituteName: name })}
                  className="px-2 py-0.5 rounded-md text-[10px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 border border-indigo-200/60 dark:border-indigo-800/80 transition cursor-pointer"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.idCard.instituteSub}</label>
            <input
              type="text"
              value={data.instituteSub}
              onChange={(e) => onChange({ ...data, instituteSub: e.target.value })}
              placeholder="e.g. Student Identity Card"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Institution Logo Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <div className="flex items-center gap-3">
            {data.instituteLogoUrl ? (
              <img src={data.instituteLogoUrl} alt="Logo" className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 bg-white p-0.5 shadow-xs" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 text-[10px] font-bold">
                LOGO
              </div>
            )}
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block">Institution Seal / Emblem</span>
              <span className="text-[11px] text-slate-500">PNG, SVG or JPG supported</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => logoInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t.idCard.uploadLogo}</span>
            </button>
            <input 
              ref={logoInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleLogoUpload} 
              className="hidden" 
            />

            {data.instituteLogoUrl && (
              <button
                type="button"
                onClick={() => onChange({ ...data, instituteLogoUrl: '' })}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                title="Remove Logo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Student Personal Details & Portrait */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-indigo-500" />
          Student Identification & Credentials
        </span>

        {/* Student Photo Card */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex flex-wrap items-center justify-between gap-4 border border-slate-200/70 dark:border-slate-700/60">
          <div className="flex items-center gap-3.5">
            {data.studentPhotoUrl ? (
              <img
                src={data.studentPhotoUrl}
                alt="Student"
                className="w-16 h-16 rounded-xl object-cover border-2 border-indigo-500 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                <User className="w-8 h-8" />
              </div>
            )}
            <div>
              <span className="font-bold text-slate-900 dark:text-white block text-sm">Official ID Portrait</span>
              <span className="text-[11px] text-slate-500">Square or portrait ratio recommended</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{t.idCard.uploadPhoto}</span>
            </button>
            <input 
              ref={photoInputRef}
              type="file" 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              className="hidden" 
            />

            {data.studentPhotoUrl && (
              <>
                <button
                  type="button"
                  onClick={() => onOpenCrop(data.studentPhotoUrl)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 font-semibold text-xs"
                >
                  <Crop className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{t.actions.cropPhoto}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...data, studentPhotoUrl: '' })}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  title="Remove Photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
              <User className="w-3 h-3 text-slate-400" />
              <span>{t.idCard.studentName}</span>
            </label>
            <input
              type="text"
              value={data.studentName}
              onChange={(e) => onChange({ ...data, studentName: e.target.value })}
              placeholder="e.g. Samantha Vance"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-slate-400" />
              <span>{t.idCard.idNumber}</span>
            </label>
            <input
              type="text"
              value={data.idNumber}
              onChange={(e) => onChange({ ...data, idNumber: e.target.value })}
              placeholder="e.g. STU-2026-0042"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-slate-400" />
              <span>{t.idCard.department}</span>
            </label>
            <input
              type="text"
              value={data.department}
              onChange={(e) => onChange({ ...data, department: e.target.value })}
              placeholder="e.g. Computer Science & Engineering"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{t.idCard.batch}</span>
            </label>
            <input
              type="text"
              value={data.batch}
              onChange={(e) => onChange({ ...data, batch: e.target.value })}
              placeholder="e.g. 2023-2027 (24th Batch)"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
              <HeartPulse className="w-3 h-3 text-rose-500" />
              <span>{t.idCard.bloodGroup}</span>
            </label>
            <select
              value={data.bloodGroup}
              onChange={(e) => onChange({ ...data, bloodGroup: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold text-rose-600"
            >
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-emerald-500" />
              <span>{t.idCard.validity}</span>
            </label>
            <input
              type="text"
              value={data.validity}
              onChange={(e) => onChange({ ...data, validity: e.target.value })}
              placeholder="e.g. Dec 2027"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{t.idCard.studentPhone}</span>
            </label>
            <input
              type="text"
              value={data.studentPhone || ''}
              onChange={(e) => onChange({ ...data, studentPhone: e.target.value })}
              placeholder="e.g. +880 1700 000000"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
              <Phone className="w-3 h-3 text-rose-500" />
              <span>{t.idCard.emergencyContact}</span>
            </label>
            <input
              type="text"
              value={data.emergencyContact}
              onChange={(e) => onChange({ ...data, emergencyContact: e.target.value })}
              placeholder="e.g. +880 1800 000000"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold text-rose-600"
            />
          </div>

          {/* Additional Residential Address */}
          <div className="sm:col-span-2">
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>Residential Address (Printed on Back Side)</span>
            </label>
            <input
              type="text"
              value={data.address || ''}
              onChange={(e) => onChange({ ...data, address: e.target.value })}
              placeholder="e.g. House 14, Road 5, Dhanmondi, Dhaka-1205"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Digital Verification: QR Code & Barcode */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs uppercase tracking-wider flex items-center gap-1.5">
          <QrCode className="w-3.5 h-3.5 text-indigo-500" />
          Digital Verification: QR Code & Scannable Barcode
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{t.idCard.qrPayload}</label>
              <button
                type="button"
                onClick={() => onChange({ ...data, qrPayload: `https://verify.edu/student/${data.idNumber || 'STU-001'}` })}
                className="text-[10px] text-indigo-600 font-semibold hover:underline"
              >
                Auto-fill Link
              </button>
            </div>
            <input
              type="text"
              value={data.qrPayload}
              onChange={(e) => onChange({ ...data, qrPayload: e.target.value })}
              placeholder="https://youruniversity.edu/verify/student-id"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-[11px]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{t.idCard.barcode}</label>
              <button
                type="button"
                onClick={generateRandomBarcode}
                className="text-[10px] text-indigo-600 font-semibold hover:underline flex items-center gap-0.5"
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>Randomize</span>
              </button>
            </div>
            <input
              type="text"
              value={data.barcodeNumber}
              onChange={(e) => onChange({ ...data, barcodeNumber: e.target.value })}
              placeholder="890123456789"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono font-bold"
            />
          </div>
        </div>
      </div>

      {/* 5. Registrar / Principal Signature */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 text-xs">
        <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs uppercase tracking-wider flex items-center gap-1.5">
          <PenTool className="w-3.5 h-3.5 text-indigo-500" />
          Authority Signature
        </span>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between gap-3 border border-slate-200/70 dark:border-slate-700/60">
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block">Registrar / Principal Signature</span>
            <span className="text-[11px] text-slate-500">Draw with touch/mouse or upload PNG signature</span>
          </div>

          <div className="flex items-center gap-2">
            {data.signatureUrl && (
              <div className="h-8 w-20 bg-white dark:bg-slate-800 border rounded p-0.5 flex items-center justify-center">
                <img src={data.signatureUrl} alt="Signature" className="max-h-full max-w-full object-contain" />
              </div>
            )}
            
            <button
              type="button"
              onClick={onOpenSignature}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>{data.signatureUrl ? 'Edit Signature' : t.idCard.authorizedSign}</span>
            </button>

            {data.signatureUrl && (
              <button
                type="button"
                onClick={() => onChange({ ...data, signatureUrl: '' })}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                title="Remove Signature"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
