
import { SpecialistCategory, Specialist, EmailTemplate } from './types';

export const INITIAL_SPECIALISTS: Specialist[] = [
  // Administracija
  { id: 'adm1', name: 'Tomas Jankūnas', category: SpecialistCategory.ADMINISTRACIJA, classes: 'DIREKTORIUS', phone: '+37065900712', office: '43', email: 'direktorius@antakalnio.lt' },
  { id: 'adm2', name: 'Olga Telešova', category: SpecialistCategory.ADMINISTRACIJA, classes: 'PAVADUOTOJA UGDYMUI', phone: '+37063617239', office: '48', email: 'olga.telesova@antakalnio.lt' },
  { id: 'adm3', name: 'Jurgita Paravinskienė', category: SpecialistCategory.ADMINISTRACIJA, classes: 'PAVADUOTOJA UGDYMUI', phone: '+37065900715', office: '62', email: 'jurgita.paravinskiene@antakalnio.lt' },
  { id: 'adm4', name: 'Čianita Linkutė-Vuicik', category: SpecialistCategory.ADMINISTRACIJA, classes: 'PAVADUOTOJA UGDYMUI', phone: '+37067266304', office: '4', email: 'cianita.vuicik@antakalnio.lt' },
  { id: 'adm5', name: 'Adomas Vasiliauskas', category: SpecialistCategory.ADMINISTRACIJA, classes: 'PAVADUOTOJAS UGDYMO APLINKOS APSAUGAI IR ŪKIUI', phone: '+37065900517', office: '45', email: 'adomas.vasiliauskas@antakalnio.lt' },
  { id: 'adm6', name: 'Šarūnė Biržytė', category: SpecialistCategory.ADMINISTRACIJA, classes: 'RAŠTINĖ / ADMINISTRATORĖ', phone: '+37065900612', office: '43', email: 'rastine@antakalnio.lt' },
  
  // Socialiniai pedagogai
  { id: 's1', name: 'Edita Barkovskienė', category: SpecialistCategory.SOCIALINIAI, classes: 'SOCIALINĖ PEDAGOGĖ (1, 5, 6 KL.)', phone: '+37065900940', office: '44', email: 'edita.barkovskiene@antakalnio.lt' },
  { id: 's2', name: 'Agnė Vanagienė', category: SpecialistCategory.SOCIALINIAI, classes: 'SOCIALINĖ PEDAGOGĖ (2, 3, 4 KL.)', phone: '+37065900940', office: '44', email: 'agne.vanagiene@antakalnio.lt' },
  { id: 's3', name: 'Neringa Kazėnaitė-Piragė', category: SpecialistCategory.SOCIALINIAI, classes: 'SOCIALINĖ PEDAGOGĖ (7, 8 KL.)', phone: '+37065900783', office: '58', email: 'neringa.kazenaite@antakalnio.lt' },
  
  // Logopedai
  { id: 'l1', name: 'Grita Rakauskaitė', category: SpecialistCategory.LOGOPEDAI, classes: '1 KLASĖS', phone: '+37061149019', office: '14', email: 'grita.rakauskaite@antakalnio.lt' },
  { id: 'l2', name: 'Milda Piliuvienė', category: SpecialistCategory.LOGOPEDAI, classes: '5 IR 6 KLASĖS', phone: '+37063195761', office: '66', email: 'milda.piliuviene@antakalnio.lt' },
  { id: 'l3', name: 'Živilė Borisevič', category: SpecialistCategory.LOGOPEDAI, classes: '2 IR 5 KLASĖS', phone: '+37069261678', office: '14', email: 'zivile.borisevic@antakalnio.lt' },
  { id: 'l4', name: 'Lina Kumžienė', category: SpecialistCategory.LOGOPEDAI, classes: '2 KLASĖS', phone: '+37067266798', office: '19', email: 'lina.kumziene@antakalnio.lt' },
  { id: 'l5', name: 'Ginta Azguridienė', category: SpecialistCategory.LOGOPEDAI, classes: '4 KLASĖS', phone: '+37067256510', office: '8', email: 'ginta.azguridiene@antakalnio.lt' },
  { id: 'l6', name: '[Naujas Logopedas]', category: SpecialistCategory.LOGOPEDAI, classes: '[Pildoma]', phone: '[Tel. numeris]', office: '[Kab. nr.]', email: 'logopedas@antakalnio.lt' },

  // Psichologai
  { id: 'p1', name: 'Vilma Dečkutė', category: SpecialistCategory.PSICHOLOGAI, classes: '5-8 KLASĖS (ir 1-4 kl.)', phone: '+37061817771', office: '42', email: 'vilma.deckute@antakalnio.lt' },
  { id: 'p2', name: 'Martynas Kostiuška', category: SpecialistCategory.PSICHOLOGAI, classes: '1-4 KLASĖS (ir 5-8 kl.)', phone: '+37064302848', office: '71', email: 'martynas.kostiuska@antakalnio.lt' },

  // Specialieji pedagogai
  { id: 'sp1', name: 'Milda Panavienė', category: SpecialistCategory.SPECIALIEJI, classes: '1-4 KLASĖS', phone: '+37067032752', office: '1', email: 'milda.panaviene@antakalnio.lt' },
  { id: 'sp2', name: 'Olga Telešova', category: SpecialistCategory.SPECIALIEJI, classes: '5-6 KLASĖS (ir 7-8 kl.)', phone: '+37068519075', office: '52', email: 'olga.telesova@antakalnio.lt' },
  { id: 'sp_new1', name: '[Naujas specialusis pedagogas 1]', category: SpecialistCategory.SPECIALIEJI, classes: '[Pildoma / Klasės]', phone: '[Tel. numeris]', office: '[Kab. nr.]', email: 'specialusis.pedagogas1@antakalnio.lt' },
  { id: 'sp_new2', name: '[Naujas specialusis pedagogas 2]', category: SpecialistCategory.SPECIALIEJI, classes: '[Pildoma / Klasės]', phone: '[Tel. numeris]', office: '[Kab. nr.]', email: 'specialusis.pedagogas2@antakalnio.lt' },
  { id: 'sp_new3', name: '[Naujas specialusis pedagogas 3]', category: SpecialistCategory.SPECIALIEJI, classes: '[Pildoma / Klasės]', phone: '[Tel. numeris]', office: '[Kab. nr.]', email: 'specialusis.pedagogas3@antakalnio.lt' },

  // Sveikata
  { id: 'sv1', name: 'Lina Miškinienė', category: SpecialistCategory.SVEIKATA, classes: 'SVEIKATOS SPECIALISTĖ', phone: '+37067207344', office: '2', email: 'lina.miskiniene@antakalnio.lt' },
];

export const INITIAL_TEMPLATES: EmailTemplate[] = [
  // 1-5. Incidentai & Sveikata
  {
    id: 't1',
    category: 'Incidentai / krizės',
    title: 'Savivaldybės informavimas',
    recipientType: 'Savivaldybė',
    to: 'greta.sarkovaite@vilnius.lt',
    cc: 'diana.petkuniene@vilnius.lt, direktorius@antakalnio.lt',
    subject: 'Teikiame pranešimą apie mokykloje įvykusį incidentą',
    body: 'Laba diena,\n\nšiuo laišku teikiame pranešimą apie mokykloje įvykusį ar sužinotą incidentą:\nĮvykio data ir laikas:\nĮvykio pobūdis: [smurtas mokykloje, smurtas artimoje aplinkoje, krizė, psichoaktyvių medžiagų vartojimas ar kt.].\nĮvykio aplinkybės: [aprašykite].\nMokyklos atlikti veiksmai: [aprašyti].\n\nKontaktinis asmuo: Olga Telešova, +37068519075'
  },
  {
    id: 't2',
    category: 'Incidentai / krizės',
    title: 'GDPR Smurto atvejis',
    recipientType: 'Tėvai',
    subject: 'INFORMACINIS PRANEŠIMAS APIE ASMENS DUOMENŲ PERDAVIMĄ',
    body: 'Laba diena.\n\nVadovaudamiesi BDAR 13 straipsniu, informuojame apie duomenų perdavimą specializuotos pagalbos centrui dėl smurto atvejo. Duomenų valdytojas: Vilniaus Antakalnio progimnazija, Antakalnio g. 33. Duomenų apsaugos pareigūnas: dap@eblaw.lt.'
  },
  {
    id: 't3',
    category: 'Sveikata',
    title: 'Sveikatos patikra (Raštinė)',
    level: 'A',
    role: 'Raštinė',
    recipientType: 'Darbuotojas',
    subject: 'Priminimas dėl sveikatos pažymos',
    body: 'Laba diena.\nBaigėsi Jūsų sveikatos patikros galiojimas. Prašome nedelsiant užsiregistruoti patikrai VšĮ Antakalnio poliklinikoje (tel. 8 5 234 2515) bei užeiti į raštinę pasiimti medicininės knygelės.'
  },
  {
    id: 't4',
    category: 'Sveikata',
    title: 'Sveikatos patikra (Vadovas)',
    level: 'B',
    role: 'Vadovas',
    recipientType: 'Darbuotojas',
    subject: 'Dėl sveikatos patikrinimo pažymos pateikimo',
    body: 'Laba diena.\nPo priminimo Jums delsiant tikrintis sveikatą, prašau per artimiausias 3 darbo dienas užsiregistruoti į gydymo įstaigą ir informuoti pavaduotoją apie paskirtą datą.'
  },
  {
    id: 't5',
    category: 'Sveikata',
    title: 'Sveikatos patikra (Direktorius)',
    level: 'C',
    role: 'Direktorius',
    recipientType: 'Darbuotojas',
    subject: 'Svarbu: darbuotojo sveikatos pažyma',
    body: 'Laba diena,\nįpareigoju per vieną darbo dieną pranešti man apie sveikatos patikros datą. Negavus informacijos, vadovaujantis DK 58 str., būsite įspėtas dėl darbo sutarties nutraukimo.'
  },

  // 6-9. Administraciniai & Lankomumas
  {
    id: 't6',
    category: 'Administraciniai',
    title: 'QR kodo teistumas',
    recipientType: 'Darbuotojas',
    subject: 'Dėl QR kodo išsiėmimo',
    body: 'Laba diena,\nPedagogų registre esantiems kodo nereikia. Kitiems (aplinkos, IT, biblioteka) – būtina patiems išsiimti per IRD sistemą iki 2025-01-31. Pagalba: Adomas Vasiliauskas.'
  },
  {
    id: 't7',
    category: 'Lankomumas',
    title: 'Lankomumas (Mokytojas)',
    level: 'A',
    role: 'Mokytojas',
    recipientType: 'Tėvai',
    subject: 'Dėl pamokų lankomumo',
    body: 'Laba diena,\nPastebėta, kad praleistų pamokų skaičius viršija normą. Primename, tėvai gali pateisinti iki 5 d. per mėnesį. Prašau pateikti dokumentus arba informuoti apie priežastis.'
  },
  {
    id: 't8',
    category: 'Lankomumas',
    title: 'Lankomumas (Vadovas)',
    level: 'B',
    role: 'Vadovas',
    recipientType: 'Tėvai',
    subject: 'Situacija dėl mokyklos lankymo',
    body: 'Laba diena,\nrašome dėl vaiko lankomumo. Reguliarus dalyvavimas pamokose yra esminis sėkmingam mokymuisi. Prašome patikslinti priežastis, kodėl pamokos praleidžiamos.'
  },
  {
    id: 't9',
    category: 'Lankomumas',
    title: 'Lankomumas (Direktorius)',
    level: 'C',
    role: 'Direktorius',
    recipientType: 'Tėvai',
    subject: 'KRITINIS: Situacija dėl lankymo',
    body: 'Laba diena,\nnepaisant ankstesnių kreipimųsi, lankomumas negerėja. Tėvai yra atsakingi už vaiko mokyklos lankymą. Prašome per 2 d. susisiekti su mokykla, kitaip kreipsimės į institucijas.'
  },

  // 10-12. Telefonai
  {
    id: 't10',
    category: 'Telefonai',
    title: 'Telefonų naudojimas (A)',
    level: 'A',
    role: 'Mokytojas',
    recipientType: 'Tėvai',
    subject: 'Dėl mobilaus telefono naudojimo',
    body: 'Laba diena,\nrašau dėl vaiko telefono naudojimo. Esame "mokykla be telefonų". Prašome namuose aptarti taisyklių naudą: geresnį susitelkimą ir aktyvesnį bendravimą pertraukų metu.'
  },
  {
    id: 't11',
    category: 'Telefonai',
    title: 'Telefonų naudojimas (B)',
    level: 'B',
    role: 'Vadovas',
    recipientType: 'Tėvai',
    subject: 'Dėl pasikartojančių pažeidimų',
    body: 'Laba diena,\nvaikas toliau nesilaiko telefono taisyklių. Prašome per 3 d. namuose įvesti ribojimus (pvz. Family Link) ir aptarti pasekmes už taisyklių nesilaikymą.'
  },
  {
    id: 't12',
    category: 'Telefonai',
    title: 'Telefonų naudojimas (C)',
    level: 'C',
    role: 'Direktorius',
    recipientType: 'Tėvai',
    subject: 'Griežtas įspėjimas dėl telefonų',
    body: 'Laba diena,\nkaip direktorius informuoju apie kritinę situaciją. Prašome užtikrinti, kad telefonas būtų išjungtas prieš mokyklą. Nesikeičiant elgesiui, klausimas keliaus į VGK.'
  },

  // 13-15. Patyčios
  {
    id: 't13',
    category: 'Patyčios',
    title: 'Netinkamas elgesys (A)',
    level: 'A',
    role: 'Mokytojas',
    recipientType: 'Tėvai',
    subject: 'Dėl elgesio su klasės draugais',
    body: 'Laba diena,\nkreipiuosi dėl pastebėto netinkamo vaiko elgesio su kitais mokiniais. Prašome namuose pasikalbėti: išklausyti vaiką ir padėti suprasti, kaip jaučiasi tas, iš kurio tyčiojamasi.'
  },
  {
    id: 't14',
    category: 'Patyčios',
    title: 'Netinkamas elgesys (B)',
    level: 'B',
    role: 'Vadovas',
    recipientType: 'Tėvai',
    subject: 'Skubūs veiksmai dėl elgesio',
    body: 'Laba diena,\nsituacija dėl patyčių reikalauja sprendimo. Būtini veiksmai: pokalbis namuose, elgesio stebėsena. Rekomenduojame naudoti "STOP" metodą (Sustok, Giliai įkvėpk, Pagalvok, Pasirink).'
  },
  {
    id: 't15',
    category: 'Patyčios',
    title: 'Netinkamas elgesys (C)',
    level: 'C',
    role: 'Direktorius',
    recipientType: 'Tėvai',
    subject: 'Dėl besitęsiančių patyčių',
    body: 'Laba diena,\ngauname pakartotinius pranešimus apie vaiko elgesį. Tai kelia nesaugumą. Jei situacija negerės, perduosime klausimą Vaiko gerovės komisijai.'
  },

  // 16-20. Įvairūs (Uniformos, Vadovėliai, Atsitiktinumai)
  {
    id: 't16',
    category: 'Uniformos',
    title: 'Uniformos nedėvėjimas (A)',
    level: 'A',
    role: 'Mokytojas',
    recipientType: 'Tėvai',
    subject: 'Dėl mokyklos uniformos',
    body: 'Laba diena,\npastebėjome, kad vaikas ne visada dėvi uniformą. Tai mūsų bendruomenės susitarimas. Prašome pasirūpinti, kad vaikas ją dėvėtų kasdien.'
  },
  {
    id: 't17',
    category: 'Uniformos',
    title: 'Uniformos nedėvėjimas (B)',
    level: 'B',
    role: 'Vadovas',
    recipientType: 'Tėvai',
    subject: 'Pakartotinis priminimas: uniforma',
    body: 'Laba diena,\nsituacija dėl uniformos nesikeičia. Prašome per 3 d. informuoti apie priežastis, kodėl jos nedėvitte. Jei reikia finansinės paramos – kreipkitės.'
  },
  {
    id: 't18',
    category: 'Administraciniai',
    title: 'Vadovėlių grąžinimas',
    recipientType: 'Tėvai',
    subject: 'Priminimas dėl vadovėlių',
    body: 'Laba diena,\ndar nėra grąžinti šių metų vadovėliai. Prašome juos pristatyti į biblioteką iki šios savaitės pabaigos.'
  },
  {
    id: 't19',
    category: 'Incidentai / krizės',
    title: 'Nelaimingas atsitikimas',
    recipientType: 'Tėvai',
    subject: 'Informacija apie įvykį',
    body: 'Laba diena,\ninformuoju apie šiandien mokykloje įvykusį nelaimingą atsitikimą. Vaikui suteikta pirminė pagalba, situacija kontroliuojama. Stebėkite savijautą namuose.'
  },
  {
    id: 't20',
    category: 'Administraciniai',
    title: 'Taisyklių pažeidimai (A)',
    recipientType: 'Tėvai',
    subject: 'Dėl mokyklos taisyklių laikymosi',
    body: 'Laba diena,\nrašau dėl pastebėto elgesio taisyklių pažeidimo. Prašome namuose pasikalbti apie taisyklių prasmę saugumui ir bendruomenei.'
  },

  // 21-27. Dienynas, SUP, Aplinka
  {
    id: 't21',
    category: 'Administraciniai',
    title: 'Dienyno nenaudojimas',
    recipientType: 'Tėvai',
    subject: 'Kvietimas prisijungti prie el. dienyno',
    body: 'Laba diena,\npastebėjau, kad dar nesate prisijungę prie dienyno. Tai pagrindinis ryšio kanalas. Pagalba: adomas.vasiliauskas@antakalnio.lt.'
  },
  {
    id: 't22',
    category: 'Mokymasis / SUP',
    title: 'Neigiami įvertinimai',
    recipientType: 'Tėvai',
    subject: 'Dėl mokymosi rezultatų gerinimo',
    body: 'Laba diena,\nartėjant pusmečiui, kai kurie įvertinimai nepatenkinami. Paskatinkite vaiką dalyvauti konsultacijose ir atlikti papildomas užduotis.'
  },
  {
    id: 't23',
    category: 'Mokymasis / SUP',
    title: 'Sveikatos pažyma (Mokinio)',
    recipientType: 'Tėvai',
    subject: 'Priminimas dėl mokinio sveikatos pažymos',
    body: 'Laba diena,\nvaiko sveikatos pažymos galiojimas baigėsi. Tai privaloma planuojant fizinį krūvį. Prašome operatyviai pateikti naują pažymą el. sistemoje.'
  },
  {
    id: 't24',
    category: 'Incidentai / krizės',
    title: 'Psichoaktyvios medžiagos (A)',
    recipientType: 'Tėvai',
    subject: 'Dėl prevencijos mokykloje',
    body: 'Gerbiama bendruomene,\ninformuojame apie įtarimus dėl psichoaktyvių medžiagų vartojimo. Mokykla ėmėsi veiksmų. Primename, kad „Telegram“ nėra saugi platforma vaikams.'
  },
  {
    id: 't25',
    category: 'Incidentai / krizės',
    title: 'Pagalba dėl priklausomybių',
    recipientType: 'Tėvai',
    cc: 'olga.telesova@antakalnio.lt',
    subject: 'Informacija dėl pagalbos psichoaktyvių medžiagų vartojimo atveju',
    body: 'Laba diena,\nsiunčiu informaciją apie pagalbos galimybes. Ankstyva intervencija labai svarbi. Nuoroda: [įdėti nuorodą į dokumentą].'
  },
  {
    id: 't26',
    category: 'Mokymasis / SUP',
    title: 'IPP bendrinimas',
    recipientType: 'Tėvai',
    subject: 'Individualus pagalbos planas (IPP)',
    body: 'Laba diena,\nparengėme vaiko IPP. Jį galite pasiekti čia: [NUORODA]. Tikslas – užtikrinti optimalias mokymosi saugyklas pagal PPT rekomendacijas.'
  },
  {
    id: 't27',
    category: 'Aplinka',
    title: 'Oro sąlygos žiemą',
    recipientType: 'Tėvai',
    subject: 'Dėl saugaus elgesio žiemą',
    body: 'Gerbiami tėveliai,\nsudarome galimybę būti lauke per pertraukas. Prašome pasirūpinti apranga ir aptarti saugų elgesį su sniegu (gniūžtės prie takų draudžiamos).'
  }
];
