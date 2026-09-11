import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  FileText, 
  CheckCircle2, 
  HeartHandshake, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  School, 
  Coffee, 
  DoorOpen, 
  Shirt, 
  Compass, 
  Check, 
  Eye,
  MessageSquareHeart,
  Calendar
} from 'lucide-react';
import { exportAgreementsToPdf, printAgreementsDirectly } from '../utils/pdfExport';

export interface AgreementItem {
  id: string;
  space: string;
  shortSpace: string;
  icon: React.ReactNode;
  community: string; // Bendruomeniškumas
  respect: string;   // Pagarba ir tolerancija
  responsibility: string; // Atsakomybė
  highlight?: string;
}

export const SCHOOL_AGREEMENTS_DATA: AgreementItem[] = [
  {
    id: 'klaseje',
    space: 'KLASĖJE',
    shortSpace: 'Klasėje',
    icon: <School size={20} className="text-amber-700 dark:text-amber-300" />,
    community: 'Padedu ir priimu kiekvieną, įtraukiu į veiklą.',
    respect: 'Klausau, kai kitas kalba, leidžiu pasisakyti.',
    responsibility: 'Į pamoką ateinu laiku ir turiu reikiamas priemones.',
  },
  {
    id: 'valgykloje',
    space: 'VALGYKLOJE',
    shortSpace: 'Valgykloje',
    icon: <Coffee size={20} className="text-amber-700 dark:text-amber-300" />,
    community: 'Eilėje laukiu kantriai.',
    respect: 'Bendrauju ramiu balsu.',
    responsibility: 'Pavalgęs nusinešu indus, palieku stalą švarų.',
  },
  {
    id: 'tualetuose',
    space: 'TUALETUOSE',
    shortSpace: 'Tualetuose',
    icon: <DoorOpen size={20} className="text-amber-700 dark:text-amber-300" />,
    community: 'Gerbiu laukiančiųjų eilę, neužtrunku.',
    respect: 'Saugau kito privatumą (nežiūriu, netrukdau).',
    responsibility: 'Palieku patalpą tvarkingą, saugau inventorių bei tausoju popierių ir muilą.',
  },
  {
    id: 'koridoriuose',
    space: 'KORIDORIUOSE',
    shortSpace: 'Koridoriuose',
    icon: <Layers size={20} className="text-amber-700 dark:text-amber-300" />,
    community: 'Pasisveikinu ir praleidžiu einantįjį.',
    respect: 'Bendrauju ramiu balsu ir neužgaunant kitų (be keiksmažodžių).',
    responsibility: 'Einu saugiai (nebėgioju), palieku praėjimą kitiems laukdamas vienoje sienos pusėje.',
  },
  {
    id: 'persirengimo',
    space: 'PERSIRENGIMO KAMBARIUOSE',
    shortSpace: 'Persirengimo k.',
    icon: <Shirt size={20} className="text-amber-700 dark:text-amber-300" />,
    community: 'Priimu kiekvieną ir elgiuosi taip, kad neįžeisčiau ir neskaudinčiau kitų.',
    respect: 'Liečiu tik savo daiktus ir drabužius.',
    responsibility: 'Tvarkingai susidedu daiktus, greitai persirengiu.',
  },
  {
    id: 'visur',
    space: 'VISUR IR VISADA',
    shortSpace: 'Visur ir visada',
    icon: <Compass size={20} className="text-amber-700 dark:text-amber-300" />,
    community: 'Pasirūpinu ir padedu kitam. Telefoną laikau kuprinėje.',
    respect: 'Giriu girdint visiems, kritiką išsakau individualiai.',
    responsibility: 'Atsimenu, kad visos emocijos yra leistinos, bet ne visas elgesys yra priimtinas.',
    highlight: 'Visose mokyklos erdvėse',
  },
];

const SchoolAgreements: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      await exportAgreementsToPdf();
      setNotification('PDF dokumentas sėkmingai sugeneruotas ir atsiųstas į Jūsų įrenginį!');
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      console.error('PDF export error:', error);
      alert('Nepavyko sugeneruoti PDF. Bandykite spausdinti.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    printAgreementsDirectly();
  };

  const filteredData = activeFilter === 'all' 
    ? SCHOOL_AGREEMENTS_DATA 
    : SCHOOL_AGREEMENTS_DATA.filter(item => item.id === activeFilter);

  return (
    <div id="mokyklos-susitarimai" className="my-10 space-y-6">
      {/* Pranešimas apie atsiuntimą */}
      {notification && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
          <div className="flex items-center space-x-3 text-emerald-800 dark:text-emerald-200 text-sm font-bold">
            <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
            <span>{notification}</span>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-emerald-600 hover:text-emerald-800 text-xs font-bold uppercase tracking-wider ml-4"
          >
            Uždaryti
          </button>
        </div>
      )}

      {/* Pagrindinė kortelė */}
      <div className="bg-gradient-to-b from-amber-50/70 via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-2 border-amber-200 dark:border-amber-900/50 rounded-[2.5rem] p-6 md:p-10 shadow-lg shadow-amber-900/5 relative overflow-hidden">
        
        {/* Dekoratyvinis fonas */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.04] text-amber-800 pointer-events-none translate-x-8 -translate-y-8">
          <Sparkles size={240} />
        </div>

        {/* Antraštė ir veiksmai */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-amber-200/60 dark:border-amber-900/40">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-800 rounded-full mb-3">
              <Sparkles size={12} className="text-amber-700 dark:text-amber-300" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 dark:text-amber-200">
                Pagal PEPIS principus dirbant su vaikais
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-[900] text-slate-900 dark:text-white uppercase tracking-tight">
              MOKYKLOS SUSITARIMAI
            </h2>
            <p className="text-xs font-bold text-amber-900/80 dark:text-amber-300/80 mt-1 uppercase tracking-wide">
              Vilniaus Antakalnio progimnazija • Pozityvaus elgesio palaikymo ir intervencijų sistema
            </p>
          </div>

          {/* Eksporto ir spausdinimo mygtukai */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/Vilniaus_Antakalnio_progimnazija_Mokyklos_susitarimai_PEPIS.pdf"
              download="Vilniaus_Antakalnio_progimnazija_Mokyklos_susitarimai_PEPIS.pdf"
              onClick={() => {
                setNotification('Atsisiunčiamas oficialus mokyklos susitarimų PDF dokumentas!');
                setTimeout(() => setNotification(null), 5000);
              }}
              className="inline-flex items-center space-x-2.5 px-5 py-3 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Download size={15} />
              <span>ATSISIŲSTI PDF (A4)</span>
            </a>
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-2.5 px-5 py-3 bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-sm"
            >
              <Printer size={15} />
              <span>Spausdinti</span>
            </button>
          </div>
        </div>

        {/* Direktoriaus Tomo Jankūno padėkos tekstas */}
        <div className="relative z-10 my-8 bg-gradient-to-r from-amber-100/90 via-amber-50 to-orange-50/80 dark:from-amber-950/40 dark:via-slate-800/80 dark:to-slate-800 border-l-4 border-amber-500 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md hidden sm:flex flex-shrink-0">
              <MessageSquareHeart size={24} />
            </div>
            <div className="space-y-3">
              <div className="text-[10px] font-black uppercase tracking-widest text-amber-800 dark:text-amber-400">
                Progimnazijos vadovo žodis ir padėka bendruomenei
              </div>
              <p className="text-base md:text-lg font-black text-amber-950 dark:text-amber-100 italic leading-relaxed">
                „Ačiū, kad kuriate saugią ir bendradarbiaujančią mokyklos aplinką. Tik kartu galime sukurti mokyklą, kurioje vadovaujamės bendrais susitarimais ir vertybėmis!“
              </p>
              <div className="pt-1 flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Tomas Jankūnas
                </span>
                <span className="text-slate-400 dark:text-slate-500">•</span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  Vilniaus Antakalnio progimnazijos direktorius
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filtrų juosta */}
        <div className="relative z-10 mb-6 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mr-2">
            Rodyti erdvę:
          </span>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeFilter === 'all'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            Visos erdvės
          </button>
          {SCHOOL_AGREEMENTS_DATA.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveFilter(item.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeFilter === item.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.shortSpace}
            </button>
          ))}
        </div>

        {/* 3 Pagrindinių vertybių paaiškinimas */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-amber-100/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4 flex items-center space-x-3">
            <div className="p-2 bg-amber-500 text-white rounded-xl">
              <HeartHandshake size={18} />
            </div>
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-amber-950 dark:text-amber-200">
                BENDRUOMENIŠKUMAS
              </div>
              <div className="text-[10px] font-bold text-amber-800/80 dark:text-amber-400">
                Bendradarbiavimas, palaikymas ir įtrauktis
              </div>
            </div>
          </div>

          <div className="bg-emerald-100/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-4 flex items-center space-x-3">
            <div className="p-2 bg-emerald-600 text-white rounded-xl">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-emerald-950 dark:text-emerald-200">
                PAGARBA IR TOLERANCIJA
              </div>
              <div className="text-[10px] font-bold text-emerald-800/80 dark:text-emerald-400">
                Ramybė, išklausymas ir asmeninės ribos
              </div>
            </div>
          </div>

          <div className="bg-blue-100/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-2xl p-4 flex items-center space-x-3">
            <div className="p-2 bg-blue-600 text-white rounded-xl">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-blue-950 dark:text-blue-200">
                ATSAKOMYBĖ
              </div>
              <div className="text-[10px] font-bold text-blue-800/80 dark:text-blue-400">
                Tvarka, saugumas ir emocijų supratimas
              </div>
            </div>
          </div>
        </div>

        {/* Susitarimų kortelės pagal erdves */}
        <div className="relative z-10 space-y-4">
          {filteredData.map(item => (
            <div 
              key={item.id}
              className="bg-white dark:bg-slate-800/90 rounded-2xl border border-amber-200/80 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Erdvės antraštė */}
              <div className="px-5 py-3.5 bg-amber-50/80 dark:bg-slate-800 border-b border-amber-100 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 bg-amber-100 dark:bg-slate-700 rounded-lg">
                    {item.icon}
                  </div>
                  <h3 className="text-sm md:text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    {item.space}
                  </h3>
                </div>
                {item.highlight && (
                  <span className="text-[9px] font-black px-2.5 py-1 bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 rounded-full uppercase tracking-wider">
                    {item.highlight}
                  </span>
                )}
              </div>

              {/* Trijų stulpelių turinys */}
              <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Bendruomeniškumas */}
                <div className="p-4 bg-amber-50/40 dark:bg-slate-900/50 rounded-xl border border-amber-100/80 dark:border-slate-700/50">
                  <div className="flex items-center space-x-2 mb-2 text-amber-800 dark:text-amber-400">
                    <HeartHandshake size={14} />
                    <span className="text-[9px] font-black uppercase tracking-wider">Bendruomeniškumas</span>
                  </div>
                  <p className="text-xs md:text-[13px] font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                    {item.community}
                  </p>
                </div>

                {/* Pagarba ir tolerancija */}
                <div className="p-4 bg-emerald-50/40 dark:bg-slate-900/50 rounded-xl border border-emerald-100/80 dark:border-slate-700/50">
                  <div className="flex items-center space-x-2 mb-2 text-emerald-800 dark:text-emerald-400">
                    <ShieldCheck size={14} />
                    <span className="text-[9px] font-black uppercase tracking-wider">Pagarba ir tolerancija</span>
                  </div>
                  <p className="text-xs md:text-[13px] font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                    {item.respect}
                  </p>
                </div>

                {/* Atsakomybė */}
                <div className="p-4 bg-blue-50/40 dark:bg-slate-900/50 rounded-xl border border-blue-100/80 dark:border-slate-700/50">
                  <div className="flex items-center space-x-2 mb-2 text-blue-800 dark:text-blue-400">
                    <CheckCircle2 size={14} />
                    <span className="text-[9px] font-black uppercase tracking-wider">Atsakomybė</span>
                  </div>
                  <p className="text-xs md:text-[13px] font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                    {item.responsibility}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SchoolAgreements;
