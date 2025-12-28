
import React, { useState } from 'react';
import { 
  Megaphone, 
  Search, 
  Calendar, 
  Tag, 
  ArrowRight, 
  AlertCircle, 
  Zap, 
  Info, 
  Star,
  ExternalLink,
  ChevronRight,
  Clock,
  Pin
} from 'lucide-react';

interface Announcement {
  id: string;
  type: 'urgent' | 'update' | 'event' | 'opportunity';
  title: string;
  description: string;
  date: number;
  author: string;
  category: string;
  isPinned?: boolean;
  link?: string;
  image?: string;
}

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    type: 'urgent',
    title: 'Manutenção Programada do Sistema',
    description: 'Realizaremos uma atualização nos nossos servidores de IA para melhorar a latência do Gerador de Prompts. A plataforma poderá ficar instável por 30 minutos.',
    date: Date.now() + 86400000,
    author: 'Equipa Técnica',
    category: 'Infraestrutura',
    isPinned: true
  },
  {
    id: 'a2',
    type: 'opportunity',
    title: 'Abertura de Novas Vagas para Mentores',
    description: 'Estamos à procura de especialistas em IA para se juntarem ao nosso conselho de mentores. Se tens resultados comprovados, candidata-te agora.',
    date: Date.now() - 3600000 * 2,
    author: 'Recursos Humanos',
    category: 'Comunidade',
    link: '#',
    image: 'https://images.unsplash.com/photo-1522071823991-b5ae7264040d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'a3',
    type: 'update',
    title: 'Novo Módulo: Gemini 3 Pro Deep Dive',
    description: 'Já está disponível o curso completo sobre as novas capacidades do modelo Gemini 3 Pro. Aprende a usar o Thinking Budget para tarefas complexas.',
    date: Date.now() - 86400000,
    author: 'Admin ANGO',
    category: 'Cursos',
    link: '#'
  },
  {
    id: 'a4',
    type: 'event',
    title: 'Workshop Ao Vivo: Automação de Vendas',
    description: 'Junta-te a nós na próxima sexta-feira para um workshop prático sobre como usar prompts para automatizar funis de vendas no WhatsApp.',
    date: Date.now() + 86400000 * 3,
    author: 'Marketing',
    category: 'Eventos',
    link: '#'
  }
];

const AnnouncementsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'urgent' | 'update' | 'event' | 'opportunity'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAnnouncements = MOCK_ANNOUNCEMENTS.filter(ann => {
    const matchesFilter = filter === 'all' || ann.type === filter;
    const matchesSearch = ann.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ann.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTypeStyles = (type: Announcement['type']) => {
    switch (type) {
      case 'urgent': return { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-500', icon: <AlertCircle size={16} /> };
      case 'update': return { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-500', icon: <Zap size={16} /> };
      case 'event': return { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-500', icon: <Star size={16} /> };
      case 'opportunity': return { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-500', icon: <Info size={16} /> };
      default: return { bg: 'bg-gray-500/10', border: 'border-gray-500/20', text: 'text-gray-500', icon: <Info size={16} /> };
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600/10 border border-red-500/20 rounded-full text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          <Megaphone size={14} /> Comunicados Oficiais
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Anúncios ANGO</h2>
        <p className="text-gray-500 font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Fica a par de todas as atualizações, eventos exclusivos e oportunidades dentro do ecossistema de elite.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
          {(['all', 'urgent', 'update', 'event', 'opportunity'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${filter === f ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10'}`}
            >
              {f === 'all' ? 'Todos' : f === 'urgent' ? 'Urgentes' : f === 'update' ? 'Novidades' : f === 'event' ? 'Eventos' : 'Oportunidades'}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-72 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-red-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Pesquisar anúncios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141414] border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-xs text-white focus:outline-none focus:border-red-600/50 transition-all placeholder:text-gray-800"
          />
        </div>
      </div>

      {/* Grid de Anúncios */}
      <div className="grid grid-cols-1 gap-6 mb-20">
        {filteredAnnouncements.length > 0 ? filteredAnnouncements.map((ann) => {
          const styles = getTypeStyles(ann.type);
          const isFuture = ann.date > Date.now();
          
          return (
            <div 
              key={ann.id} 
              className={`group bg-[#141414] border border-white/5 rounded-[32px] overflow-hidden transition-all duration-300 hover:border-red-600/20 hover:bg-[#1a1a1a] shadow-2xl relative ${ann.isPinned ? 'ring-1 ring-red-600/20' : ''}`}
            >
              <div className="flex flex-col md:flex-row">
                {ann.image && (
                  <div className="md:w-64 h-48 md:h-auto shrink-0 relative overflow-hidden">
                    <img src={ann.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:hidden"></div>
                  </div>
                )}
                
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${styles.bg} ${styles.text} ${styles.border}`}>
                          {styles.icon} {ann.type}
                        </span>
                        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-1">
                          <Tag size={12} /> {ann.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        {ann.isPinned && <Pin size={14} className="text-red-600 rotate-45" />}
                        <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest flex items-center gap-1">
                          <Clock size={12} /> {new Date(ann.date).toLocaleDateString('pt-PT')}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-red-500 transition-colors">
                      {ann.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 font-medium">
                      {ann.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-gray-500">
                        {ann.author.charAt(0)}
                      </div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Postado por {ann.author}</span>
                    </div>
                    
                    {ann.link && (
                      <a 
                        href={ann.link} 
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-red-600/10"
                      >
                        Saber mais <ChevronRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-24 bg-white/5 rounded-[48px] border border-dashed border-white/10">
            <Megaphone size={48} className="text-gray-800 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-600 uppercase">Nenhum anúncio encontrado</h4>
            <p className="text-gray-700 text-sm mt-2">Tenta mudar o filtro ou pesquisar por outro termo.</p>
          </div>
        )}
      </div>

      {/* Newsletter / Notifications Box */}
      <div className="bg-gradient-to-br from-red-600 to-red-900 rounded-[48px] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">Queres receber os anúncios no teu E-mail?</h2>
          <p className="text-white/70 font-medium mb-10 max-w-lg mx-auto text-sm md:text-base">
            Não percas nenhuma atualização importante. Ativa as notificações push ou recebe o nosso resumo semanal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-red-600 font-black rounded-2xl uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-2xl">
              Ativar Notificações
            </button>
            <button className="px-10 py-4 bg-black/20 hover:bg-black/40 text-white font-black rounded-2xl border border-white/10 uppercase tracking-widest text-xs transition-all">
              Configurar E-mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
