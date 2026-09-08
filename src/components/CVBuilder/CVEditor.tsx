import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  FolderGit2, 
  Award, 
  Trophy, 
  Languages as LangIcon, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Upload, 
  Crop, 
  Layers, 
  RotateCcw,
  Palette,
  FileText
} from 'lucide-react';
import { 
  CVData, 
  Language, 
  ExperienceItem, 
  EducationItem, 
  SkillCategoryItem, 
  ProjectItem, 
  CertificationItem, 
  AwardItem, 
  LanguageItem, 
  CustomSection,
  CVFontFamily
} from '../../types';
import { TRANSLATIONS } from '../../data/i18n';
import { processUploadedImage } from '../../utils/helpers';
import { INITIAL_CV_DATA } from '../../data/initialData';
import { 
  BANGLADESHI_EDUCATION_PRESETS, 
  BANGLADESHI_JOB_PRESETS, 
  BANGLADESHI_UNIVERSITIES, 
  BANGLADESHI_BOARDS, 
  BANGLADESHI_COLLEGES, 
  BangladeshiJobPreset, 
  BangladeshiEducationPreset 
} from '../../data/bangladeshiData';

interface CVEditorProps {
  data: CVData;
  onChange: (updated: CVData) => void;
  onOpenCrop: (imageSrc: string) => void;
  onOpenSuggestions: () => void;
  onOpenTemplates: () => void;
  lang: Language;
}

export const CVEditor: React.FC<CVEditorProps> = ({
  data,
  onChange,
  onOpenCrop,
  onOpenSuggestions,
  onOpenTemplates,
  lang,
}) => {
  const [openSection, setOpenSection] = useState<string>('profile');
  const [showBdJobPresets, setShowBdJobPresets] = useState(false);
  const [selectedBdJobCategory, setSelectedBdJobCategory] = useState<string>('All');
  const [showBdEduPresets, setShowBdEduPresets] = useState(false);
  const [selectedBdEduCategory, setSelectedBdEduCategory] = useState<string>('All');
  const t = TRANSLATIONS[lang];

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? '' : section));
  };

  // Photo upload handler
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processUploadedImage(file, 500, 500);
      onChange({
        ...data,
        profile: { ...data.profile, photoUrl: dataUrl },
        showPhoto: true,
      });
      onOpenCrop(dataUrl);
    } catch (err) {
      console.error('Image upload error:', err);
    }
  };

  // Experience Handlers
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: 'Present',
      current: true,
      bullets: [''],
    };
    onChange({ ...data, experiences: [...data.experiences, newItem] });
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: any) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter((exp) => exp.id !== id),
    });
  };

  const addBangladeshiJobPreset = (preset: BangladeshiJobPreset) => {
    const isBn = lang === 'bn' || data.outputLanguage === 'bn';
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      title: isBn ? preset.titleBn : preset.title,
      company: isBn ? preset.companyBn : preset.company,
      location: preset.location,
      startDate: preset.startDate,
      endDate: preset.endDate,
      current: preset.current,
      bullets: isBn ? [...preset.bulletsBn] : [...preset.bulletsEn],
    };
    onChange({ ...data, experiences: [...data.experiences, newItem] });
  };

  const addExperienceBullet = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === id ? { ...exp, bullets: [...exp.bullets, ''] } : exp
      ),
    });
  };

  const updateExperienceBullet = (id: string, idx: number, value: string) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              bullets: exp.bullets.map((b, i) => (i === idx ? value : b)),
            }
          : exp
      ),
    });
  };

  const removeExperienceBullet = (id: string, idx: number) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              bullets: exp.bullets.filter((_, i) => i !== idx),
            }
          : exp
      ),
    });
  };

  // Education Handlers
  const addEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      grade: '',
      bullets: [],
    };
    onChange({ ...data, educations: [...data.educations, newItem] });
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: any) => {
    onChange({
      ...data,
      educations: data.educations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      educations: data.educations.filter((edu) => edu.id !== id),
    });
  };

  const addBangladeshiEduPreset = (preset: BangladeshiEducationPreset) => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: preset.data.institution,
      degree: preset.data.degree,
      field: preset.data.field,
      location: preset.data.location,
      startDate: preset.data.startDate,
      endDate: preset.data.endDate,
      grade: preset.data.grade,
      bullets: [...preset.data.bullets],
    };
    onChange({ ...data, educations: [...data.educations, newItem] });
  };

  // Skill Category Handlers
  const addSkillCategory = () => {
    const newItem: SkillCategoryItem = {
      id: `sc-${Date.now()}`,
      categoryName: 'Technical Skills',
      skills: ['Skill 1', 'Skill 2'],
    };
    onChange({ ...data, skillCategories: [...data.skillCategories, newItem] });
  };

  const updateSkillCategory = (id: string, field: keyof SkillCategoryItem, value: any) => {
    onChange({
      ...data,
      skillCategories: data.skillCategories.map((sc) =>
        sc.id === id ? { ...sc, [field]: value } : sc
      ),
    });
  };

  const removeSkillCategory = (id: string) => {
    onChange({
      ...data,
      skillCategories: data.skillCategories.filter((sc) => sc.id !== id),
    });
  };

  // Project Handlers
  const addProject = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      role: '',
      link: '',
      tools: '',
      description: '',
      bullets: [],
    };
    onChange({ ...data, projects: [...data.projects, newItem] });
  };

  const updateProject = (id: string, field: keyof ProjectItem, value: any) => {
    onChange({
      ...data,
      projects: data.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });
  };

  // Certification Handlers
  const addCertification = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
      credentialId: '',
      url: '',
    };
    onChange({ ...data, certifications: [...data.certifications, newItem] });
  };

  const updateCertification = (id: string, field: keyof CertificationItem, value: string) => {
    onChange({
      ...data,
      certifications: data.certifications.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    });
  };

  const removeCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((c) => c.id !== id),
    });
  };

  // Awards Handlers
  const addAward = () => {
    const newItem: AwardItem = {
      id: `aw-${Date.now()}`,
      title: '',
      issuer: '',
      year: '',
      description: '',
    };
    onChange({ ...data, awards: [...data.awards, newItem] });
  };

  const updateAward = (id: string, field: keyof AwardItem, value: string) => {
    onChange({
      ...data,
      awards: data.awards.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      ),
    });
  };

  const removeAward = (id: string) => {
    onChange({
      ...data,
      awards: data.awards.filter((a) => a.id !== id),
    });
  };

  // Languages Handlers
  const addLanguage = () => {
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Fluent',
    };
    onChange({ ...data, languages: [...data.languages, newItem] });
  };

  const updateLanguage = (id: string, field: keyof LanguageItem, value: string) => {
    onChange({
      ...data,
      languages: data.languages.map((l) =>
        l.id === id ? { ...l, [field]: value } : l
      ),
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((l) => l.id !== id),
    });
  };

  // Custom Section
  const addCustomSection = () => {
    const newSec: CustomSection = {
      id: `custom-${Date.now()}`,
      title: 'Publications & Speaking',
      items: [
        {
          id: `item-${Date.now()}`,
          heading: 'Keynote Speaker at Tech Summit',
          subheading: 'Annual Developer Conference',
          date: '2024',
          bullets: ['Delivered keynote on distributed systems to 500+ attendees'],
        }
      ],
    };
    onChange({ ...data, customSections: [...(data.customSections || []), newSec] });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-w-3xl mx-auto w-full">
      
      {/* Top Quick Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.actions.selectTemplate}</span>
          </button>

          <button
            onClick={onOpenSuggestions}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-800 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t.actions.smartSuggestions}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Output Language Selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>CV Language:</span>
            <select
              value={data.outputLanguage || 'en'}
              onChange={(e) => onChange({ ...data, outputLanguage: e.target.value as Language })}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="en">English Headings</option>
              <option value="bn">বাংলা শিরোনাম</option>
            </select>
          </div>

          <button
            onClick={() => onChange(INITIAL_CV_DATA)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 transition"
            title={t.actions.loadSample}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.actions.loadSample}</span>
          </button>
        </div>
      </div>

      {/* Accordion 1: Personal Details */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <button
          onClick={() => toggleSection('profile')}
          className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-indigo-600" />
            <span>{t.cvEditor.personalDetails}</span>
          </div>
          {openSection === 'profile' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'profile' && (
          <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            
            {/* Photo Upload & Crop Controls */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex flex-wrap items-center justify-between gap-3 border border-slate-200/70 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                {data.profile.photoUrl ? (
                  <img
                    src={data.profile.photoUrl}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 shadow-xs"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                    <User className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Profile Picture</span>
                  <label className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium hover:underline cursor-pointer inline-flex items-center gap-1 mt-0.5">
                    <Upload className="w-3 h-3" />
                    <span>Upload New Photo</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {data.profile.photoUrl && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenCrop(data.profile.photoUrl)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 font-medium"
                  >
                    <Crop className="w-3 h-3 text-indigo-500" />
                    <span>{t.actions.cropPhoto}</span>
                  </button>
                  <button
                    onClick={() => onChange({ ...data, showPhoto: !data.showPhoto })}
                    className={`px-2.5 py-1 rounded-lg border font-medium transition ${
                      data.showPhoto
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {data.showPhoto ? 'Visible on CV' : 'Hidden on CV'}
                  </button>
                </div>
              )}
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.cvEditor.fullName}</label>
                <input
                  type="text"
                  value={data.profile.fullName}
                  onChange={(e) => onChange({ ...data, profile: { ...data.profile, fullName: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.cvEditor.jobTitle}</label>
                <input
                  type="text"
                  value={data.profile.jobTitle}
                  onChange={(e) => onChange({ ...data, profile: { ...data.profile, jobTitle: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.cvEditor.email}</label>
                <input
                  type="email"
                  value={data.profile.email}
                  onChange={(e) => onChange({ ...data, profile: { ...data.profile, email: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.cvEditor.phone}</label>
                <input
                  type="text"
                  value={data.profile.phone}
                  onChange={(e) => onChange({ ...data, profile: { ...data.profile, phone: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.cvEditor.location}</label>
                <input
                  type="text"
                  value={data.profile.location}
                  onChange={(e) => onChange({ ...data, profile: { ...data.profile, location: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.cvEditor.website}</label>
                <input
                  type="text"
                  value={data.profile.website}
                  onChange={(e) => onChange({ ...data, profile: { ...data.profile, website: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.cvEditor.linkedin}</label>
                <input
                  type="text"
                  value={data.profile.linkedin}
                  onChange={(e) => onChange({ ...data, profile: { ...data.profile, linkedin: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.cvEditor.github}</label>
                <input
                  type="text"
                  value={data.profile.github}
                  onChange={(e) => onChange({ ...data, profile: { ...data.profile, github: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Accordion 2: Professional Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <button
          onClick={() => toggleSection('summary')}
          className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>{t.cvEditor.professionalSummary}</span>
          </div>
          {openSection === 'summary' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'summary' && (
          <div className="px-5 pb-5 pt-1 space-y-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-500">2-3 sentences summarizing your value proposition and metrics:</span>
              <button
                onClick={onOpenSuggestions}
                className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Sparkles className="w-3 h-3" />
                <span>Get AI Role Suggestions</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={data.summary}
              onChange={(e) => onChange({ ...data, summary: e.target.value })}
              placeholder={t.cvEditor.summaryPlaceholder}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* Accordion 3: Work Experience */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <button
          onClick={() => toggleSection('experience')}
          className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span>{t.cvHeadings.experience} ({data.experiences.length})</span>
          </div>
          {openSection === 'experience' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'experience' && (
          <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            {/* Bangladeshi Job Presets Bar */}
            <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">🇧🇩</span>
                  <div>
                    <span className="font-bold text-emerald-900 dark:text-emerald-200 text-xs block">
                      {lang === 'bn' ? 'বাংলাদেশি চাকরির প্রিসেট (ব্যাংক, গার্মেন্টস, আইটি, এনজিও)' : 'Bangladeshi Job Presets (Banking, RMG, IT, NGO)'}
                    </span>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                      {lang === 'bn' ? 'বাস্তবধর্মী কোম্পানির নাম ও অর্জনের বিবরণীসহ সরাসরি সিভিতে যোগ করুন' : 'One-click fill with realistic Bangladeshi companies, positions & metrics'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBdJobPresets(!showBdJobPresets)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{showBdJobPresets ? (lang === 'bn' ? 'বন্ধ করুন' : 'Hide') : (lang === 'bn' ? 'প্রিসেট দেখুন' : 'Explore Presets')}</span>
                </button>
              </div>

              {showBdJobPresets && (
                <div className="pt-2 space-y-2.5 border-t border-emerald-200/60 dark:border-emerald-800/60">
                  {/* Category filters */}
                  <div className="flex flex-wrap gap-1.5">
                    {['All', 'Banking & Finance', 'RMG & Textile', 'Software & IT', 'NGO & Development', 'MFS & Telecom', 'FMCG Sales & Marketing', 'Healthcare & Pharma', 'Teaching & Academia', 'Govt & Administration'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedBdJobCategory(cat)}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition cursor-pointer ${
                          selectedBdJobCategory === cat
                            ? 'bg-emerald-700 text-white font-bold shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100/60 border border-emerald-200/80 dark:border-emerald-800'
                        }`}
                      >
                        {cat === 'All' ? (lang === 'bn' ? 'সবগুলো' : 'All') : cat}
                      </button>
                    ))}
                  </div>

                  {/* Grid of presets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                    {BANGLADESHI_JOB_PRESETS
                      .filter(p => selectedBdJobCategory === 'All' || p.category === selectedBdJobCategory)
                      .map((preset) => (
                        <div
                          key={preset.id}
                          className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-400 transition gap-2"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-bold text-slate-900 dark:text-white text-xs leading-tight">
                                {lang === 'bn' ? preset.titleBn : preset.title}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold shrink-0">
                                {preset.category.split(' ')[0]}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-medium">
                              🏢 {lang === 'bn' ? preset.companyBn : preset.company}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              📍 {preset.location} • {preset.startDate} - {preset.endDate}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => addBangladeshiJobPreset(preset)}
                            className="w-full py-1 px-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] flex items-center justify-center gap-1 shadow-2xs cursor-pointer transition"
                          >
                            <Plus className="w-3 h-3" />
                            <span>{lang === 'bn' ? '+ সিভিতে যোগ করুন' : '+ Add to CV'}</span>
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {data.experiences.map((exp, idx) => (
              <div key={exp.id} className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    #{idx + 1} {exp.title || 'Job Position'} {exp.company ? `@ ${exp.company}` : ''}
                  </span>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 rounded"
                    title={t.actions.delete}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-medium text-slate-600 dark:text-slate-400 block mb-0.5">{t.cvEditor.role}</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-600 dark:text-slate-400 block mb-0.5">{t.cvEditor.company}</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="e.g. Acme Corp"
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-600 dark:text-slate-400 block mb-0.5">{t.cvEditor.startDate}</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="e.g. Jan 2022"
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-600 dark:text-slate-400 block mb-0.5">{t.cvEditor.endDate}</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="e.g. Present"
                      disabled={exp.current}
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md disabled:bg-slate-100"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`curr-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <label htmlFor={`curr-${exp.id}`} className="text-slate-600 dark:text-slate-400 cursor-pointer">
                    {t.cvEditor.currentlyWorking}
                  </label>
                </div>

                {/* Bullets */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-600 dark:text-slate-400">Accomplishment Bullets:</span>
                    <button
                      onClick={() => addExperienceBullet(exp.id)}
                      className="text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{t.cvEditor.addBullet}</span>
                    </button>
                  </div>
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => updateExperienceBullet(exp.id, bIdx, e.target.value)}
                        placeholder="Action verb + metric (e.g. Accelerated API response by 35%...)"
                        className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                      />
                      <button
                        onClick={() => removeExperienceBullet(exp.id, bIdx)}
                        className="p-1 text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={addExperience}
              className="w-full py-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{t.actions.addExperience}</span>
            </button>
          </div>
        )}
      </div>

      {/* Accordion 4: Education */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <button
          onClick={() => toggleSection('education')}
          className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>{t.cvHeadings.education} ({data.educations.length})</span>
          </div>
          {openSection === 'education' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'education' && (
          <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            {/* Bangladeshi Education Presets Bar */}
            <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">🇧🇩</span>
                  <div>
                    <span className="font-bold text-blue-900 dark:text-blue-200 text-xs block">
                      {lang === 'bn' ? 'বাংলাদেশি ডিগ্রি প্রিসেট (SSC, HSC, বিএসসি, বিবিএ, ডিপ্লোমা, MBBS)' : 'Bangladeshi Education Presets (SSC, HSC, B.Sc., BBA, Diploma, MBBS)'}
                    </span>
                    <span className="text-[11px] text-blue-700 dark:text-blue-400">
                      {lang === 'bn' ? 'বুয়েট, ঢাবি, নটর ডেম, শিক্ষা বোর্ড ও জিপিএ ফরম্যাটসহ এক ক্লিকে যোগ করুন' : 'Instant 1-click add with top BD universities, colleges, boards & GPA standards'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBdEduPresets(!showBdEduPresets)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-2xs transition flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{showBdEduPresets ? (lang === 'bn' ? 'বন্ধ করুন' : 'Hide') : (lang === 'bn' ? 'প্রিসেট দেখুন' : 'Explore Presets')}</span>
                </button>
              </div>

              {showBdEduPresets && (
                <div className="pt-2 space-y-2.5 border-t border-blue-200/60 dark:border-blue-800/60">
                  {/* Category filters */}
                  <div className="flex flex-wrap gap-1.5">
                    {['All', 'Secondary (SSC)', 'Higher Secondary (HSC)', 'Diploma', 'Bachelor / Honours', 'Masters / Postgrad', 'Medical & Health'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedBdEduCategory(cat)}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition cursor-pointer ${
                          selectedBdEduCategory === cat
                            ? 'bg-blue-700 text-white font-bold shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100/60 border border-blue-200/80 dark:border-blue-800'
                        }`}
                      >
                        {cat === 'All' ? (lang === 'bn' ? 'সবগুলো' : 'All') : cat}
                      </button>
                    ))}
                  </div>

                  {/* Grid of presets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                    {BANGLADESHI_EDUCATION_PRESETS
                      .filter(p => selectedBdEduCategory === 'All' || p.category === selectedBdEduCategory)
                      .map((preset) => (
                        <div
                          key={preset.id}
                          className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-blue-400 transition gap-2"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-bold text-slate-900 dark:text-white text-xs leading-tight">
                                {lang === 'bn' ? preset.labelBn : preset.label}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-semibold shrink-0">
                                {preset.category.split(' ')[0]}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-medium">
                              🏛️ {preset.data.institution}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              🎯 {preset.data.grade} • {preset.data.startDate} - {preset.data.endDate}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => addBangladeshiEduPreset(preset)}
                            className="w-full py-1 px-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] flex items-center justify-center gap-1 shadow-2xs cursor-pointer transition"
                          >
                            <Plus className="w-3 h-3" />
                            <span>{lang === 'bn' ? '+ ডিগ্রিতে যোগ করুন' : '+ Add to Education'}</span>
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Datalists for Bangladeshi universities and education boards */}
            <datalist id="bd-institutions-list">
              {BANGLADESHI_UNIVERSITIES.map((uni) => (
                <option key={uni} value={uni} />
              ))}
              {BANGLADESHI_COLLEGES.map((col) => (
                <option key={col} value={col} />
              ))}
            </datalist>

            <datalist id="bd-boards-list">
              {BANGLADESHI_BOARDS.map((board) => (
                <option key={board} value={board} />
              ))}
            </datalist>

            {data.educations.map((edu, idx) => (
              <div key={edu.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    #{idx + 1} {edu.degree || 'Degree'} {edu.institution ? `@ ${edu.institution}` : ''}
                  </span>
                  <button onClick={() => removeEducation(edu.id)} className="p-1 text-slate-400 hover:text-rose-500" title={t.actions.delete}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-medium text-slate-600 dark:text-slate-400 block mb-0.5">
                      {lang === 'bn' ? 'শিক্ষা প্রতিষ্ঠান / বিশ্ববিদ্যালয়' : 'Institution / University'}
                    </label>
                    <input
                      type="text"
                      list="bd-institutions-list"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="e.g. University of Dhaka / BUET / NDC"
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-600 dark:text-slate-400 block mb-0.5">
                      {lang === 'bn' ? 'ডিগ্রি / সনদ' : 'Degree / Examination'}
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="e.g. B.Sc. in CSE / HSC / BBA"
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-600 dark:text-slate-400 block mb-0.5">
                      {lang === 'bn' ? 'বিভাগ / মেজর / বোর্ড' : 'Department / Major / Board'}
                    </label>
                    <input
                      type="text"
                      list="bd-boards-list"
                      value={edu.field || ''}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      placeholder="e.g. Computer Science & Eng. / Science / Dhaka Board"
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-600 dark:text-slate-400 block mb-0.5">
                      {lang === 'bn' ? 'ফলাফল (CGPA / GPA)' : 'CGPA / Grade'}
                    </label>
                    <input
                      type="text"
                      value={edu.grade}
                      onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                      placeholder="e.g. CGPA: 3.85 / 4.00 or GPA: 5.00"
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-600 dark:text-slate-400 block mb-0.5">
                      {lang === 'bn' ? 'শুরুর বছর' : 'Start Year'}
                    </label>
                    <input
                      type="text"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      placeholder="e.g. 2019"
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-600 dark:text-slate-400 block mb-0.5">
                      {lang === 'bn' ? 'পাস / সমাপ্তির বছর' : 'Passing / Graduation Year'}
                    </label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      placeholder="e.g. 2023 or Present"
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addEducation}
              className="w-full py-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{t.actions.addEducation}</span>
            </button>
          </div>
        )}
      </div>

      {/* Accordion 5: Skills Categories */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <button
          onClick={() => toggleSection('skills')}
          className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <Code2 className="w-4 h-4 text-indigo-600" />
            <span>{t.cvHeadings.skills} ({data.skillCategories.length} categories)</span>
          </div>
          {openSection === 'skills' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'skills' && (
          <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            {data.skillCategories.map((sc) => (
              <div key={sc.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={sc.categoryName}
                    onChange={(e) => updateSkillCategory(sc.id, 'categoryName', e.target.value)}
                    placeholder="Category Name (e.g. Languages, Cloud, Frameworks)"
                    className="font-bold px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md w-1/2 text-xs"
                  />
                  <button onClick={() => removeSkillCategory(sc.id)} className="p-1 text-slate-400 hover:text-rose-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={sc.skills.join(', ')}
                  onChange={(e) => updateSkillCategory(sc.id, 'skills', e.target.value.split(',').map((s) => s.trim()))}
                  placeholder="Enter skills separated by commas (e.g. TypeScript, React, Docker)"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                />
              </div>
            ))}

            <button
              onClick={addSkillCategory}
              className="w-full py-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{t.actions.addSkillCategory}</span>
            </button>
          </div>
        )}
      </div>

      {/* Accordion 6: Key Projects */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <button
          onClick={() => toggleSection('projects')}
          className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <FolderGit2 className="w-4 h-4 text-indigo-600" />
            <span>{t.cvHeadings.projects} ({data.projects.length})</span>
          </div>
          {openSection === 'projects' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'projects' && (
          <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            {data.projects.map((proj) => (
              <div key={proj.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                    placeholder="Project Name"
                    className="font-bold px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md w-1/2"
                  />
                  <button onClick={() => removeProject(proj.id)} className="p-1 text-slate-400 hover:text-rose-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={proj.role}
                    onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                    placeholder="Role (e.g. Creator, Lead Dev)"
                    className="px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                  />
                  <input
                    type="text"
                    value={proj.link}
                    onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                    placeholder="Project Link or GitHub URL"
                    className="px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                  />
                </div>
                <input
                  type="text"
                  value={proj.tools}
                  onChange={(e) => updateProject(proj.id, 'tools', e.target.value)}
                  placeholder="Tech Stack (e.g. React, Go, Docker)"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                />
                <textarea
                  rows={2}
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                  placeholder="Brief description of the project impact and problem solved..."
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                />
              </div>
            ))}

            <button
              onClick={addProject}
              className="w-full py-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{t.actions.addProject}</span>
            </button>
          </div>
        )}
      </div>

      {/* Accordion 7: Certifications & Licenses */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <button
          onClick={() => toggleSection('certifications')}
          className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>{t.cvHeadings.certifications} ({data.certifications.length})</span>
          </div>
          {openSection === 'certifications' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'certifications' && (
          <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    placeholder="Certification Name (e.g. AWS Solutions Architect)"
                    className="font-bold px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md w-2/3"
                  />
                  <button onClick={() => removeCertification(cert.id)} className="p-1 text-slate-400 hover:text-rose-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    placeholder="Issuer (e.g. Amazon Web Services)"
                    className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                  />
                  <input
                    type="text"
                    value={cert.issueDate}
                    onChange={(e) => updateCertification(cert.id, 'issueDate', e.target.value)}
                    placeholder="Date (e.g. Aug 2023)"
                    className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addCertification}
              className="w-full py-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{t.actions.addCertification}</span>
            </button>
          </div>
        )}
      </div>

      {/* Accordion 8: Languages & Awards */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <button
          onClick={() => toggleSection('languages')}
          className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <LangIcon className="w-4 h-4 text-indigo-600" />
            <span>{t.cvHeadings.languages} & {t.cvHeadings.awards}</span>
          </div>
          {openSection === 'languages' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'languages' && (
          <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="space-y-2">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Languages:</span>
              {data.languages.map((l) => (
                <div key={l.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={l.language}
                    onChange={(e) => updateLanguage(l.id, 'language', e.target.value)}
                    placeholder="Language (e.g. English)"
                    className="flex-1 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md"
                  />
                  <input
                    type="text"
                    value={l.proficiency}
                    onChange={(e) => updateLanguage(l.id, 'proficiency', e.target.value)}
                    placeholder="Proficiency (e.g. Native, Fluent)"
                    className="w-40 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md"
                  />
                  <button onClick={() => removeLanguage(l.id)} className="p-1 text-slate-400 hover:text-rose-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={addLanguage}
                className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>{t.actions.addLanguage}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Honors & Awards:</span>
              {data.awards.map((aw) => (
                <div key={aw.id} className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={aw.title}
                      onChange={(e) => updateAward(aw.id, 'title', e.target.value)}
                      placeholder="Award Title (e.g. Hackathon Champion)"
                      className="font-bold px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md flex-1 mr-2"
                    />
                    <button onClick={() => removeAward(aw.id)} className="p-1 text-slate-400 hover:text-rose-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={aw.issuer}
                      onChange={(e) => updateAward(aw.id, 'issuer', e.target.value)}
                      placeholder="Issuing Organization"
                      className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                    />
                    <input
                      type="text"
                      value={aw.year}
                      onChange={(e) => updateAward(aw.id, 'year', e.target.value)}
                      placeholder="Year (e.g. 2023)"
                      className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addAward}
                className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>{t.actions.addAward}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Custom Section Button */}
      <div className="pt-2">
        <button
          onClick={addCustomSection}
          className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4 text-indigo-500" />
          <span>{t.actions.addCustomSection}</span>
        </button>
      </div>

    </div>
  );
};
