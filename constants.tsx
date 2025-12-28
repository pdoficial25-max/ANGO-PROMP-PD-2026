
import React from 'react';
import { 
  LayoutDashboard, 
  Trophy, 
  HelpCircle, 
  BookOpen, 
  Users, 
  FolderOpen, 
  Megaphone, 
  UserCircle,
  MessageSquare,
  Video,
  Image as ImageIcon,
  Send,
  Book,
  Sparkles
} from 'lucide-react';
import { Section, ReactionType } from './types';

export const MENU_ITEMS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'Feed', label: 'Feed de Notícias', icon: <LayoutDashboard size={20} /> },
  { id: 'Resultados', label: 'Resultados', icon: <Trophy size={20} /> },
  { id: 'Dúvidas', label: 'Dúvidas', icon: <HelpCircle size={20} /> },
  { id: 'Cursos', label: 'Cursos', icon: <BookOpen size={20} /> },
  { id: 'E-books', label: 'E-books', icon: <Book size={20} /> },
  { id: 'Mentorias', label: 'Mentorias', icon: <Users size={20} /> },
  { id: 'Recursos', label: 'Recursos', icon: <FolderOpen size={20} /> },
  { id: 'Anúncios', label: 'Anúncios', icon: <Megaphone size={20} /> },
  { id: 'Membros', label: 'Membros', icon: <Users size={20} /> },
  { id: 'Meu Perfil', label: 'Perfil', icon: <UserCircle size={20} /> },
];

export const UI_ICONS = {
  Post: <MessageSquare size={18} />,
  Video: <Video size={18} />,
  Image: <ImageIcon size={18} />,
  Send: <Send size={18} />,
};

export const REACTION_MAP: Record<ReactionType, { emoji: string; label: string; color: string }> = {
  like: { emoji: '👍', label: 'Gosto', color: 'text-blue-500' },
  love: { emoji: '❤️', label: 'Amo', color: 'text-red-500' },
  hug: { emoji: '🤗', label: 'Abraço', color: 'text-yellow-500' },
  fire: { emoji: '🔥', label: 'Fogo', color: 'text-orange-500' },
  rocket: { emoji: '🚀', label: 'Foguete', color: 'text-indigo-400' },
  photo: { emoji: '📸', label: 'Foto', color: 'text-gray-400' },
  haha: { emoji: '😂', label: 'Haha', color: 'text-yellow-500' },
  wow: { emoji: '😮', label: 'Wow', color: 'text-yellow-400' },
  sad: { emoji: '😢', label: 'Triste', color: 'text-blue-400' },
  angry: { emoji: '😡', label: 'Irritado', color: 'text-orange-600' },
};
