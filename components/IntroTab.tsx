import React from 'react';
import { 
  ExternalLink, 
  FileText, 
  CheckCircle2,
  Smile,
  MessageSquareText,
  Trees,
  ArrowRight,
  Sparkles,
  Award,
  ShieldCheck,
  FileSearch,
  BookOpenCheck,
  LayoutTemplate,
  Map,
  CalendarDays,
  Users2
} from 'lucide-react';

interface IntroTabProps {
  setActiveTab: (tab: string) => void;
}

const IntroTab: React.FC<IntroTabProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <div className="relative bg-green-700 rounded-[2rem] overflow-hidden border border-green-800 shadow-xl shadow-green-900/10">
        <div className="absolute top-0 right-0 p-4 opacity-[0.07] text-white pointer-events-none translate-x-12 -translate-y-12 rotate-12">
          <div className="bg-white/20 p-20 rounded-[5rem]">
            <Trees size={340} />
          </div>
        </div>
        
        <div className="relative z-10 p-8 md:p-12 flex flex-col items-start max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-600/50 backdrop-blur-md border border-white/10 rounded-full mb-6">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-green-100">
              Sistemos įvadas ir nuostatos
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-[900] text-white mb-2 tracking-tighter leading-tight uppercase">
            PAGALBOS NUOSTATOS
          </h1>
          <p className="text-[10px] md:text-[11px] font-black text-green-200/60 uppercase tracking-[0.2em]">
            Vilniaus Antakalnio progimnazija
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-green max-w-none text-slate-700 space-y-8 leading-relaxed text-[15px]">
            <div className="bg-green-50 border-l-4 border-green-500 p-8 rounded-r-2xl mb-8">
              <p className="font-bold text-green-900 italic m-0 text-lg">
                „Tikime, kad aiškūs susitarimai ir nuoseklūs veiksmai padės mums visiems jaustis saugiau 
                ir užtikrins kokybišką ugdymo procesą.“
              </p>
            </div>

            <p className="font-medium text-slate-600 leading-relaxed">
              Kiekvienas vaikas turi teisę jaustis saugus ir gerbiamas mokykloje. Mūsų progimnazijoje tikime, kad saugi mokymosi aplinka kuriama bendromis visų pastangomis – mokytojų, mokinių ir tėvų. Todėl parengėme aiškias gaires, kaip kartu užtikrinsime pozityvų elgesį ir kaip reaguosime į taisyklių nesilaikymo atvejus.
            </p>
            
            {/* Bendruomenės susitarimas - Perkelta aukščiau PEPIS */}
            <div className="space-y-6 pt-4">
              <p className="font-black text-slate-900 uppercase tracking-tight text-lg m-0">Bendruomenės susitarimas:</p>
              <ul className="list-none space-y-4 pl-0 m-0">
                <li className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="bg-green-500 p-1.5 rounded-lg text-white shadow-sm"><CheckCircle2 size={16} /></div>
                  <span className="font-bold text-slate-700">Kaip užkertame kelią netinkamam elgesiui;</span>
                </li>
                <li className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="bg-green-500 p-1.5 rounded-lg text-white shadow-sm"><CheckCircle2 size={16} /></div>
                  <span className="font-bold text-slate-700">Kokių veiksmų imamės, kai taisyklės pažeidžiamos;</span>
                </li>
                <li className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="bg-green-500 p-1.5 rounded-lg text-white shadow-sm"><CheckCircle2 size={16} /></div>
                  <span className="font-bold text-slate-700">Kaip padedame mokiniams ugdytis atsakomybę už savo veiksmus.</span>
                </li>
              </ul>
            </div>

            {/* PEPIS - Pozityvaus elgesio sistema */}
            <div className="bg-amber-50 p-8 md:p-10 rounded-[2.5rem] border border-amber-100 my-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 text-amber-600 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  <Sparkles size={120} />
               </div>
               <div className="flex items-center space-x-4 mb-8 relative z-10">
                  <div className="bg-amber-600 p-4 rounded-2xl text-white shadow-lg shadow-amber-200">
                    <Smile size={28} />
                  </div>
                  <h4 className="font-black text-amber-900 uppercase tracking-tight m-0 text-xl md:text-2xl leading-tight">
                    PEPIS – POZITYVAUS ELGESIO SISTEMA
                  </h4>
               </div>
               
               <p className="text-amber-950 font-bold mb-8 text-lg leading-relaxed relative z-10">
                 Siekdami kurti saugią aplinką, vadovaujamės Pozityvaus elgesio palaikymo ir intervencijų sistema. Tai ne bausmės, o <strong>įgūdžių mokymas</strong> ir prevencija:
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 relative z-10">
                  <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-amber-100 flex items-start space-x-3">
                    <Award size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-bold text-amber-900 m-0">Aiškūs lūkesčiai ir taisyklės visose mokyklos erdvėse.</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-amber-100 flex items-start space-x-3">
                    <ShieldCheck size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-bold text-amber-900 m-0">Tikslingas socialinių ir emocinių įgūdžių mokymas.</p>
                  </div>
               </div>
               
               <a 
                href="https://lisc.lt/susipazinkite-su-pozityvaus-elgesio-palaikymo-ir-intervenciju-sistema-pepis/" 
                target="_blank"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-white border border-amber-100 text-amber-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all shadow-sm hover:shadow-md relative z-10"
               >
                 <span>Sužinoti daugiau apie PEPIS</span>
                 <ArrowRight size={14} />
               </a>
            </div>

            {/* Svarbūs progimnazijos dokumentai */}
            <div className="space-y-4 my-12">
              <p className="font-black text-slate-900 uppercase tracking-tight text-lg m-0 mb-6">Svarbūs progimnazijos dokumentai:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dokumentas 1: Situacijų valdymas */}
                <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 relative overflow-hidden group">
                  <div className="flex items-center space-x-4 mb-6 relative z-10">
                      <div className="bg-blue-600 p-3 rounded-xl text-white shadow-lg shadow-blue-200">
                        <FileText size={20} />
                      </div>
                      <h4 className="font-black text-blue-900 uppercase tracking-tight m-0 text-sm leading-tight">
                        SITUACIJŲ VALDYMAS
                      </h4>
                  </div>
                  <p className="text-[13px] text-slate-700 font-bold mb-6 leading-relaxed relative z-10">
                    Išsamios gairės Google Docs platformoje.
                  </p>
                  <a 
                    href="https://docs.google.com/document/d/108fN0vGKqQ8gP5I6hy4QgemoPIenAYZoq7fugSKMmrE/edit?usp=sharing" 
                    target="_blank"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-blue-100 text-blue-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    <span>Atidaryti</span>
                    <ArrowRight size={12} />
                  </a>
                </div>

                {/* Dokumentas 2: Poveikio priemonės */}
                <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 relative overflow-hidden group">
                  <div className="flex items-center space-x-4 mb-6 relative z-10">
                      <div className="bg-blue-600 p-3 rounded-xl text-white shadow-lg shadow-blue-200">
                        <ShieldCheck size={20} />
                      </div>
                      <h4 className="font-black text-blue-900 uppercase tracking-tight m-0 text-sm leading-tight">
                        POVEIKIO PRIEMONĖS
                      </h4>
                  </div>
                  <p className="text-[13px] text-slate-700 font-bold mb-6 leading-relaxed relative z-10">
                    Oficiali priemonių taikymo tvarka.
                  </p>
                  <a 
                    href="https://docs.google.com/document/d/1lW_O3lDzignHyF09xLoizM3fDfZnb5wrt0sBei7zsiU/edit?tab=t.0" 
                    target="_blank"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-blue-100 text-blue-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    <span>Atidaryti</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Chat Rekomendacija - Perkelta aukščiau metodinės medžiagos */}
            <div className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 my-10 relative overflow-hidden">
               <div className="flex items-center space-x-4 mb-8">
                  <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-lg">
                    <MessageSquareText size={28} />
                  </div>
                  <h4 className="font-black text-slate-900 uppercase tracking-tight m-0 text-2xl">Rekomenduojama greita pranešimo forma!</h4>
               </div>
               
               <p className="text-slate-600 font-bold mb-8 text-lg leading-relaxed">
                 Siekdami užtikrinti tylią ir greitą pagalbą per pamokas, primygtinai rekomenduojame naudoti <a href="https://chat.google.com/" target="_blank" className="font-black underline decoration-slate-400 decoration-4 hover:text-slate-900 transition-colors">Google Chat</a> programėlę:
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="bg-slate-900 text-white w-7 h-7 rounded-xl flex items-center justify-center text-[12px] font-black mb-4">1</span>
                    <p className="text-[13px] font-bold text-slate-900 mb-1 uppercase tracking-wider">Mažiau įtampos</p>
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed">Mokytojas gali paprašyti pagalbos be balso skambučio, nepalikdamas ugdymo kabineto.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="bg-slate-900 text-white w-7 h-7 rounded-xl flex items-center justify-center text-[12px] font-black mb-4">2</span>
                    <p className="text-[13px] font-bold text-slate-900 mb-1 uppercase tracking-wider">Pasiekiamumas</p>
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed">Matysite, kuris vadovas ar socialinė pedagogė yra prisijungusi ir gali operatyviai atvykti.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="bg-slate-900 text-white w-7 h-7 rounded-xl flex items-center justify-center text-[12px] font-black mb-4">3</span>
                    <p className="text-[13px] font-bold text-slate-900 mb-1 uppercase tracking-wider">Saugumas</p>
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed">Pranešimai matomi tik gavėjui, tai saugus būdas aptarti jautrias situacijas realiu laiku.</p>
                  </div>
               </div>
            </div>

            {/* Metodinė medžiaga ir įrankiai */}
            <div className="bg-indigo-50/50 p-8 md:p-10 rounded-[2.5rem] border border-indigo-100 my-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-600 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  <BookOpenCheck size={120} />
              </div>
              <div className="flex items-center space-x-4 mb-8 relative z-10">
                  <div className="bg-indigo-600 p-4 rounded-2xl text-white shadow-lg shadow-indigo-200">
                    <BookOpenCheck size={28} />
                  </div>
                  <h4 className="font-black text-indigo-900 uppercase tracking-tight m-0 text-xl md:text-2xl leading-tight">
                    METODINĖ MEDŽIAGA IR ĮRANKIAI
                  </h4>
              </div>
              
              <p className="text-indigo-950 font-bold mb-8 text-lg leading-relaxed relative z-10">
                LISC Edukacinės patirties bankas: elgesio ir emocijų valdymo rekomendacijos bei praktiniai įrankiai mokytojams.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 relative z-10">
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 flex items-start space-x-3">
                  <LayoutTemplate size={16} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                  <p className="text-[13px] font-bold text-indigo-900 m-0 leading-tight">Ugdymo organizavimo rekomendacijos (ES / AS)</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 flex items-start space-x-3">
                  <Award size={16} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                  <p className="text-[13px] font-bold text-indigo-900 m-0 leading-tight">Pirmoji pamoka: rekomendacijos klasių vadovams</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 flex items-start space-x-3">
                  <Map size={16} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                  <p className="text-[13px] font-bold text-indigo-900 m-0 leading-tight">Elgesio valdymo žemėlapiai (visoms klasėms)</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 flex items-start space-x-3">
                  <Trees size={16} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                  <p className="text-[13px] font-bold text-indigo-900 m-0 leading-tight">Mokymosi aplinkos pritaikymas</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 flex items-start space-x-3">
                  <Users2 size={16} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                  <p className="text-[13px] font-bold text-indigo-900 m-0 leading-tight">Klasės susitarimai ir jų diegimas</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 flex items-start space-x-3">
                  <CalendarDays size={16} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                  <p className="text-[13px] font-bold text-indigo-900 m-0 leading-tight">Vizuali dienotvarkė klasėje</p>
                </div>
              </div>
              
              <a 
                href="https://lisc.lt/edukacines-patirties-bankas/elgesio-ir-ar-emociju-sutrikimai/" 
                target="_blank"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-white border border-indigo-100 text-indigo-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm hover:shadow-md relative z-10"
              >
                <span>Peržiūrėti visus resursus LISC.lt</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroTab;