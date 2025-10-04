import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import AnimatedName from './AnimatedName';
import profilePicture from '../assets/images/P1144275.jpeg';

const Homepage = ({
  onNavigateToResume,
  onNavigateToPortfolio,
  playAnimation,
  onAnimationComplete,
}) => {
  const [isLoaded, setIsLoaded] = useState(!playAnimation);
  const [hasNavigated, setHasNavigated] = useState(false);
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

  const nameAnimationDuration = 2.0;
  const nameMoveDuration = 0.75;

  const initialAnimationDelay = {
    picture: 0.2,
    box: 0.5,
    resumeLink: nameMoveDuration,
    portfolioLink: nameMoveDuration,
  };

  const returnAnimationDelay = {
    picture: 0,
    box: 0.1,
    resumeLink: 0.3,
    portfolioLink: 0.3,
  };

  const handleScroll = (event) => {
    if (event.deltaY > 0 && isLoaded && !hasNavigated) {
      setHasNavigated(true);
      onNavigateToResume();
    }
  };

  const handleAnimationComplete = () => {
    setIsLoaded(true);
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  return (
    <div
      ref={mainRef}
      className='relative flex h-screen w-full items-center justify-center overflow-hidden'
      onWheel={handleScroll}
    >
      <AnimatePresence mode='wait'>
        {!isLoaded && playAnimation ? (
          <motion.div key='loader' layoutId='name'>
            <AnimatedName
              duration={nameAnimationDuration}
              onAnimationComplete={handleAnimationComplete}
            />
          </motion.div>
        ) : (
          <motion.div key='content' className='h-full w-full'>
            <div
              className='flex h-full w-full items-center justify-center'
              style={{ perspective: '1000px' }}
            >
              <div className='flex w-full max-w-4xl flex-col items-center gap-12 px-8 md:flex-row md:justify-between md:gap-16'>
                <motion.img
                  src={profilePicture}
                  alt='salman jaher'
                  className='h-64 aspect-square rounded-full object-cover shadow-lg'
                  initial={{ x: '-100vw', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                    delay: playAnimation
                      ? initialAnimationDelay.picture
                      : returnAnimationDelay.picture,
                  }}
                />

                <motion.div
                  className='flex w-full flex-col justify-between rounded-2xl bg-white/10 p-6  z-10 md:w-96 h-64 backdrop-blur-lg shadow-lg hover:shadow-xl transition-shadow'
                  style={{ transformStyle: 'preserve-3d' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05, z: 30 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    opacity: {
                      duration: 0.8,
                      delay: playAnimation
                        ? initialAnimationDelay.box
                        : returnAnimationDelay.box,
                    },
                  }}
                >
                  <div style={{ transform: 'translateZ(40px)' }}>
                    <h2 className='text-lg font-bold text-white lowercase'>
                      Hi! I'm Salman jaher.
                    </h2>
                    <p className='mt-2 text-gray-200 lowercase'>
                      welcome to my website! im an engineer at capital one, with
                      a masters from UT Dallas. explore my website to learn more
                      about me :)
                    </p>
                  </div>
                  <div
                    className='flex space-x-6 text-white lowercase'
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <button
                      onClick={onNavigateToResume}
                      className='underline z-20'
                    >
                      resume
                    </button>
                    <button
                      onClick={onNavigateToPortfolio}
                      className='underline z-20'
                    >
                      portfolio
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className='absolute bottom-10 inset-x-0 flex justify-center z-10 pb-[env(safe-area-inset-bottom)]'>
              <div className='flex flex-col items-center'>
                <motion.div
                  layoutId={playAnimation ? 'name' : undefined}
                  className='text-4xl md:text-5xl font-bold text-white whitespace-nowrap lowercase'
                  initial={!playAnimation ? { opacity: 0, y: 50 } : {}}
                  animate={!playAnimation ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: playAnimation ? nameMoveDuration : 0.5,
                    ease: 'easeInOut',
                  }}
                >
                  salman jaher
                </motion.div>

                <motion.div
                  onClick={onNavigateToResume}
                  className='mt-2 hidden md:flex flex-col items-center space-y-1 text-white text-xs opacity-75 transition-opacity hover:opacity-100 lowercase z-20'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: playAnimation
                      ? initialAnimationDelay.resumeLink
                      : returnAnimationDelay.resumeLink,
                  }}
                >
                  <span>resume</span>
                  <FaArrowDown />
                </motion.div>
              </div>
            </div>

            <motion.div
              onClick={onNavigateToPortfolio}
              className='absolute right-10 top-1/2 -translate-y-1/2 hidden cursor-pointer items-center space-x-2 text-white text-xs opacity-75 transition-opacity hover:opacity-100 z-10 md:flex pr-[env(safe-area-inset-right)]'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: playAnimation
                  ? initialAnimationDelay.portfolioLink
                  : returnAnimationDelay.portfolioLink,
              }}
            >
              <div className='[writing-mode:vertical-rl] transform rotate-180'>
                <span className='tracking-widest lowercase'>portfolio</span>
              </div>
              <FaArrowRight />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Homepage;
