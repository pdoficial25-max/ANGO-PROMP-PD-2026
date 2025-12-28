
import React, { useState, useRef } from 'react';
import { ContentType, Post } from '../types';
import { X, Play, Image as ImageIcon, Loader2, Send } from 'lucide-react';

interface PostEditorProps {
  onPublish: (postData: Partial<Post>) => void;
  userAvatar: string;
}

const PostEditor: React.FC<PostEditorProps> = ({ onPublish, userAvatar }) => {
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<ContentType>('text');
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handlePublish = async () => {
    if (!content.trim() && !mediaUrl) return;
    setIsPublishing(true);
    try {
      await onPublish({
        content,
        type: contentType,
        mediaUrl: mediaUrl || undefined,
        visibility: 'members',
      });
      setContent('');
      setContentType('text');
      setMediaUrl(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: ContentType) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaUrl(reader.result as string);
        setContentType(type);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMedia = () => {
    setMediaUrl(null);
    setContentType('text');
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  return (
    <div className="bg-[#0f0f0f] border border-white/5 rounded-[24px] p-6 mb-8 transition-all duration-300">
      <div className="flex flex-col w-full gap-4">
        {/* Container do Input com Borda de Destaque */}
        <div 
          className={`relative rounded-[18px] border-2 transition-all duration-300 min-h-[140px] flex flex-col bg-black/20 ${
            isFocused ? 'border-white ring-4 ring-white/5' : 'border-white/10'
          }`}
        >
          <textarea
            value={content}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setContent(e.target.value)}
            disabled={isPublishing}
            placeholder="Partilha a tua jornada, resultados ou dúvidas..."
            className="w-full bg-transparent border-none focus:ring-0 text-gray-300 placeholder:text-gray-600 p-5 text-sm resize-none flex-1 font-medium"
          />

          {mediaUrl && (
            <div className="px-5 pb-5">
              <div className="relative rounded-xl overflow-hidden border border-white/10 max-h-[200px] bg-black">
                {contentType === 'image' ? (
                  <img src={mediaUrl} className="w-full h-auto object-contain max-h-[200px]" alt="Preview" />
                ) : (
                  <video src={mediaUrl} className="w-full h-auto max-h-[200px]" controls />
                )}
                <button 
                  onClick={removeMedia}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Barra de Ações Inferior */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-6">
            <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} />
            <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />
            
            <button 
              onClick={() => videoInputRef.current?.click()}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-all group"
            >
              <Play size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Vídeo</span>
            </button>

            <button 
              onClick={() => imageInputRef.current?.click()}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-all group"
            >
              <ImageIcon size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Imagem</span>
            </button>
          </div>
          
          <button
            onClick={handlePublish}
            disabled={(!content.trim() && !mediaUrl) || isPublishing}
            className="flex items-center gap-3 bg-[#1a1a1a] hover:bg-[#222] border border-white/5 text-gray-300 px-8 py-3 rounded-xl text-xs font-bold transition-all active:scale-95 disabled:opacity-30"
          >
            {isPublishing ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <Send size={16} />
                Publicar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
