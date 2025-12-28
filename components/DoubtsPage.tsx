
import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  UserCircle, 
  LayoutDashboard, 
  Trophy, 
  Bell, 
  BookOpen, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Section } from '../types';

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
}

interface DoubtsPageProps {
  onNavigate: (section: Section) => void;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Como faço para editar o meu perfil?",
    answer: "Podes editar o teu perfil acedendo à secção 'Perfil' no menu lateral ou clicando no teu avatar no canto superior direito e selecionando 'Meu Perfil'. Lá poderás alterar a tua foto, bio, cidade e área de atuação.",
    icon: <UserCircle className="text-blue-500" />,
    category: "Conta"
  },
  {
    question: "Como posso publicar na comunidade?",
    answer: "No topo do teu 'Feed de Notícias', verás o Editor de Publicações. Podes escrever texto, carregar imagens ou vídeos. Após configurar a visibilidade, clica em 'Publicar' para partilhar com os membros.",
    icon: <LayoutDashboard className="text-green-500" />,
    category: "Comunidade"
  },
  {
    question: "O que são os resultados e como compartilho os meus?",
    answer: "A secção de 'Resultados' serve para mostrar provas sociais e conquistas obtidas com IA. Para partilhar os teus, podes criar uma publicação no feed e marcar como 'Resultado' ou enviar diretamente para a galeria de conquistas na secção correspondente.",
    icon: <Trophy className="text-yellow-500" />,
    category: "Resultados"
  },
  {
    question: "Como funciona o chat da comunidade?",
    answer: "Temos dois tipos de chat: o Assistente de IA (ícone flutuante no canto inferior) para ajuda técnica rápida, e as 'Mensagens Privadas' para falar diretamente com outros membros ou mentores de elite.",
    icon: <MessageSquare className="text-purple-500" />,
    category: "Mensagens"
  },
  {
    question: "Como faço para entrar em contato com um administrador?",
    answer: "Acedas à secção de 'Mensagens' e procura por 'Admin ANGO'. Podes enviar uma mensagem direta para suporte técnico, dúvidas sobre pagamentos ou sugestões para a plataforma.",
    icon: <ShieldCheck className="text-red-500" />,
    category: "Suporte"
  },
  {
    question: "Posso deletar ou editar minhas publicações?",
    answer: "Sim. Em qualquer publicação tua, clica nos três pontos (menu de opções) no canto superior direito do card. Lá encontrarás as opções para editar o conteúdo ou eliminar permanentemente a publicação.",
    icon: <HelpCircle className="text-gray-400" />,
    category: "Comunidade"
  },
  {
    question: "Como funcionam as notificações?",
    answer: "O ícone do sino no cabeçalho avisa-te sobre novas interações, mensagens, atualizações de cursos e anúncios importantes. Podes marcar todas como lidas para manter o teu painel organizado.",
    icon: <Bell className="text-orange-500" />,
    category: "Sistema"
  },
  {
    question: "Onde encontro os cursos disponíveis?",
    answer: "Todos os conteúdos educativos estão na secção 'Cursos' e 'E-books'. Lá terás acesso aos módulos de Prompt Engineering, estratégias de venda com IA e mentorias gravadas.",
    icon: <BookOpen className="text-teal-500" />,
    category: "Educação"
  }
];

const DoubtsPage: React.FC<DoubtsPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFaq = FAQ_DATA.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-8 md:py-12 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600/10 border border-red-500/20 rounded-full text-red-500 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
          ❓ Centro de Ajuda
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-4 tracking-tighter">Perguntas Frequentes</h2>
        <p className="text-gray-500 font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Tudo o que precisas de saber para dominar a plataforma ANGO e acelerar os teus resultados com IA.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-10 max-w-2xl mx-auto group">
        <div className="absolute inset-0 bg-red-600/5 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
        <div className="relative bg-[#141414] border border-white/10 rounded-2xl md:rounded-[28px] p-1.5 flex items-center gap-3 focus-within:border-red-600/50 transition-all">
          <div className="pl-4 text-gray-500">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Pesquisar por dúvida, categoria ou palavra-chave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-sm md:text-base text-white outline-none py-3 placeholder:text-gray-700 font-medium"
          />
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4 mb-16">
        {filteredFaq.length > 0 ? filteredFaq.map((item, index) => (
          <div 
            key={index} 
            className={`group bg-[#141414] border rounded-3xl overflow-hidden transition-all duration-300 ${expandedIndex === index ? 'border-red-600/30 ring-1 ring-red-600/10 shadow-2xl shadow-red-600/5' : 'border-white/5 hover:border-white/10'}`}
          >
            <button 
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${expandedIndex === index ? 'bg-red-600 text-white' : 'bg-white/5 text-gray-400 group-hover:bg-white/10'}`}>
                  {item.icon}
                </div>
                <div>
                  <span className="text-[8px] font-black text-red-500 uppercase tracking-widest mb-1 block">{item.category}</span>
                  <h3 className={`text-sm md:text-base font-bold transition-colors ${expandedIndex === index ? 'text-white' : 'text-gray-300'}`}>{item.question}</h3>
                </div>
              </div>
              <div className={`p-2 rounded-lg transition-transform ${expandedIndex === index ? 'rotate-180 text-red-500' : 'text-gray-600'}`}>
                <ChevronDown size={20} />
              </div>
            </button>
            
            {expandedIndex === index && (
              <div className="px-5 md:px-20 pb-6 md:pb-8 animate-in slide-in-from-top-2 duration-300">
                <div className="h-[1px] bg-white/5 mb-6"></div>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                  {item.answer}
                </p>
                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={() => {
                      if (item.category === "Conta") onNavigate("Meu Perfil");
                      if (item.category === "Comunidade") onNavigate("Feed");
                      if (item.category === "Suporte") onNavigate("Mensagens");
                      if (item.category === "Educação") onNavigate("Cursos");
                    }}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-white transition-colors"
                  >
                    Ir para secção <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )) : (
          <div className="text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
            <HelpCircle size={48} className="text-gray-800 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-gray-500 uppercase tracking-tight">Nenhuma resposta encontrada</h4>
            <p className="text-gray-600 text-xs mt-2">Tenta pesquisar por termos mais simples.</p>
          </div>
        )}
      </div>

      {/* Footer Support CTA */}
      <div className="relative p-8 md:p-12 bg-gradient-to-br from-red-600/10 to-transparent border border-white/10 rounded-[40px] md:rounded-[56px] overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2">Ainda precisas de ajuda?</h3>
            <p className="text-gray-500 font-medium text-xs md:text-sm max-w-sm">
              Se a tua dúvida não foi respondida aqui, fala diretamente com a nossa equipa de elite.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onNavigate('Mensagens')}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 active:scale-95"
            >
              <MessageSquare size={18} /> Falar com Suporte
            </button>
            <button 
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl border border-white/10 transition-all uppercase tracking-widest text-[10px] active:scale-95"
              onClick={() => {/* Trigger AI Chat */}}
            >
              Usar Assistente IA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubtsPage;
