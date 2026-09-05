import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Mail, 
  Send, 
  Copy, 
  Check, 
  FileText, 
  Info,
  Trees,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  X,
  FileDown,
  Printer,
  Loader2
} from 'lucide-react';
import { INITIAL_TEMPLATES } from '../constants';
import { EmailTemplate, TemplateCategory } from '../types';
import { exportTemplateToPdf, printTemplateDirectly } from '../utils/pdfExport';

interface TemplatesTabProps {
  initialTemplateId?: string | null;
}

const TemplatesTab: React.FC<TemplatesTabProps> = ({ initialTemplateId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'Visi'>('Visi');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [editableBody, setEditableBody] = useState('');
  const [editableSubject, setEditableSubject] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [quickExportingId, setQuickExportingId] = useState<string | null>(null);
  const [pdfNotification, setPdfNotification] = useState<string | null>(null);

  useEffect(() => {
    if (initialTemplateId) {
      const found = INITIAL_TEMPLATES.find(t => t.id === initialTemplateId);
      if (found) {
        handleSelect(found);
      }
    }
  }, [initialTemplateId]);

  const categories = useMemo(() => ['Visi', ...Array.from(new Set(INITIAL_TEMPLATES.map(t => t.category)))], []);
  
  const filtered = useMemo(() => {
    return INITIAL_TEMPLATES.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'Visi' || t.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchTerm, selectedCategory]);

  const handleSelect = (t: EmailTemplate) => {
    setSelectedTemplate(t);
    setEditableBody(t.body);
    setEditableSubject(t.subject);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableBody);
    setCopied(true);
    setCopiedNotification(true);
    setTimeout(() => {
      setCopied(false);
      setCopiedNotification(false);
    }, 2500);
  };

  // Open Gmail web client with pre-filled recipient, cc, subject, and body
  const handleSendGmail = () => {
    if (!selectedTemplate) return;
    const to = selectedTemplate.to || '';
    const cc = selectedTemplate.cc || '';
    const su = editableSubject;
    const body = editableBody;
    
    // Google Mail web compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&su=${encodeURIComponent(su)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  // Standard mailto client (Outlook, Apple Mail, default OS client)
  const handleSendDefaultMail = () => {
    if (!selectedTemplate) return;
    const mailto = `mailto:${selectedTemplate.to || ''}?cc=${selectedTemplate.cc || ''}&subject=${encodeURIComponent(editableSubject)}&body=${encodeURIComponent(editableBody)}`;
    window.open(mailto, '_blank');
  };

  // Eksportuoti šiuo metu atidarytą ir galbūt redaguotą šabloną į PDF
  const handleExportPdf = async () => {
    if (!selectedTemplate || isExportingPdf) return;
    setIsExportingPdf(true);
    try {
      await exportTemplateToPdf({
        title: selectedTemplate.title,
        category: selectedTemplate.category,
        level: selectedTemplate.level,
        subject: editableSubject,
        body: editableBody,
        to: selectedTemplate.to,
        cc: selectedTemplate.cc
      });
      setPdfNotification(selectedTemplate.title);
      setTimeout(() => setPdfNotification(null), 4000);
    } catch (err) {
      console.error('Nepavyko sugeneruoti PDF:', err);
      alert('Nepavyko sugeneruoti PDF dokumento. Bandykite dar kartą.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Spausdinti šiuo metu atidarytą šabloną
  const handlePrint = () => {
    if (!selectedTemplate) return;
    printTemplateDirectly({
      title: selectedTemplate.title,
      category: selectedTemplate.category,
      level: selectedTemplate.level,
      subject: editableSubject,
      body: editableBody,
      to: selectedTemplate.to,
      cc: selectedTemplate.cc
    });
  };

  // Greitas šablono eksportas tiesiai iš sąrašo
  const handleQuickExportPdf = async (t: EmailTemplate) => {
    if (quickExportingId) return;
    setQuickExportingId(t.id);
    try {
      await exportTemplateToPdf({
        title: t.title,
        category: t.category,
        level: t.level,
        subject: t.subject,
        body: t.body,
        to: t.to,
        cc: t.cc
      });
      setPdfNotification(t.title);
      setTimeout(() => setPdfNotification(null), 4000);
    } catch (err) {
      console.error('Nepavyko sugeneruoti PDF:', err);
      alert('Nepavyko sugeneruoti PDF dokumento. Bandykite dar kartą.');
    } finally {
      setQuickExportingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] animate-in fade-in duration-500">
      
      {/* Search & List Pane */}
      <div className="lg:col-span-4 flex flex-col space-y-4 min-h-0">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-700 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Ieškoti šablono..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-emerald-700 transition-all text-xs font-bold"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-wider transition-all border ${
                  selectedCategory === cat ? 'bg-emerald-700 border-emerald-700 text-white shadow-md' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white rounded-[2rem] border border-slate-100 shadow-sm p-2 scrollbar-thin">
          <div className="space-y-1.5">
            {filtered.map(t => (
              <div
                key={t.id}
                onClick={() => handleSelect(t)}
                className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center space-x-3 border cursor-pointer group ${
                  selectedTemplate?.id === t.id 
                    ? 'bg-emerald-700 border-emerald-700 text-white shadow-lg translate-x-0.5' 
                    : 'bg-white border-transparent hover:bg-slate-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedTemplate?.id === t.id ? 'bg-white/20' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                }`}>
                  <FileText size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs font-black truncate leading-none mb-1.5 ${selectedTemplate?.id === t.id ? 'text-white' : 'text-slate-800'}`}>{t.title}</h4>
                  <p className={`text-[8px] font-black uppercase tracking-widest ${selectedTemplate?.id === t.id ? 'text-emerald-200' : 'text-slate-400'}`}>
                    {t.category}
                  </p>
                </div>
                
                {/* Greitas PDF eksporto mygtukas prie kiekvieno šablono sąraše */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickExportPdf(t);
                  }}
                  disabled={quickExportingId === t.id}
                  className={`p-2 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center space-x-1 transition-all shrink-0 ${
                    selectedTemplate?.id === t.id
                      ? 'bg-white/20 hover:bg-white/30 text-white border border-white/20'
                      : 'bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-900 border border-slate-200 hover:border-amber-300'
                  }`}
                  title="Eksportuoti į PDF"
                >
                  {quickExportingId === t.id ? (
                    <Loader2 size={13} className="animate-spin text-amber-500" />
                  ) : (
                    <FileDown size={13} />
                  )}
                  <span className="hidden sm:inline">PDF</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Pane */}
      <div className="lg:col-span-8 flex flex-col min-h-0">
        {selectedTemplate ? (
          <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-xl h-full flex flex-col overflow-hidden animate-in zoom-in-95 duration-400">
            
            {/* Dark Header similar to 'Dokumentai' block */}
            <div className="p-8 bg-slate-950 text-white relative">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-white pointer-events-none">
                <Trees size={140} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-2 py-0.5 bg-white/10 rounded-md text-[8px] font-black uppercase tracking-widest border border-white/10">{selectedTemplate.category}</span>
                  {selectedTemplate.level && (
                    <span className="px-2 py-0.5 bg-emerald-500 rounded-md text-[8px] font-black uppercase tracking-widest">{selectedTemplate.level} LYGIS</span>
                  )}
                </div>
                <h3 className="text-xl font-black tracking-tight uppercase mb-6 leading-tight">{selectedTemplate.title}</h3>
                
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1 w-full bg-white/5 rounded-xl p-3 border border-white/5">
                    <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block mb-1">El. laiško tema</span>
                    <input 
                      className="w-full bg-transparent border-none outline-none text-xs font-bold text-white focus:text-emerald-400 transition-colors" 
                      value={editableSubject} 
                      onChange={e => setEditableSubject(e.target.value)} 
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {/* Eksportuoti į PDF mygtukas */}
                    <button 
                      onClick={handleExportPdf} 
                      disabled={isExportingPdf}
                      className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-amber-950/20 disabled:opacity-60"
                      title="Atsisiųsti paruoštą PDF dokumentą"
                    >
                      {isExportingPdf ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
                      <span>{isExportingPdf ? 'Ruošiama...' : 'Eksportuoti į PDF'}</span>
                    </button>

                    {/* Spausdinti mygtukas */}
                    <button 
                      onClick={handlePrint} 
                      className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-3 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                      title="Atsispausdinti dokumentą"
                    >
                      <Printer size={14} />
                      <span className="hidden sm:inline">Spausdinti</span>
                    </button>

                    <button 
                      onClick={handleCopy} 
                      className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                      title="Nukopijuoti laiško tekstą"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      <span>{copied ? 'Kopijuota' : 'Kopijuoti'}</span>
                    </button>

                    {/* Direct Gmail compose in browser */}
                    <button 
                      onClick={handleSendGmail} 
                      className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-900/20"
                      title="Atidaryti tiesiogiai naršyklėje per Gmail"
                    >
                      <Mail size={14} />
                      <span>Gmail</span>
                    </button>

                    {/* Default mail program (Outlook, Mail, etc.) */}
                    <button 
                      onClick={handleSendDefaultMail} 
                      className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg"
                      title="Atidaryti kompiuterio pašto programą (Outlook, Mail ir kt.)"
                    >
                      <Send size={14} />
                      <span className="hidden sm:inline">Kita pašto programa</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Editable Content Area */}
            <div className="flex-1 p-8 bg-slate-50/20 relative">
              <div className="absolute top-4 left-4 p-1 bg-emerald-50 text-emerald-600 rounded-md opacity-50">
                <Sparkles size={12} />
              </div>
              <textarea 
                className="w-full h-full bg-transparent border-none outline-none resize-none text-slate-800 leading-relaxed font-bold text-base placeholder-slate-200 scrollbar-thin" 
                value={editableBody} 
                onChange={e => setEditableBody(e.target.value)} 
                placeholder="Rašykite laišką čia..."
              />
            </div>

            {/* Hint Footer */}
            <div className="p-6 bg-blue-50/50 border-t border-blue-100 flex items-start space-x-3">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md flex-shrink-0">
                <Info size={16} />
              </div>
              <div className="text-[11px] font-bold text-blue-900 leading-relaxed">
                <strong className="block mb-0.5 font-black uppercase tracking-widest text-[9px]">Patarimas</strong>
                Užpildykite duomenis skliausteliuose <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-800 font-black">[...]</code>. Paspaudę <strong>„Eksportuoti į PDF“</strong> arba <strong>„Spausdinti“</strong>, gausite oficialų dokumentą su Vilniaus Antakalnio progimnazijos rekvizitais ir parašo vieta.
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-100 rounded-[2.5rem] h-full flex flex-col items-center justify-center p-12 text-center space-y-6">
            <div className="bg-slate-50 p-12 rounded-full text-slate-100">
              <Mail size={80} />
            </div>
            <div className="max-w-xs">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Pasirinkite šabloną</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] leading-relaxed">
                Spustelėkite bet kurį šabloną kairėje pusėje, kad galėtumėte jį pritaikyti savo situacijai arba iškart eksportuoti į PDF.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between group">
                <span className="text-[8px] font-black uppercase text-slate-400">Incidentai</span>
                <ArrowUpRight size={10} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between group">
                <span className="text-[8px] font-black uppercase text-slate-400">Lankomumas</span>
                <ArrowUpRight size={10} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Toast Notification for Copied Text */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 max-w-sm w-full bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Check size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-white leading-tight">Tekstas nukopijuotas!</p>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Laiško šablonas paruoštas. Galite jį įklijuoti (<strong>Ctrl+V</strong> arba <strong>⌘+V</strong>) į bet kurį laišką ar dokumentą.
              </p>
            </div>
            <button 
              onClick={() => setCopiedNotification(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toast Notification for PDF Export */}
      {pdfNotification && (
        <div className="fixed bottom-6 right-6 max-w-sm w-full bg-slate-950 text-white p-4 rounded-2xl shadow-2xl border border-amber-500/30 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <FileDown size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-amber-400 leading-tight">PDF dokumentas paruoštas!</p>
              <p className="text-[11px] text-slate-200 mt-1 leading-snug">
                Dokumentas <strong>„{pdfNotification}“</strong> sėkmingai sugeneruotas ir atsiųstas.
              </p>
            </div>
            <button 
              onClick={() => setPdfNotification(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesTab;