import React from 'react';
import { 
  FileText, 
  CreditCard, 
  Award, 
  ScrollText, 
  Globe, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Printer, 
  Download,
  CheckCircle2
} from 'lucide-react';
import { AppTab, Language, ThemeMode } from '../types';
import { TRANSLATIONS } from '../data/i18n';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab?: (tab: AppTab) => void;
  onTabChange?: (tab: AppTab) => void;
  lang: Language;
  setLang?: (lang: Language) => void;
  onToggleLanguage?: () => void;
  theme?: ThemeMode;
  setTheme?: (theme: ThemeMode) => void;
  darkMode?: boolean;
  onToggleTheme?: () => void;
  onOpenDisclaimer: () => void;
  onExport?: () => void;
  onDownloadPDF?: () => void;
  onPrint?: () => void;
  isSaved: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onTabChange,
  lang,
  setLang,
  onToggleLanguage,
  theme,
  setTheme,
  darkMode,
  onToggleTheme,
  onOpenDisclaimer,
  onExport,
  onDownloadPDF,
  onPrint,
  isSaved,
}) => {
  const t = TRANSLATIONS[lang];

  const handleTabClick = (tabId: AppTab) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else if (setActiveTab) {
      setActiveTab(tabId);
    }
  };

  const handleLanguageToggle = () => {
    if (onToggleLanguage) {
      onToggleLanguage();
    } else if (setLang) {
      setLang(lang === 'en' ? 'bn' : 'en');
    }
  };

  const isDark = darkMode !== undefined ? darkMode : theme === 'dark';
  const handleThemeToggle = () => {
    if (onToggleTheme) {
      onToggleTheme();
    } else if (setTheme) {
      setTheme(isDark ? 'light' : 'dark');
    }
  };

  const tabs: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: 'cv-builder', label: t.tabs.cvBuilder, icon: <FileText className="w-4 h-4" /> },
    { id: 'id-creator', label: t.tabs.idCreator, icon: <CreditCard className="w-4 h-4" /> },
    { id: 'skill-badges', label: t.tabs.skillBadges, icon: <Award className="w-4 h-4" /> },
    { id: 'certificate-maker', label: t.tabs.certificateMaker, icon: <ScrollText className="w-4 h-4" /> },
  ];

  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                  {lang === 'bn' ? 'রিজিউমিজিনি' : 'ResumeGenie'}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {lang === 'bn' ? 'স্টুডেন্ট আইডি ও প্রফেশনাল সিভি মেকার' : 'ATS CV & Student ID Creator'}
              </p>
            </div>
          </div>

          {/* Module Navigation Pills */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/80 dark:border-slate-700 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/40'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Auto-save status */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isSaved ? t.actions.autoSaved : 'Saving...'}</span>
            </div>

            {/* Language Switcher */}
            <button
              id="btn-language-toggle"
              onClick={handleLanguageToggle}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
              title="Switch language between English & Bengali"
            >
              <Globe className="w-4 h-4 text-indigo-500" />
              <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            {/* Theme Switcher */}
            <button
              id="btn-theme-toggle"
              onClick={handleThemeToggle}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
              title={isDark ? t.actions.lightMode : t.actions.darkMode}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Legal / Disclaimer Notice */}
            <button
              id="btn-disclaimer-modal"
              onClick={onOpenDisclaimer}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
              title={t.actions.disclaimer}
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
            </button>

            {/* Download PDF Primary Button */}
            <button
              id="btn-navbar-download-pdf"
              onClick={onDownloadPDF || onExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition active:scale-95 cursor-pointer"
              title={lang === 'bn' ? 'পিডিএফ ফাইল ডাউনলোড করুন' : 'Download Document as PDF'}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{t.actions.downloadPdf}</span>
              <span className="sm:hidden">{lang === 'bn' ? 'পিডিএফ' : 'PDF'}</span>
            </button>

            {/* Print Button */}
            <button
              id="btn-navbar-print"
              onClick={onPrint || onExport}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              title={t.actions.print}
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto py-2 gap-1 border-t border-slate-100 dark:border-slate-800">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white font-medium shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
