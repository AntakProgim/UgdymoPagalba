import React, { useState } from 'react';
import { 
  MessageCircle, 
  Zap, 
  AlertCircle,
  Users,
  ArrowRight,
  ChevronRight,
  Phone,
  MessageSquareText,
  Trees,
  CalendarDays,
  ExternalLink,
  FileText,
  ClipboardCheck,
  Sparkles,
  Check,
  X,
  Mail
} from 'lucide-react';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
  onSelectScenario: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveTab, onSelectScenario }) => {
  const [chatNotification, setChatNotification] = useState<{ name: string; email: string } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleOpenGoogleChat = (email: string, name: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setChatNotification({ name, email });
    window.open('https://chat.google.com', '_blank');
    setTimeout(() => {
      setCopiedEmail(prev => prev === email ? null : prev);
    }, 2500);
  };

  const handleOpenGmail = (email: string) => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    window.open(gmailUrl, '_blank');
  };
  const stats = [
    { 
      id: 'templates-link', 
      label: 'Šablonai', 
      value: '31', 
      icon: <MessageCircle size={18} />, 
      bg: 'bg-green-50 text-green-700',
      external: true,
      url: 'https://docs.google.com/document/d/171tuL9pKuBYC376oxjoqmdM9NSqfAsinSpHJoyk2m8Y/edit?tab=t.qschqx6t8w1'
    },
    { id: 'contacts', label: 'Specialistai', value: '23', icon: <Users size={18} />, bg: 'bg-blue-50 text-blue-700' },
    { id: 'contacts', label: 'Vadovai', value: '5', icon: <Zap size={18} />, bg: 'bg-amber-50 text-amber-600' },
  ];

  const dutySchedule = [
    { day: 'Pr', name: 'Olga Telešova', phone: '+37063617239', office: '48', email: 'olga.telesova@antakalnio.lt' },
    { day: 'An', name: 'Tomas Jankūnas', phone: '+37065900712', office: '43', email: 'direktorius@antakalnio.lt' },
    { day: 'Tr', name: 'Čianita Linkutė-Vuicik', phone: '+37067266304', office: '4', email: 'cianita.vuicik@antakalnio.lt' },
    { day: 'Kt', name: 'Jurgita Paravinskienė', phone: '+37065900715', office: '62', email: 'jurgita.paravinskiene@antakalnio.lt' },
    { day: 'Pn', name: 'Rotacija O.T. / T.J. / Č.L.V. / J.P.', phone: '+37065900612', office: '48 / 43 / 4 / 62', email: 'rastine@antakalnio.lt' },
  ];

  const criticalCases = [
    { id: 'suicidinis', title: 'Suicidinis elgesys', desc: 'SOS algoritmas: specialistai kviečiami nedelsiant.', color: 'rose' },
    { id: 'ginčas', title: 'Fizinis ginčas', desc: 'Nedelsiant atskirti dalyvius, kviesti vadovą.', color: 'indigo' },
    { id: 'draudziami', title: 'Draudžiami daiktai', desc: 'Patikra vykdoma tik komisijos būdu.', color: 'slate' },
  ];

  const handleStatClick = (stat: any) => {
    if (stat.external) {
      window.open(stat.url, '_blank');
    } else {
      setActiveTab(stat.id);
    }
  };

  return (
    <div className="space-y-5 pb-8 animate-in fade-in duration-500">
      {/* Hero Section - Compact Height */}
      <div className="relative bg-green-700 rounded-[1.5rem] overflow-hidden border border-green-800 shadow-md">
        <div className="absolute top-0 right-0 p-4 opacity-[0.05] text-white pointer-events-none translate-x-12 -translate-y-12 rotate-12">
          <Trees size={260} />
        </div>
        
        <div className="relative z-10 p-8 flex flex-col items-start max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-600/40 border border-white/10 rounded-full mb-4">
            <span className="text-[8px] font-black uppercase tracking-widest text-green-100">
              Bendruomenės Portalo Apžvalga
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight uppercase">
            PAGALBOS SISTEMA
          </h1>
          <p className="text-[9px] font-bold text-green-200/50 uppercase tracking-[0.2em] mb-6">
            Vilniaus Antakalnio progimnazija
          </p>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveTab('scenarios')}
              className="bg-white text-green-700 px-6 py-2.5 rounded-xl font-black hover:bg-green-50 transition-all text-[10px] flex items-center shadow-sm"
            >
              SITUACIJŲ VALDYMAS
              <ChevronRight size={12} className="ml-2" />
            </button>
            <button 
              onClick={() => setActiveTab('schemes')}
              className="bg-green-600/30 text-white border border-white/20 px-6 py-2.5 rounded-xl font-black hover:bg-green-600/50 transition-all text-[10px] flex items-center shadow-sm"
            >
              PROCESŲ SCHEMOS
            </button>
            {/* Moved AI Help Button here */}
            <button 
              onClick={() => setActiveTab('ai-assistant')}
              className="bg-amber-500 text-white px-6 py-2.5 rounded-xl font-black hover:bg-amber-600 transition-all text-[10px] flex items-center shadow-lg shadow-amber-900/20"
            >
              REIKIA PAGALBOS? (DI)
              <Sparkles size={12} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid - Compact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {stats.map((stat, idx) => (
          <button 
            key={idx} 
            onClick={() => handleStatClick(stat)}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4 hover:border-green-200 transition-all text-left"
          >
            <div className={`p-3 ${stat.bg} rounded-xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-0.5">{stat.label}</p>
              <p className="text-xl font-black text-slate-900 leading-none">{stat.value}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Main Action Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-black text-slate-900 flex items-center uppercase tracking-tight">
                <AlertCircle className="text-rose-500 mr-2" size={16} />
                Kritiniai atvejai
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {criticalCases.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => onSelectScenario(item.id)}
                  className="group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-green-100 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-1 h-6 rounded-full bg-${item.color}-500/30`}></div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-medium truncate max-w-[180px] sm:max-w-xs">{item.desc}</p>
                    </div>
                  </div>
                  <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-green-700 group-hover:text-white text-slate-300 transition-all">
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 rounded-[1.8rem] shadow-xl overflow-hidden flex flex-col border border-slate-800 animate-in fade-in slide-in-from-top-2 duration-700">
            <div className="p-4 space-y-2.5">
              <a 
                href="https://docs.google.com/spreadsheets/d/1zeU4z5XOLIEGqkgdyL041p_cb5vDpJ6DUCy1K_GYL7E/edit?usp=sharing" 
                target="_blank" 
                className="flex items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group border border-white/5"
              >
                <div className="p-2.5 bg-green-500/10 rounded-xl mr-4 group-hover:bg-green-500/20 transition-colors">
                  <ClipboardCheck size={20} className="text-green-400" />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-wider flex-1 leading-tight">
                  PEDAGOGŲ RŪPINIMASIS MOKINIŲ SAUGUMU
                </span>
                <ExternalLink size={16} className="text-white/20 group-hover:text-white/40 transition-colors" />
              </a>
              
              <a 
                href="https://docs.google.com/document/d/12wcUtUmljg_DSQd2MUeNuvzQL9mJaBL0hyvQ4bYtxcE/edit?usp=sharing" 
                target="_blank" 
                className="flex items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group border border-white/5"
              >
                <div className="p-2.5 bg-blue-500/10 rounded-xl mr-4 group-hover:bg-blue-500/20 transition-colors">
                  <FileText size={20} className="text-blue-400" />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-wider flex-1 leading-tight">
                  MOKYKLOS VADOVŲ RŪPINIMASIS MOKINIŲ SAUGUMU
                </span>
                <ExternalLink size={16} className="text-white/20 group-hover:text-white/40 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Secondary Information Section */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-black text-slate-900 flex items-center uppercase tracking-tight">
              <CalendarDays size={16} className="text-green-600 mr-2" />
              Mokinių saugumo užtikrinimo grafikas
            </h2>
          </div>
          
          <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm overflow-hidden flex-1">
            <div className="p-2 space-y-1.5 h-full">
              {dutySchedule.map((item, idx) => (
                <div key={idx} className="bg-slate-50/50 p-3 rounded-xl flex items-center justify-between border border-slate-100/50 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center space-x-3 min-w-0 flex-1 mr-2">
                    <div className="w-8 h-8 rounded-xl bg-green-700 text-white flex items-center justify-center text-[10px] font-black shadow-sm group-hover:scale-110 transition-transform shrink-0">
                      {item.day}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-black text-slate-800 leading-tight mb-0.5">{item.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight leading-none">Kabinetas: {item.office}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 shrink-0">
                    <a 
                      href={`tel:${item.phone}`} 
                      className="p-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-700 hover:text-white transition-all shadow-sm"
                      title="Skambinti"
                    >
                      <Phone size={12} />
                    </a>
                    <button 
                      onClick={() => handleOpenGoogleChat(item.email, item.name)} 
                      className={`p-2 rounded-lg transition-all shadow-sm ${
                        copiedEmail === item.email 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white'
                      }`}
                      title="Nukopijuoti el. paštą ir atidaryti Google Chat"
                    >
                      {copiedEmail === item.email ? <Check size={12} /> : <MessageSquareText size={12} />}
                    </button>
                    <button 
                      onClick={() => handleOpenGmail(item.email)} 
                      className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                      title="Rašyti laišką per Gmail naršyklėje"
                    >
                      <Mail size={12} />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="p-4 mt-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                  * Budintys asmenys atsakingi už operatyvų reagavimą į skubius iškvietimus per pamokas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification for Google Chat */}
      {chatNotification && (
        <div className="fixed bottom-6 right-6 max-w-sm w-full bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Check size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-white leading-tight">El. paštas nukopijuotas!</p>
              <p className="text-[11px] font-mono text-emerald-400 truncate mt-0.5">{chatNotification.email}</p>
              <p className="text-[11px] text-slate-300 mt-1.5 leading-snug">
                „Google Chat“ atidarytas naujame lange. Įklijuokite adresą į paiešką (<strong>Ctrl+V</strong> arba <strong>⌘+V</strong>), kad pradėtumėte pokalbį su <strong>{chatNotification.name}</strong>.
              </p>
            </div>
            <button 
              onClick={() => setChatNotification(null)}
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

export default Dashboard;