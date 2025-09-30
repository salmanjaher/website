import { useState } from 'react';
import Homepage from './components/Homepage';
import ResumePage from './components/ResumePage';
import PortfolioPage from './components/PortfolioPage';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [direction, setDirection] = useState('down');

  const homeVariants = {
    initial: (direction) => {
      if (direction === 'up') return { y: '-100vh' };
      if (direction === 'left') return { x: '-100vw' };
      return { opacity: 1 };
    },
    animate: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
    exit: (direction) => {
      if (direction === 'down')
        return {
          y: '-100vh',
          transition: { duration: 0.5, ease: 'easeInOut' },
        };
      if (direction === 'right')
        return {
          x: '-100vw',
          transition: { duration: 0.5, ease: 'easeInOut' },
        };
      return { opacity: 0, transition: { duration: 0.5 } };
    },
  };

  return (
    <main className='bg-gray-900 h-screen'>
      <AnimatePresence custom={direction}>
        {activeSection === 'home' && (
          <motion.div
            key='home'
            custom={direction}
            variants={homeVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            <Homepage
              playAnimation={isInitialLoad}
              onAnimationComplete={() => setIsInitialLoad(false)}
              onNavigateToResume={() => {
                setDirection('down');
                setActiveSection('resume');
              }}
              onNavigateToPortfolio={() => {
                setDirection('right');
                setActiveSection('portfolio');
              }}
            />
          </motion.div>
        )}

        {activeSection === 'resume' && (
          <motion.div
            key='resume'
            initial={{ y: '100vh' }}
            animate={{ y: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
            exit={{
              y: '100vh',
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
          >
            <ResumePage
              onNavigateHome={() => {
                setDirection('up');
                setActiveSection('home');
              }}
            />
          </motion.div>
        )}

        {activeSection === 'portfolio' && (
          <motion.div
            key='portfolio'
            initial={{ x: '100vw' }}
            animate={{ x: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
            exit={{
              x: '100vw',
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
          >
            <PortfolioPage
              onNavigateHome={() => {
                setDirection('left');
                setActiveSection('home');
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
