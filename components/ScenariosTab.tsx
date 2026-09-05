
import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Shirt, AlertTriangle, Heart, HelpCircle, 
  ChevronRight, MessageSquare, ShieldCheck, Zap, 
  Users, BookOpen, UserCheck, CloudRain, Snowflake, Info,
  PauseCircle, Ban, Skull, Siren, Diamond, AlertCircle,
  ChevronDown, Smile, ClipboardList, User, FileText, Activity,
  MessageSquareText, ExternalLink, BookOpenCheck
} from 'lucide-react';

interface ScenarioItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  parent?: string;
  scheme: string[];
  additional: string;
  resourceLink?: string;
}

interface ScenariosTabProps {
  setActiveTab: (tab: string) => void;
  initialScenarioId?: string | null;
}

const ScenariosTab: React.FC<ScenariosTabProps> = ({ setActiveTab, initialScenarioId }) => {
  const [selectedId, setSelectedId] = useState('netinkamas');
  const [expandedParents, setExpandedParents] = useState<string[]>(['suicidinis', 'psicho', 'emociniai']);

  useEffect(() => {
    if (initialScenarioId) {
      setSelectedId(initialScenarioId);
      // Auto expand parent if the selected ID has a parent
      const selected = scenarios.find(s => s.id === initialScenarioId);
      if (selected && selected.parent) {
        setExpandedParents(prev => prev.includes(selected.parent!) ? prev : [...prev, selected.parent!]);
      }
    }
  }, [initialScenarioId]);

  const SOSIcon = () => (
    <div className="bg-red-600 text-white text-[10px] font-black px-1 py-0.5 rounded leading-none flex items-center justify-center min-w-[24px]">
      SOS
    </div>
  );

  const PauseIcon = () => (
    <div className="bg-orange-500 p-1 rounded text-white flex items-center justify-center">
      <div className="flex space-x-0.5">
        <div className="w-1 h-3 bg-white"></div>
        <div className="w-1 h-3 bg-white"></div>
      </div>
    </div>
  );

  const scenarios: ScenarioItem[] = [
    {
      id: 'netinkamas',
      title: 'Netinkamas elgesys pamokų metu',
      icon: <PauseIcon />,
      scheme: [
        'Mokytojas skiria 2-3 žodines pastabas dėl netinkamo elgesio, aiškiai įvardydamas pažeidimą.',
        'Mokiniui nesureagavus, priimamas sprendimas dėl ugdymo aplinkos keitimas (UAK).',
        'Kviečiamas saugumu besirūpinantis mokyklos vadovas, kuris palydi mokinį savarankiškam darbui.',
        'Mokytojas informuoja tėvus per Mano Dienyną tą pačią dieną.',
        'Pirmas UAK. Refleksija su soc. pedagogu. Antras UAK. Pokalbis su klasės vadovu. Trečias UAK. Tėvų kvietimas.'
      ],
      additional: 'KEIKSMAŽODŽIAI. Sudrausminti mokinį (vertinti elgesį, ne asmenybę). Paprašyti atsiprašymo. Kartojantis – fiksuoti pastabą dienyne.'
    },
    {
      id: 'suicidinis',
      title: 'Suicidinis elgesys',
      icon: <SOSIcon />,
      scheme: [
        'Ketinimas žalotis. Informuoti psichologą arba socialinį pedagogą/vadovą. Nepalikti asmens vieno.',
        'Bandymas žalotis. Nedelsiant skambinti 112, vykdyti BPC nurodymus.',
        'Informuoti mokinio tėvus ir mokyklos vadovybę operatyviai.',
        'Skubus VGK posėdis situacijai aptarti ir pagalbos planui sudaryti.',
        'Saugumo plano sudarymas ir pasirašytinas susitarimas su mokinio tėvais.'
      ],
      additional: 'SVARBU. Išlikti ramiam, išklausyti, nemoralizuoti. Pagalba: 112 arba vaiko teisių linija 116 111.'
    },
    {
      id: 'kaip-kalbeti',
      title: 'Kaip kalbeti?',
      parent: 'suicidinis',
      icon: <User size={16} className="text-amber-500" />,
      scheme: [
        'Išklausykite ramiai, nenutraukite. Parodykite, kad suprantate jausmus.',
        'Nebijokite tiesiogiai klausti: „Ar galvoji apie savižudybę?“. Tai parodo rūpestį.',
        'Pasakykite, kad nors pokalbis konfidencialus, privalote pranešti specialistams dėl gyvybės saugumo.',
        'Naudoti. „Matau, kad tau labai sunku“, „Ačiū, kad pasidalinai“, „Tu nesi vienas“.'
      ],
      additional: 'Venkite. „Viskas bus gerai“, „Tau tik taip atrodo“, „Pagalvok apie tėvus“.'
    },
    {
      id: 'uniformos',
      title: 'Uniformos nedėvėjimas',
      icon: <Shirt size={18} className="text-blue-400" />,
      scheme: [
        'Pastebėjus pažeidimą. Mokytojas tą pačią dieną informuoja tėvus per el. dienyną (ženklelis).',
        'Surinkus >3 ženklelius. Klasės vadovas siunčia šabloninį laišką tėvams el. paštu.',
        'Tėvams nesureagavus. Klasės vadovas informuoja pavaduotoją ugdymui.',
        'Situacijai negerėjant. Siunčiamas mokyklos direktoriaus laiškas tėvams.'
      ],
      additional: 'Uniforma yra mokyklos bendruomenės susitarimas, ugdantis tapatybę ir lygybę.'
    },
    {
      id: 'draudziami',
      title: 'Draudžiamų daiktų turėjimas',
      icon: <Ban size={18} className="text-red-500" />,
      scheme: [
        'Pranešti saugumu besirūpinančiam vadovui arba socialiniam pedagogui.',
        'Sudaroma 3 asmenų patikrinimo komisija (dalyvaujant tėvams, jei įmanoma).',
        'Prašoma mokinio parodyti daiktus su jo sutikimu.',
        'Radus daiktų. Surašomas aktas, informuojami tėvai, daiktai paimami atidavimui tėvams/policijai.',
        'Be sutikimo. Informuoti tėvai. Tėvams neduodant sutikimo, kviečiama policija.'
      ],
      additional: 'Draudžiama. tabakas, el. cigaretės, peiliai, ginklai, duošai, sprogmenys, alkoholis, narkotikai.'
    },
    {
      id: 'psicho',
      title: 'Psichoaktyvios medžiagos',
      icon: <Skull size={18} className="text-gray-700" />,
      scheme: [
        'Įtarus vartojimą. Mokinys palydimas pas sveikatos specialistą, informuojami tėvai.',
        'Pirmas vartojimo atvejis. Vadovas organizuoja susitikimą su mokinio tėvais, paskiriamas koordinatorius.',
        'Pasikartojus. Šaukiamas VGK posėdis arba sudaroma specialistų komanda pagalbai teikti.',
        'Pranešimas policijai. Jei tai ne pirmas kartas, saugumu besirūpinantis administratorius praneša per epolicija.lt.',
        'SVARBU. Daiktų patikrinimas įtarus psichoaktyvias medžiagas rekomenduojamas kartu su tėvais.'
      ],
      additional: 'Pakeitimas. Jei tėvai neduoda sutikimo patikrinti vaiko daiktų, mokykla privalo kviesti policiją.'
    },
    {
      id: 'zenklai',
      title: 'Atpažinimo ženklai',
      parent: 'psicho',
      icon: <div className="bg-red-500 p-1 rounded-sm text-white flex items-center justify-center"><Siren size={12} /></div>,
      scheme: [
        'Vyzdžiai. Išsiplėtę (stimuliatoriai), susitraukę (opioidai), pulsuojantys (marihuana).',
        'Nistagmas. Akių obuolių trūkčiojimas (dažnai esant alkoholio intoksikacijai).',
        'Pulsas. Akivaizdus sulėtėjimas arba padažnėjimas (norma 60–90 tvinksnių/min).',
        'Dūrių žymės. Raudonos dėmės (0-8 val.), tamsios dėmės (5-14 d.).',
        'Kvapas. Alkoholio, tabako, specifinis marihuanos ar cheminių medžiagų kvapas.',
        'Asmenybės pokyčiai. Brandumo stoka, melavimas, vėlavimas, nepaaiškinama baimė.'
      ],
      additional: 'Ilgalaikio vartojimo ženklai. Higienos stoka, raudonas akys, apetito pokyčiai, vengiama bendrauti.'
    },
    {
      id: 'smurtas',
      title: 'Įtarus smurtą',
      icon: <Diamond size={18} className="text-red-500 fill-red-500" />,
      scheme: [
        'Fiksuoti smurto požymius (fizinius, emocinius, nepriežiūrą) raštu.',
        'Nedelsiant pranešti mokyklos vadovui arba tiesiogiai VTAS / policijai.',
        'Inicijuoti pokalbį su vaiku (darbuotojas, turintis gerą ryšį su vaiku).',
        'Vadovas praneša policijai, VTAS ir Specializuotos kompleksinės pagalbos centrui.',
        'VGK nustato pagalbos poreikį. psichologinė pagalba, švietimo pagalba ar išorinė parama.'
      ],
      additional: 'FORMOS. Fizinis smurtas, Psichologinis (ignoravimas, teroras), Seksualinis, Nepriežiūra (fizinė/emocinė).'
    },
    {
      id: 'patycios',
      title: 'Patyčios',
      icon: <MessageSquare size={18} className="text-gray-600" />,
      scheme: [
        'Pirminiai veiksmai. Nutraukti patyčias, priminti taisykles, informuoti klasės vadovą.',
        'Klasės vadovas. Individualūs pokalbiai su dalyviais, tėvų informavimas, situacijos stebėjimas.',
        'Elektroninės patyčios. Išsaugoti įrodymus (Printscreen), nustatyti dalyvių tapatybes.',
        'Nesiliaujant. Kreipiamasi į specialistus, vėliau į VGK veiksmų plano sudarymui.',
        'Pagalba esant grėsmei. Skambinti 112 arba Vaiko linijai 116 111.'
      ],
      additional: 'KONFIDENCIALUMAS. Visa informacija yra konfidenciali. Svarbu safe "Patyčių dėžutė".'
    },
    {
      id: 'ginčas',
      title: 'Fizinis ginčas',
      icon: <Zap size={18} className="text-red-500" />,
      scheme: [
        'Smurto sustabdymas. Nedelsiant įsikišti ir atskirti konfliktuojančius asmenis.',
        'Nukentėjusiųjų būklė. Įvertinti sužalojimus, jei reikia – kviesti slaugytoją.',
        'Grėsmės valdymas. Rimtų sužalojimų atveju skambinti 112.',
        'Informuoti saugumu besirūpinantį administratorių pagal savaitės grafiką.',
        'Tėvų informavimas. Operatyviai susisiekti su visų dalyvavusių tėvais/globėjais.'
      ],
      additional: 'SVARBU. Išlaikyti ramybę. Jūsų asmeninis saugumas yra prioritetas.'
    },
    {
      id: 'telefonai',
      title: 'Mobilieji telefonai',
      icon: <Smartphone size={18} className="text-black" />,
      scheme: [
        'Taisyklė. Žodinis priminimas. Kartojantis – mokinys registruojamas specialioje formoje.',
        'Klasės vadovas. Peržiūri formą, informuoja tėvus, jei pažeista >=3 kartus.',
        'Pasekmės. Po pokalbio su tėvais dar 3 pažeidimai – privalomi rytiniai užsiėmimai (savaitę).',
        'Specialioji pagalba. Klasės vadovas kreipiasi į soc. pedagogę pagalbos plano sudarymui.',
        'Kraštutinė priemonė. Tėvų lankomi užsiėmimai, jei mokinys nesilaiko tvarkos.'
      ],
      additional: 'ANTALKALNIO PROGIMNAZIJA – ERDVĖ BE TELEFONŲ. Taisyklė galioja ir pertraukų metu.'
    },
    {
      id: 'emociniai',
      title: 'Emociniai sutrikimai',
      icon: <Smile size={18} className="text-amber-500" />,
      scheme: [
        'Supratimas. Elgesio mokymas grindžiamas ne bausme, o pozityvia disciplina.',
        'Tolerancijos langas. Optimali rami būsena. Jei vaikas jį palieka – mokymasis sustoja.',
        'Hiperaktyvacija. „Kova arba bėgimas“. Reikia leisti vaikui atsitraukti į ramybės erdvę.',
        'Hipoaktyvacija. „Sustingimas“. Reikia pasiūlyti nedidelę fizinę veiklą suaktyvinimui.',
        'Tikslas. Išmokyti vaiką valdyti emocijas, o ne slopinti jas per kontrolę.'
      ],
      additional: 'ELGESYS KAIP KOMUNIKACIJA. Visada klausti – ką vaikas bando pasiekti šiuo elgesiu?',
      resourceLink: 'https://lisc.lt/edukacines-patirties-bankas/elgesio-ir-ar-emociju-sutrikimai/'
    },
    {
      id: 'mokymas',
      title: 'Elgesio mokymo veikimai',
      parent: 'emociniai',
      icon: <ClipboardList size={16} className="text-gray-400" />,
      scheme: [
        'Mokyklos lygmuo. PEPIS sistemos kūrimas (nuoseklūs susitarimai visoje mokykloje).',
        'Klasės lygmuo. Aplinkos pritaikymas (nuspėjamumas, vizualiniai planai, aiškios taisyklės).',
        'Individualus lygmuo. Poreikių atpažinimas (saugumas, pripažinimas), IPP plano sudarymas.',
        'Intervencija. Sutelkti dėmesį į įgūdžių mokymą (savireguliacija), o ne į bausmes.',
        'Bendradarbiavimas. Nuosekli pagalba klasėje ir namuose per pasitikėjimu grįstą ryšį.'
      ],
      additional: 'Mokytojo nuostata. Tikėti vaiku net tada, kai jis pats savimi netiki.'
    }
  ];

  const toggleParent = (parentId: string) => {
    setExpandedParents(prev => 
      prev.includes(parentId) ? prev.filter(p => p !== parentId) : [...prev, parentId]
    );
  };

  const renderMenuItem = (s: ScenarioItem) => {
    if (s.parent) return null;

    const hasChildren = scenarios.some(child => child.parent === s.id);
    const isExpanded = expandedParents.includes(s.id);
    const children = scenarios.filter(child => child.parent === s.id);

    return (
      <div key={s.id} className="mb-1">
        <button
          onClick={() => {
            setSelectedId(s.id);
            if (hasChildren) toggleParent(s.id);
          }}
          className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center justify-between group ${
            selectedId === s.id ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3 overflow-hidden">
            {hasChildren && (
              <ChevronDown 
                size={14} 
                className={`transition-transform flex-shrink-0 text-gray-400 ${isExpanded ? '' : '-rotate-90'}`} 
              />
            )}
            <span className="flex-shrink-0 flex items-center justify-center w-6">{s.icon}</span>
            <span className={`text-[13px] truncate ${selectedId === s.id ? 'font-bold text-gray-900' : 'text-gray-700'}`}>{s.title}</span>
          </div>
        </button>

        {hasChildren && isExpanded && (
          <div className="ml-8 space-y-1">
            {children.map(child => (
              <button
                key={child.id}
                onClick={() => setSelectedId(child.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center space-x-3 text-[13px] ${
                  selectedId === child.id ? 'font-bold text-gray-900 bg-gray-50' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex-shrink-0 flex items-center justify-center w-6">{child.icon}</span>
                <span className="truncate">{child.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const current = scenarios.find(s => s.id === selectedId) || scenarios[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-180px)]">
      <div className="md:col-span-4 bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden shadow-sm">
        <div className="p-4 border-b bg-gray-50/50">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Procedūrų sąrašas</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
          {scenarios.map(renderMenuItem)}
        </div>
      </div>
      
      <div className="md:col-span-8 flex flex-col min-h-0">
        <div className="bg-white border border-gray-200 rounded-xl flex-1 flex flex-col p-8 shadow-sm overflow-y-auto scrollbar-thin">
          <div className="flex items-start space-x-4 mb-10">
            <div className="p-4 bg-gray-50 rounded-2xl flex-shrink-0 shadow-inner">
              {current.icon}
            </div>
            <div className="pt-1">
              <h3 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">{current.title}</h3>
              {current.parent && (
                <div className="flex items-center text-xs text-green-600 font-bold mt-2 uppercase tracking-wide">
                  <span className="bg-green-50 px-2 py-0.5 rounded">Skyrius. {scenarios.find(p => p.id === current.parent)?.title}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-10">
            <section>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center">
                <Activity size={14} className="mr-2 text-green-500" />
                DETALI PROCEDŪRA
              </h4>
              <div className="space-y-4">
                {current.scheme.map((step, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className="flex-shrink-0 mr-4 mt-0.5">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-green-700 text-[11px] bg-green-50 border border-green-100 group-hover:scale-110 transition-transform">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="bg-white flex-1 p-4 rounded-xl border border-gray-100 text-gray-800 text-[14px] leading-relaxed font-semibold shadow-sm hover:border-green-200 transition-colors">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-amber-50 border border-amber-100 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 text-amber-600 group-hover:scale-125 transition-transform duration-700">
                <Info size={96} />
              </div>
              <h4 className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.2em] mb-3 flex items-center">
                <Info size={14} className="mr-2" />
                SVARBU ŽINOTI
              </h4>
              <p className="text-[15px] text-amber-950 leading-relaxed font-bold relative z-10 whitespace-pre-wrap mb-4">
                {current.additional}
              </p>
              {current.resourceLink && (
                <a 
                  href={current.resourceLink} 
                  target="_blank" 
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-amber-700 border border-amber-200 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all shadow-sm relative z-10"
                >
                  <BookOpenCheck size={14} />
                  <span>Išsamūs LISC resursai</span>
                </a>
              )}
            </section>
          </div>

          <div className="mt-auto pt-10 border-t flex flex-col items-start gap-4">
            <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium">
              <MessageSquareText size={18} className="text-blue-500 flex-shrink-0" />
              <span>Prireikus skubios pagalbos pamokos metu, rekomenduojame <a href="https://chat.google.com" target="_blank" className="text-blue-600 font-bold hover:underline">Google Chat</a> (tylu ir greita).</span>
            </div>
            
            <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium">
              <FileText size={18} className="text-green-600 flex-shrink-0" />
              <span>Išsamų situacijų valdymo dokumentą galite rasti <a href="https://docs.google.com/document/d/108fN0vGKqQ8gP5I6hy4QgemoPIenAYZoq7fugSKMmrE/edit?usp=sharing" target="_blank" className="text-green-700 font-bold hover:underline">Google Docs</a> platformoje.</span>
            </div>

            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
              <div className="hidden sm:block"></div>
              <button 
                onClick={() => setActiveTab('contacts')}
                className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 transition-all flex items-center space-x-2 shadow-lg shadow-green-100"
              >
                <span>Visi specialistai</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenariosTab;
