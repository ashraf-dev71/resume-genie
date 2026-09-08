import React from 'react';
import { ShieldAlert, Lock, Code, X, Check } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/i18n';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.legal.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-sm text-slate-600 dark:text-slate-300">
          
          {/* Mandatory Usage Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300 text-sm">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>{t.legal.usageDisclaimerTitle}</span>
            </div>
            <p className="leading-relaxed text-amber-900/90 dark:text-amber-200/90 text-xs sm:text-sm font-medium">
              "{t.legal.usageDisclaimer}"
            </p>
          </div>

          {/* Privacy Policy */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white text-sm">
              <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.legal.privacyTitle}</span>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm">
              {t.legal.privacyPolicy}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-medium">
                <Check className="w-3 h-3" /> No Remote Database
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-medium">
                <Check className="w-3 h-3" /> Zero Server Tracking
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-medium">
                <Check className="w-3 h-3" /> Pure Browser Storage
              </span>
            </div>
          </div>

          {/* Licensing */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white text-sm">
              <Code className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{t.legal.licensingTitle}</span>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm">
              {t.legal.licensing}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition"
          >
            <Check className="w-4 h-4" />
            <span>{t.legal.closeBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
