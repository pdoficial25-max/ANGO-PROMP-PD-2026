
import React, { useState, useRef, useEffect } from 'react';
import { User, PrivateMessage } from '../types';
import { supabase } from '../lib/supabase';
import { Search, Send, Phone, Video, Info, ShieldCheck, CheckCheck, MessageSquare, ChevronLeft, User as UserIcon, Loader2 } from 'lucide-react';

interface MessagesSectionProps {
  currentUser: User;
  initialTargetUserId?: string | null;
}

const MessagesSection: React.FC<MessagesSectionProps> = ({ currentUser, initialTargetUserId }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(initialTargetUserId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<PrivateMessage[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Carregar lista de membros reais
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      const { data, error } = await supabase.from('profiles').select('*').neq('id', currentUser.id);
      if (!error && data) {
        setUsersList(data.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          avatar: u.avatar,
          followingIds: u.following_ids || [],
          isMentor: u.is_mentor
        })));
      }
      setIsLoadingUsers(false);
    };
    fetchUsers();
  }, [currentUser.id]);

  // Carregar mensagens da conversa selecionada
  useEffect(() => {
    if (!selectedUserId) return;

    const fetchMessages = async () => {
      setIsLoadingChat(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${currentUser.id},receiver_id.eq.${selectedUserId}),and(sender_id.eq.${selectedUserId},receiver_id.eq.${currentUser.id})`)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data.map(m => ({
          id: m.id,
          senderId: m.sender_id,
          receiverId: m.receiver_id,
          text: m.text,
          timestamp: new Date(m.created_at).getTime(),
          isRead: m.is_read
        })));
      }
      setIsLoadingChat(false);
      setTimeout(scrollToBottom, 100);
    };

    fetchMessages();

    // Inscrição em tempo real para novas mensagens
    const channel = supabase
      .channel('realtime_messages')
      .on('postgres_changes', { event: 'INSERT', table: 'messages' }, (payload) => {
        const newMessage = payload.new;
        if ((newMessage.sender_id === currentUser.id && newMessage.receiver_id === selectedUserId) ||
            (newMessage.sender_id === selectedUserId && newMessage.receiver_id === currentUser.id)) {
          setMessages(prev => [...prev, {
            id: newMessage.id,
            senderId: newMessage.sender_id,
            receiverId: newMessage.receiver_id,
            text: newMessage.text,
            timestamp: new Date(newMessage.created_at).getTime(),
            isRead: newMessage.is_read
          }]);
          setTimeout(scrollToBottom, 50);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedUserId, currentUser.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedUserId) return;

    const textToSend = messageText;
    setMessageText('');

    const { error } = await supabase.from('messages').insert([{
      sender_id: currentUser.id,
      receiver_id: selectedUserId,
      text: textToSend
    }]);

    if (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar mensagem.");
    }
  };

  const selectedUser = usersList.find(u => u.id === selectedUserId);
  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full max-w-7xl mx-auto w-full md:px-4 md:pb-6 pt-2 gap-4 animate-in fade-in duration-500 overflow-hidden">
      {/* Contact List Sidebar */}
      <div className={`
        ${selectedUserId ? 'hidden md:flex' : 'flex'} 
        w-full md:w-80 lg:w-96 flex flex-col bg-[#141414] border-r md:border border-white/5 md:rounded-[32px] overflow-hidden shrink-0
      `}>
        <div className="p-6 border-b border-white/5 text-center">
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-4">Inbox de Elite</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            <input 
              type="text" 
              placeholder="Pesquisar membros..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-red-600/30 transition-all placeholder:text-gray-700"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
          {isLoadingUsers ? (
            <div className="flex justify-center p-10"><Loader2 className="animate-spin text-red-600" /></div>
          ) : filteredUsers.length > 0 ? filteredUsers.map(user => (
            <button
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${selectedUserId === user.id ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'hover:bg-white/5 text-gray-400'}`}
            >
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${selectedUserId === user.id ? 'bg-white/20 border-white/30' : 'bg-white/5 border-white/10'}`}>
                  <UserIcon size={20} />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#141414] rounded-full"></span>
              </div>
              <div className="text-left overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <p className={`text-[12px] font-black uppercase truncate ${selectedUserId === user.id ? 'text-white' : 'text-gray-200'}`}>{user.name}</p>
                  {user.isMentor && <ShieldCheck size={14} className={selectedUserId === user.id ? 'text-white' : 'text-red-500'} />}
                </div>
                <p className={`text-[10px] font-bold truncate mt-0.5 ${selectedUserId === user.id ? 'text-white/60' : 'text-gray-600'}`}>
                  {user.isMentor ? 'Mentor' : 'Membro Elite'}
                </p>
              </div>
            </button>
          )) : (
            <div className="text-center py-10 opacity-30">
              <MessageSquare size={32} className="mx-auto mb-2" />
              <p className="text-[10px] font-black uppercase tracking-widest">Nenhuma conversa</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`
        ${selectedUserId ? 'flex' : 'hidden md:flex'} 
        flex-1 flex-col bg-[#141414] border-white/5 md:border md:rounded-[32px] overflow-hidden relative
      `}>
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedUserId(null)} 
                  className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="w-10 h-10 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500">
                   <UserIcon size={18} />
                </div>
                <div>
                  <p className="text-sm font-black text-white uppercase">{selectedUser.name}</p>
                  <p className="text-[9px] text-green-500 font-black uppercase tracking-widest">Ativo Agora</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 md:gap-2">
                <button className="p-2 text-gray-500 hover:text-white transition-colors"><Phone size={18} /></button>
                <button className="p-2 text-gray-500 hover:text-white transition-colors"><Video size={18} /></button>
                <button className="p-2 text-gray-500 hover:text-white transition-colors"><Info size={18} /></button>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
              {isLoadingChat ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin text-red-600" /></div>
              ) : messages.length > 0 ? (
                messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`max-w-[85%] md:max-w-[70%] ${msg.senderId === currentUser.id ? 'bg-red-600 text-white rounded-[24px] rounded-tr-none' : 'bg-white/5 text-gray-200 border border-white/10 rounded-[24px] rounded-tl-none'} p-4 shadow-xl`}>
                      <p className="text-[13px] md:text-[14px] leading-relaxed">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1.5 mt-2">
                        <span className={`text-[9px] font-black uppercase ${msg.senderId === currentUser.id ? 'text-white/60' : 'text-gray-600'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {msg.senderId === currentUser.id && <CheckCheck size={14} className="text-white/40" />}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 opacity-30 italic text-xs uppercase tracking-widest">
                  Inicia a conversa estratégica agora.
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 bg-[#0a0a0a] border-t border-white/5">
              <div className="relative flex items-center gap-3 bg-white/5 rounded-2xl p-2 border border-white/5 focus-within:border-red-600/30 transition-all">
                <input 
                  type="text" 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Escreve uma mensagem elite..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder:text-gray-700 px-4 py-2"
                />
                <button 
                  type="submit"
                  disabled={!messageText.trim()}
                  className="w-10 h-10 md:w-12 md:h-12 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-red-600/20 text-white shrink-0 active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center text-red-500 mb-6 shadow-2xl shadow-red-600/5">
              <MessageSquare size={48} />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Mensagens Diretas</h3>
            <p className="text-gray-500 max-w-sm text-sm font-medium leading-relaxed">Seleciona um membro da rede ANGO para trocar conhecimentos de elite.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesSection;
