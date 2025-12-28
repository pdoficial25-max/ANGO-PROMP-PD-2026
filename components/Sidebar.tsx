
import React from 'react';
import { MENU_ITEMS } from '../constants';
import { Section, User } from '../types';
import { LogOut } from 'lucide-react';

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  isMobileOpen: boolean;
  isSidebarVisible: boolean; // Propriedade para controlar visibilidade no desktop
  toggleMobile: () => void;
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  isMobileOpen, 
  isSidebarVisible, 
  toggleMobile, 
  user, 
  onLogout 
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[#0f0f0f] border-r border-white/5 z-50 transition-all duration-500
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isSidebarVisible ? 'md:translate-x-0' : 'md:-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo - Centered */}
          <div className="p-6 text-center border-b border-white/5">
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
              ANGO-PROMPT PD
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Plataforma de Elite</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pt-6">
            <div className="px-4 pb-4 text-center">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/40">Menu Principal</span>
            </div>
            
            {MENU_ITEMS.map((item) => {
              const isFeed = item.id === 'Feed';
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    if (window.innerWidth < 768) toggleMobile();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${activeSection === item.id 
                      ? 'bg-red-600/10 text-red-500 border border-red-500/20 shadow-[0_0_20px_rgba(220,38,38,0.1)]' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}
                  `}
                >
                  <span className={activeSection === item.id ? 'text-red-500' : 'text-gray-500'}>
                    {item.icon}
                  </span>
                  <span className={`text-sm font-semibold ${isFeed ? 'text-white' : ''}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* User Info Footer - Circular Avatar */}
          <div className="p-4 border-t border-white/5 bg-[#0a0a0a]/50">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src={user.avatar} 
                  className="w-10 h-10 rounded-full border-2 border-red-600 shadow-lg shadow-red-600/10 shrink-0 object-cover" 
                  alt={user.name} 
                />
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate leading-tight">{user.name}</p>
                  <p className="text-[9px] text-gray-500 truncate mt-0.5">{user.email}</p>
                </div>
              </div>
              
              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-red-600/10 hover:text-red-500 text-gray-400 py-2.5 rounded-xl text-xs font-bold transition-all border border-transparent hover:border-red-500/20 uppercase tracking-widest active:scale-95"
              >
                <LogOut size={14} />
                Sair
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
