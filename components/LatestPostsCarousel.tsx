import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRouter } from 'next/navigation';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

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
}

// Add TikTok short link expansion helper
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

export default function LatestPostsCarousel() {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<Teaching[]>([]);
  const [modalPost, setModalPost] = useState<Teaching | null>(null);
  const [modalActiveIndex, setModalActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const swiperRef = useRef<any>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a: Teaching, b: Teaching) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(sorted); // Remove .slice(0, 5)
      });
  }, []);

  // Ensure autoplay starts after posts are loaded
  useEffect(() => {
    if (posts.length > 0 && swiperRef.current) {
      console.log('Posts loaded, starting autoplay');
      setTimeout(() => {
        if (swiperRef.current && swiperRef.current.autoplay && typeof swiperRef.current.autoplay.start === 'function') {
          swiperRef.current.autoplay.start();
          console.log('Autoplay started after posts loaded');
        }
      }, 1000);
    }
  }, [posts]);

  // Manual autoplay using interval
  useEffect(() => {
    if (posts.length > 0 && swiperRef.current) {
      // Clear any existing interval
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
      
      // Start manual autoplay
      autoplayIntervalRef.current = setInterval(() => {
        if (swiperRef.current && typeof swiperRef.current.slideNext === 'function') {
          swiperRef.current.slideNext();
          console.log('Manual slide next triggered');
        }
      }, 3000);
      
      console.log('Manual autoplay started with interval');
    }
    
    // Cleanup on unmount
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [posts]);

  return (
    <section className="max-w-6xl mx-auto py-8 px-2">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center tracking-tight">{t('latest_dailyUpdates')}</h2>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={16}
        slidesPerView={2.2}
        breakpoints={{
          320: { slidesPerView: 2.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        allowTouchMove={true}
        simulateTouch={true}
        loop={true}
        pagination={{ clickable: true, el: '.main-carousel-pagination' }}
        className="pb-2 main-carousel"
        dir="ltr"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          console.log('Swiper instance created:', swiper);
        }}
        onInit={(swiper) => {
          console.log('Swiper initialized:', swiper);
        }}
        onSlideChange={(swiper) => {
          // Optionally log slide changes
        }}
      >
        {posts.map(post => (
          <SwiperSlide key={post._id}>
            <div
              className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-2xl shadow-xl p-4 h-[320px] w-full flex flex-col justify-between cursor-pointer hover:scale-[1.03] transition-transform border-2 border-yellow-400/40"
              style={{ minWidth: 260, maxWidth: 320 }}
              onClick={() => setModalPost(post)}
            >
              <div className="flex items-center justify-center w-full h-40 mb-3 bg-blue-950 rounded-lg border border-yellow-200">
                {Array.isArray(post.media) && post.media.length > 0 ? (
                  <Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={8}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    className="w-full h-40 rounded-lg bg-black"
                    style={{ maxWidth: 320, maxHeight: 160 }}
                  >
                    {post.media.map((media, idx) => (
                      <SwiperSlide key={idx}>
                        {media.type === 'image' ? (
                          <img src={media.url ? media.url : ''} alt={post.title} className="object-cover w-full h-full rounded-lg" />
                        ) : (
                          <video src={media.url ? media.url : ''} controls className="object-cover w-full h-full rounded-lg" />
                        )}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : post.imageUrl ? (
                  <img src={post.imageUrl} alt={post.title} className="object-cover w-full h-full rounded-lg" />
                ) : post.videoUrl ? (
                  <div className="w-full h-full flex items-center justify-center bg-black rounded-lg">
                    <span className="text-white text-3xl">🎬</span>
                  </div>
                ) : (
                  <span className="text-yellow-300 text-2xl">No Media</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.type && <span className="bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-bold">{post.type}</span>}
                {Array.isArray(post.tags) && post.tags.map(tag => (
                  <span key={tag} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">{tag}</span>
                ))}
              </div>
              <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{post.title}</h3>
              <p className="text-white/80 text-sm line-clamp-2 mb-2">{post.content}</p>
              <span className="text-xs text-yellow-200">{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="main-carousel-pagination flex justify-center items-center mt-4 mb-8" />
      {/* Modal overlay for post preview */}
      {modalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-2 sm:px-6 py-6" style={{ paddingTop: '5vh', paddingBottom: '5vh' }} onClick={() => setModalPost(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg relative max-h-[80vh] mt-4 mb-4 overflow-y-auto p-3 sm:p-10 flex flex-col items-center gap-6" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)', marginLeft: 'auto', marginRight: 'auto' }} onClick={e => e.stopPropagation()}>
            {/* Close button above media for visibility */}
            <button onClick={() => setModalPost(null)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl z-20 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-gray-200" aria-label="Close">×</button>
            {/* Media carousel */}
            <div className="w-full mt-8 mb-6 flex-shrink-0">
              {Array.isArray(modalPost.media) && modalPost.media.length > 0 ? (
                <div className="relative w-full h-48">
                  <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={8}
                    slidesPerView={1}
                    navigation={modalPost.media.length > 1}
                    pagination={false}
                    autoplay={{ 
                      delay: 3000, 
                      disableOnInteraction: false,
                      waitForTransition: true,
                      stopOnLastSlide: false
                    }}
                    className="w-full h-48 rounded-lg bg-black custom-swiper-nav"
                    style={{ maxWidth: 480, maxHeight: 192 }}
                    onSlideChange={swiper => {
                      setModalActiveIndex(swiper.activeIndex);
                      // Pause all videos except the active one
                      videoRefs.current.forEach((video, idx) => {
                        if (video && idx !== swiper.activeIndex) {
                          video.pause();
                          video.currentTime = 0;
                        }
                      });
                    }}
                    onInit={swiper => {
                      setModalActiveIndex(swiper.activeIndex);
                    }}
                  >
                    {modalPost.media.map((media, idx) => (
                      <SwiperSlide key={idx}>
                        {media.type === 'image' ? (
                          <img src={media.url ? media.url : ''} alt="media" className="w-full h-48 object-contain rounded-lg" />
                        ) : (
                          <video
                            ref={el => { videoRefs.current[idx] = el; }}
                            src={media.url ? media.url : ''}
                            controls
                            className="w-full h-48 object-contain rounded-lg"
                          />
                        )}
                      </SwiperSlide>
                    ))}
                    {/* Only show gradients if more than 1 media */}
                    {modalPost.media.length > 1 && <>
                      <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-10" />
                      <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-10" />
                    </>}
                  </Swiper>
                  <style jsx global>{`
                    .custom-swiper-nav .swiper-button-next,
                    .custom-swiper-nav .swiper-button-prev {
                      color: #facc15;
                      background: rgba(255,255,255,0.85);
                      border-radius: 9999px;
                      width: 44px;
                      height: 44px;
                      font-size: 2rem;
                      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                      border: 2px solid #facc15;
                      top: 50%;
                      transform: translateY(-50%);
                      z-index: 20;
                    }
                    .custom-swiper-nav .swiper-button-next:after,
                    .custom-swiper-nav .swiper-button-prev:after {
                      font-size: 2rem;
                      font-weight: bold;
                    }
                    .custom-swiper-nav .swiper-button-next {
                      right: 8px;
                    }
                    .custom-swiper-nav .swiper-button-prev {
                      left: 8px;
                    }
                    /* Ensure autoplay works properly */
                    .swiper-wrapper {
                      transition-timing-function: ease-out;
                    }
                    /* Force autoplay to work */
                    .swiper-slide {
                      transition: transform 0.3s ease-out;
                    }
                    /* Ensure autoplay continues after user interaction */
                    .swiper-container {
                      overflow: hidden;
                    }
                    /* Main carousel autoplay fixes */
                    .main-carousel .swiper-wrapper {
                      transition-timing-function: ease-out;
                    }
                    .main-carousel .swiper-slide {
                      transition: transform 0.3s ease-out;
                    }
                    /* Force autoplay visibility */
                    .main-carousel {
                      overflow: visible !important;
                    }
                    .main-carousel .swiper-container {
                      overflow: visible !important;
                    }
                    /* Mobile modal improvements */
                    @media (max-width: 640px) {
                      .custom-swiper-nav .swiper-button-next,
                      .custom-swiper-nav .swiper-button-prev {
                        width: 36px;
                        height: 36px;
                        font-size: 1.5rem;
                      }
                      .custom-swiper-nav .swiper-button-next:after,
                      .custom-swiper-nav .swiper-button-prev:after {
                        font-size: 1.5rem;
                      }
                    }
                  `}</style>
                </div>
              ) : modalPost.imageUrl ? (
                <img src={modalPost.imageUrl} alt={modalPost.title} className="w-full h-48 object-cover rounded-lg mb-3 border border-yellow-200" />
              ) : modalPost.videoUrl ? (
                <div className="w-full h-48 bg-black rounded-lg flex items-center justify-center mb-3">
                  <span className="text-white text-3xl">🎬</span>
                </div>
              ) : null}
            </div>
            <h2 className="text-xl font-bold mb-4 text-center">{modalPost.title}</h2>
            <div className="text-xs text-gray-400 mb-4 text-center">{new Date(modalPost.date).toLocaleDateString()}</div>
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {modalPost.type && <span className="bg-yellow-400 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">{modalPost.type}</span>}
              {Array.isArray(modalPost.tags) && modalPost.tags.map(tag => (
                <span key={tag} className="bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full text-xs font-semibold">{tag}</span>
              ))}
            </div>
            <p className="text-gray-800 mb-8 whitespace-pre-line text-center leading-relaxed">{modalPost.content}</p>
            {/* Comments section */}
            <div className="w-full mb-6">
              <CommentsSection postId={modalPost._id} />
            </div>
            <button onClick={() => { setModalPost(null); router.push('/teachings'); }} className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-lg shadow transition mt-4">Go to Daily Updates</button>
          </div>
        </div>
      )}
    </section>
  );
}

function TikTokPreview({ videoUrl }: { videoUrl: string }) {
  const [expandedUrl, setExpandedUrl] = React.useState(videoUrl);
  React.useEffect(() => {
    expandTikTokLinkIfNeeded(videoUrl).then(setExpandedUrl);
  }, [videoUrl]);
  const isTikTok = /tiktok\.com\//.test(expandedUrl);
  const match = expandedUrl.match(/tiktok\.com\/.*video\/(\d+)/);
  const embedUrl = match ? `https://www.tiktok.com/embed/${match[1]}` : '';
  return (
    <span className="text-white text-3xl">{isTikTok && embedUrl ? '🎬' : 'No Media'}</span>
  );
}

function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = React.useState<any[]>([]);
  const [form, setForm] = React.useState({ name: '', content: '' });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState('');
  React.useEffect(() => {
    fetch(`/api/articles/${postId}/comments`).then(res => res.json()).then(data => setComments(data.comments || []));
  }, [postId]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/articles/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', content: '' });
    setSuccess('Comment added!');
    setLoading(false);
    fetch(`/api/articles/${postId}/comments`).then(res => res.json()).then(data => setComments(data.comments || []));
  };
  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-2">Comments</h4>
      {comments.length > 0 ? (
        <ul className="space-y-2 mb-4">
          {comments.map((comment, idx) => (
            <li key={idx} className="bg-gray-100 rounded p-2 text-sm">
              <span className="font-bold">{comment.name}:</span> {comment.content}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-400 mb-4">No comments yet.</div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="p-2 rounded border" required />
        <textarea placeholder="Your comment" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="p-2 rounded border" required />
        <button type="submit" className="bg-blue-700 text-white rounded px-4 py-2 mt-2" disabled={loading}>{loading ? 'Posting...' : 'Add Comment'}</button>
      </form>
      {success && <div className="text-green-600 mt-2">{success}</div>}
    </div>
  );
} 
