
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  Mail, 
  Lock, 
  User, 
  CheckCircle2, 
  HelpCircle,
  ShieldAlert,
  Fingerprint
} from 'lucide-react';

const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationSent, setConfirmationSent] = useState(false);

  useEffect(() => {
    setError('');
  }, [isSignUp]);

  const parseError = (err: any): string => {
    if (!err) return 'Erro desconhecido';
    const msg = err.message || err.error_description || (typeof err === 'string' ? err : JSON.stringify(err));
    
    if (msg.includes('User already registered')) return 'Este e-mail já está na nossa base. Tenta fazer login.';
    if (msg.includes('Password should be')) return 'A tua chave de acesso deve ter pelo menos 6 caracteres.';
    if (msg.includes('Invalid login credentials')) {
      return 'E-mail ou senha incorretos. Se acabaste de criar conta, verifica se já ativaste o link no teu e-mail.';
    }
    if (msg.includes('Email not confirmed')) return 'A tua conta ainda não foi ativada. Procura o link de confirmação no teu e-mail (vê também no SPAM).';
    if (msg.includes('Rate limit exceeded')) return 'Muitas tentativas. Aguarda um minuto por segurança.';
    
    return 'Erro de conexão. Tenta novamente ou contacta o suporte.';
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    setError('');

    try {
      const cleanEmail = email.trim().toLowerCase();

      if (isSignUp) {
        // CADASTRO: Salva o nome no display_name para que apareça na plataforma
        const { data, error: authError } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: { 
              display_name: name.trim(),
              full_name: name.trim()
            },
            emailRedirectTo: window.location.origin
          }
        });

        if (authError) throw authError;
        
        if (data.user) {
          setConfirmationSent(true);
          // Criamos o perfil preventivamente
          await supabase.from('profiles').upsert([{
            id: data.user.id,
            name: name.trim(),
            email: cleanEmail,
            role: 'MEMBER',
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${data.user.id}`
          }]);
        }
      } else {
        // LOGIN
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password, 
        });

        if (authError) throw authError;
      }
    } catch (err: any) {
      setError(parseError(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (confirmationSent) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0f0f0f] border border-green-500/20 rounded-[40px] p-10 text-center animate-in zoom-in duration-500 shadow-2xl">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="text-green-500" size={40} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase mb-4 tracking-tighter">Ativação Enviada!</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Enviamos um link de validação para:<br/>
            <span className="text-white font-bold">{email}</span><br/><br/>
            Para evitar <span className="text-red-500 font-bold">usuários falsos</span>, só poderás entrar após clicar no link que enviamos.
          </p>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 text-left space-y-3">
            <div className="flex gap-3">
              <ShieldAlert size={16} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Verifica o SPAM ou Lixo Eletrónico.</p>
            </div>
            <div className="flex gap-3">
              <HelpCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">O e-mail pode levar até 5 min a chegar.</p>
            </div>
          </div>

          <button 
            onClick={() => { setConfirmationSent(false); setIsSignUp(false); }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-[10px] shadow-lg shadow-red-600/20"
          >
            Voltar ao Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-red-600/10 blur-[150px] rounded-full pointer-events-none opacity-50"></div>
      
      <div className="max-w-md w-full z-10 animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-red-600/10 border border-red-600/20 mb-6 shadow-2xl shadow-red-600/10">
            <Fingerprint className="text-red-600" size={40} />
          </div>
          <h1 className="text-3xl font-black text-white mb-1 tracking-tighter uppercase leading-none">
            ANGO – <span className="text-red-600">PROMPT PD</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-3">Acesso Exclusivo à Rede de Elite</p>
        </div>

        <div className="bg-[#0f0f0f]/90 backdrop-blur-3xl border border-white/10 rounded-[48px] p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleAuth} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2 animate-in slide-in-from-top-4">
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest px-2">Teu Nome Real</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como queres aparecer?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:border-red-600/50 outline-none transition-all placeholder:text-gray-800"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest px-2">E-mail de Cadastro</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:border-red-600/50 outline-none transition-all placeholder:text-gray-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest px-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:border-red-600/50 outline-none transition-all placeholder:text-gray-800"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black p-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-left-2 uppercase leading-relaxed">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-50 text-[11px] uppercase tracking-[0.2em]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isSignUp ? 'Criar Acesso de Elite' : 'Entrar no Painel'}
                  <ShieldCheck size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[10px] font-black text-gray-500 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              {isSignUp ? 'Já sou membro da rede' : 'Ainda não tenho acesso elite'}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
