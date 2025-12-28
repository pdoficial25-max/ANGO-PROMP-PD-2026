
import React, { useState } from 'react';
import { Play, Clock, BarChart, Star, Search, Filter, CheckCircle } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: 'Iniciante' | 'Intermédio' | 'Avançado';
  thumbnail: string;
  progress: number;
  rating: number;
}

const COURSES_DATA: Course[] = [
  {
    id: 'c1',
    title: 'Fundamentos de Engenharia de Prompts',
    category: 'Prompt Engineering',
    duration: '6h 30m',
    level: 'Iniciante',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    progress: 100,
    rating: 4.9
  },
  {
    id: 'c2',
    title: 'Domínio do Gemini 3.0 para Negócios',
    category: 'IA Aplicada',
    duration: '8h 15m',
    level: 'Intermédio',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?q=80&w=1965&auto=format&fit=crop',
    progress: 45,
    rating: 5.0
  },
  {
    id: 'c3',
    title: 'Automação Avançada com Python e IA',
    category: 'Desenvolvimento',
    duration: '12h 00m',
    level: 'Avançado',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    progress: 0,
    rating: 4.8
  },
  {
    id: 'c4',
    title: 'Marketing de Conteúdo com IA Generativa',
    category: 'Marketing',
    duration: '5h 45m',
    level: 'Iniciante',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
    progress: 15,
    rating: 4.7
  }
];

const CoursesPage: React.FC = () => {
  const [filter, setFilter] = useState('Todos');

  const categories = ['Todos', ...new Set(COURSES_DATA.map(c => c.category))];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 pt-4 pb-12 animate-in fade-in duration-700">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600/10 border border-red-500/20 rounded-full text-red-500 text-[10px] font-black uppercase tracking-[0.25em] mb-4">
          🎓 ACADEMIA DE ELITE
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Módulos de Domínio</h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium">Domina as ferramentas que estão a moldar o futuro. Cursos práticos, directos e actualizados semanalmente.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between max-w-5xl mx-auto">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 no-scrollbar justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${filter === cat ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
          <input type="text" placeholder="Procurar aula..." className="w-full bg-[#141414] border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-xs text-white outline-none focus:border-red-600/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {COURSES_DATA.filter(c => filter === 'Todos' || c.category === filter).map(course => (
          <div key={course.id} className="group bg-[#141414] border border-white/5 rounded-[40px] overflow-hidden hover:border-red-600/30 transition-all duration-500 flex flex-col shadow-2xl hover:-translate-y-2">
            <div className="relative h-48 overflow-hidden">
              <img src={course.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={course.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <span className="px-3 py-1 bg-red-600 text-white text-[8px] font-black uppercase tracking-widest rounded-lg">{course.category}</span>
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg">
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-bold text-white">{course.rating}</span>
                </div>
              </div>
              <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-red-600 shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Play size={24} fill="currentColor" />
                </div>
              </button>
            </div>

            <div className="p-8 flex flex-col flex-1 text-center">
              <h3 className="text-xl font-black text-white mb-4 line-clamp-2 leading-tight group-hover:text-red-500 transition-colors uppercase tracking-tight">{course.title}</h3>
              
              <div className="flex items-center justify-center gap-4 text-gray-500 mb-6">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest">
                  <Clock size={14} /> {course.duration}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest">
                  <BarChart size={14} /> {course.level}
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Progresso</span>
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">{course.progress}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
                  <div 
                    className={`h-full transition-all duration-1000 ${course.progress === 100 ? 'bg-green-500' : 'bg-red-600'}`} 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                <button className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${course.progress === 100 ? 'bg-white/5 text-green-500 border border-green-500/20' : 'bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/10'}`}>
                  {course.progress === 100 ? <><CheckCircle size={14} /> Concluído</> : course.progress > 0 ? 'Continuar Aula' : 'Começar Agora'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
