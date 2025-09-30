import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.5,
    },
  },
};

const ResumePage = ({ onNavigateHome }) => {
  const [hasNavigated, setHasNavigated] = useState(false);
  const scrollRef = useRef(null);

  const navigateHome = () => {
    if (!hasNavigated) {
      setHasNavigated(true);
      onNavigateHome();
    }
  };

  const handleScroll = (event) => {
    if (scrollRef.current?.scrollTop === 0 && event.deltaY < 0) {
      navigateHome();
    }
  };

  return (
    <div
      ref={scrollRef}
      className='relative w-full min-h-screen flex flex-col items-center justify-start pt-32 pb-32 bg-gray-900 text-white overflow-y-auto'
      onWheel={handleScroll}
    >
      <button
        onClick={navigateHome}
        className='absolute top-10 left-10 flex cursor-pointer items-center space-x-2 text-xs opacity-75 transition-opacity hover:opacity-100 lowercase z-20 pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)]'
      >
        <FaArrowUp />
        <span>home</span>
      </button>

      <motion.div
        className='flex w-full max-w-5xl flex-col items-center gap-8 px-8 md:flex-row md:justify-around'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.div
          variants={cardVariants}
          className='w-full max-w-xs rounded-2xl bg-white/10 p-6 backdrop-blur-md md:w-64 h-80'
        >
          <h2 className='text-lg font-bold lowercase'>education</h2>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className='w-full max-w-xs rounded-2xl bg-white/10 p-6 backdrop-blur-md md:w-64 h-80'
        >
          <h2 className='text-lg font-bold lowercase'>work experience</h2>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className='w-full max-w-xs rounded-2xl bg-white/10 p-6 backdrop-blur-md md:w-64 h-80'
        >
          <h2 className='text-lg font-bold lowercase'>projects</h2>
        </motion.div>
      </motion.div>

      <div className='absolute bottom-10 right-10 text-xs opacity-75 lowercase pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]'>
        want a copy?
      </div>
    </div>
  );
};

export default ResumePage;
