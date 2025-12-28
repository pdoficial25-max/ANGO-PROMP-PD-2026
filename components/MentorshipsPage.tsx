
import React from 'react';
import { ShieldCheck, MessageSquare, Calendar, Star, MapPin, Globe, ChevronRight, Award } from 'lucide-react';
import { UserRole } from '../types';

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  experience: string;
  rating: number;
  available: boolean;
  location: string;
}

const MENTORS_DATA: Mentor[] = [
  {
    id: 'm1',
    name: 'Gonçalo Almeida',
    avatar: 'https://picsum.photos/seed/goncalo/100',
    specialty: 'Engenharia de Prompts & SaaS',
    experience: '5+ anos em IA',
    rating: 5.0,
    available: true,
    location: 'Lisboa, Portugal'
  },
  {
    id: 'm2',
    name: 'Carla Dias',
    avatar: 'https://picsum.photos/seed/carla/100',
    specialty: 'Marketing de IA & Growth',
    experience: '8+ anos em Marketing',
    rating: 4.9,
    available: false,
    location: 'Luanda, Angola'
  },
  {
    id: 'm3',
    name: 'Admin ANGO',
    avatar: 'https://picsum.photos/seed/admin/100',
    specialty: 'Infraestrutura de IA & Dev',
    experience: '10+ anos em Tech',
    rating: 5.0,
    available: true,
    location: 'Global'
  }
];

const MentorshipsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 pt-4 pb-12 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 text-center md:text-left">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600/10 border border-red-500/20 rounded-full text-red-500 text-[10px] font-black uppercase tracking-[0.25em] mb-4 mx-auto md:mx-0">
            🤝 Mentorias de Elite
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 text-center md:text-left">Acelera a tua <br /><span className="text-red-600">Jornada</span></h2>
          <p className="text-gray-500 max-w-md font-medium text-sm md:text-base leading-relaxed mx-auto md:mx-0 text-center md:text-left">
            Acesso directo aos maiores especialistas do mercado. Aprende com quem já percorreu o caminho e domina os resultados.
          </p>
        </div>
        <div className="w-full md:w-64 p-6 bg-[#141414] border border-white/5 rounded-[40px] text-center shadow-2xl shrink-0">
          <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
            <Award size={32} />
          </div>
          <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Certificação Elite</p>
          <p className="text-gray-600 text-[9px] uppercase font-bold">Mentores validados</p>
        </div>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {MENTORS_DATA.map(mentor => (
          <div key={mentor.id} className="group bg-[#141414] border border-white/5 rounded-[48px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 transition-all hover:border-red-600/30 hover:bg-[#1a1a1a] shadow-2xl">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-red-600 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <img src={mentor.avatar} className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white/5 group-hover:border-red-600/30 transition-all" alt={mentor.name} />
              <div className={`absolute -bottom-2 -right-2 p-2 rounded-xl border-2 border-[#141414] shadow-lg ${mentor.available ? 'bg-green-500' : 'bg-gray-600'}`}>
                <ShieldCheck size={16} className="text-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">{mentor.name}</h3>
                <div className="flex items-center justify-center md:justify-start gap-1">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-gray-400">{mentor.rating}</span>
                </div>
              </div>
              <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-4">{mentor.specialty}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide">
                  <Award size={14} /> {mentor.experience}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide">
                  <MapPin size={14} /> {mentor.location}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide">
                  <Globe size={14} /> {mentor.available ? 'Disponível' : 'Agenda Completa'}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <button className="w-full md:w-48 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-red-600/10 uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 active:scale-95">
                <Calendar size={16} /> Marcar Sessão
              </button>
              <button className="w-full md:w-48 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl border border-white/10 transition-all uppercase tracking-widest text-[9px] flex items-center justify-center gap-2">
                <MessageSquare size={16} /> Ver Portfólio
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center py-16 border-t border-white/5">
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">ANGO – PROMPT PD MENTORSHIP PROGRAM</p>
        <p className="text-gray-500 text-xs max-w-lg mx-auto leading-relaxed">As mentorias são exclusivas para membros do plano Elite. Garante a tua vaga com antecedência devido à alta procura.</p>
      </div>
    </div>
  );
};

export default MentorshipsPage;
