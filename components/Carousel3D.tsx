"use client";

import React, {
  useRef,
  useEffect,
  useState,
  TouchEvent,
} from "react";
const Card = ({ children, className, onClick }: any) => <div className={className} onClick={onClick} style={{ cursor: onClick ? 'pointer' : undefined }}>{children}</div>;
const CardContent = ({ children, className }: any) => <div className={className}>{children}</div>;

export interface Carousel3DItem {
  id: number;
  title: string;
  brand: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  mediaType?: 'image' | 'video';
  mediaUrl?: string;
}

interface Carousel3DProps {
  items: Carousel3DItem[];
  autoRotate?: boolean;
  rotateInterval?: number;
  cardHeight?: number;
  title?: string;
  subtitle?: string;
  tagline?: string;
  isMobileSwipe?: boolean;
  onCardClick?: (id: number) => void;
}

const Carousel3D = ({
  items,
  autoRotate = true,
  rotateInterval = 2500,
  cardHeight = 500,
  title = "From Textile to Intelligence",
  subtitle = "Customer Cases",
  tagline = "Explore how our textile sensor technology is revolutionizing multiple industries with intelligent fabric solutions tailored to specific needs.",
  isMobileSwipe = true,
  onCardClick,
}: Carousel3DProps) => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const minSwipeDistance = 50;

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent));
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (autoRotate && isInView && !isHovering) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % items.length);
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, autoRotate, rotateInterval, items.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (carouselRef.current) observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  // Pause all videos except the active card
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === active) {
          // Optionally play if needed
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [active, items.length]);

  const onTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setActive((prev) => (prev + 1) % items.length);
    } else if (distance < -minSwipeDistance) {
      setActive((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  const getCardAnimationClass = (index: number) => {
    if (index === active) return "scale-100 opacity-100 z-20";
    if (index === (active + 1) % items.length)
      return "translate-x-[40%] scale-95 opacity-60 z-10";
    if (index === (active - 1 + items.length) % items.length)
      return "translate-x-[-40%] scale-95 opacity-60 z-10";
    return "scale-90 opacity-0";
  };

  return (
    <section id="carousel3d" className="bg-background min-w-full mx-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8 min-w-[350px] md:min-w-[1000px] max-w-7xl">
        <div
          className="relative overflow-hidden h-[550px] "
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center ">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`absolute top-0 w-full max-w-md transform transition-all duration-500 ${getCardAnimationClass(index)}`}
              >
                <Card
                  className={`overflow-hidden bg-white h-[${cardHeight}px] border shadow-sm hover:shadow-md flex flex-col transition-colors duration-300`}
                  onClick={() => onCardClick && onCardClick(item.id)}
                >
                  {/* Media preview */}
                  {item.mediaType === 'video' && item.mediaUrl ? (
                    <video
                      ref={el => { videoRefs.current[index] = el; }}
                      src={item.mediaUrl}
                      controls
                      className="w-full h-48 object-cover bg-black"
                    />
                  ) : item.mediaUrl ? (
                    <img src={item.mediaUrl} alt={item.title} className="w-full h-48 object-cover bg-gray-200" />
                  ) : item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover bg-gray-200" />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400">No Image</div>
                  )}
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-1 text-gray-900">{item.title}</h3>
                    <p className="text-gray-500 text-sm font-medium mb-2">{item.brand}</p>
                    <p className="text-gray-700 text-sm flex-grow line-clamp-4">{item.description}</p>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs animate-pulse-slow"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        className="text-gray-500 flex items-center hover:underline relative group bg-transparent border-none p-0 m-0 cursor-pointer"
                        style={{ outline: 'none' }}
                        onClick={e => { e.stopPropagation(); onCardClick && onCardClick(item.id); }}
                        tabIndex={0}
                      >
                        <span className="relative z-10">Learn more</span>
                        <span className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1">→</span>
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-500 transition-all duration-300 group-hover:w-full"></span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          {!isMobile && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all hover:scale-110"
                onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
                aria-label="Previous"
              >
                <span className="w-5 h-5">←</span>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all hover:scale-110"
                onClick={() => setActive((prev) => (prev + 1) % items.length)}
                aria-label="Next"
              >
                <span className="w-5 h-5">→</span>
              </button>
            </>
          )}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
            {items.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${active === idx ? "bg-gray-500 w-5" : "bg-gray-200 hover:bg-gray-300"}`}
                onClick={() => setActive(idx)}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel3D; 