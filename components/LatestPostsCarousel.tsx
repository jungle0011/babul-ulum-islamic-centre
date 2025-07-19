import React, { useEffect, useState, FC, FormEvent } from 'react';
import Carousel3D, { Carousel3DItem } from './Carousel3D';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

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
  videoUrl?: string;
  tags?: string[];
  type?: string;
  media?: { type: 'image' | 'video'; url: string }[];
  comments?: Comment[];
}

const RenderComment: FC<{
  comment: Comment;
  onReply: (parentCommentId: string, replyForm: { content: string; name?: string }) => Promise<void>;
  isAdmin: boolean;
  currentUserComments: Set<string>;
  handleDeleteComment: (commentId: string, parentId?: string) => void;
  language: string;
  t: any;
  parentId?: string;
}> = ({ comment, onReply, isAdmin, currentUserComments, handleDeleteComment, language, t, parentId }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyForm, setReplyForm] = useState<{ content: string; name?: string }>({ content: '' });
  const [loading, setLoading] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);

  const handleReply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const replyData = isAdmin ? { ...replyForm, name: 'Admin' } : replyForm;
    await onReply(comment._id || '', replyData);
    setReplyForm({ content: '' });
    setShowReplyForm(false);
    setLoading(false);
  };
  const replies = Array.isArray(comment.replies) ? comment.replies : [];
  const showAll = showAllReplies;
  const repliesToShow = !showAll && replies.length > 2 ? replies.slice(0, 2) : replies;
  const hasHiddenReplies = replies.length > 2 && !showAll;

  // Fallback label helpers
  const getReplyLabel = () => {
    const label = t('comments.reply');
    return (!label || label === 'comments.reply') ? 'Reply' : label;
  };
  const getCancelReplyLabel = () => {
    const label = t('comments.cancelReply');
    return (!label || label === 'comments.cancelReply') ? 'Cancel' : label;
  };
  const getPostReplyLabel = () => {
    const label = t('comments.postReply');
    return (!label || label === 'comments.postReply') ? 'Post Reply' : label;
  };
  const getShowMoreLabel = () => {
    const label = t('comments.showMore');
    return (!label || label === 'comments.showMore') ? 'Show more replies' : label;
  };
  const getShowLessLabel = () => {
    const label = t('comments.showLess');
    return (!label || label === 'comments.showLess') ? 'Show less replies' : label;
  };
  const getReplyPlaceholder = () => {
    const label = t('comments.replyPlaceholder');
    return (!label || label === 'comments.replyPlaceholder') ? 'Reply...' : label;
  };
  const getPostingLabel = () => {
    const label = t('comments.posting');
    return (!label || label === 'comments.posting') ? 'Posting...' : label;
  };

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
        {/* Show delete for all comments and replies for admin */}
        {isAdmin && (
          <button className="text-red-500 hover:text-red-700 text-xs" onClick={() => handleDeleteComment(comment._id || '', parentId)}>{t('comments.delete') || 'Delete'}</button>
        )}
        <button className="text-blue-500 hover:underline text-xs" onClick={() => setShowReplyForm(!showReplyForm)}>
          {showReplyForm ? getCancelReplyLabel() : getReplyLabel()}
        </button>
      </div>
      {showReplyForm && (
        <form onSubmit={handleReply} className="mt-2 flex flex-col gap-1">
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
          <button type="submit" className="bg-yellow-400 text-white rounded px-2 py-1 text-xs mt-1" disabled={loading}>{loading ? getPostingLabel() : getPostReplyLabel()}</button>
        </form>
      )}
      {Array.isArray(comment.replies) && comment.replies.length > 0 && (
        <div className="ml-4 mt-2 border-l border-yellow-100 pl-3 bg-gray-50">
          {repliesToShow.map((reply, idx) => (
            <RenderComment key={reply._id || idx} comment={reply} onReply={onReply} isAdmin={isAdmin} currentUserComments={currentUserComments} handleDeleteComment={handleDeleteComment} language={language} t={t} parentId={comment._id} />
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
};

export default function LatestPostsCarousel() {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<Teaching[]>([]);
  const [modalPost, setModalPost] = useState<Teaching | null>(null);
  const [modalComments, setModalComments] = useState<Comment[]>([]);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' });
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState('');
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkedAdmin, setCheckedAdmin] = useState(false);
  const [currentUserComments, setCurrentUserComments] = useState<Set<string>>(new Set());
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a: Teaching, b: Teaching) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(sorted);
      });
  }, []);

  // Only show top 5 latest posts
  const topPosts = posts.slice(0, 5);

  // Trap scroll when modal is open
  useEffect(() => {
    if (modalPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalPost]);

  // Fetch comments when modal opens
  useEffect(() => {
    if (modalPost) {
      fetch(`/api/articles/${modalPost._id}/comments`).then(res => res.json()).then(data => setModalComments(data.comments || []));
      // Check admin
      const token = typeof window !== 'undefined' ? localStorage.getItem('babul_admin_jwt') : null;
      const headers: HeadersInit = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      fetch('/api/admin/check', { method: 'POST', headers }).then(res => res.json()).then(data => {
        setIsAdmin(data.isAdmin);
        setCheckedAdmin(true);
      }).catch(() => setCheckedAdmin(true));
    }
  }, [modalPost]);

  const items: Carousel3DItem[] = topPosts.map((post, idx) => {
    let mediaType: 'image' | 'video' | undefined = undefined;
    let mediaUrl: string | undefined = undefined;
    if (Array.isArray(post.media) && post.media.length > 0) {
      mediaType = post.media[0].type;
      mediaUrl = post.media[0].url;
    } else if (post.imageUrl) {
      mediaType = 'image';
      mediaUrl = post.imageUrl;
    } else if (post.videoUrl) {
      mediaType = 'video';
      mediaUrl = post.videoUrl;
    }
    return {
      id: idx,
      title: post.title,
      brand: post.type || 'Post',
      description: post.content || '',
      tags: post.tags || [],
      imageUrl: post.imageUrl || '',
      link: `/teachings/${post._id}`,
      mediaType,
      mediaUrl,
    };
  });

  // Comment handlers
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalPost || (!isAdmin && !commentForm.name) || !commentForm.content) return;
    setCommentLoading(true);
    try {
      const submitData = isAdmin ? { ...commentForm, name: 'Admin' } : commentForm;
      const res = await fetch(`/api/articles/${modalPost._id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });
      if (res.ok) {
        const data = await res.json();
        setModalComments(prev => [...prev, data.comment]);
        setCurrentUserComments(prev => new Set(Array.from(prev).concat(data.comment.userId)));
        setCommentForm({ name: '', email: '', content: '' });
        setCommentSuccess(t('comments.posted'));
        setTimeout(() => setCommentSuccess(''), 3000);
      }
    } catch (error) {
      setCommentSuccess(t('comments.error'));
      setTimeout(() => setCommentSuccess(''), 3000);
    }
    setCommentLoading(false);
  };

  const handleDeleteComment = async (commentId: string, parentId?: string) => {
    if (!modalPost || !confirm(t('comments.deleteConfirm'))) return;
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('babul_admin_jwt') : null;
      let url = `/api/articles/${modalPost._id}/comments/${commentId}`;
      if (parentId) {
        url += `?parentId=${parentId}`;
      }
      const res = await fetch(url, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined
      });
      if (res.ok) {
        // Refresh comments
        const data = await fetch(`/api/articles/${modalPost._id}/comments`).then(res => res.json());
        setModalComments(data.comments || []);
        setCurrentUserComments(prev => {
          const newSet = new Set(Array.from(prev));
          newSet.delete(commentId);
          return newSet;
        });
        setCommentSuccess(t('comments.deleted'));
        setTimeout(() => setCommentSuccess(''), 2000);
      }
    } catch (error) {
      setCommentSuccess(t('comments.error'));
      setTimeout(() => setCommentSuccess(''), 2000);
    }
  };

  // Reply logic
  const handleReplyToComment = async (parentCommentId: string, replyForm: { content: string; name?: string }) => {
    if (!modalPost || !replyForm.content) return;
    setCommentLoading(true);
    try {
      const replyData = isAdmin ? { ...replyForm, name: 'Admin' } : replyForm;
      const res = await fetch(`/api/articles/${modalPost._id}/comments/${parentCommentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(replyData)
      });
      if (res.ok) {
        // Refresh comments
        const data = await fetch(`/api/articles/${modalPost._id}/comments`).then(res => res.json());
        setModalComments(data.comments || []);
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
    <section className="max-w-6xl mx-auto py-8 px-0">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center tracking-tight">{t('latest_dailyUpdates')}</h2>
      <Carousel3D
        items={items}
        autoRotate={true}
        rotateInterval={4000}
        cardHeight={500}
        title={t('latest_dailyUpdates')}
        onCardClick={id => {
          const post = topPosts[id];
          if (post) setModalPost(post);
        }}
      />
      {modalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-0 py-0" style={{ minHeight: '100vh' }} onClick={() => setModalPost(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-auto max-w-[95vw] mx-auto my-4 self-center border-4 border-red-500 sm:max-w-md md:max-w-lg relative max-h-[90vh] overflow-y-auto overflow-x-hidden p-2 sm:p-8 flex flex-col items-center gap-4" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setModalPost(null)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl z-20 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-gray-200" aria-label="Close">×</button>
            <div className="w-full max-w-full mt-8 mb-6 flex-shrink-0 overflow-x-hidden" style={{ maxWidth: '100%' }}>
              {Array.isArray(modalPost.media) && modalPost.media?.length > 0 && modalPost.media?.[0] ? (
                <div className="relative w-full h-48">
                  {modalPost.media?.[0].type === 'image' ? (
                    <img src={modalPost.media?.[0].url} alt="media" className="w-full max-w-full h-48 sm:h-56 object-contain rounded-lg overflow-x-hidden cursor-zoom-in" onClick={() => { if (modalPost.media?.[0].url) setLightboxImg(modalPost.media[0].url); }} />
                  ) : (
                    <video src={modalPost.media?.[0].url} controls className="w-full max-w-full h-48 sm:h-56 object-contain rounded-lg overflow-x-hidden" />
                  )}
                </div>
              ) : modalPost.imageUrl ? (
                <img src={modalPost.imageUrl} alt={modalPost.title} className="w-full max-w-full h-48 sm:h-56 object-contain rounded-lg overflow-x-hidden cursor-zoom-in" onClick={() => setLightboxImg(modalPost.imageUrl!)} />
              ) : modalPost.videoUrl ? (
                <div className="w-full h-48 flex items-center justify-center bg-black rounded-lg">
                  <span className="text-white text-3xl">🎬</span>
                </div>
              ) : (
                <span className="text-yellow-300 text-2xl">No Media</span>
              )}
            </div>
            {/* Lightbox overlay for zoomed image */}
            {lightboxImg && (
              <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90" onClick={() => setLightboxImg(null)}>
                <img src={lightboxImg} alt="zoomed" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border-4 border-white" style={{ objectFit: 'contain' }} />
                <button onClick={() => setLightboxImg(null)} className="absolute top-8 right-8 text-white text-4xl font-bold bg-black/60 rounded-full w-12 h-12 flex items-center justify-center z-70" aria-label="Close">×</button>
              </div>
            )}
            <h3 className="text-lg font-bold text-blue-900 mb-1 text-center">{modalPost.title}</h3>
            {modalPost.content && (
              <p className="text-gray-700 text-sm mb-2 text-center">{modalPost.content}</p>
            )}
            {/* Comments Section */}
            <div className="border-t border-gray-200 pt-6 w-full">
              <h4 className="text-lg font-semibold mb-4 text-blue-900">{t('comments.title')}</h4>
              {checkedAdmin && (
                <div className="space-y-4 mb-6">
                  {modalComments && modalComments.length > 0 ? (
                    (commentsExpanded ? modalComments : modalComments.slice(0, 2)).map((comment, index) => (
                      <RenderComment
                        key={comment._id || index}
                        comment={comment}
                        onReply={handleReplyToComment}
                        isAdmin={isAdmin}
                        currentUserComments={currentUserComments}
                        handleDeleteComment={handleDeleteComment}
                        language={i18n.language}
                        t={t}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">{t('comments.empty')}</p>
                  )}
                </div>
              )}
              {modalComments && modalComments.length > 2 && (
                <button onClick={() => setCommentsExpanded(!commentsExpanded)} className="block mx-auto mt-2 text-blue-700 underline hover:text-blue-900 text-sm">
                  {commentsExpanded ? t('comments.showLess') : t('comments.showMore')}
                </button>
              )}
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {!isAdmin && (
                    <input type="text" placeholder={t('comments.name')} value={commentForm.name} onChange={e => setCommentForm(prev => ({ ...prev, name: e.target.value }))} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
                  )}
                  {!isAdmin && (
                    <input type="email" placeholder={t('comments.email')} value={commentForm.email} onChange={e => setCommentForm(prev => ({ ...prev, email: e.target.value }))} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                  )}
                </div>
                <textarea placeholder={t('comments.content')} value={commentForm.content} onChange={e => setCommentForm(prev => ({ ...prev, content: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none" rows={3} required />
                <button type="submit" disabled={commentLoading} className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition disabled:opacity-50">
                  {commentLoading ? '...' : t('comments.submit')}
                </button>
              </form>
              {commentSuccess && <div className="text-green-600 mt-2">{commentSuccess}</div>}
            </div>
            {/* Go to all daily updates button */}
            <button onClick={() => { setModalPost(null); router.push('/teachings'); }} className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-lg shadow transition mt-4">{t('goToAllDailyUpdates') || 'Go to Daily Updates'}</button>
          </div>
        </div>
      )}
    </section>
  );
} 
