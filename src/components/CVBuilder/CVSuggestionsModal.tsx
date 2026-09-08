import React, { useState } from 'react';
import { Sparkles, Plus, Copy, Check, X, Briefcase, BookOpen } from 'lucide-react';
import { Language } from '../../types';
import { ROLE_SUGGESTIONS, RoleSuggestion } from '../../data/suggestions';
import { TRANSLATIONS } from '../../data/i18n';

interface CVSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySummary: (summaryText: string) => void;
  onAddBulletPoint: (bulletText: string) => void;
  onAddSkills: (skills: string[]) => void;
  lang: Language;
}

export const CVSuggestionsModal: React.FC<CVSuggestionsModalProps> = ({
  isOpen,
  onClose,
  onApplySummary,
  onAddBulletPoint,
  onAddSkills,
  lang,
}) => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentRole = ROLE_SUGGESTIONS[selectedRoleIndex] || ROLE_SUGGESTIONS[0];
  const t = TRANSLATIONS[lang];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {lang === 'bn' ? 'স্মার্ট এআই পরামর্শ ও অর্জনের পয়েন্ট' : 'Role-Based Smart Suggestions & Metrics'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'bn'
                  ? 'আপনার কাঙ্ক্ষিত পদের জন্য প্রাক-প্রস্তুত শক্তিশালী বাক্য ও পয়েন্ট'
                  : 'Pre-engineered, high-impact bullet points and summaries tailored to your target job role.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Roles Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-3 space-y-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/40">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-2">
              Select Job Role
            </span>
            {ROLE_SUGGESTIONS.map((role, idx) => (
              <button
                key={role.roleId}
                onClick={() => setSelectedRoleIndex(idx)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center gap-2 ${
                  selectedRoleIndex === idx
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                {role.roleId.startsWith('bd-') ? (
                  <span className="shrink-0 text-xs">🇧🇩</span>
                ) : (
                  <Briefcase className="w-3.5 h-3.5 shrink-0" />
                )}
                <span className="truncate">{role.title}</span>
              </button>
            ))}
          </div>

          {/* Suggestions Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {currentRole.title}
                </h4>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  {currentRole.category}
                </span>
              </div>

              {/* Add all recommended skills button */}
              <button
                onClick={() => onAddSkills(currentRole.recommendedSkills)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-800"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Recommended Skills ({currentRole.recommendedSkills.length})</span>
              </button>
            </div>

            {/* Recommended Skills Pills */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                High-Impact ATS Keywords:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentRole.recommendedSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Summaries Section */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Recommended Professional Summaries:
              </span>
              {currentRole.summaries.map((summaryObj, i) => {
                const text = lang === 'bn' ? summaryObj.bn : summaryObj.en;
                const copyId = `summary-${i}`;
                return (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2 group hover:border-indigo-300 transition"
                  >
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      "{text}"
                    </p>
                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                      <button
                        onClick={() => handleCopy(text, copyId)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-700"
                      >
                        {copiedIndex === copyId ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIndex === copyId ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={() => {
                          onApplySummary(text);
                          onClose();
                        }}
                        className="flex items-center gap-1 px-3 py-1 rounded text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                      >
                        <Check className="w-3 h-3" />
                        <span>Insert into CV Summary</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Achievement Bullet Points */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Quantified Achievement Bullet Points:
              </span>
              {currentRole.bulletPoints.map((bp, i) => {
                const text = lang === 'bn' ? bp.bn : bp.en;
                const copyId = `bullet-${i}`;
                return (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-start justify-between gap-3 group hover:border-indigo-300 transition"
                  >
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      • {text}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleCopy(text, copyId)}
                        className="p-1 rounded text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === copyId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => {
                          onAddBulletPoint(text);
                        }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 hover:text-white transition"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Bullet</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300"
          >
            {t.actions.close}
          </button>
        </div>
      </div>
    </div>
  );
};
