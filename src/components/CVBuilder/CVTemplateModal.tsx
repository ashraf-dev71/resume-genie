import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Check, 
  Award, 
  Layout, 
  Sparkles, 
  Eye, 
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { CVTemplate, TemplateCategory, Language, CVData } from '../../types';
import { CV_TEMPLATES, CATEGORY_LABELS } from '../../data/templates';
import { TRANSLATIONS } from '../../data/i18n';
import { CVRenderer } from './CVRenderer';

interface CVTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplateId: string;
  onSelectTemplate: (template: CVTemplate) => void;
  lang: Language;
  currentCvData?: CVData;
}

export const CVTemplateModal: React.FC<CVTemplateModalProps> = ({
  isOpen,
  onClose,
  selectedTemplateId,
  onSelectTemplate,
  lang,
  currentCvData,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<CVTemplate | null>(null);
  const [previewZoom, setPreviewZoom] = useState(0.7);

  const t = TRANSLATIONS[lang];

  const filteredTemplates = useMemo(() => {
    return CV_TEMPLATES.filter((tpl) => {
      const matchesCategory = selectedCategory === 'all' || tpl.category === selectedCategory;
      const matchesQuery =
        tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  // Render authentic miniature graphic matching the template's layout & styling
  const renderTemplateWireframe = (template: CVTemplate) => {
    const primary = template.primaryColor;
    const secondary = template.secondaryColor;

    // 1. Two Column Left
    if (template.layout === 'two-column-left') {
      return (
        <div className="flex gap-1.5 h-full w-full bg-white dark:bg-slate-900 rounded p-1 overflow-hidden">
          {/* Left Sidebar */}
          <div 
            className="w-[36%] rounded p-1.5 flex flex-col justify-between"
            style={{ backgroundColor: `${primary}15` }}
          >
            <div className="space-y-1.5">
              {template.hasPhoto ? (
                <div 
                  className="w-5 h-5 rounded-full mx-auto border"
                  style={{ borderColor: primary, backgroundColor: `${primary}30` }}
                />
              ) : (
                <div className="w-5 h-1.5 rounded mx-auto" style={{ backgroundColor: primary }} />
              )}
              <div className="h-1 w-full rounded" style={{ backgroundColor: `${primary}40` }} />
              <div className="h-1 w-3/4 rounded" style={{ backgroundColor: `${primary}40` }} />
              <div className="pt-1 space-y-1">
                <div className="h-1 w-full rounded bg-slate-300 dark:bg-slate-700" />
                <div className="h-1 w-4/5 rounded bg-slate-300 dark:bg-slate-700" />
                <div className="h-1 w-3/5 rounded bg-slate-300 dark:bg-slate-700" />
              </div>
            </div>
            <div className="flex gap-0.5">
              <span className="h-1 w-2 rounded" style={{ backgroundColor: primary }} />
              <span className="h-1 w-2 rounded" style={{ backgroundColor: secondary }} />
            </div>
          </div>

          {/* Right Main Body */}
          <div className="flex-1 p-1 space-y-1.5 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="h-2 w-3/4 rounded" style={{ backgroundColor: primary }} />
              <div className="h-1 w-1/2 rounded" style={{ backgroundColor: secondary }} />
              <div className="h-0.5 w-full bg-slate-200 dark:bg-slate-700 my-0.5" />
              <div className="h-1 w-full rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-1 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
              <div className="h-1.5 w-2/5 rounded" style={{ backgroundColor: primary }} />
              <div className="h-1 w-full rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-1 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      );
    }

    // 2. Two Column Right
    if (template.layout === 'two-column-right') {
      return (
        <div className="flex gap-1.5 h-full w-full bg-white dark:bg-slate-900 rounded p-1 overflow-hidden">
          {/* Left Main Body */}
          <div className="flex-1 p-1 space-y-1.5 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="h-2 w-3/4 rounded" style={{ backgroundColor: primary }} />
              <div className="h-1 w-1/2 rounded" style={{ backgroundColor: secondary }} />
              <div className="h-0.5 w-full bg-slate-200 dark:bg-slate-700 my-0.5" />
              <div className="h-1 w-full rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-1 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
              <div className="h-1.5 w-2/5 rounded" style={{ backgroundColor: primary }} />
              <div className="h-1 w-full rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

          {/* Right Sidebar */}
          <div 
            className="w-[36%] rounded p-1.5 flex flex-col justify-between"
            style={{ backgroundColor: `${primary}15` }}
          >
            <div className="space-y-1.5">
              <div className="w-5 h-1.5 rounded mx-auto" style={{ backgroundColor: primary }} />
              <div className="h-1 w-full rounded" style={{ backgroundColor: `${primary}40` }} />
              <div className="h-1 w-3/4 rounded" style={{ backgroundColor: `${primary}40` }} />
              <div className="pt-1 space-y-1">
                <div className="h-1 w-full rounded bg-slate-300 dark:bg-slate-700" />
                <div className="h-1 w-3/5 rounded bg-slate-300 dark:bg-slate-700" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 3. Modern Header
    if (template.layout === 'modern-header') {
      return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-slate-900 rounded overflow-hidden">
          {/* Top Banner */}
          <div 
            className="p-2 text-white flex items-center justify-between"
            style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
          >
            <div className="space-y-1">
              <div className="h-2 w-16 bg-white rounded" />
              <div className="h-1 w-10 bg-white/70 rounded" />
            </div>
            {template.hasPhoto && (
              <div className="w-5 h-5 rounded-full border border-white/80 bg-white/20" />
            )}
          </div>
          {/* Content */}
          <div className="p-2 space-y-1.5 flex-1 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="h-1.5 w-1/3 rounded" style={{ backgroundColor: primary }} />
              <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-1 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
              <div className="h-1.5 w-1/4 rounded" style={{ backgroundColor: primary }} />
              <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        </div>
      );
    }

    // 4. Harvard Classic (Ivy League Standard)
    if (template.layout === 'harvard-classic') {
      return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-slate-900 rounded p-2 overflow-hidden justify-between">
          <div className="space-y-1 text-center">
            <div className="h-2 w-20 mx-auto rounded" style={{ backgroundColor: primary }} />
            <div className="h-1 w-14 mx-auto rounded bg-slate-400" />
            <div className="h-0.5 w-full bg-slate-800 dark:bg-slate-600 mt-1" />
          </div>
          <div className="space-y-1.5 flex-1 pt-2">
            <div className="h-1.5 w-1/3 border-b border-slate-800 dark:border-slate-600 pb-0.5" style={{ color: primary }}>
              <div className="h-1 w-16 rounded" style={{ backgroundColor: primary }} />
            </div>
            <div className="h-1 w-full rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-1 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-1.5 w-1/3 border-b border-slate-800 dark:border-slate-600 pb-0.5 mt-1">
              <div className="h-1 w-12 rounded" style={{ backgroundColor: primary }} />
            </div>
            <div className="h-1 w-full rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="text-[8px] font-serif text-slate-400 text-center">HARVARD FORMAT</div>
        </div>
      );
    }

    // 5. Timeline Layout
    if (template.layout === 'timeline') {
      return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-slate-900 rounded p-2 overflow-hidden justify-between">
          <div className="space-y-1 pb-1 border-b border-slate-100 dark:border-slate-800">
            <div className="h-2 w-16 rounded" style={{ backgroundColor: primary }} />
            <div className="h-1 w-10 rounded" style={{ backgroundColor: secondary }} />
          </div>
          {/* Vertical timeline rail */}
          <div className="pl-3 border-l-2 my-1.5 space-y-2 relative" style={{ borderColor: `${primary}50` }}>
            <div className="relative">
              <div className="absolute -left-[15px] top-0.5 w-2 h-2 rounded-full ring-1 ring-white" style={{ backgroundColor: primary }} />
              <div className="h-1.5 w-16 rounded" style={{ backgroundColor: primary }} />
              <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded mt-0.5" />
            </div>
            <div className="relative">
              <div className="absolute -left-[15px] top-0.5 w-2 h-2 rounded-full ring-1 ring-white" style={{ backgroundColor: secondary }} />
              <div className="h-1.5 w-12 rounded" style={{ backgroundColor: secondary }} />
              <div className="h-1 w-4/5 bg-slate-200 dark:bg-slate-800 rounded mt-0.5" />
            </div>
          </div>
          <div className="text-[8px] font-mono text-slate-400">TIMELINE PROGRESSION</div>
        </div>
      );
    }

    // 6. Boxed / Card Layout
    if (template.layout === 'boxed') {
      return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-slate-900 rounded p-1.5 overflow-hidden gap-1.5">
          <div className="border border-slate-200 dark:border-slate-800 rounded p-1 bg-slate-50 dark:bg-slate-800/40">
            <div className="h-1.5 w-16 rounded" style={{ backgroundColor: primary }} />
            <div className="h-1 w-10 rounded mt-0.5" style={{ backgroundColor: secondary }} />
          </div>
          <div className="border border-slate-200 dark:border-slate-800 rounded p-1 bg-slate-50 dark:bg-slate-800/40 border-t-2" style={{ borderTopColor: primary }}>
            <div className="h-1 w-1/3 rounded" style={{ backgroundColor: primary }} />
            <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded mt-0.5" />
          </div>
          <div className="border border-slate-200 dark:border-slate-800 rounded p-1 bg-slate-50 dark:bg-slate-800/40 border-t-2" style={{ borderTopColor: secondary }}>
            <div className="h-1 w-1/4 rounded" style={{ backgroundColor: secondary }} />
            <div className="h-1 w-4/5 bg-slate-200 dark:bg-slate-700 rounded mt-0.5" />
          </div>
        </div>
      );
    }

    // 7. Compact ATS
    if (template.layout === 'compact-ats') {
      return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-slate-900 rounded p-2 overflow-hidden justify-between">
          <div className="flex justify-between items-center pb-1 border-b border-slate-300">
            <div className="h-2 w-16 rounded" style={{ backgroundColor: primary }} />
            <div className="h-1 w-12 rounded bg-slate-400" />
          </div>
          <div className="space-y-1.5 flex-1 pt-1.5">
            <div className="border-l-2 pl-1" style={{ borderColor: primary }}>
              <div className="h-1 w-14 rounded" style={{ backgroundColor: primary }} />
            </div>
            <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="border-l-2 pl-1" style={{ borderColor: secondary }}>
              <div className="h-1 w-12 rounded" style={{ backgroundColor: secondary }} />
            </div>
            <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
          <div className="text-[8px] font-mono font-bold text-emerald-600">ATS OPTIMIZED</div>
        </div>
      );
    }

    // Default Single Column
    return (
      <div className="flex flex-col h-full w-full bg-white dark:bg-slate-900 rounded p-2 overflow-hidden justify-between">
        <div className="space-y-1 pb-1 border-b border-slate-200 dark:border-slate-800">
          <div className="h-2.5 w-20 rounded" style={{ backgroundColor: primary }} />
          <div className="h-1 w-14 rounded" style={{ backgroundColor: secondary }} />
        </div>
        <div className="space-y-1.5 flex-1 pt-2">
          <div className="h-1.5 w-1/3 rounded" style={{ backgroundColor: primary }} />
          <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-1 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-1.5 w-1/4 rounded mt-1" style={{ backgroundColor: primary }} />
          <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
        <div className="text-[8px] font-medium text-slate-400">CLASSIC CLEAN</div>
      </div>
    );
  };

  // Preview CV with current user's data
  const renderInteractivePreviewModal = () => {
    if (!previewTemplate) return null;

    const previewCvData: CVData = currentCvData ? {
      ...currentCvData,
      selectedTemplateId: previewTemplate.id,
      primaryColor: previewTemplate.primaryColor,
      secondaryColor: previewTemplate.secondaryColor,
      fontFamily: previewTemplate.fontFamily,
      showPhoto: previewTemplate.hasPhoto,
    } : {
      ...CV_TEMPLATES[0] as any,
      selectedTemplateId: previewTemplate.id,
    };

    return (
      <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
        <div 
          className="w-full max-w-5xl h-[94vh] bg-slate-100 dark:bg-slate-950 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Preview Toolbar */}
          <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {previewTemplate.name}
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  {previewTemplate.atsScore}% ATS Match
                </span>
              </div>
              <p className="text-xs text-slate-500">{previewTemplate.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                  onClick={() => setPreviewZoom((z) => Math.max(0.4, z - 0.1))}
                  className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  {Math.round(previewZoom * 100)}%
                </span>
                <button
                  onClick={() => setPreviewZoom((z) => Math.min(1.2, z + 0.1))}
                  className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => {
                  onSelectTemplate(previewTemplate);
                  setPreviewTemplate(null);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Apply This Template</span>
              </button>

              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Large Live Render Area */}
          <div className="flex-1 overflow-auto p-6 flex justify-center items-start bg-slate-200/70 dark:bg-slate-950">
            <div 
              className="transition-transform duration-150 origin-top shadow-2xl rounded-sm border border-slate-300/80 bg-white"
              style={{
                transform: `scale(${previewZoom})`,
                marginBottom: `${(previewZoom - 1) * 350}px`,
              }}
            >
              <CVRenderer data={previewCvData} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-6xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                112+ ATS-Friendly Resume Templates
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select or preview in real-time. Full fidelity match with live exports.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All ({CV_TEMPLATES.length})
            </button>
            {(['corporate', 'creative', 'it', 'academic'] as TemplateCategory[]).map((cat) => {
              const count = CV_TEMPLATES.filter((tpl) => tpl.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {CATEGORY_LABELS[cat].en} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates, styles, Harvard, ATS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTemplates.map((template) => {
              const isSelected = template.id === selectedTemplateId;
              return (
                <div
                  key={template.id}
                  className={`group relative flex flex-col rounded-xl border p-3.5 transition-all duration-200 hover:shadow-lg ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 ring-2 ring-indigo-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Miniature Graphic */}
                  <div 
                    onClick={() => {
                      onSelectTemplate(template);
                      onClose();
                    }}
                    className="relative h-44 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-2 overflow-hidden flex flex-col justify-between cursor-pointer group-hover:scale-[1.01] transition-transform"
                  >
                    {renderTemplateWireframe(template)}

                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-indigo-600 text-white p-1 rounded-full shadow-md z-10">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Hover Overlay with Live Preview Action */}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTemplate(template);
                        }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/95 text-slate-900 font-bold text-xs shadow-md hover:bg-white"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Preview</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTemplate(template);
                          onClose();
                        }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-md hover:bg-indigo-700"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Apply</span>
                      </button>
                    </div>
                  </div>

                  {/* Template Meta */}
                  <div className="mt-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {template.name}
                        </h4>
                        <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                          <Award className="w-2.5 h-2.5" />
                          {template.atsScore}% ATS
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {template.description}
                      </p>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="capitalize font-medium flex items-center gap-1">
                        <Layout className="w-3 h-3" />
                        {template.layout.replace('-', ' ')}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPreviewTemplate(template)}
                          className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-0.5"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Full View</span>
                        </button>
                        <div 
                          className="w-3 h-3 rounded-full border border-slate-300" 
                          style={{ backgroundColor: template.primaryColor }}
                          title="Primary Color"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p>No templates found matching "{searchQuery}". Try selecting another category.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredTemplates.length} of {CV_TEMPLATES.length} templates</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300"
          >
            {t.actions.close}
          </button>
        </div>
      </div>

      {/* Interactive Full Preview Modal */}
      {renderInteractivePreviewModal()}
    </div>
  );
};
