
import React from 'react';
import { PhoneCall, AlertTriangle, MapPin, MessageSquare, User, Info, ExternalLink, ShieldAlert } from 'lucide-react';

const EmergencyTab: React.FC = () => {
  const handleCall = () => {
    if (confirm("DĖMESIO! Ar tikrai norite skambinti skubios pagalbos tarnybai 112?")) {
      window.location.href = "tel:112";
    }
  };

  const questions = [
    {
      icon: <MapPin className="text-red-600" size={24} />,
      title: "KUR įvyko nelaimė?",
      desc: "Nurodykite tikslų adresą: miestas, gatvė, namo numeris, laiptinė, aukštas. Jei adreso nežinote – nurodykite matomus orientyrus (paminklus, parduotuves, sankryžas)."
    },
    {
      icon: <MessageSquare className="text-red-600" size={24} />,
      title: "KAS atsitiko?",
      desc: "Trumpai ir aiškiai apibūdinkite įvykį: gaisras, autoįvykis, muštynės, staigus sveikatos sutrikimas ar kt."
    },
    {
      icon: <ShieldAlert className="text-red-600" size={24} />,
      title: "AR YRA nukentėjusiųjų?",
      desc: "Pasakykite, kiek yra sužeistų žmonių, kokia jų būklė (sąmoningi, kvėpuoja), kokio amžiaus mokiniai/asmenys dalyvauja."
    },
    {
      icon: <User className="text-red-600" size={24} />,
      title: "KAS praneša?",
      desc: "Nurodykite savo vardą, pavardę ir telefono numerį. Nepadėkite ragelio, kol operatorius nepasakys, kad pokalbis baigtas."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      {/* Hero Section */}
      <div className="bg-red-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-red-600/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">SKUBI PAGALBA 112</h2>
            <p className="text-red-100 text-lg font-medium max-w-md">
              Vienu numeriu galite kviesti policiją, ugniagesius ir greitąją medicinos pagalbą.
            </p>
          </div>
          <button 
            onClick={handleCall}
            className="group bg-white text-red-600 px-10 py-6 rounded-[2rem] font-black text-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-4 border-4 border-red-500/10"
          >
            <PhoneCall size={32} className="group-hover:animate-bounce" />
            <span>SKAMBINTI 112</span>
          </button>
        </div>
        <AlertTriangle size={300} className="absolute -bottom-20 -right-20 text-white/10 pointer-events-none" />
      </div>

      {/* Advice Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-amber-100 p-2 rounded-xl text-amber-700">
            <Info size={24} />
          </div>
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Kaip pranešti informaciją operatoriui?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((q, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-red-200 transition-colors flex flex-col h-full">
              <div className="bg-red-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                {q.icon}
              </div>
              <h4 className="font-black text-slate-900 text-lg mb-2">{q.title}</h4>
              <p className="text-sm text-slate-600 font-medium leading-relaxed flex-1">
                {q.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info Footer */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="bg-slate-200 p-3 rounded-2xl text-slate-500">
            <ExternalLink size={24} />
          </div>
          <div>
            <p className="font-bold text-slate-900">Oficialūs nurodymai</p>
            <p className="text-xs text-slate-500 font-medium">Išsami informacija apie 112 operatoriaus klausimus</p>
          </div>
        </div>
        <a 
          href="https://112.lt/skambinimas-numeriu-112/operatoriaus-klausimai/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center space-x-2"
        >
          <span>Skaityti 112.lt</span>
          <ChevronRight size={16} />
        </a>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 text-amber-900 text-sm font-medium italic">
        <strong>Svarbu:</strong> Numeris 112 skirtas tik tais atvejais, kai kyla grėsmė gyvybei, sveikatai, saugumui ar turtui. Piktybinis skambinimas be priežasties yra baudžiamas pagal įstatymus.
      </div>
    </div>
  );
};

const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default EmergencyTab;
