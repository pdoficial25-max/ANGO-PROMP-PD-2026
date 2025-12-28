
import React, { useState, useRef, useEffect } from 'react';
import { Post, Comment, ReactionType, User as UserType, UserRole } from '../types';
import { REACTION_MAP } from '../constants';
import { 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Send, 
  Eye, 
  X, 
  ThumbsUp, 
  CheckCircle2, 
  Play, 
  Edit2,
  Trash2,
  Check,
  Heart,
  User,
  ShieldCheck,
  Lock
} from 'lucide-react';

interface PostCardProps {
  post: Post;
  currentUser: UserType;
  isFollowing: boolean;
  onReaction?: (type: ReactionType) => void;
  onCommentReaction?: (commentId: string, type: ReactionType) => void;
  onView?: () => void;
  onAddComment?: (content: string) => void;
  onFollow?: () => void;
  onEditPost?: (content: string) => void;
  onDeletePost?: () => void;
  onEditComment?: (commentId: string, content: string) => void;
  onDeleteComment?: (commentId: string) => void;
  onLike?: () => void;
  onMessageUser?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, currentUser, isFollowing, onReaction, onCommentReaction, onView, onAddComment, onFollow, onEditPost, onDeletePost, onEditComment, onDeleteComment, onLike, onMessageUser 
}) => {
  const [showComments, setShowComments] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showPostActions, setShowPostActions] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editPostContent, setEditPostContent] = useState(post.content);
  const [isShared, setIsShared] = useState(false);
  const [isLikedLocally, setIsLikedLocally] = useState(false);
  
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  
  const postActionsRef = useRef<HTMLDivElement>(null);

  const currentUserId = currentUser.id;
  const isOwnPost = post.userId === currentUserId;
  const hasPremiumAccess = isOwnPost || currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.PREMIUM;
  const isLocked = post.visibility === 'premium' && !hasPremiumAccess;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (postActionsRef.current && !postActionsRef.current.contains(event.target as Node)) {
        setShowPostActions(false);
      }
    };
    if (showPostActions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPostActions]);

  const timeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const handleOpenView = () => {
    if (isLocked) return;
    if (onView) onView();
    setIsViewing(true);
  };

  const handleAddCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (onAddComment) onAddComment(commentText);
    setCommentText('');
  };

  const handleSaveEditPost = () => {
    if (onEditPost) onEditPost(editPostContent);
    setIsEditingPost(false);
  };

  const handleSaveEditComment = (commentId: string) => {
    if (onEditComment) onEditComment(commentId, editCommentContent);
    setEditingCommentId(null);
  };

  const handleShare = () => {
    setIsShared(true);
    setTimeout(() => setIsShared(false), 3000);
  };

  const handleLikeClick = () => {
    setIsLikedLocally(true);
    if (onLike) onLike();
    setTimeout(() => setIsLikedLocally(false), 1000);
  };

  const renderMedia = (isModal: boolean = false) => {
    if (isLocked) return null;
    if (post.type === 'image') {
      const src = post.mediaUrl || `https://picsum.photos/seed/${post.id}/800/450`;
      return (
        <div className={`mt-4 rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 bg-black/40 flex items-center justify-center cursor-pointer group/img ${isModal ? '' : 'aspect-video md:aspect-[16/9]'}`} onClick={handleOpenView}>
          <img src={src} className={`${isModal ? 'w-full h-auto' : 'w-full h-full object-cover'} transition-transform duration-700 group-hover/img:scale-105`} alt="Post content" />
        </div>
      );
    }
    
    if (post.type === 'video' && post.mediaUrl) {
      return (
        <div className={`mt-4 rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 bg-black/40 relative group/vid ${isModal ? '' : 'aspect-video md:aspect-[16/9]'}`}>
          <video src={post.mediaUrl} className="w-full h-full object-contain" />
          {!isModal && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/vid:bg-black/40 transition-all cursor-pointer" onClick={handleOpenView}>
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl scale-90 group-hover:scale-110 transition-transform">
                <Play size={24} fill="currentColor" />
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className={`bg-[#141414] border border-white/5 rounded-[24px] md:rounded-[32px] p-4 md:p-6 mb-4 group transition-all duration-300 relative overflow-hidden shadow-lg ${isLocked ? 'grayscale-[0.5]' : 'hover:border-red-600/20'}`}>
        
        {post.visibility === 'premium' && (
          <div className="absolute top-0 right-0 z-10">
            <div className="bg-red-600 text-white text-[8px] md:text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
              <ShieldCheck size={12} />
              Elite Premium
            </div>
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-gray-400 border border-white/10 ${isOwnPost ? 'bg-red-600/10' : 'bg-white/5'}`}>
              <User size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <h4 className={`font-bold text-xs md:text-sm ${isOwnPost ? 'text-red-500' : 'text-gray-200'}`}>{post.userName}</h4>
                {!isOwnPost && (
                  <button 
                    onClick={onFollow}
                    className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${isFollowing ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-red-600/10 border-red-500/20 text-red-500'}`}
                  >
                    {isFollowing ? 'Seguindo' : 'Seguir'}
                  </button>
                )}
              </div>
              <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">{timeAgo(post.timestamp)} atrás</p>
            </div>
          </div>
          
          <div className="relative" ref={postActionsRef}>
            <button onClick={() => setShowPostActions(!showPostActions)} className="text-gray-600 hover:text-gray-400 p-2 rounded-lg hover:bg-white/5">
              <MoreHorizontal size={18} />
            </button>
            {showPostActions && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-20 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
                {isOwnPost ? (
                  <>
                    <button onClick={() => { setIsEditingPost(true); setShowPostActions(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black text-gray-400 hover:text-white hover:bg-white/5 uppercase tracking-widest transition-all">
                      <Edit2 size={14} /> Editar
                    </button>
                    <button onClick={() => { if(confirm('Eliminar esta publicação?')) onDeletePost?.(); setShowPostActions(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black text-red-500 hover:bg-red-500/10 uppercase tracking-widest transition-all">
                      <Trash2 size={14} /> Excluir
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { onMessageUser?.(); setShowPostActions(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black text-gray-400 hover:text-white hover:bg-white/5 uppercase tracking-widest transition-all">
                      Enviar Mensagem
                    </button>
                    <button onClick={() => { handleShare(); setShowPostActions(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black text-gray-400 hover:text-white hover:bg-white/5 uppercase tracking-widest transition-all">
                      <Share2 size={14} /> Compartilhar
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 relative">
          {isEditingPost ? (
            <div className="space-y-3">
              <textarea
                value={editPostContent}
                onChange={(e) => setEditPostContent(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-red-600/50 min-h-[100px] resize-none"
              />
              <div className="flex gap-2">
                <button onClick={handleSaveEditPost} className="bg-red-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Salvar</button>
                <button onClick={() => { setIsEditingPost(false); setEditPostContent(post.content); }} className="bg-white/5 text-gray-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 active:scale-95 transition-all">Cancelar</button>
              </div>
            </div>
          ) : (
            <>
              {isLocked ? (
                <div className="relative overflow-hidden rounded-2xl min-h-[120px] bg-white/5 border border-white/10 flex flex-col items-center justify-center p-8 text-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 to-transparent blur-xl"></div>
                  <Lock className="text-red-600 mb-3" size={32} />
                  <p className="text-sm font-black text-white uppercase tracking-widest mb-2">Conteúdo Exclusivo Elite</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest max-w-[200px]">Faz upgrade para PREMIUM para desbloquear este insight estratégico.</p>
                </div>
              ) : (
                <>
                  <p className="text-sm md:text-base leading-relaxed text-gray-300 whitespace-pre-wrap">
                    {post.content}
                  </p>
                  {renderMedia(false)}
                </>
              )}
            </>
          )}
        </div>

        {!isLocked && (
          <div className="flex items-center justify-between pt-4 border-t border-white/5 text-gray-500">
            <div className="flex items-center gap-1 md:gap-2">
              <button 
                onClick={handleLikeClick}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl md:rounded-2xl transition-all active:scale-125 ${isLikedLocally ? 'text-red-500 bg-red-500/5' : 'hover:bg-white/5 hover:text-red-500'}`}
              >
                <Heart size={16} fill={isLikedLocally ? 'currentColor' : 'none'} />
                <span className="text-xs font-black">{post.likes}</span>
              </button>

              <button onClick={() => setShowComments(!showComments)} className={`flex items-center gap-2 px-3 py-2 rounded-xl md:rounded-2xl hover:bg-white/5 ${showComments ? 'text-blue-500' : ''}`}>
                <MessageCircle size={16} /> <span className="text-xs font-black">{post.comments?.length || 0}</span>
              </button>
              
              <div className="flex items-center gap-2 px-3 py-2 text-gray-600 cursor-default">
                <Eye size={16} /> <span className="text-xs font-black">{post.views}</span>
              </div>
            </div>
            
            <button onClick={handleShare} className={`p-3 rounded-xl md:rounded-2xl transition-all ${isShared ? 'text-green-500 bg-green-500/10' : 'hover:bg-white/5'}`}>
              {isShared ? <CheckCircle2 size={18} /> : <Share2 size={18} />}
            </button>
          </div>
        )}

        {showComments && !isLocked && (
          <div className="mt-4 pt-4 border-t border-white/5 space-y-4 animate-in fade-in">
            <form onSubmit={handleAddCommentSubmit} className="flex gap-3">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escreva um comentário..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-red-600/30"
              />
              <button type="submit" className="bg-red-600 text-white p-2 rounded-xl active:scale-95 transition-transform"><Send size={14} /></button>
            </form>

            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
              {(post.comments || []).map((comment) => {
                const isEditingThisComment = editingCommentId === comment.id;
                
                return (
                  <div key={comment.id} className="flex gap-3 group/comment">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-600 border border-white/5 shrink-0">
                      <User size={14} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="bg-white/5 rounded-2xl p-3 md:p-4 border border-white/5 relative">
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-[11px] font-black uppercase tracking-tight ${comment.userId === currentUserId ? 'text-red-500' : 'text-white'}`}>{comment.userName}</span>
                          <span className="text-[8px] text-gray-600 uppercase font-black">{timeAgo(comment.timestamp)}</span>
                        </div>
                        
                        {isEditingThisComment ? (
                          <div className="space-y-2 mt-2">
                            <input
                              type="text"
                              autoFocus
                              value={editCommentContent}
                              onChange={(e) => setEditCommentContent(e.target.value)}
                              className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-red-600/30"
                            />
                            <div className="flex gap-2">
                              <button onClick={() => handleSaveEditComment(comment.id)} className="text-[8px] font-black text-green-500 uppercase tracking-widest flex items-center gap-1"><Check size={10}/> Salvar</button>
                              <button onClick={() => setEditingCommentId(null)} className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Cancelar</button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[12px] text-gray-400 leading-relaxed font-medium">{comment.content}</p>
                        )}
                      </div>
                      
                      {!isEditingThisComment && (
                        <div className="flex items-center gap-4 px-2">
                          <button className="text-[9px] font-black text-gray-500 hover:text-white uppercase tracking-widest">Gosto</button>
                          <button className="text-[9px] font-black text-gray-500 hover:text-white uppercase tracking-widest">Responder</button>
                          
                          {comment.userId === currentUserId && (
                            <div className="flex gap-3 opacity-0 group-hover/comment:opacity-100 transition-opacity">
                              <button onClick={() => { setEditingCommentId(comment.id); setEditCommentContent(comment.content); }} className="text-[9px] font-black text-gray-700 hover:text-blue-500 uppercase tracking-widest">Editar</button>
                              <button onClick={() => { if(confirm('Eliminar comentário?')) onDeleteComment?.(comment.id); }} className="text-[9px] font-black text-gray-700 hover:text-red-500 uppercase tracking-widest">Excluir</button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {isViewing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={() => setIsViewing(false)}>
          <div className="relative w-full max-w-4xl bg-[#0f0f0f] border border-white/10 rounded-[32px] md:rounded-[40px] overflow-hidden flex flex-col max-h-[90vh] shadow-2xl animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 border border-white/10">
                  <User size={20} />
                </div>
                <h3 className="font-black text-white text-sm md:text-lg uppercase tracking-tight">{post.userName}</h3>
              </div>
              <button onClick={() => setIsViewing(false)} className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 custom-scrollbar text-center">
              <p className="text-base md:text-xl text-gray-200 leading-relaxed font-light mx-auto max-w-2xl">{post.content}</p>
              {renderMedia(true)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
