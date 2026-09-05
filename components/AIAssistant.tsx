import React, { useState, useRef, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Coffee, 
  Trash2, 
  Heart,
  Zap,
  Send,
  Loader2,
  Waves,
  BrainCircuit,
  ShieldAlert,
  UserCheck,
  Clock,
  Speaker
} from 'lucide-react';
import { INITIAL_SPECIALISTS, INITIAL_TEMPLATES } from '../constants';

// --- Audio Helper Functions ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const STORAGE_KEY = 'vap_ai_text_history_v7';

interface Message {
  role: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS: Record<string, { label: string, prompt: string, icon: React.ReactNode }[]> = {
  contacts: [
    { label: "Kur psichologas?", prompt: "Padėk surasti psichologą ir pasakyk jo kabineto numerį.", icon: <BrainCircuit size={14} /> },
    { label: "Budintis vadovas", prompt: "Kas šiandien mokinių saugumu besirūpinantis ugdymo vadovas?", icon: <ShieldAlert size={14} /> }
  ],
  templates: [
    { label: "Uniformos laiškas", prompt: "Sukurk laišką dėl uniformos.", icon: <UserCheck size={14} /> },
    { label: "Patyčios", prompt: "Kaip pranešti apie patyčias?", icon: <ShieldAlert size={14} /> }
  ],
  scenarios: [
    { label: "Fizinis ginčas", prompt: "Ką daryti kilus fiziniam ginčui?", icon: <ShieldAlert size={14} /> },
    { label: "SOS algoritmas", prompt: "SOS suicidinis elgesys.", icon: <Zap size={14} /> }
  ],
  dashboard: [
    { label: "Nusiraminimas", prompt: "Pasiūlyk atsipalaidavimo pratimą.", icon: <Coffee size={14} /> },
    { label: "Dienos patarimas", prompt: "Trumpas patarimas psichologinei higienai.", icon: <Sparkles size={14} /> }
  ]
};

interface AIAssistantProps {
  contextTab?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ contextTab = 'dashboard' }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const now = new Date().toLocaleTimeString('lt-LT', { hour: '2-digit', minute: '2-digit' });
    return saved ? JSON.parse(saved) : [{ 
      role: 'bot', 
      text: `Sveiki! Esu VAP DI emocinė pagalvėlė. Matau, kad domitės emocine pagalba. Kaip galėčiau Jums padėti šią akimirką?`,
      timestamp: now
    }];
  });
  
  const [isMuted, setIsMuted] = useState(false);
  const [inputText, setInputText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const getContextSpecificData = () => {
    switch (contextTab) {
      case 'contacts': return `Specialistai: ${INITIAL_SPECIALISTS.map(s => s.name).join(', ')}.`;
      case 'templates': return `Laiškų kategorijos: ${Array.from(new Set(INITIAL_TEMPLATES.map(t => t.category))).join(', ')}.`;
      default: return `Vilniaus Antakalnio progimnazijos kontekstas.`;
    }
  };

  const systemPrompt = `Esi Vilniaus Antakalnio progimnazijos (VAP) skaitmeninis asistentas – „DI pagalvėlė“. 
Tavo tikslas – teikti greitą, profesionalią ir empatišką pagalbą mokytojams bei personalui.
Kontekstas: ${getContextSpecificData()}.

Svarbios taisyklės:
1. Visada naudok bendrinį terminą „el. dienynas“ (niekada neminėk TAMO, nes mokykla naudoja „Mano dienynas“).
2. Emocinės sveikatos ir psichologinės pagalbos klausimais remkis ir rekomenduok nacionalinę platformą https://pagalbasau.lt/.

Tavo tonas: mandagus, palaikantis, konstruktyvus, akademiškas, bet šiltas.
Atsakymai: trumpi, aiškūs, orientuoti į konkrečių VAP procedūrų (UAK, PEPIS) paaiškinimą.
Jei vartotojas mini krizę ar didelį stresą, pirmiausia pasiūlyk trumpą nusiraminimo techniką, nurodyk mokyklos psichologą arba nukreipk į pagalbasau.lt.`;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(isMuted ? 0 : 1, audioContextOutRef.current?.currentTime || 0, 0.1);
    }
    // Stop audio if muted
    if (isMuted) {
      stopAudio();
    }
  }, [isMuted]);

  const stopAudio = () => {
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e){} });
    sourcesRef.current.clear();
    setIsPlayingAudio(false);
  };

  const playResponseAudio = async (text: string) => {
    if (isMuted) return;
    
    try {
      setIsPlayingAudio(true);
      
      // Initialize Audio Context on user interaction if needed
      if (!audioContextOutRef.current) {
        audioContextOutRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        gainNodeRef.current = audioContextOutRef.current.createGain();
        gainNodeRef.current.connect(audioContextOutRef.current.destination);
      } else if (audioContextOutRef.current.state === 'suspended') {
        await audioContextOutRef.current.resume();
      }

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!res.ok) {
        console.warn("TTS server returned non-ok status:", res.status);
        setIsPlayingAudio(false);
        return;
      }

      const data = await res.json();
      const audioData = data.audio;
      
      if (audioData) {
        const ctx = audioContextOutRef.current!;
        const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(gainNodeRef.current!);
        
        source.addEventListener('ended', () => {
          sourcesRef.current.delete(source);
          if (sourcesRef.current.size === 0) {
            setIsPlayingAudio(false);
          }
        });
        
        source.start();
        sourcesRef.current.add(source);
      } else {
        setIsPlayingAudio(false);
      }

    } catch (e) {
      console.error("Audio generation failed", e);
      setIsPlayingAudio(false);
    }
  };

  const handleSendText = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText.trim();
    if (!textToSend || isGenerating) return;
    
    // Stop any currently playing audio when new request starts
    stopAudio();

    const now = new Date().toLocaleTimeString('lt-LT', { hour: '2-digit', minute: '2-digit' });
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend, timestamp: now }]);
    setIsGenerating(true);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          systemInstruction: systemPrompt
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Serverio atsakymo klaida (${res.status})`);
      }
      
      const responseText = data.text || "Atsiprašau, negavau atsakymo teksto.";
      setMessages(prev => [...prev, { role: 'bot', text: responseText, timestamp: now }]);
      
      // Auto-play the response
      await playResponseAudio(responseText);

    } catch (err: any) {
      console.error("DI Pagalvėlės klaida:", err);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: `Šiuo metu nepavyko gauti atsakymo (${err?.message || 'ryšio triktis'}). Prašome pabandyti dar kartą.`, 
        timestamp: now 
      }]);
    } finally { 
      setIsGenerating(false); 
    }
  };

  const activePrompts = QUICK_PROMPTS[contextTab] || QUICK_PROMPTS.dashboard;

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden transition-all duration-500">
      
      {/* Header */}
      <div className={`px-8 py-5 flex items-center justify-between transition-all duration-1000 bg-slate-900 text-white relative overflow-hidden`}>
        <div className="flex items-center space-x-5 relative z-10">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 bg-white/10 text-white/50 border-white/10`}>
            {isPlayingAudio ? <Waves size={28} className="animate-pulse text-emerald-400" /> : <Sparkles size={24} />}
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-[900] tracking-tight uppercase leading-none">DI Pagalvėlė</h2>
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
              <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] leading-none">
                {isPlayingAudio ? 'KALBA...' : 'VAP ASISTENTAS'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 relative z-10">
          <button 
            onClick={() => { if(confirm("Ar tikrai norite ištrinti visą pokalbį?")) setMessages([]); }} 
            className="p-3 hover:bg-white/10 rounded-2xl text-white/30 hover:text-white transition-all group"
            title="Išvalyti"
          >
            <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Conversation Area */}
      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 bg-slate-50/10 scrollbar-thin">
        {/* Quick Prompts */}
        <div className="flex space-x-3 overflow-x-auto pb-6 no-scrollbar -mx-2 px-2">
          {activePrompts.map((p, i) => (
            <button 
              key={i} 
              onClick={() => handleSendText(p.prompt)} 
              className="flex-shrink-0 flex items-center space-x-3 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-[800] text-slate-600 hover:border-emerald-600 hover:text-emerald-800 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-sm group"
            >
              <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-emerald-50 transition-colors">{p.icon}</div>
              <span className="uppercase tracking-widest">{p.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-8 max-w-3xl mx-auto">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-3 duration-500`}>
              <div className={`flex items-end space-x-3 max-w-[88%] ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-xs shadow-md border-2 transition-transform hover:scale-110 ${m.role === 'user' ? 'bg-slate-900 text-white border-slate-800' : 'bg-white text-emerald-700 border-emerald-50'}`}>
                  {m.role === 'user' ? <Zap size={18} /> : <Heart size={18} />}
                </div>
                <div className="flex flex-col space-y-1">
                  <div className={`px-6 py-4 rounded-[1.75rem] text-[15px] font-bold leading-relaxed shadow-sm border whitespace-pre-wrap ${m.role === 'user' ? 'bg-slate-900 text-white rounded-br-none border-slate-800' : 'bg-white text-slate-800 border-slate-100 rounded-bl-none'}`}>
                    {m.text}
                  </div>
                  <div className={`flex items-center space-x-1.5 px-2 text-[9px] font-black uppercase tracking-widest text-slate-300 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <Clock size={10} />
                    <span>{m.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="flex justify-start items-center space-x-4 animate-pulse">
               <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100"><Loader2 className="animate-spin text-emerald-600" size={18} /></div>
               <div className="space-y-1">
                  <span className="text-[10px] font-[900] uppercase tracking-[0.3em] text-emerald-600/50">DI Pagalvėlė galvoja</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-emerald-300 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
                    <div className="w-1 h-1 bg-emerald-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                    <div className="w-1 h-1 bg-emerald-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                  </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Control Bar - Sleek Glassmorphism */}
      <div className="px-8 py-8 bg-white border-t border-slate-100 shadow-[0_-15px_50px_rgba(0,0,0,0.03)] z-20">
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="flex items-center space-x-4">
            {/* Input Bar */}
            <div className="flex-1 relative group">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') handleSendText(); }}
                placeholder="Rašykite klausimą čia..."
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-8 py-5 text-[15px] font-[700] outline-none focus:border-emerald-600 focus:bg-white focus:shadow-xl focus:shadow-emerald-900/5 transition-all duration-300 placeholder-slate-300"
              />
              <button 
                onClick={() => handleSendText()} 
                disabled={!inputText.trim() || isGenerating} 
                className={`absolute right-2.5 top-2.5 p-3.5 rounded-2xl transition-all transform active:scale-90 ${inputText.trim() ? 'bg-emerald-700 text-white shadow-lg hover:bg-emerald-800' : 'text-slate-300 cursor-not-allowed opacity-50'}`}
              >
                <Send size={22} />
              </button>
            </div>

            {/* Interaction Buttons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all border-2 active:scale-90 ${isMuted ? 'bg-rose-50 text-rose-600 border-rose-100 shadow-inner' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border-slate-100 hover:border-slate-300'}`}
                title={isMuted ? "Garsas išjungtas" : "Garsas įjungtas"}
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AIAssistant;