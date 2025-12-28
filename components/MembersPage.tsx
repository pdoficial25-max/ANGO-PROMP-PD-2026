
import React, { useState } from 'react';
import { Search, UserPlus, MessageSquare, ShieldCheck, Star, Filter, ArrowRight, User } from 'lucide-react';
import { UserRole } from '../types';

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  area: string;
  isMentor: boolean;
  city: string;
}

const MEMBERS_DATA: Member[] = [
  { id: 'm1', name: 'Gonçalo Almeida', avatar: 'https://picsum.photos/seed/goncalo/100', role: UserRole.PREMIUM, area: 'AI SaaS', isMentor: true, city: 'Lisboa' },
  { id: 'm2', name: 'Admin ANGO', avatar: 'https://picsum.photos/seed/admin/100', role: UserRole.ADMIN, area: 'Infraestrutura', isMentor: true, city: 'Global' },
  { id: 'm3', name: 'Carla Dias', avatar: 'https://picsum.photos/seed/carla/100', role: UserRole.PREMIUM, area: 'IA Marketing', isMentor: false, city: 'Luanda' },
  { id: 'm4', name: 'Marta Silva', avatar: 'https://picsum.photos/seed/marta/100', role: UserRole.PREMIUM, area: 'Design IA', isMentor: false, city: 'Porto' },
  { id: 'm5', name: 'João Pereira', avatar: 'https://picsum.photos/seed/joao/100', role: UserRole.MEMBER, area: 'Copywriting', isMentor: false, city: 'Malanje' }
];

const MembersPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'mentors'>('all');
  const [search, setSearch] = useState('');

  const filteredMembers = MEMBERS_DATA.filter(m => {
    const matchesFilter = filter === 'all' || m.isMentor;
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.area.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto w-full px-4 pt-4 pb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
      {/* Header Centralizado e Elevado */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600/10 border border-red-500/20 rounded-full text-red-500 text-[10px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
          👥 Círculo Restrito
        </div>
        <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 text-center">Directório de <span className="text-red-600">Elite</span></h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium text-sm md:text-lg leading-relaxed text-center">
          Conecta-te com os maiores engenheiros de prompts e visionários de IA em Angola e no mundo.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between max-w-5xl mx-auto">
        <div className="flex gap-2 p-1 bg-white/5 border border-white/5 rounded-2xl justify-center">
          <button 
            onClick={() => setFilter('all')}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'text-gray-500 hover:text-white'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilter('mentors')}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'mentors' ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'text-gray-500 hover:text-white'}`}
          >
            Mentores
          </button>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-red-600 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#141414] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-xs text-white focus:outline-none focus:border-red-600/50"
          />
        </div>
      </div>

      {/* Grid de Membros - Circular Avatars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredMembers.map(member => (
          <div key={member.id} className="group bg-[#141414] border border-white/5 rounded-[40px] p-8 transition-all hover:border-red-600/30 hover:bg-[#1a1a1a] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              {member.isMentor && <ShieldCheck className="text-red-600" size={20} />}
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <img src={member.avatar} className="relative w-24 h-24 rounded-full object-cover border-4 border-white/5 group-hover:border-red-600/20 transition-all" alt="" />
              </div>

              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-1">{member.name}</h3>
              <p className="text-red-500 text-[9px] font-black uppercase tracking-widest mb-4">{member.area}</p>
              
              <div className="flex items-center gap-4 text-gray-600 text-[10px] font-bold uppercase mb-8">
                <span>{member.city}</span>
                <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                <span className={member.role === UserRole.PREMIUM ? 'text-red-600' : ''}>{member.role}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                <button className="flex items-center justify-center gap-2 p-3.5 bg-white/5 hover:bg-red-600 text-white rounded-xl transition-all active:scale-95 group/btn">
                  <UserPlus size={16} />
                </button>
                <button className="flex items-center justify-center gap-2 p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all active:scale-95">
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.4em] mb-6">Crescimento através de Conexões</p>
        <button className="inline-flex items-center gap-3 px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl uppercase tracking-widest text-xs transition-all shadow-2xl shadow-red-600/20 active:scale-95">
          Convidar Colega para Elite <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default MembersPage;
