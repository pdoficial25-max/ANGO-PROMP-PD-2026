
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Bot, X, Send, Sparkles, Minus, Maximize2, MessageCircle } from 'lucide-react';
import { ChatMessage } from '../types';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', parts: 'Olá! Sou o assistente da ANGO – PROMPT PD. Como posso ajudar com os teus prompts hoje?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setHasNewMessage(false);
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', parts: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: messages.concat({ role: 'user', parts: userMessage }).map(m => ({
          role: m.role,
          parts: [{ text: m.parts }]
        })),
        config: {
          systemInstruction: `És o assistente de IA da plataforma ANGO – PROMPT PD. O teu objetivo é ajudar os utilizadores com engenharia de prompts, navegação na plataforma e conselhos de IA. Sê profissional, útil e utiliza um tom encorajador.`,
          temperature: 0.7,
        }
      });

      const aiText = response.text || 'Desculpa, tive um problema a processar isso.';
      setMessages(prev => [...prev, { role: 'model', parts: aiText }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', parts: 'Erro de ligação. Verifica a tua chave de API.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group z-[60]"
      >
        <MessageCircle className="group-hover:rotate-12 transition-transform" size={28} />
        {hasNewMessage && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-red-600 text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce border-2 border-red-600">
            1
          </span>
        )}
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-[90vw] max-w-[400px] z-[60] flex flex-col transition-all duration-300 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] ${isMinimized ? 'h-16' : 'h-[600px] max-h-[85vh]'}`}>
      <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl flex flex-col h-full overflow-hidden backdrop-blur-2xl">
        <div className="p-4 bg-gradient-to-r from-red-600/20 to-transparent border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0f0f0f] rounded-full"></span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Assistente ANGO</p>
              <p className="text-[10px] text-gray-500">Normalmente responde na hora</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl">
              {isMinimized ? <Maximize2 size={18} /> : <Minus size={18} />}
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/5 rounded-xl">
              <X size={18} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatares/Fotos removidos de acordo com o pedido */}
                    <div className={`p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-red-600 text-white rounded-tr-none' 
                        : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none backdrop-blur-sm'
                    }`}>
                      {msg.parts}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-[#0a0a0a] border-t border-white/5">
              <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escreve a tua mensagem..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600/50 transition-all placeholder:text-gray-600"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="w-12 h-12 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-2xl flex items-center justify-center transition-all active:scale-95 text-white shadow-lg shadow-red-600/20 shrink-0"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChatbot;
