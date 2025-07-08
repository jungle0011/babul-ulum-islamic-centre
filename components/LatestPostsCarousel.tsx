import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'next/navigation';

SwiperCore.use([Autoplay, Pagination]);

interface Teaching {
  _id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  videoUrl?: string;
  tags?: string[];
  type?: string;
}

export default function LatestPostsCarousel() {
  const [posts, setPosts] = useState<Teaching[]>([]);
  const [modalPost, setModalPost] = useState<Teaching | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a: Teaching, b: Teaching) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(sorted.slice(0, 5));
      });
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-8 px-2">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center tracking-tight">Latest Teachings</h2>
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="pb-8"
      >
        {posts.map(post => (
          <SwiperSlide key={post._id}>
            <div
              className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-2xl shadow-xl p-4 h-[320px] w-full flex flex-col justify-between cursor-pointer hover:scale-[1.03] transition-transform border-2 border-yellow-400/40"
              style={{ minWidth: 260, maxWidth: 320 }}
              onClick={() => setModalPost(post)}
            >
              <div className="flex items-center justify-center w-full h-40 mb-3 bg-blue-950 rounded-lg border border-yellow-200">
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt={post.title} className="object-cover w-full h-full rounded-lg" />
                ) : post.videoUrl ? (
                  <span className="text-white text-3xl">🎬</span>
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
      {/* Modal overlay for post preview */}
      {modalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => { setModalPost(null); router.push('/teachings'); }}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => { setModalPost(null); router.push('/teachings'); }} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl" aria-label="Close">×</button>
            <h2 className="text-xl font-bold mb-2">{modalPost.title}</h2>
            <div className="text-xs text-gray-400 mb-2">{new Date(modalPost.date).toLocaleDateString()}</div>
            {modalPost.imageUrl ? (
              <img src={modalPost.imageUrl} alt={modalPost.title} className="w-full h-48 object-cover rounded-lg mb-3 border border-yellow-200" />
            ) : modalPost.videoUrl ? (
              <div className="w-full h-48 bg-black rounded-lg flex items-center justify-center mb-3">
                <span className="text-white text-3xl">🎬</span>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2 mb-2">
              {modalPost.type && <span className="bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-bold">{modalPost.type}</span>}
              {Array.isArray(modalPost.tags) && modalPost.tags.map(tag => (
                <span key={tag} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">{tag}</span>
              ))}
            </div>
            <p className="text-gray-800 mb-4 whitespace-pre-line">{modalPost.content}</p>
            <button onClick={() => { setModalPost(null); router.push('/teachings'); }} className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded-lg shadow transition mt-2">Go to All Teachings</button>
          </div>
        </div>
      )}
    </section>
  );
} 