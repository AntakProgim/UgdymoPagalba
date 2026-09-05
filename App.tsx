import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SchemesTab from './components/SchemesTab';
import ContactsTab from './components/ContactsTab';
import ScenariosTab from './components/ScenariosTab';
import IntroTab from './components/IntroTab';
import EmergencyTab from './components/EmergencyTab';
import AIAssistant from './components/AIAssistant';
import TemplatesTab from './components/TemplatesTab';
import ThemeToggle from './components/ThemeToggle';
import GlobalSearch from './components/GlobalSearch';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [lastContextTab, setLastContextTab] = useState('dashboard');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [selectedSpecialistName, setSelectedSpecialistName] = useState<string | undefined>(undefined);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab !== 'ai-assistant') {
      setLastContextTab(tab);
    }
    setActiveTab(tab);
    if (tab !== 'scenarios') {
      setSelectedScenarioId(null);
    }
  };

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    handleTabChange('scenarios');
  };

  const handleNavigateToSpecialist = (_specialistId: string, name?: string) => {
    setSelectedSpecialistName(name || '');
    handleTabChange('contacts');
  };

  const handleNavigateToTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    handleTabChange('templates');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={handleTabChange} onSelectScenario={handleSelectScenario} />;
      case 'emergency': return <EmergencyTab />;
      case 'intro': return <IntroTab setActiveTab={handleTabChange} />;
      case 'schemes': return <SchemesTab />;
      case 'contacts': return <ContactsTab initialSearchQuery={selectedSpecialistName} />;
      case 'templates': return <TemplatesTab initialTemplateId={selectedTemplateId} />;
      case 'scenarios': return <ScenariosTab setActiveTab={handleTabChange} initialScenarioId={selectedScenarioId} />;
      case 'ai-assistant': return <AIAssistant contextTab={lastContextTab} />;
      default: return <Dashboard setActiveTab={handleTabChange} onSelectScenario={handleSelectScenario} />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Apžvalga';
      case 'emergency': return 'SKUBI PAGALBA 112';
      case 'intro': return 'Metodika';
      case 'schemes': return 'Procesai';
      case 'contacts': return 'Specialistai';
      case 'templates': return 'Laiškų šablonai';
      case 'scenarios': return 'Situacijos';
      case 'ai-assistant': return 'DI emocinė pagalvėlė ✨';
      default: return 'VAP Pagalba';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] flex font-sans antialiased text-slate-800 dark:text-slate-100 overflow-hidden transition-colors duration-200">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-green-800 flex justify-between items-center bg-green-700 text-white">
          <h1 className="text-base font-black tracking-tight uppercase">VAP PAGALBA</h1>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-black/10 rounded-md transition-colors"><X size={18} /></button>
        </div>
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Apžvalga' },
            { id: 'intro', label: 'Nuostatos' },
            { id: 'scenarios', label: 'Situacijos' },
            { id: 'schemes', label: 'Schemos' },
            { id: 'contacts', label: 'Specialistai' },
            { id: 'templates', label: 'Laiškų šablonai' },
            { id: 'ai-assistant', label: 'DI Pagalvėlė ✨' },
            { id: 'emergency', label: '112 Pagalba' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { handleTabChange(item.id); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors flex items-center justify-between ${
                activeTab === item.id 
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-black' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Režimas</span>
            <ThemeToggle showLabel={true} />
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-14 sticky top-0 z-30 px-3 md:px-8 flex items-center justify-between flex-shrink-0 transition-colors duration-200 gap-2 md:gap-4">
          <div className="flex items-center space-x-2 md:space-x-3 shrink-0">
            <button className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <h2 className={`text-xs sm:text-sm font-black tracking-tight uppercase truncate max-w-[100px] sm:max-w-none ${activeTab === 'emergency' ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>{getTitle()}</h2>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden xl:block"></div>
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden xl:block">Vilniaus Antakalnio progimnazija</p>
            </div>
          </div>

          {/* Globali paieškos juosta antraštėje */}
          <GlobalSearch
            onNavigateToSpecialist={handleNavigateToSpecialist}
            onNavigateToTemplate={handleNavigateToTemplate}
          />

          <div className="flex items-center space-x-2 shrink-0">
            <ThemeToggle showLabel={false} />
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8 flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;