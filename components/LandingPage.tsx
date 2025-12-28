
import React, { useState } from 'react';
import { 
  LogIn, 
  ShieldCheck, 
  Sparkles, 
  Rocket, 
  Users, 
  BookOpen, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Star,
  Globe
} from 'lucide-react';

interface LandingPageProps {
  onLogin: (email: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email.length > 3 && accessCode.length >= 4) {
        onLogin(email);
      } else {
        setError('Acesso negado. Certifique-se de usar o e-mail da compra e um código válido.');
        setIsLoading(false);
      }
    }, 1200);
  };

  const features = [
    {
      icon: <Zap className="text-red-500" size={24} />,
      title: "Geração de Elite",
      desc: "Acesse nosso Wizard de Prompts para criar comandos que extraem 100% das IAs."
    },
    {
      icon: <Users className="text-red-500" size={24} />,
      title: "Comunidade Restrita",
      desc: "Interaja com os maiores especialistas em engenharia de prompts de Angola."
    },
    {
      icon: <BookOpen className="text-red-500" size={24} />,
      title: "Formação Contínua",
      desc: "Cursos e E-books semanais sobre as atualizações mais recentes do mercado."
    },
    {
      icon: <Globe className="text-red-500" size={24} />,
      title: "Recursos Globais",
      desc: "Uma curadoria das melhores ferramentas de IA do mundo, testadas por nós."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-600/30 overflow-x-hidden">
      {/* Glow Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
            <Sparkles size={20} />
          </div>
          <span className="text-lg font-black uppercase tracking-tighter">ANGO – PROMPT PD</span>
        </div>
        <a href="#login" className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
          Já sou membro <ArrowRight size={14} />
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 md:pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-red-500 text-[10px] font-black uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Star size={14} fill="currentColor" /> A Plataforma Nº1 de Prompt Engineering
        </div>
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000">
          TRANSFORME IDEIAS <br /> EM <span className="text-red-600">RESULTADOS</span> <br /> COM IA.
        </h1>
        <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
          Acesse o ecossistema de elite da ANGO. Domine prompts, automatize vendas e construa o futuro agora mesmo.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000">
          <a href="#pricing" className="w-full sm:w-auto px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-red-600/30 transition-all hover:scale-105 active:scale-95 text-xs">
            Quero ser Elite
          </a>
          <a href="#features" className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest rounded-2xl border border-white/10 transition-all text-xs">
            Explorar Ecossistema
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[40px] hover:border-red-600/30 transition-all group">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-tight">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-red-600/20 rounded-[48px] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">MEMBRO ELITE</h2>
          <div className="flex items-center justify-center gap-1 mb-8">
            <span className="text-2xl text-gray-400 font-bold uppercase tracking-widest">Acesso Vitalício</span>
          </div>
          
          <div className="space-y-4 mb-12 text-left max-w-sm mx-auto">
            {["Feed de Prompts Diários", "Gerador de Software via IA", "E-books de Estratégia", "Acesso à Mentoria Mensal"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 size={18} className="text-red-500 shrink-0" />
                <span className="text-sm font-bold uppercase tracking-wide">{item}</span>
              </div>
            ))}
          </div>

          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-6 rounded-3xl shadow-2xl transition-all uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95">
            Adquirir Acesso Agora
          </button>
          <p className="mt-6 text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">Pagamento Seguro & Acesso Imediato</p>
        </div>
      </section>

      {/* Login Section */}
      <section id="login" className="relative z-10 py-24 px-6 max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">Área de Membros</h2>
          <p className="text-gray-500 text-sm">Insira suas credenciais de compra abaixo</p>
        </div>

        <div className="bg-[#0f0f0f]/80 backdrop-blur-2xl border border-white/20 rounded-[40px] p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 px-2">E-mail de Compra</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-gray-800 text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 px-2">Código de Acesso</label>
              <input
                type="password"
                required
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-gray-800 text-white"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-xl flex items-start gap-3 animate-pulse">
                <ShieldCheck size={16} className="mt-0.5 shrink-0" />
                <span className="font-bold">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-50 text-xs uppercase tracking-widest"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Entrar na Plataforma
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                <Sparkles size={16} className="text-red-500" />
              </div>
              <span className="text-sm font-black uppercase tracking-widest">ANGO – PROMPT PD</span>
            </div>
            <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-gray-500">
              <a href="#" className="hover:text-red-500 transition-colors">Termos</a>
              <a href="#" className="hover:text-red-500 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-red-500 transition-colors">Suporte</a>
            </div>
          </div>
          <p className="text-[10px] text-gray-700 uppercase tracking-[0.4em] leading-loose">
            © 2024 ANGO-PROMPT PD - ENGENHARIA DE PROMPTS DE ELITE.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
