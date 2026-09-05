import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  Users, 
  Mail, 
  FileText, 
  Phone, 
  MapPin, 
  ChevronRight, 
  FileDown, 
  Sparkles,
  Command,
  ArrowRight
} from 'lucide-react';
import { INITIAL_SPECIALISTS, INITIAL_TEMPLATES } from '../constants';
import { Specialist, EmailTemplate, SpecialistCategory } from '../types';
import { exportTemplateToPdf } from '../utils/pdfExport';

interface GlobalSearchProps {
  onNavigateToSpecialist: (specialistId: string, name?: string) => void;
  onNavigateToTemplate: (templateId: string) => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  [SpecialistCategory.ADMINISTRACIJA]: { bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300', text: 'text-emerald-700' },
  [SpecialistCategory.SOCIALINIAI]: { bg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300', text: 'text-blue-700' },
  [SpecialistCategory.SVEIKATA]: { bg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300', text: 'text-rose-700' },
  [SpecialistCategory.PSICHOLOGAI]: { bg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300', text: 'text-purple-700' },
  [SpecialistCategory.LOGOPEDAI]: { bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300', text: 'text-amber-700' },
  [SpecialistCategory.SPECIALIEJI]: { bg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300', text: 'text-slate-700' },
};

function normalizeString(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  onNavigateToSpecialist,
  onNavigateToTemplate,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'specialists' | 'templates'>('all');
  const [exportingId, setExportingId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load specialists from localStorage or fallback
  const allSpecialists = useMemo<Specialist[]>(() => {
    try {
      const saved = localStorage.getItem('vap_specialists_v6');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return INITIAL_SPECIALISTS;
  }, [isOpen]);

  // Global shortcut Ctrl+K or Cmd+K or "/"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search results
  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return { specialists: [], templates: [], totalCount: 0 };
    }

    const normQuery = normalizeString(trimmed);
    const words = normQuery.split(/\s+/).filter(Boolean);

    // Filter specialists
    const matchingSpecialists = allSpecialists.filter(s => {
      const target = normalizeString(`${s.name} ${s.category} ${s.classes} ${s.office} ${s.phone} ${s.email}`);
      return words.every(w => target.includes(w));
    });

    // Filter templates
    const matchingTemplates = INITIAL_TEMPLATES.filter(t => {
      const target = normalizeString(`${t.title} ${t.category} ${t.subject} ${t.body} ${t.recipientType || ''} ${t.level || ''}`);
      return words.every(w => target.includes(w));
    });

    return {
      specialists: matchingSpecialists,
      templates: matchingTemplates,
      totalCount: matchingSpecialists.length + matchingTemplates.length,
    };
  }, [query, allSpecialists]);

  const handleQuickPdfDownload = async (e: React.MouseEvent, t: EmailTemplate) => {
    e.stopPropagation();
    if (exportingId) return;
    setExportingId(t.id);
    try {
      await exportTemplateToPdf({
        title: t.title,
        category: t.category,
        level: t.level,
        subject: t.subject,
        body: t.body,
        to: t.to,
        cc: t.cc,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setExportingId(null);
    }
  };

  const handleSelectSpecialist = (s: Specialist) => {
    onNavigateToSpecialist(s.id, s.name);
    setIsOpen(false);
  };

  const handleSelectTemplate = (t: EmailTemplate) => {
    onNavigateToTemplate(t.id);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-2 md:mx-4 z-40">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center">
          <Search size={15} />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Ieškoti specialistų, kabineto ar šablonų..."
          className="w-full pl-9 pr-14 py-1.5 md:py-2 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-slate-200 dark:border-slate-700/80 focus:border-emerald-600 dark:focus:border-emerald-500 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all shadow-inner focus:shadow-md"
        />

        <div className="absolute right-2.5 flex items-center space-x-1.5">
          {query ? (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
              title="Išvalyti"
            >
              <X size={13} />
            </button>
          ) : (
            <kbd className="hidden sm:flex items-center space-x-0.5 px-1.5 py-0.5 text-[9px] font-black text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          )}
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 max-h-[75vh] flex flex-col">
          
          {/* Filter tabs and results summary */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  activeFilter === 'all' 
                    ? 'bg-emerald-600 text-white font-black' 
                    : 'hover:bg-slate-200/70 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                Visi ({results.totalCount})
              </button>
              <button
                onClick={() => setActiveFilter('specialists')}
                className={`px-2 py-1 rounded-lg transition-colors flex items-center space-x-1 ${
                  activeFilter === 'specialists' 
                    ? 'bg-emerald-600 text-white font-black' 
                    : 'hover:bg-slate-200/70 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Users size={11} />
                <span>Specialistai ({results.specialists.length})</span>
              </button>
              <button
                onClick={() => setActiveFilter('templates')}
                className={`px-2 py-1 rounded-lg transition-colors flex items-center space-x-1 ${
                  activeFilter === 'templates' 
                    ? 'bg-emerald-600 text-white font-black' 
                    : 'hover:bg-slate-200/70 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <FileText size={11} />
                <span>Šablonai ({results.templates.length})</span>
              </button>
            </div>

            <span className="text-[9px] uppercase tracking-wider text-slate-400 hidden sm:inline">
              Pasirinkite rezultatą
            </span>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-3 divide-y divide-slate-100 dark:divide-slate-800/80 scrollbar-thin">
            
            {/* When no results */}
            {results.totalCount === 0 && (
              <div className="py-8 text-center px-4 space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <Search size={18} />
                </div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Rezultatų pagal „{query}“ nerasta
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 max-w-xs mx-auto">
                  Bandykite ieškoti pagal specialisto vardą, pareigas, kabineto numerį (pvz., „48“, „logopedas“, „patyčios“ ar „savivaldybė“).
                </p>
              </div>
            )}

            {/* SPECIALISTS SECTION */}
            {(activeFilter === 'all' || activeFilter === 'specialists') && results.specialists.length > 0 && (
              <div className="space-y-1 pt-1.5 first:pt-0">
                <div className="px-2 py-1 flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <span className="flex items-center space-x-1">
                    <Users size={12} className="text-emerald-600" />
                    <span>Specialistai ({results.specialists.length})</span>
                  </span>
                </div>

                <div className="space-y-1">
                  {results.specialists.map(s => {
                    const colorMeta = CATEGORY_COLORS[s.category] || { bg: 'bg-slate-100 text-slate-700', text: 'text-slate-700' };
                    return (
                      <div
                        key={s.id}
                        onClick={() => handleSelectSpecialist(s)}
                        className="group p-2.5 rounded-xl hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all cursor-pointer flex items-center justify-between space-x-3"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[11px] shrink-0 ${colorMeta.bg}`}>
                            {s.name.slice(0, 1)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center space-x-2">
                              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                                {s.name}
                              </h4>
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shrink-0 ${colorMeta.bg}`}>
                                {s.category}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              <span className="truncate">{s.classes}</span>
                              {s.office && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center space-x-0.5 font-bold text-slate-700 dark:text-slate-300 shrink-0">
                                    <MapPin size={9} />
                                    <span>Kab. {s.office}</span>
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quick Contact Actions */}
                        <div className="flex items-center space-x-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                          {s.phone && (
                            <a
                              href={`tel:${s.phone.replace(/\s+/g, '')}`}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                              title={`Skambinti: ${s.phone}`}
                            >
                              <Phone size={12} />
                            </a>
                          )}
                          {s.email && (
                            <a
                              href={`mailto:${s.email}`}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                              title={`Rašyti: ${s.email}`}
                            >
                              <Mail size={12} />
                            </a>
                          )}
                          <button
                            onClick={() => handleSelectSpecialist(s)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-600 group-hover:text-white text-slate-400 transition-colors"
                            title="Rodyti specialistų sąraše"
                          >
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TEMPLATES SECTION */}
            {(activeFilter === 'all' || activeFilter === 'templates') && results.templates.length > 0 && (
              <div className="space-y-1 pt-2">
                <div className="px-2 py-1 flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <span className="flex items-center space-x-1">
                    <FileText size={12} className="text-amber-500" />
                    <span>Laiškų šablonai ({results.templates.length})</span>
                  </span>
                </div>

                <div className="space-y-1">
                  {results.templates.map(t => (
                    <div
                      key={t.id}
                      onClick={() => handleSelectTemplate(t)}
                      className="group p-2.5 rounded-xl hover:bg-amber-50/60 dark:hover:bg-amber-950/30 border border-transparent hover:border-amber-200 dark:hover:border-amber-800/50 transition-all cursor-pointer flex items-center justify-between space-x-3"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                          <FileText size={15} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 truncate">
                              {t.title}
                            </h4>
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                              {t.category}
                            </span>
                            {t.level && (
                              <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shrink-0">
                                {t.level} lygis
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                            {t.subject}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleQuickPdfDownload(e, t)}
                          disabled={exportingId === t.id}
                          className="px-2 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/80 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 text-[9px] font-black uppercase tracking-wider flex items-center space-x-1 transition-colors"
                          title="Atsisiųsti šį šabloną kaip PDF"
                        >
                          <FileDown size={11} />
                          <span>PDF</span>
                        </button>
                        <button
                          onClick={() => handleSelectTemplate(t)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-amber-600 group-hover:text-white text-slate-400 transition-colors"
                          title="Atidaryti šablonų skiltyje"
                        >
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 text-[9px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
            <span>Spustelėkite ant įrašo, kad atidarytumėte atitinkamą polapį</span>
            <span className="font-semibold">Esc uždaro</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
