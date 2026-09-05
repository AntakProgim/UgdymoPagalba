import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  Users, 
  MessageSquare, 
  Target, 
  HeartHandshake, 
  Trees,
  FileText,
  ClipboardCheck,
  Phone,
  Mail,
  MapPin,
  Scale,
  AlertCircle,
  Info,
  Globe
} from 'lucide-react';

const SchemesTab: React.FC = () => {
  const primarySteps = [
    { title: 'Dalyko mokytojas', subtitle: '+ MOKINYS', note: 'Žodinė pastaba Mano Dienyne' },
    { title: 'Klasės vadovas', subtitle: '+ MOKINYS', note: 'Susitarimų lapas (fiksavimas)' },
    { title: 'Klasės vadovas', subtitle: '+ TĖVAI', note: 'Susitarimų lapas + informavimas' },
    { title: 'Klasės vadovas', subtitle: '+ SOC. PEDAGOGĖ', note: 'Pagalbos plano sudarymas' },
    { title: 'Specialistai', subtitle: '+ KOMANDA', note: 'Plano įgyvendinimas ir stebėsena' },
    { title: 'VGK', subtitle: '+ ADMINISTRACIJA', note: 'VGK posėdis, direktoriaus sprendimai' },
    { title: 'Išorės institucijos', subtitle: 'PPT, VTAS, AV', note: 'Kritiniai atvejai / policija' },
  ];

  return (
    <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Vientisa Hero antraštė */}
      <div className="relative bg-green-700 rounded-[2rem] overflow-hidden border border-green-800 shadow-xl shadow-green-900/10">
        <div className="absolute top-0 right-0 p-4 opacity-[0.07] text-white pointer-events-none translate-x-12 -translate-y-12 rotate-12">
          <div className="bg-white/20 p-20 rounded-[5rem]">
            <Trees size={340} />
          </div>
        </div>
        
        <div className="relative z-10 p-8 md:p-12 flex flex-col items-start max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-600/50 backdrop-blur-md border border-white/10 rounded-full mb-6">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-green-100">
              Procesų Valdymas
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-[900] text-white mb-4 tracking-tighter leading-tight uppercase whitespace-nowrap">
            PAGALBOS SCHEMOS
          </h1>
          <p className="text-green-100 text-sm md:text-base font-medium leading-relaxed opacity-90">
            Algoritmai ir veiksmų seka, užtikrinanti nuoseklų bei efektyvų problemų sprendimą.
          </p>
        </div>
      </div>

      {/* 1. Ugdymo aplinkos keitimas (UAK) */}
      <section className="bg-amber-50 p-8 md:p-12 rounded-[2.5rem] border border-amber-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 text-amber-600 pointer-events-none">
          <ShieldAlert size={120} />
        </div>
        <div className="flex items-center space-x-4 mb-10">
          <div className="bg-amber-600 p-4 rounded-2xl text-white shadow-lg">
            <ShieldAlert size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-[900] text-amber-950 tracking-tight uppercase leading-none">UAK PROTOKOLAS</h2>
            <p className="text-amber-700 text-sm font-bold mt-2">Greitojo reagavimo schema kritinėms situacijoms klasėje.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border-l-8 border-amber-500 hover:translate-x-1 transition-transform">
              <h4 className="font-black text-amber-900 uppercase text-xs tracking-widest mb-4">I etapas. mokytojo veiksmai</h4>
              <ul className="text-[14px] text-gray-700 space-y-4 font-bold">
                <li className="flex items-start"><span className="text-amber-500 mr-3">1.</span> Pastaba. Pozityvus susitarimas.</li>
                <li className="flex items-start"><span className="text-amber-500 mr-3">2.</span> Perspėjimas. Informavimas apie UAK grėsmę.</li>
                <li className="flex items-start"><span className="text-amber-500 mr-3">3.</span> Vykdymas. Kviečiamas vadovas per G-Chat.</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
             <div className="bg-white p-8 rounded-3xl shadow-sm border-l-8 border-blue-500 hover:translate-x-1 transition-transform">
              <h4 className="font-black text-blue-900 uppercase text-xs tracking-widest mb-4">II etapas. vadovo veiksmai</h4>
              <p className="text-[14px] text-gray-700 font-bold leading-relaxed italic">Nurodo mokiniui klasę ar kabinetą savarankiškam darbui. Mokinys grįžta į klasę tik nusiraminęs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tėvų įtraukimas */}
      <section className="bg-blue-50 p-8 md:p-12 rounded-[2.5rem] border border-blue-100 shadow-sm">
        <div className="flex items-center space-x-4 mb-10">
          <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg">
            <HeartHandshake size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-[900] text-blue-950 tracking-tight uppercase leading-none">TĖVŲ PARTNERYSTĖ</h2>
            <p className="text-blue-700 text-sm font-bold mt-2">Strategijos sėkmingam bendradarbiavimui.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-100">
            <div className="flex items-center space-x-3 mb-6">
              <MessageSquare className="text-blue-600" size={24} />
              <h4 className="font-black text-blue-900 uppercase text-xs tracking-widest">Komunikacija</h4>
            </div>
            <p className="text-[14px] text-gray-700 font-bold leading-relaxed mb-4">„Sumuštinio“ metodas: stiprybės → problema → sprendimas.</p>
            <p className="text-[14px] text-gray-700 font-bold leading-relaxed">Faktų kalba: konkrečių veiksmų įvardijimas be interpretacijų.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-100">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="text-blue-600" size={24} />
              <h4 className="font-black text-blue-900 uppercase text-xs tracking-widest">Lūkesčiai</h4>
            </div>
            <p className="text-[14px] text-gray-700 font-bold leading-relaxed mb-4">Elgesio kontraktas: trišalis susitarimas (mokinys-tėvai-mokykla).</p>
            <p className="text-[14px] text-gray-700 font-bold leading-relaxed">Pasekmės, ne bausmės: natūralus elgesio rezultatas.</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white flex flex-col justify-center relative overflow-hidden group">
            <Users className="absolute -bottom-10 -right-10 text-white/5 group-hover:scale-125 transition-transform duration-700" size={180} />
            <p className="text-xl font-black leading-snug italic relative z-10">
              „Ryšys yra svarbiau už kontrolę. Kai tėvai jaučiasi palaikomi, jie tampa partneriais.“
            </p>
          </div>
        </div>
      </section>

      {/* 3. Pagalbos schema */}
      <section>
        <div className="flex items-center space-x-4 mb-10 px-4">
          <div className="bg-green-100 p-3 rounded-2xl text-green-700 border border-green-200">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-[900] text-slate-900 tracking-tight uppercase">PAGALBOS SEKA</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {primarySteps.map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative group">
              <div className={`absolute -top-3 -left-3 w-10 h-10 ${idx < 4 ? 'bg-green-700' : 'bg-red-600'} text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-xl group-hover:scale-110 transition-transform`}>
                {idx + 1}
              </div>
              <h4 className="font-black text-slate-900 text-lg leading-tight mb-2">{step.title}</h4>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-6">{step.subtitle}</p>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 italic text-[13px] text-slate-600 font-bold leading-relaxed">
                {step.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VPPT SUP Vertinimo Tvarka */}
      <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-slate-900 pointer-events-none">
          <ClipboardCheck size={200} />
        </div>
        
        <div className="flex items-center space-x-4 mb-12">
          <div className="bg-indigo-600 p-4 rounded-2xl text-white shadow-lg">
            <ClipboardCheck size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-[900] text-slate-900 tracking-tight uppercase leading-none">VPPT SUP VERTINIMO TVARKA</h2>
            <p className="text-slate-500 text-sm font-bold mt-2">Specialiųjų ugdymosi poreikių vertinimo algoritmas Vilniaus m. mokyklose.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Kairė pusė: Tikslas ir Algoritmas */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target size={20} className="text-indigo-600" />
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">1. Tikslas ir principai</h3>
              </div>
              <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 space-y-4">
                <p className="text-sm font-bold text-slate-700 leading-relaxed">
                  <span className="text-indigo-700 uppercase text-[10px] block mb-1">Tikslas</span>
                  Nustatyti individualias mokinio švietimo pagalbos ir paslaugų reikmes ugdymo procese.
                </p>
                <p className="text-sm font-bold text-slate-700 leading-relaxed">
                  <span className="text-indigo-700 uppercase text-[10px] block mb-1">Tikslinė grupė</span>
                  Mokiniai, besimokantys pagal bendrojo ugdymo mokymo programas Vilniaus m. savivaldybės teritorijoje.
                </p>
                <div className="flex items-start space-x-3 bg-white p-4 rounded-2xl border border-indigo-200">
                  <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs font-black text-amber-900 leading-relaxed">
                    ESMINĖ SĄLYGA: Tarnyba priima tik tuos mokinius, kuriems mokykla jau suteikė trumpalaikę pagalbą, bet situacija nepagerėjo.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ArrowRight size={20} className="text-indigo-600" />
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">2. Algoritmas mokykloje</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Pastebėjimai', text: 'Mokytojas informuoja VGK apie kylančius sunkumus.' },
                  { label: 'Pasitarimas', text: 'Susitikimas su specialistais, tėvais ir mokiniu.' },
                  { label: 'Vertinimas', text: 'Atliekamas Pirminis ugdymosi poreikių vertinimas.' },
                  { label: 'Pagalbos planas', text: 'Direktoriaus pavaduotoja ugdymui, atsakinga už įtraukųjį ugdymą, skiria trumpalaikę pagalbą ir planą.' },
                  { label: 'Stebėsena', text: 'Jei pagalba nepadeda, VGK rekomenduoja VPPT vertinimą.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-black text-xs shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-indigo-600 uppercase block leading-none mb-1">{item.label}</span>
                      <p className="text-sm font-bold text-slate-700">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dešinė pusė: Dokumentai ir Atmintinė */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText size={20} className="text-indigo-600" />
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">3. Dokumentų krepšelis</h3>
              </div>
              <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-10 rotate-12">
                  <FileText size={160} />
                </div>
                <ul className="space-y-4 relative z-10">
                  {[
                    'Prašymas dėl SUP įvertinimo',
                    'Pirminio vertinimo formos (1 priedas) kopija',
                    'VGK posėdžio išrašas apie vertinimą',
                    'Individualus ugdymo planas, darbai, piešiniai',
                    'Papildoma Tarnybos prašoma informacija'
                  ].map((doc, i) => (
                    <li key={i} className="flex items-center space-x-3 text-sm font-bold">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/10 text-[11px] font-black text-amber-400 uppercase tracking-widest">
                  SVARBU: Nepateikus visų dokumentų, mokiniai nepriimami.
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <Info size={24} className="text-indigo-200" />
                <h3 className="text-lg font-black uppercase tracking-tight">VGK Atmintinė</h3>
              </div>
              <div className="space-y-4 text-sm font-medium leading-relaxed">
                <p className="font-black text-indigo-100 italic">„Užtikrinkite, kad nukreipimas būtų pagrįstas ir dokumentuotas.“</p>
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <span className="text-[10px] font-black uppercase text-indigo-200 block mb-1">Kada kreiptis?</span>
                    Tik tada, kai mokykla tikslingai atliko visus žingsnius, bet situacija nepagerėjo.
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <span className="text-[10px] font-black uppercase text-indigo-200 block mb-1">Dokumentavimas</span>
                    Jei nusprendžiama vertinimo neatlikti, protokole privaloma nurodyti argumentus.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Teisinis pagrindas ir Kontaktai */}
        <div className="mt-16 pt-10 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <div className="bg-slate-100 p-3 rounded-2xl text-slate-600">
              <Scale size={24} />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">Teisinis pagrindas</h4>
              <a 
                href="https://www.e-tar.lt/portal/lt/legalAct/3023591066c811efafbb8694c098bac5/asr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[13px] text-slate-500 font-bold leading-relaxed hover:text-indigo-600 transition-colors"
              >
                LR ŠMSM 2024-08-30 įsakymas Nr. V-928 {">>>"}.
              </a>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
              <Phone size={24} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">Kontaktai</h4>
                <div className="space-y-1 text-[13px] text-slate-500 font-bold">
                  <div className="flex items-center space-x-2">
                    <MapPin size={12} className="text-indigo-400" />
                    <span>Lvivo g. 25, LT-09320 Vilnius</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={12} className="text-indigo-400" />
                    <span>+370 5 2650908</span>
                  </div>
                  <a 
                    href="https://www.vilniausppt.lt/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 hover:text-indigo-600 transition-colors"
                  >
                    <Globe size={12} className="text-indigo-400" />
                    <span>www.vilniausppt.lt</span>
                  </a>
                </div>
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2 text-[13px] text-indigo-600 font-black hover:underline cursor-pointer">
                  <Mail size={14} />
                  <span>rastine@ppt.vilnius.lm.lt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchemesTab;