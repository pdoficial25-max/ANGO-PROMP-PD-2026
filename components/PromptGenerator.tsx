
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Copy, 
  Check, 
  RefreshCw,
  Layout,
  Type,
  ListChecks,
  Palette,
  Eye,
  Rocket,
  Wand2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';

interface WizardData {
  projectType: string;
  customType: string;
  description: string;
  features: string[];
  designStyles: string[];
  colorPalette: string;
  observations: string;
}

const PROJECT_TYPES = [
  { id: 'lp', label: 'Landing Page', icon: '📄' },
  { id: 'dash', label: 'Dashboard', icon: '📊' },
  { id: 'ecom', label: 'E-commerce', icon: '🛍️' },
  { id: 'port', label: 'Blog / Portfolio', icon: '🎨' },
  { id: 'saas', label: 'SaaS Application', icon: '☁️' },
  { id: 'pwa', label: 'Mobile App (PWA)', icon: '📱' },
  { id: 'admin', label: 'Admin Panel', icon: '⚙️' },
  { id: 'social', label: 'Social Platform', icon: '🤝' },
  { id: 'edu', label: 'Educational Platform', icon: '🎓' },
  { id: 'custom', label: 'Custom Application', icon: '✨' },
];

const DEFAULT_FEATURES = [
  'Autenticação de utilizadores',
  'Sistema de subscrição / planos',
  'Dashboard do utilizador',
  'Geração de prompts com IA',
  'Comunidade / feed',
  'Comentários e interacções',
  'Cursos online',
  'Mentorias',
  'Upload de ficheiros',
  'Notificações',
  'Pagamentos online',
  'Painel administrativo',
  'Integração com APIs',
  'Analytics / resultados'
];

const DESIGN_STYLES = [
  'Minimalista',
  'Colorido e Vibrante',
  'Elegante e Profissional',
  'Criativo e Artístico',
  'Tecnológico e Futurista',
  'Simples e Limpo'
];

const PromptGenerator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<WizardData>({
    projectType: '',
    customType: '',
    description: '',
    features: [],
    designStyles: [],
    colorPalette: '',
    observations: ''
  });
  
  const [isAiLoading, setIsAiLoading] = useState<string | null>(null);
  const [isGeneratingFinal, setIsGeneratingFinal] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleAiAction = async (action: 'expandDescription' | 'suggestFeatures' | 'suggestColors' | 'improvePrompt') => {
    setIsAiLoading(action);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      let promptText = '';
      if (action === 'expandDescription') {
        promptText = `Como especialista em produtos digitais, expanda e profissionalize a seguinte descrição de projeto de forma estruturada e atraente: "${formData.description}". Foco em valor de negócio e clareza técnica. Retorne apenas o texto expandido.`;
      } else if (action === 'suggestFeatures') {
        promptText = `Com base no projeto do tipo "${formData.projectType}" e descrição "${formData.description}", sugira 5 funcionalidades inovadoras e essenciais. Retorne apenas uma lista simples separada por vírgulas.`;
      } else if (action === 'suggestColors') {
        promptText = `Sugira uma paleta de cores moderna (hexadecimais e nomes) para um projeto de estilo "${formData.designStyles.join(', ')}". Retorne uma sugestão curta e profissional.`;
      } else if (action === 'improvePrompt') {
        promptText = `Melhore o seguinte prompt de desenvolvimento, tornando-o mais técnico e preciso para ser usado por IAs como Cursor, Bolt ou GPT-4: "${JSON.stringify(formData)}". Retorne o prompt completo e otimizado.`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: promptText
      });

      const result = response.text || '';
      if (action === 'expandDescription') setFormData(prev => ({ ...prev, description: result }));
      if (action === 'suggestFeatures') {
        const newFeatures = result.split(',').map(f => f.trim());
        setFormData(prev => ({ ...prev, features: [...new Set([...prev.features, ...newFeatures])] }));
      }
      if (action === 'suggestColors') setFormData(prev => ({ ...prev, colorPalette: result }));
      if (action === 'improvePrompt') setGeneratedPrompt(result);

    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsAiLoading(null);
    }
  };

  const finalizePrompt = async () => {
    setIsGeneratingFinal(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const promptText = `Crie um prompt de engenharia de software mestre para um projeto com os seguintes dados:
        Tipo: ${formData.projectType} (${formData.customType})
        Descrição: ${formData.description}
        Funcionalidades: ${formData.features.join(', ')}
        Design: ${formData.designStyles.join(', ')}
        Paleta: ${formData.colorPalette}
        Observações: ${formData.observations}

        O prompt deve ser formatado em Markdown, pronto para ser colado em ferramentas de desenvolvimento (Bolt, Cursor, Windsurf).
        Deve incluir:
        - Stack recomendada
        - Estrutura de arquivos sugerida
        - Detalhes de UI/UX
        - Regras de negócio essenciais.
        Tom: Extremamente técnico e orientando a resultados rápidos (MVP).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: promptText
      });

      setGeneratedPrompt(response.text || '');
      setStep(6);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingFinal(false);
    }
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature) 
        ? prev.features.filter(f => f !== feature) 
        : [...prev.features, feature]
    }));
  };

  const toggleStyle = (style: string) => {
    setFormData(prev => ({
      ...prev,
      designStyles: prev.designStyles.includes(style) 
        ? prev.designStyles.filter(s => s !== style) 
        : [...prev.designStyles, style]
    }));
  };

  const handleCopy = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const canAdvance = () => {
    if (step === 1) return formData.projectType !== '' || formData.customType !== '';
    if (step === 2) return formData.description.length > 10;
    if (step === 3) return formData.features.length > 0;
    if (step === 4) return formData.designStyles.length > 0;
    return true;
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-white uppercase flex items-center justify-center gap-3">
                <Layout className="text-red-600" /> Escolha o tipo
              </h3>
              <p className="text-gray-500 text-xs md:text-sm font-medium px-4">Qual a base tecnológica do seu novo projecto?</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {PROJECT_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => setFormData({ ...formData, projectType: type.label })}
                  className={`p-4 md:p-6 rounded-[24px] md:rounded-[32px] border transition-all flex flex-col items-center gap-2 md:gap-3 text-center group ${formData.projectType === type.label ? 'bg-red-600 border-red-600 shadow-xl shadow-red-600/20' : 'bg-white/5 border-white/10 hover:border-red-600/30 hover:bg-white/10'}`}
                >
                  <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform">{type.icon}</span>
                  <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${formData.projectType === type.label ? 'text-white' : 'text-gray-400'}`}>{type.label}</span>
                </button>
              ))}
            </div>
            <div className="space-y-2 px-2">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-2">Tipo personalizado</label>
              <input 
                type="text" 
                value={formData.customType}
                onChange={(e) => setFormData({...formData, customType: e.target.value})}
                placeholder="Ex: Plataforma de Reservas..."
                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-sm text-white focus:outline-none focus:border-red-600/50"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-white uppercase flex items-center justify-center gap-3">
                <Type className="text-red-600" /> Descrição
              </h3>
              <p className="text-gray-500 text-xs md:text-sm px-4">Fale-nos sobre o público e objectivos.</p>
            </div>
            <div className="relative px-2">
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full h-48 md:h-64 bg-white/5 border border-white/10 rounded-[28px] md:rounded-[40px] p-5 md:p-8 text-sm md:text-base text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-red-600/50 transition-all resize-none leading-relaxed"
                placeholder="Descreva o seu projecto em detalhe..."
              />
              <button 
                onClick={() => handleAiAction('expandDescription')}
                disabled={!formData.description || !!isAiLoading}
                className="absolute bottom-6 right-6 flex items-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-red-600/20 disabled:opacity-50 transition-all"
              >
                {isAiLoading === 'expandDescription' ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} />}
                <span className="hidden xs:inline">Expandir com IA</span>
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-white uppercase flex items-center justify-center gap-3">
                <ListChecks className="text-red-600" /> Funcionalidades
              </h3>
              <p className="text-gray-500 text-xs md:text-sm font-medium px-4">Seleccione o motor do seu sistema.</p>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3 px-2">
              {DEFAULT_FEATURES.map(f => (
                <button
                  key={f}
                  onClick={() => toggleFeature(f)}
                  className={`p-3.5 md:p-4 rounded-xl md:rounded-2xl border text-left flex items-center justify-between group transition-all ${formData.features.includes(f) ? 'bg-red-600/20 border-red-600 text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'}`}
                >
                  <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wide truncate pr-2">{f}</span>
                  {formData.features.includes(f) ? <CheckCircle2 size={16} className="text-red-600" /> : <Plus size={14} className="opacity-30" />}
                </button>
              ))}
            </div>
            <div className="px-2">
              <button 
                onClick={() => handleAiAction('suggestFeatures')}
                disabled={!!isAiLoading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white py-3 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all border border-blue-600/20"
              >
                {isAiLoading === 'suggestFeatures' ? <RefreshCw className="animate-spin" size={14} /> : <Wand2 size={14} />}
                Sugerir com IA
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 md:space-y-10 animate-in fade-in slide-in-from-right-4">
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-white uppercase flex items-center justify-center gap-3">
                <Palette className="text-red-600" /> Design
              </h3>
              <p className="text-gray-500 text-xs md:text-sm font-medium px-4">Como o utilizador deve sentir a interface?</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 px-2">
              {DESIGN_STYLES.map(style => (
                <button
                  key={style}
                  onClick={() => toggleStyle(style)}
                  className={`p-4 md:p-6 rounded-[24px] md:rounded-[32px] border transition-all text-center ${formData.designStyles.includes(style) ? 'bg-red-600 border-red-600 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}
                >
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{style}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Cores</label>
                  <button onClick={() => handleAiAction('suggestColors')} className="text-[9px] font-bold text-red-500 hover:underline">Sugerir</button>
                </div>
                <input 
                  type="text" 
                  value={formData.colorPalette}
                  onChange={(e) => setFormData({...formData, colorPalette: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-3 md:py-4 text-xs text-white placeholder:text-gray-700"
                  placeholder="Ex: Azul e Grafite..."
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-2">Obs.</label>
                <input 
                  type="text" 
                  value={formData.observations}
                  onChange={(e) => setFormData({...formData, observations: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-3 md:py-4 text-xs text-white placeholder:text-gray-700"
                  placeholder="Instruções extra..."
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-white uppercase flex items-center justify-center gap-3">
                <Eye className="text-red-600" /> Rever
              </h3>
              <p className="text-gray-500 text-xs md:text-sm px-4">Valide os dados antes de finalizar.</p>
            </div>
            
            <div className="bg-black/40 border border-white/5 rounded-[28px] md:rounded-[40px] p-5 md:p-8 space-y-6">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-3.5 bg-white/5 rounded-xl md:rounded-2xl border border-white/5">
                  <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Tipo</p>
                  <p className="text-xs font-bold text-white truncate">{formData.projectType || formData.customType}</p>
                </div>
                <div className="p-3.5 bg-white/5 rounded-xl md:rounded-2xl border border-white/5">
                  <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Estilo</p>
                  <p className="text-xs font-bold text-white truncate">{formData.designStyles[0] || '---'}</p>
                </div>
              </div>
              <div className="p-4 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5">
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-2">Visão</p>
                <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed italic line-clamp-3">"{formData.description}"</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 px-2">
              <button 
                onClick={() => handleAiAction('improvePrompt')}
                disabled={!!isAiLoading}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-600/10 hover:bg-purple-600 text-purple-500 hover:text-white py-4 md:py-5 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all border border-purple-600/20"
              >
                {isAiLoading === 'improvePrompt' ? <RefreshCw className="animate-spin" /> : <Sparkles />}
                Melhorar com IA
              </button>
              <button 
                onClick={finalizePrompt}
                disabled={isGeneratingFinal}
                className="flex-[1.5] flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-4 md:py-5 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-red-600/20 active:scale-95 transition-all"
              >
                {isGeneratingFinal ? <RefreshCw className="animate-spin" /> : <Rocket />}
                Finalizar
              </button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-[#141414] border border-red-600/30 rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl shadow-red-600/5">
              <div className="p-6 md:p-10 border-b border-white/5 bg-gradient-to-r from-red-600/10 to-transparent flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-2xl md:rounded-[24px] flex items-center justify-center shadow-2xl">
                    <Sparkles size={24} className="md:hidden text-white" />
                    <Sparkles size={32} className="hidden md:block text-white" />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight">Motor ANGO</h2>
                    <p className="text-[8px] md:text-[10px] text-red-500 font-black uppercase tracking-widest mt-1">Prompt de Elite Gerado</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button 
                    onClick={handleCopy}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-white/10"
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    {copied ? 'Copiado' : 'Copiar'}
                  </button>
                  <button onClick={() => { setStep(1); setGeneratedPrompt(null); }} className="p-3.5 bg-white/5 hover:bg-white/10 text-gray-400 rounded-xl md:rounded-2xl"><RefreshCw size={18} /></button>
                </div>
              </div>

              <div className="p-6 md:p-10 lg:p-16">
                <div className="bg-black/60 border border-white/10 rounded-[28px] md:rounded-[40px] p-6 md:p-8 lg:p-12 font-mono text-xs md:text-sm text-gray-300 leading-relaxed whitespace-pre-wrap select-all">
                  {generatedPrompt}
                </div>
                <div className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                   <div className="p-6 md:p-8 bg-white/5 rounded-[32px] md:rounded-[40px] border border-white/5">
                      <h4 className="text-white font-black text-[10px] md:text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><Rocket className="text-red-500" size={16} /> Próximos Passos</h4>
                      <ul className="space-y-2.5 text-[10px] md:text-[11px] text-gray-500 font-bold uppercase">
                        <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-green-500" /> Cole no Cursor / Bolt</li>
                        <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-green-500" /> Revise a estrutura</li>
                        <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-green-500" /> Inicie o desenvolvimento</li>
                      </ul>
                   </div>
                   <div className="p-6 md:p-8 bg-red-600/5 rounded-[32px] md:rounded-[40px] border border-red-600/20 text-center flex flex-col items-center justify-center">
                      <h4 className="text-white font-black text-xs uppercase mb-4">Quer ajuda pessoal?</h4>
                      <button className="bg-red-600 hover:bg-red-700 text-white font-black py-3 px-6 rounded-xl text-[9px] uppercase tracking-widest transition-all">Saber Mais Mentoria</button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      {step < 6 && (
        <>
          <div className="mb-8 md:mb-12 text-center px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600/10 border border-red-500/20 rounded-full text-red-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles size={12} /> Wizard ANGO
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-3 md:mb-4 leading-none">
              <span className="text-red-600">Ideia</span> em <br className="md:hidden" /> Código
            </h2>
            <p className="text-gray-500 text-xs md:text-sm font-medium max-w-xl mx-auto">Siga os 5 passos para construir o prompt perfeito para o seu produto.</p>
          </div>

          <div className="mb-8 md:mb-12 px-2">
            <div className="flex justify-between text-[8px] md:text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3 px-1">
              <span>Passo {step} / {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-700" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </>
      )}

      {step < 6 && (
        <div className="bg-[#141414] border border-white/5 rounded-[40px] md:rounded-[56px] p-6 md:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden min-h-[450px] flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex-1">{renderStepContent()}</div>
          <div className="mt-10 md:mt-16 flex items-center justify-between pt-8 md:pt-10 border-t border-white/5">
            <button disabled={step === 1 || isAiLoading !== null} onClick={() => setStep(step - 1)} className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-black text-gray-600 hover:text-white transition-all uppercase tracking-widest disabled:opacity-0"><ChevronLeft size={16} /> Voltar</button>
            <div className="flex gap-2"><div className={`w-1.5 h-1.5 rounded-full ${step === 5 ? 'bg-red-600' : 'bg-white/10'}`}></div></div>
            <button disabled={!canAdvance() || step === 5 || isAiLoading !== null} onClick={() => setStep(step + 1)} className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-black text-red-500 hover:text-white transition-all uppercase tracking-widest disabled:opacity-0">Próximo <ChevronRight size={16} /></button>
          </div>
        </div>
      )}

      {step === 6 && renderStepContent()}
    </div>
  );
};

export default PromptGenerator;
