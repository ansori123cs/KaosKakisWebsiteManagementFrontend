import { MoveLeft, MoveRight } from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';

interface CarouselProps {
  slides: ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ slides, autoSlide = false, autoSlideInterval = 3000 }) => {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide || slides.length <= 1) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, slides.length]);

  // Jika tidak ada slides, jangan render apa-apa
  if (!slides || slides.length === 0) return null;

  return (
    <div className='overflow-hidden relative rounded-lg'>
      <div className='flex transition-transform ease-out duration-500' style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className='w-full flex-shrink-0'>
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation buttons - hanya ditampilkan jika ada lebih dari 1 slide */}
      {slides.length > 1 && (
        <>
          <div className='absolute inset-0 flex items-center justify-between p-4'>
            <button onClick={prev} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white transition-colors' aria-label='Previous slide'>
              <MoveLeft size={20} />
            </button>
            <button onClick={next} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white transition-colors' aria-label='Next slide'>
              <MoveRight size={20} />
            </button>
          </div>

          <div className='absolute bottom-4 right-0 left-0'>
            <div className='flex items-center justify-center gap-2'>
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurr(i)} className={`transition-all w-3 h-3 rounded-full ${curr === i ? 'bg-white' : 'bg-white/50'}`} aria-label={`Go to slide ${i + 1}`} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
