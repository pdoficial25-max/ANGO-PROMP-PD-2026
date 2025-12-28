
export enum UserRole {
  ADMIN = 'ADMIN',
  PREMIUM = 'PREMIUM',
  MEMBER = 'MEMBER'
}

export type ContentType = 'text' | 'image' | 'video';

export type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry' | 'hug' | 'photo' | 'fire' | 'rocket';

export interface Reaction {
  type: ReactionType;
  count: number;
  userReacted: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: number;
  reactions?: Record<string, number>;
  userReaction?: ReactionType;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  type: ContentType;
  content: string;
  mediaUrl?: string;
  timestamp: number;
  visibility: 'public' | 'members' | 'premium';
  likes: number; 
  reactions: Record<ReactionType, number>;
  userReaction?: ReactionType;
  views: number;
  commentsCount: number;
  comments?: Comment[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  followingIds: string[];
  bio?: string;
  city?: string;
  area?: string;
  isMentor?: boolean;
}

export interface PrivateMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
  isRead: boolean;
}

export interface AppNotification {
  id: string;
  type: 'info' | 'success' | 'alert' | 'message';
  title: string;
  description: string;
  timestamp: number;
  isRead: boolean;
  link?: string;
}

export type Section = 
  | 'Feed' 
  | 'Resultados' 
  | 'Dúvidas' 
  | 'Cursos' 
  | 'Mentorias' 
  | 'Recursos' 
  | 'Anúncios' 
  | 'Membros' 
  | 'Perfil'
  | 'E-books'
  | 'Meu Perfil'
  | 'Configuracoes'
  | 'PromptGenerator'
  | 'Mensagens';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: string;
}
