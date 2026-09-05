import React from 'react';
import ThemeToggle from './ThemeToggle';
import { 
  ShieldAlert, 
  Phone, 
  AlertTriangle,
  BookOpen,
  Sparkles,
  Siren,
  Trees,
  Database,
  LayoutGrid,
  FileText,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Apžvalga', icon: <LayoutGrid size={16} /> },
    { id: 'intro', label: 'Nuostatos', icon: <BookOpen size={16} /> },
    { id: 'scenarios', label: 'Situacijos', icon: <AlertTriangle size={16} /> },
    { id: 'schemes', label: 'Schemos', icon: <ShieldAlert size={16} /> },
    { id: 'contacts', label: 'Specialistai', icon: <Phone size={16} /> },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
  };

  const TEMPLATES_URL = 'https://docs.google.com/document/d/171tuL9pKuBYC376oxjoqmdM9NSqfAsinSpHJoyk2m8Y/edit?tab=t.qschqx6t8w1';
  const REGISTRAI_URL = 'https://antakalnio.lt/paslaugos/registrai';

  return (
    <aside className="w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0 hidden lg:flex flex-col z-40 shadow-sm transition-colors duration-200">
      {/* Brand Header - Compact */}
      <div className="p-5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-700 text-white rounded-lg flex items-center justify-center shadow-md transform rotate-1">
            <Trees size={16} />
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900 dark:text-white tracking-tighter leading-none">VAP</h1>
            <p className="text-[8px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-[0.15em] mt-0.5">PORTALAS</p>
          </div>
        </div>
      </div>
      
      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-6 scrollbar-thin mt-8">
        
        {/* Main Navigation Section */}
        <div className="space-y-0.5">
          <p className="px-3 text-[8px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em] mb-2">Navigacija</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all group ${
                activeTab === item.id 
                  ? 'bg-emerald-700 text-white shadow-md' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
              }`}
            >
              <span className={activeTab === item.id ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'}>
                {item.icon}
              </span>
              <span className="text-[12px] font-bold flex-1 text-left">
                {item.label}
              </span>
            </button>
          ))}
        </div>
        
        {/* Support Section */}
        <div className="space-y-0.5 pb-6">
          <p className="px-3 text-[8px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em] mb-2">Pagalba ir Resursai</p>
          
          <button
            onClick={() => setActiveTab('ai-assistant')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all group border ${
              activeTab === 'ai-assistant' 
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-100 dark:border-amber-900/50' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 border-transparent'
            }`}
          >
            <div className={`p-1.5 rounded-md ${activeTab === 'ai-assistant' ? 'bg-amber-200/50 dark:bg-amber-900/50' : 'bg-slate-50 dark:bg-slate-800'}`}>
              <Sparkles size={14} className={activeTab === 'ai-assistant' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 group-hover:text-amber-500'} />
            </div>
            <span className="text-[12px] font-bold flex-1 text-left">DI Pagalvėlė</span>
          </button>

          <button
            onClick={() => setActiveTab('emergency')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all group border ${
              activeTab === 'emergency' 
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-100 dark:border-rose-900/50' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 border-transparent'
            }`}
          >
            <div className={`p-1.5 rounded-md ${activeTab === 'emergency' ? 'bg-rose-100/50 dark:bg-rose-900/50' : 'bg-slate-50 dark:bg-slate-800'}`}>
              <Siren size={14} className={activeTab === 'emergency' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400 group-hover:text-rose-600 dark:group-hover:text-rose-400'} />
            </div>
            <span className="text-[12px] font-bold flex-1 text-left">112 Pagalba</span>
          </button>

          {/* Letter Templates */}
          <button
            onClick={() => window.open(TEMPLATES_URL, '_blank')}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all group"
          >
            <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-md group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
              <FileText size={14} className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
            </div>
            <span className="text-[12px] font-bold flex-1 text-left">Laiškų šablonai</span>
            <ExternalLink size={10} className="text-slate-300 dark:text-slate-600 group-hover:text-emerald-400" />
          </button>

          {/* Registrai */}
          <button
            onClick={() => window.open(REGISTRAI_URL, '_blank')}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all group"
          >
            <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-md group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
              <Database size={14} className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
            </div>
            <span className="text-[12px] font-bold flex-1 text-left">Registrai</span>
            <ExternalLink size={10} className="text-slate-300 dark:text-slate-600 group-hover:text-emerald-400" />
          </button>
        </div>
      </nav>
      
      {/* Footer - Minimal with Theme Switcher */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/40 space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Režimas</span>
          <ThemeToggle showLabel={true} />
        </div>
        <div className="text-center pt-1 border-t border-slate-100/60 dark:border-slate-800/60">
          <a href="https://antakalnio.lt" target="_blank" className="text-[9px] text-emerald-800 dark:text-emerald-400 font-black uppercase tracking-tight hover:underline">
            antakalnio.lt
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;