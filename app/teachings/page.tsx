"use client";
import React, { useState, useEffect, FC, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import { FaPlayCircle } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
SwiperCore.use([Navigation, Pagination]);
import LanguageToggle from '@/components/LanguageToggle';

interface Comment {
  _id?: string;
  name: string;
  email?: string;
  content: string;
  date: string;
  userId: string;
  isAdmin?: boolean;
  replies?: Comment[];
}

interface Teaching {
  _id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  type?: string;
  tags?: string[];
  author?: string;
  authorAvatar?: string;
  pinned?: boolean;
  comments?: Comment[];
  title_ar?: string;
  content_ar?: string;
  author_ar?: string;
  videoUrl?: string;
  media?: { type: 'image' | 'video', url: string }[];
}

// Move expandTikTokLinkIfNeeded to the top level
async function expandTikTokLinkIfNeeded(url: string): Promise<string> {
  if (url.startsWith('https://vm.tiktok.com/')) {
    try {
      const res = await fetch('/api/tiktok/expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      return data.expandedUrl || url;
    } catch {
      return url;
    }
  }
  return url;
}

export default function TeachingsPage() {
  return (
    <LanguageProvider>
      <TeachingsPageContent />
    </LanguageProvider>
  );
}

function TeachingsPageContent() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [teachings, setTeachings] = useState<Teaching[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalTeaching, setModalTeaching] = useState<Teaching | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkedAdmin, setCheckedAdmin] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' });
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState('');
  const [currentUserComments, setCurrentUserComments] = useState<Set<string>>(new Set());
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 6;
  // Add state for lightbox
  const [lightbox, setLightbox] = useState<{ media: { url: string, type: 'image' | 'video' }[], index: number } | null>(null);
  // Add state for showAllFeatured and showAllRegular
  const [showAllFeatured, setShowAllFeatured] = useState(false);
  const [showAllRegular, setShowAllRegular] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  // Check admin status
  useEffect(() => {
    const checkAdmin = async () => {
      const requestId = Math.random().toString(36).substring(7);
      console.log(`[${requestId}] Frontend admin check started`);
      
      try {
        // Get JWT token from localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('babul_admin_jwt') : null;
        console.log(`[${requestId}] JWT token for admin check:`, token ? 'present' : 'missing');
        if (token) {
          console.log(`[${requestId}] JWT token length:`, token.length);
          console.log(`[${requestId}] JWT token first 20 chars:`, token.substring(0, 20) + '...');
        }
        
        const headers: HeadersInit = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const res = await fetch('/api/admin/check', {
          method: 'POST',
          headers
        });
        if (res.ok) {
          const data = await res.json();
          console.log(`[${requestId}] Admin check response:`, data);
          setIsAdmin(data.isAdmin);
        }
      } catch (error) {
        console.log(`[${requestId}] Admin check error:`, error);
        setIsAdmin(false);
      }
      setCheckedAdmin(true);
      console.log(`[${requestId}] Admin check completed, isAdmin:`, isAdmin, 'checkedAdmin:', true);
    };
    checkAdmin();
  }, []);

  // Debug state changes
  useEffect(() => {
    console.log('State changed - isAdmin:', isAdmin, 'checkedAdmin:', checkedAdmin);
  }, [isAdmin, checkedAdmin]);

  useEffect(() => {
    async function fetchTeachings() {
      try {
        const res = await fetch('/api/articles');
        const data = await res.json();
        setTeachings(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchTeachings();
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('babul_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('babul_favorites', JSON.stringify(favorites));
  }, [favorites]);

  function getUniqueTags(teachings: Teaching[]): string[] {
    const tags = new Set<string>();
    teachings.forEach((t: Teaching) => {
      if (t.tags) t.tags.forEach((tag: string) => tags.add(tag));
      if (t.type) tags.add(t.type);
    });
    return Array.from(tags);
  }

  const tags = getUniqueTags(teachings);
  const featured = teachings.filter((t) => t.pinned);
  const regular = teachings.filter((t) => !t.pinned);

  function filterTeachings(list: Teaching[]) {
    return list.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.content.toLowerCase().includes(search.toLowerCase()) ||
        (t.author && t.author.toLowerCase().includes(search.toLowerCase()));
      const matchesTag = selectedTag
        ? (t.tags && t.tags.includes(selectedTag)) || t.type === selectedTag
        : true;
      const matchesFavorites = showFavorites ? favorites.includes(t._id) : true;
      return matchesSearch && matchesTag && matchesFavorites;
    });
  }

  const filteredFeatured = filterTeachings(featured);
  const filteredRegular = filterTeachings(regular);
  const paginatedRegular = filteredRegular.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filteredRegular.length / perPage);

  const toggleFavorite = (teachingId: string) => {
    setFavorites(prev => 
      prev.includes(teachingId) 
        ? prev.filter(id => id !== teachingId)
        : [...prev, teachingId]
    );
  };

  const handlePinToggle = async (teachingId: string, currentPinned: boolean) => {
    try {
      const res = await fetch(`/api/articles/${teachingId}/pin`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pinned: !currentPinned })
      });
      
      if (res.ok) {
        setTeachings(prev => prev.map(t => 
          t._id === teachingId ? { ...t, pinned: !currentPinned } : t
        ));
        setCopySuccess(currentPinned ? t('admin.unpinned') : t('admin.pinned'));
        setTimeout(() => setCopySuccess(''), 2000);
      }
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const handleDeleteTeaching = async (teachingId: string) => {
    if (!confirm(t('admin.deleteConfirm'))) return;
    
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('babul_admin_jwt') : null;
      const fetchOptions: RequestInit = { method: 'DELETE' };
      if (token) {
        fetchOptions.headers = { 'Authorization': `Bearer ${token}` };
      }
      const res = await fetch(`/api/articles/${teachingId}`, fetchOptions);
      
      if (res.ok) {
        setTeachings(prev => prev.filter(t => t._id !== teachingId));
        setCopySuccess(t('admin.deleted'));
        setTimeout(() => setCopySuccess(''), 2000);
      }
    } catch (error) {
      console.error('Error deleting teaching:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTeaching || (!isAdmin && !commentForm.name) || !commentForm.content) return;

    setCommentLoading(true);
    try {
      const submitData = isAdmin ? { ...commentForm, name: 'Admin' } : commentForm;
      const res = await fetch(`/api/articles/${modalTeaching._id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      if (res.ok) {
        const data = await res.json();
        setModalTeaching(prev => prev ? {
          ...prev,
          comments: [...(prev.comments || []), data.comment]
        } : null);
        setCurrentUserComments(prev => new Set(Array.from(prev).concat(data.comment.userId)));
        setCommentForm({ name: '', email: '', content: '' });
        setCommentSuccess(t('comments.posted'));
        setTimeout(() => setCommentSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      setCommentSuccess(t('comments.error'));
      setTimeout(() => setCommentSuccess(''), 3000);
    }
    setCommentLoading(false);
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!modalTeaching || !confirm(t('comments.deleteConfirm'))) return;

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('babul_admin_jwt') : null;
      const res = await fetch(`/api/articles/${modalTeaching._id}/comments/${commentId}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined
      });

      if (res.ok) {
        setModalTeaching(prev => prev ? {
          ...prev,
          comments: prev.comments?.filter(c => c._id !== commentId) || []
        } : null);
        setCurrentUserComments(prev => {
          const newSet = new Set(Array.from(prev));
          newSet.delete(commentId);
          return newSet;
        });
        setCopySuccess(t('comments.deleted'));
        setTimeout(() => setCopySuccess(''), 2000);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const fetchComments = async (teachingId: string) => {
    try {
      const res = await fetch(`/api/articles/${teachingId}/comments`);
      if (res.ok) {
        const data = await res.json();
        setModalTeaching(prev => prev ? {
          ...prev,
          comments: data.comments || []
        } : null);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleOpenModal = (teaching: Teaching) => {
    setModalTeaching(teaching);
    fetchComments(teaching._id);
  };

  // Helper functions to check for YouTube and Vimeo URLs
  function isYouTubeUrl(url: string) {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
  }
  function isVimeoUrl(url: string) {
    return /^(https?:\/\/)?(www\.)?vimeo\.com\//.test(url);
  }
  function isFacebookUrl(url: string) {
    return /^(https?:\/\/)?(www\.)?facebook\.com\//.test(url);
  }
  function getFacebookEmbedUrl(url: string) {
    // Accepts URLs like https://www.facebook.com/{user}/videos/{video_id}/
    // Returns https://www.facebook.com/plugins/video.php?href=ENCODED_URL
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
  }
  function isTikTokUrl(url: string) {
    return /tiktok\.com\//.test(url);
  }

  // Helper functions to get embed URLs
  function getYouTubeEmbedUrl(url: string) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  }
  function getVimeoEmbedUrl(url: string) {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : url;
  }
  function getTikTokEmbedUrl(url: string) {
    const match = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
    return match ? `https://www.tiktok.com/embed/${match[1]}` : url;
  }
  function getGoogleDriveDirectUrl(url: string) {
    const match = url.match(/drive\.google\.com\/file\/d\/([\w-]+)\/view/);
    return match ? `https://drive.google.com/uc?export=download&id=${match[1]}` : url;
  }

  const handleReplyToComment = async (parentCommentId: string, replyForm: { content: string }) => {
    if (!modalTeaching || !replyForm.content) return;
    setCommentLoading(true);
    try {
      const replyData = isAdmin ? { ...replyForm, name: 'Admin' } : replyForm;
      const res = await fetch(`/api/articles/${modalTeaching._id}/comments/${parentCommentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(replyData)
      });
      if (res.ok) {
        await fetchComments(modalTeaching._id); // Refresh comments
        setCommentSuccess(t('comments.posted'));
        setTimeout(() => setCommentSuccess(''), 3000);
      }
    } catch (error) {
      setCommentSuccess(t('comments.error'));
      setTimeout(() => setCommentSuccess(''), 3000);
    }
    setCommentLoading(false);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background with Islamic pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 geometric-pattern opacity-95"></div>
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Islamic Learning Hero Background"
          className="object-cover w-full h-full opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-900/90" />
      </div>
      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-yellow-500/30 shadow-lg">
        <div className="max-w-6xl mx-auto px-2 py-3 flex flex-wrap gap-2 items-center justify-center relative">
          {/* Language Toggle on the right, avoid overlap on mobile */}
          <div className="absolute right-2 top-2 sm:static sm:right-0 sm:top-0 z-20">
            <LanguageToggle className="!static !relative !top-0 !right-0 min-w-[40px] min-h-[40px] px-2 py-2" />
          </div>
          <input
            type="text"
            placeholder={t('forum.search.placeholder') || 'Search teachings...'}
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm min-w-[140px] bg-white/90 backdrop-blur-sm mt-2 sm:mt-0"
            style={{ maxWidth: '60vw' }}
          />
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              showFavorites 
                ? 'bg-yellow-400 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
            }`}
          >
            {showFavorites ? (t('favorites.hide') || 'Hide Favorites') : (t('favorites.show') || 'Show Favorites')}
          </button>
          {tags.map((tag: string) => (
            <button
              key={tag}
              onClick={() => { setSelectedTag(selectedTag === tag ? null : tag); setPage(1); }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                selectedTag === tag 
                  ? 'bg-yellow-400 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              }`}
            >
              {t('tags.' + tag) !== 'tags.' + tag ? t('tags.' + tag) : tag}
            </button>
          ))}
          {selectedTag && (
            <button 
              onClick={() => setSelectedTag(null)} 
              className="text-xs text-yellow-300 underline hover:text-yellow-100"
            >
              {t('forum.filter.clear') || 'Clear Filter'}
            </button>
          )}
        </div>
      </div>

      <div className="py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto relative">
          
          <h1 className="text-4xl font-bold mb-8 text-center text-white tracking-tight">
            {t('forum.title')}
          </h1>
          {loading ? (
            <div className="text-center py-10 text-white/70">
              {t('forum.loading')}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Featured/Pinned Teachings */}
              {filteredFeatured.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-white text-center">
                    {t('forum.featured') || 'Featured Teachings'}
                  </h2>
                  <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-300">
                      {(isMobile && !showAllFeatured ? filteredFeatured.slice(0, 1) : filteredFeatured).map((teaching) => (
                        <div 
                          key={teaching._id} 
                          className="bg-white/90 rounded-xl shadow-lg p-3 sm:p-6 cursor-pointer hover:shadow-xl transition-all duration-300 group relative border-2 border-yellow-400 max-w-xs w-full mx-auto"
                          onClick={() => handleOpenModal(teaching)}
                        >
                          {/* Admin Actions */}
                          {isAdmin && (
                            <div className="absolute top-2 right-2 z-10 flex gap-1">
                              <button
                                onClick={(e) => { e.stopPropagation(); handlePinToggle(teaching._id, true); }}
                                className="bg-yellow-400 text-white p-1 rounded text-xs hover:bg-yellow-500 transition"
                                title={t('admin.unpin') || 'Unpin'}
                              >
                                📌
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDeleteTeaching(teaching._id); }}
                                className="bg-red-500 text-white p-1 rounded text-xs hover:bg-red-600 transition"
                                title={t('admin.delete') || 'Delete'}
                              >
                                🗑️
                              </button>
                            </div>
                          )}

                          {/* Favorite Button */}
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(teaching._id); }}
                            className={`absolute top-2 left-2 z-10 p-1 rounded text-lg transition ${
                              favorites.includes(teaching._id) 
                                ? 'text-yellow-400' 
                                : 'text-gray-400 hover:text-yellow-400'
                            }`}
                            title={favorites.includes(teaching._id) ? (t('favorites.remove') || 'Remove from favorites') : (t('favorites.add') || 'Add to favorites')}
                          >
                            {favorites.includes(teaching._id) ? '★' : '☆'}
                          </button>

                          {/* Display image and video */}
                          {(teaching.media && teaching.media.length > 0) ? (
                            <Swiper
                              spaceBetween={8}
                              slidesPerView={1}
                              navigation
                              pagination={{ clickable: true }}
                              className="w-full h-40 mb-2 rounded-lg bg-black"
                              style={{ maxWidth: 320, maxHeight: 160 }}
                            >
                              {teaching.media.map((media, idx) => (
                                <SwiperSlide key={idx}>
                                  {media.type === 'image' ? (
                                    <img src={media.url ? media.url : ''} alt="media" className="w-full h-40 object-contain rounded-lg cursor-pointer" onClick={e => { e.stopPropagation(); handleOpenModal(teaching); }} />
                                  ) : (
                                    <div className="w-full h-40 flex items-center justify-center bg-black rounded-lg cursor-pointer relative" onClick={e => { e.stopPropagation(); handleOpenModal(teaching); }}>
                                      <span className="text-white text-5xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">▶️</span>
                                      <img src="/video-thumb.png" alt="video" className="w-full h-40 object-contain rounded-lg opacity-60" />
                                    </div>
                                  )}
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          ) : teaching.imageUrl ? (
                            <img src={teaching.imageUrl ? teaching.imageUrl : ''} alt="media" className="w-full h-40 object-contain rounded-lg mb-2 bg-black cursor-pointer" style={{ maxWidth: 320, maxHeight: 160 }} onClick={e => { e.stopPropagation(); handleOpenModal(teaching); }} />
                          ) : teaching.videoUrl ? (
                            <div className="w-full h-40 flex items-center justify-center bg-black rounded-lg cursor-pointer relative" style={{ maxWidth: 320, maxHeight: 160 }} onClick={e => { e.stopPropagation(); handleOpenModal(teaching); }}>
                              <span className="text-white text-5xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">▶️</span>
                              <img src="/video-thumb.png" alt="video" className="w-full h-40 object-contain rounded-lg opacity-60" />
                            </div>
                          ) : null}
                          
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            {teaching.type && (
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                                {t('types.' + teaching.type) || teaching.type}
                              </span>
                            )}
                            {Array.isArray(teaching.tags) && teaching.tags.length > 0 && teaching.tags.map((tag: string) => (
                              <span key={tag} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">
                                {t('tags.' + tag) !== 'tags.' + tag ? t('tags.' + tag) : tag}
                              </span>
                            ))}
                            <span className="bg-yellow-400 text-white px-2 py-1 rounded text-xs font-bold ml-auto">
                              {t('forum.featured') || 'Featured'}
                            </span>
                          </div>
                          
                          <h2 className="text-base sm:text-xl font-bold mb-2 text-blue-900 group-hover:text-yellow-600 transition-colors duration-200">
                            {language === 'ar' && teaching.title_ar ? teaching.title_ar : teaching.title}
                          </h2>
                          <div className="text-xs text-gray-400 mb-2">
                            {new Date(teaching.date).toLocaleDateString(language)}
                          </div>
                          <p className="text-gray-700 line-clamp-3">
                            {language === 'ar' && teaching.content_ar ? teaching.content_ar : teaching.content}
                          </p>
                          
                          {teaching.author && (
                            <div className="flex items-center gap-2 mt-2">
                              {teaching.authorAvatar && (
                                <img src={teaching.authorAvatar} alt={teaching.author} className="w-7 h-7 rounded-full object-cover" />
                              )}
                              <span className="text-xs text-gray-500">
                                {t('by')} {language === 'ar' && teaching.author_ar ? teaching.author_ar : teaching.author}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {isMobile && !showAllFeatured && filteredFeatured.length > 1 && (
                      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/90 to-transparent pointer-events-none rounded-b-xl" />
                    )}
                  </div>
                  {isMobile && filteredFeatured.length > 1 && (
                    <button
                      className="block mx-auto mt-4 px-6 py-2 rounded-full bg-yellow-400 text-white font-bold shadow-lg hover:bg-yellow-500 transition text-base"
                      onClick={() => setShowAllFeatured(true)}
                    >
                      {t('forum.viewAllFeatured') || 'View All Featured'}
                    </button>
                  )}
                </div>
              )}

              {/* Regular Teachings */}
              {filteredRegular.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-white text-center">
                    {t('forum.allTeachings') || 'All Teachings'}
                  </h2>
                  <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-300">
                      {(isMobile && !showAllRegular ? paginatedRegular.slice(0, 3) : paginatedRegular).map((teaching) => (
                        <div 
                          key={teaching._id} 
                          className="bg-white/90 rounded-xl shadow p-3 sm:p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group relative"
                          onClick={() => handleOpenModal(teaching)}
                        >
                          {/* Admin Actions */}
                          {isAdmin && (
                            <div className="absolute top-2 right-2 z-10 flex gap-1">
                              <button
                                onClick={(e) => { e.stopPropagation(); handlePinToggle(teaching._id, false); }}
                                className="bg-gray-400 text-white p-1 rounded text-xs hover:bg-gray-500 transition"
                                title={t('admin.pin') || 'Pin'}
                              >
                                📌
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDeleteTeaching(teaching._id); }}
                                className="bg-red-500 text-white p-1 rounded text-xs hover:bg-red-600 transition"
                                title={t('admin.delete') || 'Delete'}
                              >
                                🗑️
                              </button>
                            </div>
                          )}

                          {/* Favorite Button */}
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(teaching._id); }}
                            className={`absolute top-2 left-2 z-10 p-1 rounded text-lg transition ${
                              favorites.includes(teaching._id) 
                                ? 'text-yellow-400' 
                                : 'text-gray-400 hover:text-yellow-400'
                            }`}
                            title={favorites.includes(teaching._id) ? (t('favorites.remove') || 'Remove from favorites') : (t('favorites.add') || 'Add to favorites')}
                          >
                            {favorites.includes(teaching._id) ? '★' : '☆'}
                          </button>

                          {/* Display image and video */}
                          {(teaching.media && teaching.media.length > 0) ? (
                            <Swiper
                              spaceBetween={8}
                              slidesPerView={1}
                              navigation
                              pagination={{ clickable: true }}
                              className="w-full h-40 mb-2 rounded-lg bg-black"
                              style={{ maxWidth: 320, maxHeight: 160 }}
                            >
                              {teaching.media.map((media, idx) => (
                                <SwiperSlide key={idx}>
                                  {media.type === 'image' ? (
                                    <img src={media.url ? media.url : ''} alt="media" className="w-full h-40 object-contain rounded-lg cursor-pointer" onClick={e => { e.stopPropagation(); handleOpenModal(teaching); }} />
                                  ) : (
                                    <div className="w-full h-40 flex items-center justify-center bg-black rounded-lg cursor-pointer relative" onClick={e => { e.stopPropagation(); handleOpenModal(teaching); }}>
                                      <span className="text-white text-5xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">▶️</span>
                                      <img src="/video-thumb.png" alt="video" className="w-full h-40 object-contain rounded-lg opacity-60" />
                                    </div>
                                  )}
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          ) : teaching.imageUrl ? (
                            <img src={teaching.imageUrl ? teaching.imageUrl : ''} alt="media" className="w-full h-40 object-contain rounded-lg mb-2 bg-black cursor-pointer" style={{ maxWidth: 320, maxHeight: 160 }} onClick={e => { e.stopPropagation(); handleOpenModal(teaching); }} />
                          ) : teaching.videoUrl ? (
                            <div className="w-full h-40 flex items-center justify-center bg-black rounded-lg cursor-pointer relative" style={{ maxWidth: 320, maxHeight: 160 }} onClick={e => { e.stopPropagation(); handleOpenModal(teaching); }}>
                              <span className="text-white text-5xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">▶️</span>
                              <img src="/video-thumb.png" alt="video" className="w-full h-40 object-contain rounded-lg opacity-60" />
                            </div>
                          ) : null}
                          
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            {teaching.type && (
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                                {t('types.' + teaching.type) || teaching.type}
                              </span>
                            )}
                            {Array.isArray(teaching.tags) && teaching.tags.length > 0 && teaching.tags.map((tag: string) => (
                              <span key={tag} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">
                                {t('tags.' + tag) !== 'tags.' + tag ? t('tags.' + tag) : tag}
                              </span>
                            ))}
                          </div>
                          
                          <h2 className="text-base sm:text-xl font-bold mb-2 text-blue-900 group-hover:text-yellow-600 transition-colors duration-200">
                            {language === 'ar' && teaching.title_ar ? teaching.title_ar : teaching.title}
                          </h2>
                          <div className="text-xs text-gray-400 mb-2">
                            {new Date(teaching.date).toLocaleDateString(language)}
                          </div>
                          <p className="text-gray-700 line-clamp-3">
                            {language === 'ar' && teaching.content_ar ? teaching.content_ar : teaching.content}
                          </p>
                          
                          {teaching.author && (
                            <div className="flex items-center gap-2 mt-2">
                              {teaching.authorAvatar && (
                                <img src={teaching.authorAvatar} alt={teaching.author} className="w-7 h-7 rounded-full object-cover" />
                              )}
                              <span className="text-xs text-gray-500">
                                {t('by')} {language === 'ar' && teaching.author_ar ? teaching.author_ar : teaching.author}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {isMobile && !showAllRegular && paginatedRegular.length > 3 && (
                      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/90 to-transparent pointer-events-none rounded-b-xl" />
                    )}
                  </div>
                  {isMobile && paginatedRegular.length > 3 && (
                    <button
                      className="block mx-auto mt-4 px-6 py-2 rounded-full bg-yellow-400 text-white font-bold shadow-lg hover:bg-yellow-500 transition text-base"
                      onClick={() => setShowAllRegular(true)}
                    >
                      {t('forum.viewAllTeachings') || 'View All Teachings'}
                    </button>
                  )}
                </div>
              )}

              {/* No Results */}
              {filteredFeatured.length === 0 && filteredRegular.length === 0 && (
                <div className="text-center py-10 text-white/70">
                  {t('forum.noResults') || 'No teachings found.'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal for opened post - ensure not hidden behind navbar and fully visible on mobile */}
      {modalTeaching && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-1 sm:p-4" style={{ paddingTop: '60px' }} onClick={() => setModalTeaching(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative max-h-[85vh] mt-8 overflow-y-auto p-2 sm:p-8 flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
            {/* Close button above media for visibility */}
            <button onClick={() => setModalTeaching(null)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl z-20 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-gray-200" aria-label="Close">×</button>
            {/* Media preview */}
            <div className="mb-4 flex flex-col justify-center items-center gap-4 mt-2">
              {(modalTeaching.media && modalTeaching.media.length > 0) ? (
                <Swiper
                  spaceBetween={8}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  className="w-full max-w-lg h-64 mb-4 rounded-lg bg-black"
                  style={{ maxWidth: 480, maxHeight: 256 }}
                >
                  {modalTeaching.media.map((media, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="relative w-full h-64 flex items-center justify-center">
                        {media.type === 'image' ? (
                          <>
                            <img src={media.url ? media.url : ''} alt="media" className="w-full h-64 object-contain rounded-lg cursor-pointer" onClick={() => setLightbox({ media: modalTeaching.media!, index: idx })} />
                            {/* Zoom icon overlay */}
                            <button
                              className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-20 flex items-center justify-center"
                              title="View in Full Mode"
                              onClick={e => { e.stopPropagation(); window.open(media.url, '_blank'); }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3v2.25A2.25 2.25 0 0018 7.5h2.25M8.25 21v-2.25A2.25 2.25 0 006 16.5H3.75M21 8.25V6a2.25 2.25 0 00-2.25-2.25H15.75M3 15.75V18a2.25 2.25 0 002.25 2.25H8.25" />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <div className="w-full h-64 flex items-center justify-center bg-black rounded-lg cursor-pointer relative" onClick={() => setLightbox({ media: modalTeaching.media!, index: idx })}>
                            <span className="text-white text-5xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">▶️</span>
                            <img src="/video-thumb.png" alt="video" className="w-full h-64 object-contain rounded-lg opacity-60" />
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-blue-900/80 rounded-lg text-yellow-300 text-2xl font-bold">No Media</div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {modalTeaching.type && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                  {t('types.' + modalTeaching.type) || modalTeaching.type}
                </span>
              )}
              {Array.isArray(modalTeaching.tags) && modalTeaching.tags.length > 0 && modalTeaching.tags.map((tag: string) => (
                <span key={tag} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">
                  {t('tags.' + tag) !== 'tags.' + tag ? t('tags.' + tag) : tag}
                </span>
              ))}
              {modalTeaching.pinned && (
                <span className="bg-yellow-400 text-white px-2 py-1 rounded text-xs font-bold ml-auto">
                  {t('forum.featured')}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold mb-2 text-gray-800">
              {language === 'ar' && modalTeaching.title_ar ? modalTeaching.title_ar : modalTeaching.title}
            </h3>
            <div className="text-xs text-gray-400 mb-2">
              {new Date(modalTeaching.date).toLocaleDateString(language)}
            </div>
            <div className="mb-4 bg-white/90 dark:bg-gray-800/90 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-100 text-base font-medium whitespace-pre-line">
                {language === 'ar' && modalTeaching.content_ar ? modalTeaching.content_ar : modalTeaching.content}
              </p>
            </div>

            {modalTeaching.author && (
              <div className="flex items-center gap-2 mb-4">
                {modalTeaching.authorAvatar && (
                  <img src={modalTeaching.authorAvatar} alt={modalTeaching.author} className="w-7 h-7 rounded-full object-cover" />
                )}
                <span className="text-xs text-gray-500">
                  {t('by')} {language === 'ar' && modalTeaching.author_ar ? modalTeaching.author_ar : modalTeaching.author}
                </span>
              </div>
            )}

            {/* Share Buttons */}
            <div className="flex flex-wrap gap-3 mb-6 -mx-1">
              <a
                href={`https://wa.me/?text=${encodeURIComponent((language === 'ar' && modalTeaching.title_ar ? modalTeaching.title_ar : modalTeaching.title) + ' ' + window.location.origin + '/teachings#' + modalTeaching._id)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-semibold transition flex-1 min-w-[140px] justify-center"
                title={t('share.whatsapp') || 'WhatsApp'}
                onClick={e => e.stopPropagation()}
              >
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="16" fill="#25D366"/><path d="M16 6C10.477 6 6 10.477 6 16c0 1.624.43 3.162 1.18 4.49L6 26l5.646-1.16A9.94 9.94 0 0016 26c5.523 0 10-4.477 10-10S21.523 6 16 6zm0 18a7.94 7.94 0 01-4.07-1.13l-.29-.17-3.36.69.7-3.27-.18-.29A7.94 7.94 0 018 16c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm4.29-5.71c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.36.1-.48.1-.1.24-.26.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.54.58.2 1.04.32 1.4.4.58.12 1.1.1 1.52.06.46-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" fill="#fff"/></svg>
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent((language === 'ar' && modalTeaching.title_ar ? modalTeaching.title_ar : modalTeaching.title) + ' ' + window.location.origin + '/teachings#' + modalTeaching._id)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-semibold transition flex-1 min-w-[140px] justify-center"
                title={t('share.twitter') || 'Twitter'}
                onClick={e => e.stopPropagation()}
              >
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="16" fill="#1DA1F2"/><path d="M25.944 11.05a6.6 6.6 0 01-1.885.516 3.295 3.295 0 001.444-1.817 6.574 6.574 0 01-2.084.797A3.283 3.283 0 0016.616 10c-1.816 0-3.29 1.474-3.29 3.29 0 .258.03.51.085.75-2.735-.137-5.16-1.447-6.782-3.44a3.28 3.28 0 00-.445 1.655c0 1.142.582 2.15 1.47 2.74a3.28 3.28 0 01-1.49-.41v.04c0 1.595 1.135 2.926 2.64 3.23-.277.075-.57.115-.872.115-.213 0-.418-.02-.618-.06.418 1.305 1.63 2.255 3.065 2.28A6.588 6.588 0 018 22.29a9.29 9.29 0 005.034 1.477c6.038 0 9.344-5.003 9.344-9.344 0-.143-.003-.285-.01-.426A6.68 6.68 0 0026 11.5a6.56 6.56 0 01-2.056.563z" fill="#fff"/></svg>
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/teachings#' + modalTeaching._id)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-semibold transition flex-1 min-w-[140px] justify-center"
                title="Facebook"
                onClick={e => e.stopPropagation()}
              >
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="16" fill="#1877F3"/><path d="M22.675 16.001h-3.197v8.001h-3.334v-8.001h-2v-2.667h2v-1.6c0-2.084 1.084-3.334 3.334-3.334h2v2.667h-1.334c-.667 0-.667.334-.667.667v1.6h2.001l-.267 2.667z" fill="#fff"/></svg>
                Facebook
              </a>
              <button
                onClick={e => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(window.location.origin + '/teachings#' + modalTeaching._id).then(() => {
                    setCopySuccess(t('share.copied') || 'Link copied!');
                    setTimeout(() => setCopySuccess(''), 2000);
                  });
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-semibold transition flex-1 min-w-[140px] justify-center"
                title={t('share.copy') || 'Copy Link'}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-3.535 3.535a4 4 0 01-5.657-5.657l1.414-1.414m6.364-6.364a4 4 0 015.657 5.657l-1.414 1.414"/></svg>
                {t('share.copy') || 'Copy Link'}
              </button>
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold mb-4 text-blue-900">{t('comments.title')}</h4>
              
              {/* Comments List - only render after admin check */}
              {checkedAdmin && (
                <div className="space-y-4 mb-6">
                  {modalTeaching.comments && modalTeaching.comments.length > 0 ? (
                    (commentsExpanded ? modalTeaching.comments : modalTeaching.comments.slice(0, 2)).map((comment, index) => (
                      <RenderComment
                        key={comment._id || index}
                        comment={comment}
                        onReply={handleReplyToComment}
                        isAdmin={isAdmin}
                        currentUserComments={currentUserComments}
                        handleDeleteComment={handleDeleteComment}
                        language={language}
                        t={t}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">{t('comments.empty')}</p>
                  )}
                </div>
              )}
              
              {/* Show more/less button */}
              {modalTeaching.comments && modalTeaching.comments.length > 2 && (
                <button
                  onClick={() => setCommentsExpanded(!commentsExpanded)}
                  className="block mx-auto mt-2 text-blue-700 underline hover:text-blue-900 text-sm"
                >
                  {commentsExpanded ? t('comments.showLess') : t('comments.showMore')}
                </button>
              )}

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {!isAdmin && (
                    <input
                      type="text"
                      placeholder={t('comments.name')}
                      value={commentForm.name}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, name: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                    />
                  )}
                  {/* Only show email input for non-admins */}
                  {!isAdmin && (
                    <input
                      type="email"
                      placeholder={t('comments.email')}
                      value={commentForm.email}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, email: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  )}
                </div>
                <textarea
                  placeholder={t('comments.content')}
                  value={commentForm.content}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                  rows={3}
                  required
                />
                <button
                  type="submit"
                  disabled={commentLoading}
                  className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
                >
                  {commentLoading ? '...' : t('comments.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Messages */}
      {(copySuccess || commentSuccess) && (
        <div className="fixed left-1/2 top-6 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {copySuccess || commentSuccess}
        </div>
      )}

      {/* Lightbox overlay */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" style={{overflowY: 'auto'}} onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white text-3xl font-bold z-10 bg-black/60 rounded-full w-10 h-10 flex items-center justify-center" aria-label="Close">×</button>
          <Swiper
            spaceBetween={8}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            initialSlide={lightbox.index}
            onSlideChange={swiper => setLightbox({ ...lightbox, index: swiper.activeIndex })}
            className="w-full max-w-lg h-64 mb-4 rounded-lg bg-black"
            style={{ maxWidth: 480, maxHeight: 256 }}
          >
            {lightbox.media.map((media, idx) => (
              <SwiperSlide key={idx}>
                {media.type === 'image' ? (
                  <img src={media.url ? media.url : ''} alt="media" className="w-full h-64 object-contain rounded-lg" />
                ) : (
                  lightbox.index === idx ? (
                    <video src={media.url ? media.url : ''} controls autoPlay className="w-full h-64 object-contain rounded-lg" />
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center bg-black rounded-lg">
                      <span className="text-white text-5xl">▶️</span>
                    </div>
                  )
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
} 

function TikTokPreview({ videoUrl, setLightbox }: { videoUrl: string, setLightbox: any }) {
  const [expandedUrl, setExpandedUrl] = React.useState(videoUrl);
  React.useEffect(() => {
    expandTikTokLinkIfNeeded(videoUrl).then(setExpandedUrl);
  }, [videoUrl]);
  const isTikTok = /tiktok\.com\//.test(expandedUrl);
  const match = expandedUrl.match(/tiktok\.com\/.*video\/(\d+)/);
  const embedUrl = match ? `https://www.tiktok.com/embed/${match[1]}` : '';
  return (
    <div
      className="relative w-64 h-40 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center cursor-pointer group"
      onClick={() => {
        if (isTikTok && embedUrl) {
          setLightbox({ type: 'tiktok', src: embedUrl });
        } else {
          setLightbox({ type: 'video', src: expandedUrl });
        }
      }}
      title="Play video"
    >
      {/* Play icon overlay */}
      <FaPlayCircle className="text-white text-6xl drop-shadow-lg opacity-90 group-hover:scale-110 transition-transform" style={{ filter: 'drop-shadow(0 2px 8px #000)' }} />
      {!isTikTok && (
        <span className="absolute bottom-2 left-2 text-xs text-red-500">Invalid TikTok link</span>
      )}
    </div>
  );
} 

interface RenderCommentProps {
  comment: Comment;
  onReply: (parentCommentId: string, replyForm: { content: string }) => Promise<void>;
  isAdmin: boolean;
  currentUserComments: Set<string>;
  handleDeleteComment: (commentId: string) => void;
  language: string;
  t: any;
}
const RenderComment: FC<RenderCommentProps> = ({ comment, onReply, isAdmin, currentUserComments, handleDeleteComment, language, t }: RenderCommentProps) => {
  const [showReplyForm, setShowReplyForm] = React.useState(false);
  const [replyForm, setReplyForm] = React.useState<{ content: string; name?: string }>({ content: '' });
  const [loading, setLoading] = React.useState(false);
  const [showAllReplies, setShowAllReplies] = React.useState(false);
  
  // Debug RenderComment props
  React.useEffect(() => {
    console.log('RenderComment for', comment.name, '- isAdmin:', isAdmin);
  }, [isAdmin, comment.name]);

  const handleReply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const replyData = isAdmin ? { ...replyForm, name: 'Admin' } : replyForm;
    await onReply(comment._id || "", replyData);
    setReplyForm({ content: '' });
    setShowReplyForm(false);
    setLoading(false);
  };
  // Helper to get a safe label for reply UI
  const getReplyLabel = () => {
    const label = t('comments.reply');
    return (!label || label === 'comments.reply') ? 'Reply' : label;
  };
  const getShowMoreLabel = () => {
    const label = t('comments.showMore');
    return (!label || label === 'comments.showMore') ? 'Show more replies' : label;
  };
  const getShowLessLabel = () => {
    const label = t('comments.showLess');
    return (!label || label === 'comments.showLess') ? 'Show less replies' : label;
  };
  const getCancelReplyLabel = () => {
    const label = t('comments.cancelReply');
    return (!label || label === 'comments.cancelReply') ? 'Cancel' : label;
  };
  const getPostReplyLabel = () => {
    const label = t('comments.postReply');
    return (!label || label === 'comments.postReply') ? 'Post Reply' : label;
  };
  const getReplyPlaceholder = () => {
    const label = t('comments.replyPlaceholder');
    return (!label || label === 'comments.replyPlaceholder') ? 'Reply...' : label;
  };
  // Only show first 2 direct replies, rest are hidden behind show more
  const replies = Array.isArray(comment.replies) ? comment.replies : [];
  const showAll = showAllReplies;
  const repliesToShow = !showAll && replies.length > 2 ? replies.slice(0, 2) : replies;
  const hasHiddenReplies = replies.length > 2 && !showAll;
  return (
    <div className="bg-gray-100 rounded p-2 text-sm mb-2">
      <div className="flex items-center gap-2 mb-1">
        {comment.isAdmin ? (
          <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-white text-xs font-bold">Admin</span>
        ) : (
          <span className="font-bold">{comment.name}</span>
        )}
        <span className="text-xs text-gray-400">{new Date(comment.date).toLocaleDateString(language)}</span>
      </div>
      <div className="mb-1">{comment.content}</div>
      <div className="flex gap-2 mt-1">
        {isAdmin && (
          <button className="text-red-500 hover:text-red-700 text-xs" onClick={() => handleDeleteComment(comment._id || "")}>{t('comments.delete') || 'Delete'}</button>
        )}
        <button className="text-blue-500 hover:underline text-xs" onClick={() => setShowReplyForm(!showReplyForm)}>
          {showReplyForm ? getCancelReplyLabel() : getReplyLabel()}
        </button>
      </div>
      {showReplyForm && (
        <form onSubmit={handleReply} className="mt-2 flex flex-col gap-1">
          {/* Only show name input for non-admins */}
          {!isAdmin && (
            <input
              type="text"
              placeholder={t('comments.name')}
              value={replyForm.name || ''}
              onChange={e => setReplyForm(prev => ({ ...prev, name: e.target.value }))}
              className="p-1 rounded border text-xs"
              required
            />
          )}
          <textarea placeholder={getReplyPlaceholder()} value={replyForm.content} onChange={e => setReplyForm({ ...replyForm, content: e.target.value })} className="p-1 rounded border text-xs" required />
          <button type="submit" className="bg-yellow-400 text-white rounded px-2 py-1 text-xs mt-1" disabled={loading}>{loading ? (t('comments.posting') || 'Posting...') : getPostReplyLabel()}</button>
        </form>
      )}
      {replies.length > 0 && (
        <div className="ml-4 mt-2 border-l border-yellow-100 pl-3 bg-gray-50">
          {repliesToShow.map((reply: Comment, idx: number) => (
            <RenderComment key={reply._id || idx} comment={reply} onReply={onReply} isAdmin={isAdmin} currentUserComments={currentUserComments} handleDeleteComment={handleDeleteComment} language={language} t={t} />
          ))}
          {hasHiddenReplies && (
            <button className="text-xs text-blue-500 mt-1" onClick={() => setShowAllReplies(true)}>
              {getShowMoreLabel()}
            </button>
          )}
          {showAll && replies.length > 2 && (
            <button className="text-xs text-blue-500 mt-1" onClick={() => setShowAllReplies(false)}>
              {getShowLessLabel()}
            </button>
          )}
        </div>
      )}
    </div>
  );
} 