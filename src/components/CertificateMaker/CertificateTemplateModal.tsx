import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Award, 
  Check, 
  ShieldCheck,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CertificateTemplate, CertificateData, CertificateLayoutType } from '../../types';
import { CERTIFICATE_TEMPLATES, CERTIFICATE_CATEGORIES } from '../../data/certificateTemplates';

interface CertificateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplateId?: string;
  onSelectTemplate: (template: CertificateTemplate) => void;
}

const getTemplateLayoutType = (template: CertificateTemplate): CertificateLayoutType => {
  if (template.layoutType) return template.layoutType;
  if (template.borderStyle === 'vintage-guilloche' || template.borderStyle === 'ornate-crest' || template.borderStyle === 'double-gold') {
    return 'classic-royal';
  }
  if (template.borderStyle === 'modern-geometric') return 'modern-bauhaus';
  if (template.borderStyle === 'ribbon-frame') return 'corporate-sash';
  if (template.borderStyle === 'cyber-bracket' || template.category === 'tech' || template.category === 'course') return 'cyber-matrix';
  if (template.category === 'honors') return 'art-deco';
  if (template.category === 'creative') return 'botanical-ivy';
  if (template.category === 'sports') return 'sports-championship';
  if (template.borderStyle === 'minimalist-line') return 'minimalist-monoline';
  return 'classic-royal';
};

export const CertificateTemplateModal: React.FC<CertificateTemplateModalProps> = ({
  isOpen,
  onClose,
  currentTemplateId,
  onSelectTemplate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTemplates = useMemo(() => {
    return CERTIFICATE_TEMPLATES.filter((tpl) => {
      const matchCategory = selectedCategory === 'all' || tpl.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        tpl.name.toLowerCase().includes(q) ||
        tpl.title.toLowerCase().includes(q) ||
        tpl.description.toLowerCase().includes(q) ||
        tpl.tags.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Certificate Templates Catalog
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-mono">
                  {CERTIFICATE_TEMPLATES.length} Styles
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                A4 Landscape certificates for universities, enterprise awards, bootcamps, honors, and sports.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar & Search */}
        <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search academic, corporate, honors, or tech certificates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>A4 Landscape • 297 × 210 mm Ready</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-medium no-scrollbar">
            {CERTIFICATE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-amber-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Templates Grid Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-950/50">
          {filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Layers className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">No certificates found</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Try searching for another keyword or switching categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-3 py-1.5 text-xs font-semibold text-amber-600 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => {
                const isCurrent = currentTemplateId === template.id;
                return (
                  <div
                    key={template.id}
                    onClick={() => {
                      const layoutType = getTemplateLayoutType(template);
                      onSelectTemplate({
                        ...template,
                        layoutType,
                      });
                      onClose();
                    }}
                    className={`group relative rounded-2xl border p-4 bg-white dark:bg-slate-900 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                      isCurrent
                        ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700'
                    }`}
                  >
                    {/* Miniature Certificate Preview Frame */}
                    <div 
                      className="h-28 w-full rounded-xl overflow-hidden relative p-3 flex flex-col justify-between mb-3 border-4 shadow-xs"
                      style={{
                        borderColor: template.primaryColor,
                        backgroundColor: template.backgroundColor || '#fffdf7',
                      }}
                    >
                      {/* Inner Decorative Frame Border */}
                      <div 
                        className="absolute inset-1.5 border pointer-events-none opacity-60"
                        style={{ borderColor: template.primaryColor }}
                      />

                      <div className="flex justify-between items-start relative z-10">
                        <span 
                          className="text-[9px] font-bold tracking-wider uppercase truncate max-w-[170px]"
                          style={{ color: template.primaryColor }}
                        >
                          {template.headerText}
                        </span>
                        <span 
                          className="text-[8px] font-bold px-1.5 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: template.secondaryColor }}
                        >
                          {template.category}
                        </span>
                      </div>

                      <div className="text-center my-auto relative z-10">
                        <h5 
                          className="text-xs font-serif font-bold tracking-wide uppercase truncate px-2"
                          style={{ color: template.primaryColor }}
                        >
                          {template.title}
                        </h5>
                        <div 
                          className="w-16 h-0.5 mx-auto mt-1 rounded-full" 
                          style={{ backgroundColor: template.secondaryColor }} 
                        />
                      </div>

                      <div className="flex justify-between items-end relative z-10 text-[8px] text-slate-400">
                        <span>Seal: {template.sealType.replace('-', ' ')}</span>
                        <div className="flex items-center gap-1">
                          <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: template.primaryColor }} 
                          />
                          <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: template.secondaryColor }} 
                          />
                        </div>
                      </div>

                      {/* Active Indicator */}
                      {isCurrent && (
                        <div className="absolute top-2 right-2 p-1 rounded-full bg-amber-500 text-white shadow-md z-20">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Information */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                          {template.name}
                        </h4>
                        <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase">
                          {(template.layoutType || getTemplateLayoutType(template)).replace('-', ' ')}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {template.description}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-1">
                        {template.tags.slice(0, 3).map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="text-[9px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-[11px]">
                        <span className="text-slate-400 font-serif capitalize">
                          Font: {template.fontPairing.replace('-', ' ')}
                        </span>
                        <span className="font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          {isCurrent ? 'Current' : 'Use Template'}
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs bg-slate-50/70 dark:bg-slate-900/80 text-slate-500">
          <span>Showing {filteredTemplates.length} of {CERTIFICATE_TEMPLATES.length} Certificate Templates</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
