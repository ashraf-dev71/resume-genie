import React, { useState } from 'react';
import { 
  Award, 
  Plus, 
  ExternalLink, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Cloud,
  Server,
  Code,
  Shield,
  BookOpen
} from 'lucide-react';
import { SkillBadge, Language } from '../../types';
import { TRANSLATIONS } from '../../data/i18n';
import { INITIAL_SKILL_BADGES } from '../../data/initialData';

interface SkillBadgesManagerProps {
  badges: SkillBadge[];
  onChange: (updated: SkillBadge[]) => void;
  onSyncWithCV: () => void;
  lang: Language;
}

export const SkillBadgesManager: React.FC<SkillBadgesManagerProps> = ({
  badges,
  onChange,
  onSyncWithCV,
  lang,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newBadge, setNewBadge] = useState<Partial<SkillBadge>>({
    title: '',
    provider: 'Google',
    credentialId: '',
    verificationUrl: '',
    issueDate: '2024',
    level: 'Specialist',
    showOnCV: true,
  });

  const t = TRANSLATIONS[lang];

  const popularPresets: Omit<SkillBadge, 'id'>[] = [
    {
      title: 'Google Cloud Professional Cloud Architect',
      provider: 'Google',
      iconType: 'cloud',
      credentialId: 'GCP-PCA-2024',
      verificationUrl: 'https://cloud.google.com/certification',
      issueDate: '2024',
      level: 'Specialist',
      showOnCV: true,
    },
    {
      title: 'AWS Certified Solutions Architect - Associate',
      provider: 'AWS',
      iconType: 'server',
      credentialId: 'AWS-SAA-9021',
      verificationUrl: 'https://aws.amazon.com/verification',
      issueDate: '2023',
      level: 'Advanced',
      showOnCV: true,
    },
    {
      title: 'Meta Front-End Developer Professional Certificate',
      provider: 'Meta',
      iconType: 'code',
      credentialId: 'META-FED-8841',
      verificationUrl: 'https://coursera.org/verify/meta',
      issueDate: '2023',
      level: 'Specialist',
      showOnCV: true,
    },
    {
      title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
      provider: 'Microsoft',
      iconType: 'shield',
      credentialId: 'MSFT-AZ900-3312',
      verificationUrl: 'https://learn.microsoft.com',
      issueDate: '2023',
      level: 'Intermediate',
      showOnCV: true,
    },
    {
      title: 'DeepLearning.AI Machine Learning Specialization',
      provider: 'Coursera',
      iconType: 'book',
      credentialId: 'COURSERA-ML-5521',
      verificationUrl: 'https://coursera.org/verify/ml',
      issueDate: '2024',
      level: 'Advanced',
      showOnCV: true,
    },
    {
      title: 'Harvard CS50: Introduction to Computer Science',
      provider: 'Harvard',
      iconType: 'book',
      credentialId: 'CS50x-2023-9912',
      verificationUrl: 'https://cs50.harvard.edu/certificates',
      issueDate: '2023',
      level: 'Intermediate',
      showOnCV: true,
    }
  ];

  const handleAddPreset = (preset: Omit<SkillBadge, 'id'>) => {
    const item: SkillBadge = {
      ...preset,
      id: `badge-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    };
    onChange([...badges, item]);
  };

  const handleCreateBadge = () => {
    if (!newBadge.title) return;
    const item: SkillBadge = {
      id: `badge-${Date.now()}`,
      title: newBadge.title || 'Certified Specialist',
      provider: (newBadge.provider as any) || 'Google',
      iconType: 'cloud',
      credentialId: newBadge.credentialId || 'ID-12345',
      verificationUrl: newBadge.verificationUrl || 'https://verify.example.com',
      issueDate: newBadge.issueDate || '2024',
      level: (newBadge.level as any) || 'Specialist',
      showOnCV: newBadge.showOnCV ?? true,
    };
    onChange([...badges, item]);
    setIsAdding(false);
    setNewBadge({
      title: '',
      provider: 'Google',
      credentialId: '',
      verificationUrl: '',
      issueDate: '2024',
      level: 'Specialist',
      showOnCV: true,
    });
  };

  const toggleShowOnCV = (id: string) => {
    onChange(
      badges.map((b) => (b.id === id ? { ...b, showOnCV: !b.showOnCV } : b))
    );
  };

  const deleteBadge = (id: string) => {
    onChange(badges.filter((b) => b.id !== id));
  };

  const getProviderBadgeColor = (provider: string) => {
    switch (provider) {
      case 'Google': return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'AWS': return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Microsoft': return 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      case 'Meta': return 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'Harvard': return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      default: return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-5xl mx-auto w-full space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.skillBadges.title}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.skillBadges.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>{t.skillBadges.addBadge}</span>
          </button>
        </div>
      </div>

      {/* Quick Add Popular Badges Carousel / Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{t.skillBadges.presetBadges}</span>
          </span>
          <span className="text-[11px] text-slate-400">1-Click to add verified credentials</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {popularPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleAddPreset(preset)}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700/70 hover:border-indigo-400 dark:hover:border-indigo-600 bg-slate-50/60 dark:bg-slate-800/40 text-left transition group hover:shadow-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getProviderBadgeColor(preset.provider)}`}>
                  {preset.provider}
                </span>
                <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
              </div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-indigo-600 transition">
                {preset.title}
              </h4>
              <span className="text-[10px] text-slate-400 block mt-0.5">{preset.level} • {preset.issueDate}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Add Custom Badge Modal / Form Drawer */}
      {isAdding && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-indigo-500 shadow-lg space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Add Verified Credential / Badge
            </h3>
            <button
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              {t.actions.cancel}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Credential Name</label>
              <input
                type="text"
                placeholder="e.g. AWS Certified DevOps Engineer - Professional"
                value={newBadge.title}
                onChange={(e) => setNewBadge({ ...newBadge, title: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Provider / Issuer</label>
              <select
                value={newBadge.provider}
                onChange={(e) => setNewBadge({ ...newBadge, provider: e.target.value as any })}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                {['Google', 'Microsoft', 'AWS', 'Coursera', 'Meta', 'Harvard', 'IBM', 'Other'].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Competency Level</label>
              <select
                value={newBadge.level}
                onChange={(e) => setNewBadge({ ...newBadge, level: e.target.value as any })}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                {['Beginner', 'Intermediate', 'Advanced', 'Specialist', 'Expert'].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Credential ID</label>
              <input
                type="text"
                placeholder="e.g. CERT-994821"
                value={newBadge.credentialId}
                onChange={(e) => setNewBadge({ ...newBadge, credentialId: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Public Verification URL</label>
              <input
                type="text"
                placeholder="https://credly.com/your-badge"
                value={newBadge.verificationUrl}
                onChange={(e) => setNewBadge({ ...newBadge, verificationUrl: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
            >
              {t.actions.cancel}
            </button>
            <button
              onClick={handleCreateBadge}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              Add Credential
            </button>
          </div>
        </div>
      )}

      {/* User's Badges Showcase */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
          Your Verified Showcase ({badges.length} Badges)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getProviderBadgeColor(badge.provider)}`}>
                        {badge.provider}
                      </span>
                      <span className="text-[10px] text-slate-400">{badge.level}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                      {badge.title}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                      ID: {badge.credentialId}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteBadge(badge.id)}
                  className="p-1 text-slate-400 hover:text-rose-500 rounded"
                  title={t.actions.delete}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <button
                  onClick={() => toggleShowOnCV(badge.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium text-[11px] transition ${
                    badge.showOnCV
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{badge.showOnCV ? 'Displayed on CV' : 'Hidden from CV'}</span>
                </button>

                {badge.verificationUrl && (
                  <a
                    href={badge.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
