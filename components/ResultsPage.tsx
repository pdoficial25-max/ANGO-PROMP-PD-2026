
import React from 'react';
import { Trophy, TrendingUp, DollarSign, Clock, Zap, ArrowRight, Star, Target } from 'lucide-react';

interface ResultCard {
  id: string;
  userName: string;
  userAvatar: string;
  title: string;
  metric: string;
  description: string;
  category: string;
  image?: string;
}

const RESULTS_DATA: ResultCard[] = [
  {
    id: 'r1',
    userName: 'Gonçalo Almeida',
    userAvatar: 'https://picsum.photos/seed/goncalo/100',
    title: 'Automação de Funil SaaS',
    metric: '€12.500 em 15 dias',
    description: 'Implementação de prompts encadeados para qualificação de leads no WhatsApp. Conversão aumentou em 400%.',
    category: 'Vendas',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop'
  },
  {
    id: 'r2',
    userName: 'Carla Dias',
    userAvatar: 'https://picsum.photos/seed/carla/100',
    title: 'Redução de Custos Operacionais',
    metric: '-80% Tempo de Copy',
    description: 'Sistema de geração de posts para redes sociais usando Gemini 3 Pro. O que levava 5 dias agora leva 2 horas.',
    category: 'Produtividade'
  },
  {
    id: 'r3',
    userName: 'Admin ANGO',
    userAvatar: 'https://picsum.photos/seed/admin/100',
    title: 'Lançamento Infoproduto Elite',
    metric: '3.400 Novos Membros',
    description: 'Estratégia de marketing baseada em agentes de IA para atendimento automático e fechamento.',
    category: 'Escalabilidade',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2070&auto=format&fit=crop'
  }
];

const ResultsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 pt-4 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Centralizado e Elevado */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600/10 border border-red-500/20 rounded-full text-red-500 text-[10px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
          🏆 MURAL DA VITÓRIA
        </div>
        <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 text-center">Resultados que <span className="text-red-600">Falam</span></h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium text-sm md:text-lg leading-relaxed text-center">
          Onde a teoria encontra o lucro. Veja como os membros da elite estão a utilizar a IA para dominar os seus nichos.
        </p>
      </div>

      {/* Grid de Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {RESULTS_DATA.map(res => (
          <div key={res.id} className="group bg-[#141414] border border-white/5 rounded-[40px] overflow-hidden hover:border-red-600/30 transition-all duration-500 shadow-2xl relative">
            {res.image && (
              <div className="h-48 overflow-hidden relative">
                <img src={res.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
              </div>
            )}
            
            <div className="p-8 text-center">
              <div className="flex flex-col items-center gap-3 mb-6">
                <img src={res.userAvatar} className="w-12 h-12 rounded-full border border-white/10 object-cover" alt="" />
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">{res.userName}</p>
                  <span className="px-2 py-0.5 bg-red-600/10 text-red-500 text-[8px] font-black uppercase rounded-md border border-red-600/20 inline-block mt-1">{res.category}</span>
                </div>
              </div>

              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-red-500 transition-colors">{res.title}</h3>
              <div className="flex items-center justify-center gap-2 mb-4 text-green-500">
                <TrendingUp size={16} />
                <span className="text-sm font-black uppercase tracking-widest">{res.metric}</span>
              </div>
              
              <p className="text-gray-500 text-xs leading-relaxed mb-8 max-w-xs mx-auto">{res.description}</p>
              
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/5 transition-all text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                Ver Detalhes <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas Globais */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {[
          { icon: <DollarSign />, label: "Volume Gerado", val: "€2.4M+" },
          { icon: <Clock />, label: "Horas Salvas", val: "45k+" },
          { icon: <Target />, label: "Eficiência", val: "+320%" },
          { icon: <Zap />, label: "Membros Ativos", val: "1.200" }
        ].map((stat, i) => (
          <div key={i} className="text-center p-8 bg-white/5 border border-white/5 rounded-[32px] hover:bg-white/10 transition-all">
            <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">{stat.icon}</div>
            <p className="text-[20px] font-black text-white uppercase mb-1">{stat.val}</p>
            <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
