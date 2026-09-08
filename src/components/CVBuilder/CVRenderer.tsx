import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  Code,
  GraduationCap,
  Languages,
  FileCheck
} from 'lucide-react';
import { CVData } from '../../types';
import { TRANSLATIONS } from '../../data/i18n';
import { CV_TEMPLATES } from '../../data/templates';

interface CVRendererProps {
  data: CVData;
}

export const CVRenderer: React.FC<CVRendererProps> = ({ data }) => {
  const currentTemplate = CV_TEMPLATES.find((t) => t.id === data.selectedTemplateId) || CV_TEMPLATES[0];
  const lang = data.outputLanguage || 'en';
  const t = TRANSLATIONS[lang];

  // Font family mapping
  const getFontFamilyClass = () => {
    if (lang === 'bn') return 'font-bengali';
    const font = data.fontFamily || currentTemplate.fontFamily || 'sans';
    switch (font) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      case 'display': return 'font-sans tracking-tight';
      default: return 'font-sans';
    }
  };

  const primaryColor = data.primaryColor || currentTemplate.primaryColor || '#0f172a';
  const secondaryColor = data.secondaryColor || currentTemplate.secondaryColor || '#3b82f6';
  const layout = currentTemplate.layout;
  const borderStyle = currentTemplate.borderStyle || 'none';

  // Photo shape styling
  const getPhotoShapeClass = () => {
    switch (data.profile.photoShape) {
      case 'circle': return 'rounded-full';
      case 'rounded': return 'rounded-2xl';
      case 'square': return 'rounded-none';
      default: return 'rounded-full';
    }
  };

  // Section Heading Component
  const SectionHeader: React.FC<{ title: string; icon?: React.ReactNode }> = ({ title, icon }) => {
    if (layout === 'harvard-classic') {
      return (
        <div className="mb-2 mt-4 pb-0.5 border-b-1.5 border-slate-900 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-serif">
            {title}
          </h3>
        </div>
      );
    }

    if (layout === 'compact-ats') {
      return (
        <div 
          className="mb-2 mt-3 pl-2.5 py-0.5 border-l-4 bg-slate-50 flex items-center justify-between"
          style={{ borderLeftColor: primaryColor }}
        >
          <h3 
            className="text-xs font-bold uppercase tracking-wider text-slate-800"
          >
            {title}
          </h3>
        </div>
      );
    }

    if (layout === 'boxed') {
      return (
        <div className="mb-2.5 flex items-center gap-2 pb-1.5 border-b border-slate-100">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: primaryColor }} 
          />
          <h3 
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: primaryColor }}
          >
            {title}
          </h3>
        </div>
      );
    }

    if (layout === 'modern-header') {
      return (
        <div className="mb-2.5 mt-4 flex items-center gap-2 pb-1 border-b-2" style={{ borderBottomColor: `${primaryColor}30` }}>
          {icon && <span style={{ color: primaryColor }}>{icon}</span>}
          <h3 
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: primaryColor }}
          >
            {title}
          </h3>
        </div>
      );
    }

    return (
      <div className="mb-2.5 mt-4 flex items-center gap-2 pb-1 border-b border-slate-200">
        {icon && <span style={{ color: primaryColor }}>{icon}</span>}
        <h3 
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: primaryColor }}
        >
          {title}
        </h3>
      </div>
    );
  };

  // Header Rendering for Standard / Single / Boxed / Timeline
  const renderStandardHeader = () => {
    return (
      <div className="page-break-avoid mb-5 pb-4 border-b border-slate-200">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 
              className="text-2xl font-bold tracking-tight leading-tight"
              style={{ color: primaryColor }}
            >
              {data.profile.fullName || 'Your Full Name'}
            </h1>
            <p 
              className="text-sm font-semibold mt-0.5"
              style={{ color: secondaryColor }}
            >
              {data.profile.jobTitle || 'Professional Job Title'}
            </p>

            {/* Contact details row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-600">
              {data.profile.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{data.profile.email}</span>
                </div>
              )}
              {data.profile.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{data.profile.phone}</span>
                </div>
              )}
              {data.profile.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{data.profile.location}</span>
                </div>
              )}
              {data.profile.website && (
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{data.profile.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
              {data.profile.linkedin && (
                <div className="flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{data.profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                </div>
              )}
              {data.profile.github && (
                <div className="flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span>{data.profile.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Picture */}
          {data.showPhoto && data.profile.photoUrl && (
            <div className="shrink-0">
              <img
                src={data.profile.photoUrl}
                alt={data.profile.fullName}
                className={`w-24 h-24 object-cover border-2 shadow-xs ${getPhotoShapeClass()}`}
                style={{ borderColor: primaryColor }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Header Rendering for Harvard Classic
  const renderHarvardHeader = () => {
    return (
      <div className="page-break-avoid mb-4 pb-3 border-b-2 border-slate-900 text-center font-serif">
        <h1 className="text-2xl font-bold tracking-wider uppercase text-slate-950">
          {data.profile.fullName || 'YOUR FULL NAME'}
        </h1>
        {data.profile.jobTitle && (
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-700 mt-1">
            {data.profile.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 mt-2 text-xs text-slate-800">
          {data.profile.location && <span>{data.profile.location}</span>}
          {data.profile.phone && <span>• {data.profile.phone}</span>}
          {data.profile.email && <span>• {data.profile.email}</span>}
          {data.profile.linkedin && <span>• {data.profile.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>}
          {data.profile.website && <span>• {data.profile.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </div>
    );
  };

  // Header Rendering for Modern Header
  const renderModernHeader = () => {
    return (
      <div 
        className="page-break-avoid -mx-8 -mt-8 mb-6 p-7 text-white shadow-sm"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` 
        }}
      >
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-xs">
              {data.profile.fullName || 'Your Full Name'}
            </h1>
            <p className="text-sm font-medium text-white/90 mt-1 tracking-wide">
              {data.profile.jobTitle || 'Professional Job Title'}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-white/90">
              {data.profile.email && (
                <div className="flex items-center gap-1.5 bg-black/10 px-2 py-0.5 rounded">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{data.profile.email}</span>
                </div>
              )}
              {data.profile.phone && (
                <div className="flex items-center gap-1.5 bg-black/10 px-2 py-0.5 rounded">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{data.profile.phone}</span>
                </div>
              )}
              {data.profile.location && (
                <div className="flex items-center gap-1.5 bg-black/10 px-2 py-0.5 rounded">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{data.profile.location}</span>
                </div>
              )}
              {data.profile.linkedin && (
                <div className="flex items-center gap-1.5 bg-black/10 px-2 py-0.5 rounded">
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>{data.profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                </div>
              )}
            </div>
          </div>

          {data.showPhoto && data.profile.photoUrl && (
            <div className="shrink-0">
              <img
                src={data.profile.photoUrl}
                alt={data.profile.fullName}
                className={`w-24 h-24 object-cover border-3 border-white/80 shadow-md ${getPhotoShapeClass()}`}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Header Rendering for Compact ATS
  const renderCompactATSHeader = () => {
    return (
      <div className="page-break-avoid mb-3 pb-2 border-b border-slate-300">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">
              {data.profile.fullName || 'Your Full Name'}
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mt-0.5">
              {data.profile.jobTitle || 'Professional Job Title'}
            </p>
          </div>
          <div className="text-right text-[11px] text-slate-600 space-y-0.5">
            <div>{data.profile.email} {data.profile.phone && `| ${data.profile.phone}`}</div>
            <div>{data.profile.location} {data.profile.linkedin && `| ${data.profile.linkedin.replace(/^https?:\/\/(www\.)?/, '')}`}</div>
          </div>
        </div>
      </div>
    );
  };

  // Experience Section
  const renderExperience = (isTimeline = false) => {
    if (!data.experiences || data.experiences.length === 0) return null;
    return (
      <div className="page-break-avoid mb-4">
        <SectionHeader title={t.cvHeadings.experience} icon={<Briefcase className="w-3.5 h-3.5" />} />
        
        {isTimeline ? (
          <div className="relative pl-5 ml-2 border-l-2 space-y-4" style={{ borderColor: `${primaryColor}40` }}>
            {data.experiences.map((exp) => (
              <div key={exp.id} className="relative page-break-avoid">
                {/* Timeline Dot */}
                <div 
                  className="absolute -left-[27px] top-1 w-3 h-3 rounded-full border-2 border-white ring-2"
                  style={{ backgroundColor: primaryColor, color: primaryColor }}
                />
                <div className="flex items-start justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {exp.title}
                    </h4>
                    <span className="font-semibold" style={{ color: secondaryColor }}>
                      {exp.company}
                    </span>
                    {exp.location && <span className="text-slate-500"> • {exp.location}</span>}
                  </div>
                  <div className="text-right text-[11px] font-semibold text-slate-500 shrink-0 bg-slate-100 px-2 py-0.5 rounded">
                    {exp.startDate} – {exp.current ? t.cvHeadings.present : exp.endDate}
                  </div>
                </div>

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="mt-1.5 space-y-1 text-xs text-slate-700 list-disc list-outside pl-4 leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3.5">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid">
                <div className="flex items-start justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {exp.title}
                    </h4>
                    <span className="font-medium text-slate-700">
                      {exp.company}
                    </span>
                    {exp.location && <span className="text-slate-500"> • {exp.location}</span>}
                  </div>
                  <div className="text-right text-[11px] font-medium text-slate-500 shrink-0">
                    {exp.startDate} – {exp.current ? t.cvHeadings.present : exp.endDate}
                  </div>
                </div>

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="mt-1.5 space-y-1 text-xs text-slate-700 list-disc list-outside pl-4 leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Education Section
  const renderEducation = (isTimeline = false) => {
    if (!data.educations || data.educations.length === 0) return null;
    return (
      <div className="page-break-avoid mb-4">
        <SectionHeader title={t.cvHeadings.education} icon={<BookOpen className="w-3.5 h-3.5" />} />
        
        {isTimeline ? (
          <div className="relative pl-5 ml-2 border-l-2 space-y-4" style={{ borderColor: `${primaryColor}40` }}>
            {data.educations.map((edu) => (
              <div key={edu.id} className="relative page-break-avoid">
                <div 
                  className="absolute -left-[27px] top-1 w-3 h-3 rounded-full border-2 border-white ring-2"
                  style={{ backgroundColor: secondaryColor }}
                />
                <div className="flex items-start justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h4>
                    <p className="font-medium text-slate-700">
                      {edu.institution}
                      {edu.location && <span className="text-slate-500 font-normal"> • {edu.location}</span>}
                    </p>
                    {edu.grade && (
                      <p className="text-[11px] font-semibold text-slate-600 mt-0.5">
                        {edu.grade}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-[11px] font-semibold text-slate-500 shrink-0 bg-slate-100 px-2 py-0.5 rounded">
                    {edu.startDate} – {edu.endDate}
                  </div>
                </div>
                {edu.bullets && edu.bullets.length > 0 && (
                  <ul className="mt-1 space-y-0.5 text-xs text-slate-700 list-disc list-outside pl-4 leading-relaxed">
                    {edu.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {data.educations.map((edu) => (
              <div key={edu.id} className="page-break-avoid">
                <div className="flex items-start justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h4>
                    <p className="font-medium text-slate-700">
                      {edu.institution}
                      {edu.location && <span className="text-slate-500 font-normal"> • {edu.location}</span>}
                    </p>
                    {edu.grade && (
                      <p className="text-[11px] font-semibold text-slate-600 mt-0.5">
                        {edu.grade}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-[11px] font-medium text-slate-500 shrink-0">
                    {edu.startDate} – {edu.endDate}
                  </div>
                </div>
                {edu.bullets && edu.bullets.length > 0 && (
                  <ul className="mt-1 space-y-0.5 text-xs text-slate-700 list-disc list-outside pl-4 leading-relaxed">
                    {edu.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Skills Section
  const renderSkills = (asPills = false) => {
    if (!data.skillCategories || data.skillCategories.length === 0) return null;
    return (
      <div className="page-break-avoid mb-4">
        <SectionHeader title={t.cvHeadings.skills} icon={<Code className="w-3.5 h-3.5" />} />
        <div className="space-y-2">
          {data.skillCategories.map((sc) => (
            <div key={sc.id} className="text-xs">
              <span className="font-bold text-slate-900 mr-2">
                {sc.categoryName}:
              </span>
              {asPills ? (
                <div className="inline-flex flex-wrap gap-1 mt-1">
                  {sc.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded text-[11px] font-medium border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-slate-700">
                  {sc.skills.join(', ')}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Projects Section
  const renderProjects = () => {
    if (!data.projects || data.projects.length === 0) return null;
    return (
      <div className="page-break-avoid mb-4">
        <SectionHeader title={t.cvHeadings.projects} />
        <div className="space-y-3">
          {data.projects.map((proj) => (
            <div key={proj.id} className="page-break-avoid">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900">{proj.title}</h4>
                  {proj.role && <span className="text-slate-500 italic">({proj.role})</span>}
                </div>
                {proj.link && (
                  <span className="text-[11px] text-indigo-600 flex items-center gap-0.5">
                    {proj.link.replace(/^https?:\/\//, '')}
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
              {proj.tools && (
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                  <span className="font-semibold text-slate-600">Tech:</span> {proj.tools}
                </p>
              )}
              {proj.description && (
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  {proj.description}
                </p>
              )}
              {proj.bullets && proj.bullets.length > 0 && (
                <ul className="mt-1 space-y-0.5 text-xs text-slate-700 list-disc list-outside pl-4 leading-relaxed">
                  {proj.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Certifications Section
  const renderCertifications = () => {
    if (!data.certifications || data.certifications.length === 0) return null;
    return (
      <div className="page-break-avoid mb-4">
        <SectionHeader title={t.cvHeadings.certifications} icon={<Award className="w-3.5 h-3.5" />} />
        <div className="space-y-2">
          {data.certifications.map((cert) => (
            <div key={cert.id} className="flex items-start justify-between text-xs">
              <div>
                <h4 className="font-bold text-slate-900">{cert.name}</h4>
                <p className="text-slate-600">
                  {cert.issuer} {cert.credentialId && <span className="text-slate-400">• ID: {cert.credentialId}</span>}
                </p>
              </div>
              {cert.issueDate && (
                <span className="text-[11px] text-slate-500 shrink-0 font-medium">
                  {cert.issueDate}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Awards Section
  const renderAwards = () => {
    if (!data.awards || data.awards.length === 0) return null;
    return (
      <div className="page-break-avoid mb-4">
        <SectionHeader title={t.cvHeadings.awards} />
        <div className="space-y-2">
          {data.awards.map((award) => (
            <div key={award.id} className="text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900">{award.title}</h4>
                <span className="text-[11px] text-slate-500 font-medium">{award.year}</span>
              </div>
              <p className="text-slate-600">{award.issuer}</p>
              {award.description && <p className="text-slate-500 mt-0.5">{award.description}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Languages Section
  const renderLanguages = () => {
    if (!data.languages || data.languages.length === 0) return null;
    return (
      <div className="page-break-avoid mb-4">
        <SectionHeader title={t.cvHeadings.languages} icon={<Languages className="w-3.5 h-3.5" />} />
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {data.languages.map((l) => (
            <div key={l.id}>
              <span className="font-semibold text-slate-900">{l.language}: </span>
              <span className="text-slate-600">{l.proficiency}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Custom Sections
  const renderCustomSections = () => {
    if (!data.customSections || data.customSections.length === 0) return null;
    return (
      <>
        {data.customSections.map((sec) => (
          <div key={sec.id} className="page-break-avoid mb-4">
            <SectionHeader title={sec.title || t.cvHeadings.custom} />
            <div className="space-y-2">
              {sec.items.map((item) => (
                <div key={item.id} className="text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{item.heading}</span>
                    <span className="text-slate-500 font-normal">{item.date}</span>
                  </div>
                  {item.subheading && <p className="text-slate-600 font-medium">{item.subheading}</p>}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-1 space-y-0.5 list-disc list-outside pl-4 text-slate-700">
                      {item.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  };

  // Dispatch layout view
  const renderBodyContent = () => {
    // 1. Two Column Left Layout
    if (layout === 'two-column-left') {
      return (
        <div className="flex gap-6">
          {/* Left Column (35%) */}
          <div className="w-[34%] shrink-0 space-y-4 pr-5 border-r border-slate-200">
            {renderSkills(true)}
            {renderCertifications()}
            {renderLanguages()}
            {renderAwards()}
          </div>
          {/* Right Column (65%) */}
          <div className="flex-1 space-y-4">
            {data.summary && (
              <div className="mb-4">
                <SectionHeader title={t.cvHeadings.summary} />
                <p className="text-xs text-slate-700 leading-relaxed">{data.summary}</p>
              </div>
            )}
            {renderExperience()}
            {renderEducation()}
            {renderProjects()}
            {renderCustomSections()}
          </div>
        </div>
      );
    }

    // 2. Two Column Right Layout
    if (layout === 'two-column-right') {
      return (
        <div className="flex gap-6">
          {/* Left Column (65%) */}
          <div className="flex-1 space-y-4">
            {data.summary && (
              <div className="mb-4">
                <SectionHeader title={t.cvHeadings.summary} />
                <p className="text-xs text-slate-700 leading-relaxed">{data.summary}</p>
              </div>
            )}
            {renderExperience()}
            {renderEducation()}
            {renderProjects()}
            {renderCustomSections()}
          </div>
          {/* Right Column (35%) */}
          <div className="w-[34%] shrink-0 space-y-4 pl-5 border-l border-slate-200">
            {renderSkills(true)}
            {renderCertifications()}
            {renderLanguages()}
            {renderAwards()}
          </div>
        </div>
      );
    }

    // 3. Timeline Layout
    if (layout === 'timeline') {
      return (
        <div className="space-y-4">
          {data.summary && (
            <div className="mb-4">
              <SectionHeader title={t.cvHeadings.summary} />
              <p className="text-xs text-slate-700 leading-relaxed">{data.summary}</p>
            </div>
          )}
          {renderExperience(true)}
          {renderEducation(true)}
          {renderSkills(true)}
          {renderProjects()}
          {renderCertifications()}
          {renderAwards()}
          {renderLanguages()}
          {renderCustomSections()}
        </div>
      );
    }

    // 4. Boxed / Card Layout
    if (layout === 'boxed') {
      return (
        <div className="space-y-3.5">
          {data.summary && (
            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 shadow-2xs">
              <SectionHeader title={t.cvHeadings.summary} />
              <p className="text-xs text-slate-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {data.experiences && data.experiences.length > 0 && (
            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 shadow-2xs">
              {renderExperience()}
            </div>
          )}

          {data.educations && data.educations.length > 0 && (
            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 shadow-2xs">
              {renderEducation()}
            </div>
          )}

          {data.skillCategories && data.skillCategories.length > 0 && (
            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 shadow-2xs">
              {renderSkills(true)}
            </div>
          )}

          {data.projects && data.projects.length > 0 && (
            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 shadow-2xs">
              {renderProjects()}
            </div>
          )}

          {(data.certifications?.length > 0 || data.languages?.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.certifications?.length > 0 && (
                <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 shadow-2xs">
                  {renderCertifications()}
                </div>
              )}
              {data.languages?.length > 0 && (
                <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 shadow-2xs">
                  {renderLanguages()}
                </div>
              )}
            </div>
          )}

          {renderAwards()}
          {renderCustomSections()}
        </div>
      );
    }

    // 5. Harvard Classic Layout (Strict Ivy League standard)
    if (layout === 'harvard-classic') {
      return (
        <div className="space-y-3 font-serif">
          {data.summary && (
            <div className="mb-3">
              <SectionHeader title={t.cvHeadings.summary} />
              <p className="text-xs text-slate-800 leading-relaxed font-serif">{data.summary}</p>
            </div>
          )}
          {renderEducation()}
          {renderExperience()}
          {renderSkills()}
          {renderProjects()}
          {renderCertifications()}
          {renderAwards()}
          {renderLanguages()}
          {renderCustomSections()}
        </div>
      );
    }

    // 6. Compact ATS Layout
    if (layout === 'compact-ats') {
      return (
        <div className="space-y-2.5 text-[11px] leading-snug">
          {data.summary && (
            <div>
              <SectionHeader title={t.cvHeadings.summary} />
              <p className="text-slate-700 leading-relaxed">{data.summary}</p>
            </div>
          )}
          {renderSkills(true)}
          {renderExperience()}
          {renderEducation()}
          {renderProjects()}
          {renderCertifications()}
          {renderAwards()}
          {renderLanguages()}
          {renderCustomSections()}
        </div>
      );
    }

    // 7. Single Column Standard / Modern Header
    return (
      <div className="space-y-4">
        {data.summary && (
          <div className="mb-4">
            <SectionHeader title={t.cvHeadings.summary} />
            <p className="text-xs text-slate-700 leading-relaxed">{data.summary}</p>
          </div>
        )}
        {renderExperience()}
        {renderEducation()}
        {renderSkills()}
        {renderProjects()}
        {renderCertifications()}
        {renderAwards()}
        {renderLanguages()}
        {renderCustomSections()}
      </div>
    );
  };

  // Container border style mapping
  const getContainerBorderClass = () => {
    switch (borderStyle) {
      case 'frame':
        return 'border-4 border-double';
      case 'accent-top':
        return 'border-t-[6px]';
      case 'thin':
        return 'border border-slate-300';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`a4-print-container bg-white text-slate-900 p-8 ${getFontFamilyClass()} ${getContainerBorderClass()}`}
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        borderColor: primaryColor,
      }}
    >
      {layout === 'harvard-classic' && renderHarvardHeader()}
      {layout === 'modern-header' && renderModernHeader()}
      {layout === 'compact-ats' && renderCompactATSHeader()}
      {layout !== 'harvard-classic' && layout !== 'modern-header' && layout !== 'compact-ats' && renderStandardHeader()}

      {renderBodyContent()}
    </div>
  );
};
