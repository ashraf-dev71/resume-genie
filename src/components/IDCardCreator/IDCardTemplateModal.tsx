import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Sparkles, 
  Check, 
  CreditCard,
  Layers,
  ArrowRight
} from 'lucide-react';
import { IDCardTemplate, StudentIDData, IDCardDesignType } from '../../types';
import { ID_CARD_TEMPLATES, ID_CARD_CATEGORIES } from '../../data/idCardTemplates';

interface IDCardTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplateId?: string;
  onSelectTemplate: (template: IDCardTemplate) => void;
}

const getTemplateDesignType = (template: IDCardTemplate): IDCardDesignType => {
  if (template.designType) return template.designType;
  if (template.bgPattern === 'circuit' || template.category === 'tech') return 'tech-silicon';
  if (template.headerStyle === 'split-vertical' || template.layout === 'horizontal') return 'horizontal-dualcol';
  if (template.category === 'medical') return 'medical-emergency';
  if (template.category === 'security') return 'police-security';
  if (template.category === 'event') return 'conference-vip';
  if (template.category === 'minimalist') return 'swiss-minimalist';
  if (template.headerStyle === 'slanted' || template.name.toLowerCase().includes('athletic')) return 'sports-athletic';
  if (template.headerStyle === 'badge-top' || template.name.toLowerCase().includes('cyber')) return 'cyber-keycard';
  return 'executive-smartchip';
};

export const IDCardTemplateModal: React.FC<IDCardTemplateModalProps> = ({
  isOpen,
  onClose,
  currentTemplateId,
  onSelectTemplate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [layoutFilter, setLayoutFilter] = useState<'all' | 'vertical' | 'horizontal'>('all');

  const filteredTemplates = useMemo(() => {
    return ID_CARD_TEMPLATES.filter((tpl) => {
      const matchCategory = selectedCategory === 'all' || tpl.category === selectedCategory;
      const matchLayout = layoutFilter === 'all' || tpl.layout === layoutFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        tpl.name.toLowerCase().includes(q) ||
        tpl.badgeText.toLowerCase().includes(q) ||
        tpl.description.toLowerCase().includes(q);
      return matchCategory && matchLayout && matchSearch;
    });
  }, [searchQuery, selectedCategory, layoutFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  ID Card Templates Catalog
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-mono">
                  {ID_CARD_TEMPLATES.length} Designs
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select from corporate, collegiate, healthcare, cyberpunk, and official CR80 card designs.
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
                placeholder="Search by role, university, tech, or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

            {/* Layout filter pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
              <button
                onClick={() => setLayoutFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  layoutFilter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                All Layouts
              </button>
              <button
                onClick={() => setLayoutFilter('vertical')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  layoutFilter === 'vertical'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Vertical (Portrait)
              </button>
              <button
                onClick={() => setLayoutFilter('horizontal')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  layoutFilter === 'horizontal'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Horizontal (Landscape)
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-medium no-scrollbar">
            {ID_CARD_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Template Grid Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-950/50">
          {filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Layers className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">No templates found</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Try searching for a different keyword or resetting the category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setLayoutFilter('all');
                }}
                className="mt-4 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:underline"
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
                      const designType = getTemplateDesignType(template);
                      onSelectTemplate({
                        ...template,
                        designType,
                      });
                      onClose();
                    }}
                    className={`group relative rounded-2xl border p-4 bg-white dark:bg-slate-900 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                      isCurrent
                        ? 'border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                    {/* Visual Card Representation */}
                    <div 
                      className={`h-28 w-full rounded-xl overflow-hidden relative p-3 flex flex-col justify-between mb-3 text-white bg-gradient-to-br ${template.previewGradient}`}
                      style={{ backgroundColor: template.primaryColor }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-white/70 animate-pulse" />
                          <span className="text-[10px] font-bold tracking-widest uppercase opacity-90">
                            {template.layout.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-black/25 backdrop-blur-xs">
                          {template.category}
                        </span>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/20 uppercase tracking-wider block w-fit mb-1">
                          {template.badgeText}
                        </span>
                        <div className="h-1 w-12 rounded-full" style={{ backgroundColor: template.accentColor }} />
                      </div>

                      {/* Active checkmark */}
                      {isCurrent && (
                        <div className="absolute top-2 right-2 p-1 rounded-full bg-indigo-600 text-white shadow-md">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Metadata & Description */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                          {template.name}
                        </h4>
                        <div className="flex items-center gap-1">
                          <span 
                            className="w-3 h-3 rounded-full border border-white dark:border-slate-800 shadow-xs" 
                            style={{ backgroundColor: template.primaryColor }} 
                            title="Primary Accent"
                          />
                          <span 
                            className="w-3 h-3 rounded-full border border-white dark:border-slate-800 shadow-xs" 
                            style={{ backgroundColor: template.secondaryColor }} 
                            title="Secondary Accent"
                          />
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {template.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-[11px]">
                        <span className="text-slate-400 font-mono capitalize">
                          Archetype: {(template.designType || getTemplateDesignType(template)).replace('-', ' ')}
                        </span>
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          {isCurrent ? 'Current' : 'Select'}
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

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs bg-slate-50/70 dark:bg-slate-900/80 text-slate-500">
          <span>Showing {filteredTemplates.length} of {ID_CARD_TEMPLATES.length} ID Card Designs</span>
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
