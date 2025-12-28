
import React from 'react';
import { Book, Download, Eye, Star, Share2, ArrowRight } from 'lucide-react';

interface Ebook {
  id: string;
  title: string;
  author: string;
  pages: number;
  description: string;
  cover: string;
  rating: number;
}

const EBOOKS_DATA: Ebook[] = [
  {
    id: 'b1',
    title: 'A Bíblia do Prompt Engineering',
    author: 'Equipa ANGO',
    pages: 142,
    description: 'O guia definitivo para dominar GPT-4, Gemini e Claude. De iniciante a especialista em 30 dias.',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop',
    rating: 5.0
  },
  {
    id: 'b2',
    title: 'IA para Pequenas Empresas',
    author: 'Admin ANGO',
    pages: 85,
    description: 'Como automatizar o atendimento e as vendas usando apenas ferramentas gratuitas de IA.',
    cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2076&auto=format&fit=crop',
    rating: 4.8
  },
  {
    id: 'b3',
    title: 'Design Generativo: O Futuro da UI',
    author: 'Marta Silva',
    pages: 110,
    description: 'Explore como usar Midjourney e Stable Diffusion para criar interfaces de utilizador de elite.',
    cover: 'https://images.unsplash.com/photo-1543004218-ee141104975a?q=80&w=1974&auto=format&fit=crop',
    rating: 4.9
  }
];

const EbooksPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600/10 border border-red-500/20 rounded-full text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          📚 Biblioteca Digital
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">E-books de Estratégia</h2>
        <p className="text-gray-500 max-w-xl mx-auto font-medium">Conhecimento profundo condensado em guias práticos. Descarrega e lê onde quiseres.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {EBOOKS_DATA.map(ebook => (
          <div key={ebook.id} className="group relative flex flex-col items-center">
            {/* 3D Book Cover Effect */}
            <div className="relative w-full aspect-[3/4] mb-8 transition-all duration-500 group-hover:-translate-y-4 group-hover:rotate-[-2deg]">
              <div className="absolute inset-0 bg-red-600 rounded-2xl rotate-[3deg] scale-95 opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-full h-full bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={ebook.cover} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={ebook.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-bold text-white">{ebook.rating}</span>
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight">{ebook.title}</h3>
                </div>
              </div>
            </div>

            <div className="text-center px-4">
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">{ebook.author} • {ebook.pages} Páginas</p>
              <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-3">{ebook.description}</p>
              
              <div className="flex gap-3 justify-center">
                <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-red-600/10 active:scale-95">
                  <Download size={14} /> Download PDF
                </button>
                <button className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/5 transition-all">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 p-12 bg-[#141414] border border-white/5 rounded-[48px] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="text-center md:text-left">
          <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Queres ver o teu conteúdo aqui?</h4>
          <p className="text-gray-500 text-sm font-medium">Publica os teus próprios e-books na comunidade e torna-te um autor de elite.</p>
        </div>
        <button className="px-10 py-5 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-2xl">
          Enviar Manuscrito <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default EbooksPage;
