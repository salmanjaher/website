import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft,
  FaArrowRight,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaCamera,
} from 'react-icons/fa';

import photo1 from '../assets/images/IMG_2939.jpeg';
import photo2 from '../assets/images/IMG_2989.jpeg';
import photo3 from '../assets/images/IMG_3165.jpeg';
import photo4 from '../assets/images/IMG_3551.jpeg';
import photo5 from '../assets/images/IMG_3691.jpeg';
import photo6 from '../assets/images/IMG_4012.jpeg';
import photo7 from '../assets/images/IMG_4793.jpeg';

const photos = [
  { id: 1, src: photo1, title: 'thailand' },
  { id: 2, src: photo2, title: 'waterfall' },
  { id: 3, src: photo3, title: 'vietnam' },
  { id: 4, src: photo4, title: 'korea' },
  { id: 5, src: photo5, title: 'botanical' },
  { id: 6, src: photo6, title: 'osaka' },
  { id: 7, src: photo7, title: 'nyc' },
];

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
};

const mobileSwipeVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const PortfolioPage = ({ onNavigateHome }) => {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const width = useWindowWidth();
  const isMobile = width < 768;
  const mainRef = useRef(null);

  useEffect(() => {
    const element = mainRef.current;
    if (!element) return;
    const preventScroll = (e) => e.preventDefault();
    element.addEventListener('touchmove', preventScroll, { passive: false });
    return () => {
      element.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  const paginate = (newDirection) => {
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) {
      newIndex = photos.length - 1;
    } else if (newIndex >= photos.length) {
      newIndex = 0;
    }
    setPage([newIndex, newDirection]);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = selectedPhoto.src;
    link.download = `${selectedPhoto.title.replace(' ', '-')}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      paginate(-1);
    } else if (info.offset.x < -swipeThreshold) {
      paginate(1);
    }
  };

  return (
    <div
      ref={mainRef}
      className='relative h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden overscroll-y-contain'
    >
      <button
        onClick={onNavigateHome}
        className='absolute left-10 top-10 flex cursor-pointer items-center space-x-2 text-xs opacity-75 transition-opacity hover:opacity-100 lowercase z-30 pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)]'
      >
        <FaArrowLeft />
        <span>home</span>
      </button>

      <div className='absolute top-10 right-10 flex space-x-4 text-gray-400 z-20 pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)]'>
        <a
          href='https://github.com/salmanjaher'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-white transition-colors'
        >
          <FaGithub size='1.5em' />
        </a>
        <a
          href='https://linkedin.com/in/salmanjaher'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-white transition-colors'
        >
          <FaLinkedin size='1.5em' />
        </a>
        <a
          href='https://instagram.com/salmanjaher'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-white transition-colors'
        >
          <FaInstagram size='1.5em' />
        </a>
        <a
          href='https://instagram.com/salman.shoots'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-white transition-colors'
        >
          <FaCamera size='1.5em' />
        </a>
      </div>

      {isMobile ? (
        <div className='relative w-full h-full flex items-center justify-center'>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              className='absolute w-full h-full p-12 flex items-center justify-center'
              custom={direction}
              variants={mobileSwipeVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
            >
              <img
                src={photos[currentIndex].src}
                alt={photos[currentIndex].title}
                className='w-full h-full object-contain'
                onClick={() => setSelectedPhoto(photos[currentIndex])}
              />
            </motion.div>
          </AnimatePresence>
          <button
            onClick={() => paginate(-1)}
            className='absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 opacity-75 hover:opacity-100'
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => paginate(1)}
            className='absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 opacity-75 hover:opacity-100'
          >
            <FaArrowRight />
          </button>
        </div>
      ) : (
        <div
          className='relative w-full h-[70vh] flex items-center justify-center'
          style={{ perspective: '1000px' }}
        >
          {photos.map((photo, index) => {
            const diff = index - (currentIndex % photos.length);
            const N = photos.length;
            let offset = diff;
            if (diff > N / 2) offset = diff - N;
            else if (diff < -N / 2) offset = diff + N;

            let animate = {};
            let cursorClass = 'cursor-pointer';

            if (offset === 0) {
              animate = {
                x: '-50%',
                y: '-50%',
                scale: 1,
                zIndex: 3,
                opacity: 1,
                rotateY: 0,
                filter: 'grayscale(0%) brightness(1)',
              };
            } else if (offset === 1) {
              animate = {
                x: '30%',
                y: '-50%',
                scale: 0.8,
                zIndex: 2,
                rotateY: -50,
                opacity: 0.7,
                filter: 'grayscale(100%) brightness(0.5)',
              };
            } else if (offset === -1) {
              animate = {
                x: '-130%',
                y: '-50%',
                zIndex: 2,
                rotateY: 50,
                opacity: 0.7,
                filter: 'grayscale(100%) brightness(0.5)',
              };
            } else {
              animate = {
                x: offset > 0 ? '100%' : '-200%',
                zIndex: 1,
                opacity: 0,
                scale: 0.5,
              };
              cursorClass = 'cursor-default';
            }

            return (
              <motion.div
                key={photo.id}
                className={`absolute top-1/2 left-1/2 h-[65vh] aspect-[3/4] ${cursorClass}`}
                style={{ transformStyle: 'preserve-3d' }}
                initial={false}
                animate={animate}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => {
                  if (offset === 0) setSelectedPhoto(photo);
                  if (offset === 1) paginate(1);
                  if (offset === -1) paginate(-1);
                }}
              >
                <div className='w-full h-full rounded-lg bg-gray-700 overflow-hidden shadow-xl'>
                  <motion.img
                    layoutId={`photo-${photo.id}`}
                    src={photo.src}
                    alt={photo.title}
                    className='w-full h-full object-cover'
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className='fixed inset-0 bg-black flex items-center justify-center z-50'
            onClick={() => setSelectedPhoto(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className='relative' onClick={(e) => e.stopPropagation()}>
              <motion.img
                layoutId={`photo-${selectedPhoto.id}`}
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className='max-h-[85vh] max-w-[90vw] aspect-[3/4] rounded-lg shadow-2xl'
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              />
              <motion.button
                onClick={handleDownload}
                className='absolute bottom-[-28px] right-0 text-xs text-gray-300 hover:text-white transition lowercase'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                exit={{ opacity: 0 }}
              >
                want a copy?
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;
