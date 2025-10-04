import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import resumeData from '../data/resumeData.js';

const ResumeCard = ({ title, children, className = '', ...props }) => (
  <motion.div
    className={`rounded-2xl bg-white/5 p-6 backdrop-blur-lg shadow-lg hover:shadow-xl transition-shadow  ${className}`}
    variants={cardVariants}
    whileHover={{ scale: 1.03, z: 20 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    {...props}
  >
    <h2 className='text-sm font-bold tracking-widest text-gray-400 mb-4 lowercase font-display'>
      {title}
    </h2>
    {children}
  </motion.div>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ResumePage = ({ onNavigateHome }) => {
  const [hasNavigated, setHasNavigated] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollRef = useRef(null);

  const handleEmailClick = (e) => {
    const email = 'salmanjaher1@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    });
  };

  const navigateHome = () => {
    if (!hasNavigated) {
      setHasNavigated(true);
      onNavigateHome();
    }
  };

  const handleScroll = (event) => {
    if (
      scrollRef.current &&
      scrollRef.current.scrollTop === 0 &&
      event.deltaY < 0
    ) {
      navigateHome();
    }
  };

  return (
    <div
      ref={scrollRef}
      onWheel={handleScroll}
      className='relative w-full min-h-screen text-white overflow-y-auto'
    >
      <div className='absolute inset-0 p-10 pointer-events-none'>
        <button
          onClick={navigateHome}
          className='pointer-events-auto flex cursor-pointer items-center space-x-2 text-xs opacity-75 transition-opacity hover:opacity-100 lowercase z-20 pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)]'
        >
          <FaArrowUp />
          <span>home</span>
        </button>
        <div className='absolute top-10 right-10 flex space-x-4 text-gray-400 z-20 pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)]'>
          <a
            href='https://github.com/salmanjaher'
            target='_blank'
            rel='noopener noreferrer'
            className='pointer-events-auto hover:text-white transition-colors'
          >
            <FaGithub size='1.5em' />
          </a>
          <a
            href='https://linkedin.com/in/salmanjaher'
            target='_blank'
            rel='noopener noreferrer'
            className='pointer-events-auto hover:text-white transition-colors'
          >
            <FaLinkedin size='1.5em' />
          </a>
          <div className='relative'>
            <a
              href='mailto:salmanjaher1@gmail.com'
              onClick={handleEmailClick}
              target='_blank'
              rel='noopener noreferrer'
              className='pointer-events-auto hover:text-white transition-colors'
            >
              <FaEnvelope size='1.5em' />
            </a>
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='absolute bottom-full right-1 mb-2 px-2 py-1 bg-white text-gray-900 text-xs rounded-md shadow-lg'
                >
                  copied!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <a
          href='/website/Salman_Jaher_Resume.pdf'
          download
          className='absolute bottom-10 right-10 text-xs opacity-75 hover:opacity-100 transition-opacity lowercase pointer-events-auto pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]'
        >
          want a copy?
        </a>
      </div>
      <motion.div
        className='w-full max-w-7xl mx-auto py-32 px-8 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-4 gap-8'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <div className='lg:col-span-1 flex flex-col gap-8'>
          <ResumeCard title={resumeData.education.title}>
            {resumeData.education.entries.map((edu, i) => (
              <div key={i} className={i > 0 ? 'mt-4' : ''}>
                <p className='font-semibold text-white'>{edu.degree}</p>
                <p className='text-sm text-gray-300 italic'>{edu.university}</p>
                <p className='text-xs text-gray-400'>{edu.date}</p>
              </div>
            ))}
          </ResumeCard>
          <ResumeCard title={resumeData.skills.title}>
            <p className='text-sm text-gray-300'>
              <strong className='text-white'>languages:</strong>{' '}
              {resumeData.skills.languages}
            </p>
            <p className='text-sm text-gray-300 mt-2'>
              <strong className='text-white'>frameworks & tools:</strong>{' '}
              {resumeData.skills.tools}
            </p>
          </ResumeCard>
        </div>

        <ResumeCard
          title={resumeData.experience.title}
          className='lg:col-span-2'
        >
          {resumeData.experience.entries.map((exp, i) => (
            <div key={i} className={i > 0 ? 'mt-6' : ''}>
              <div className='flex justify-between items-baseline'>
                <div>
                  <p className='font-semibold text-white'>{exp.role}</p>
                  <p className='text-sm text-gray-300 italic'>{exp.company}</p>
                </div>
                <p className='text-xs text-gray-400'>{exp.date}</p>
              </div>
              <ul className='mt-2 list-disc pl-5 space-y-1'>
                {exp.points.map((point, j) => (
                  <li key={j} className='text-sm text-gray-300'>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ResumeCard>

        <div className='lg:col-span-1 flex flex-col gap-8'>
          <ResumeCard title={resumeData.projects.title}>
            {resumeData.projects.entries.map((proj, i) => (
              <div key={i} className={i > 0 ? 'mt-4' : ''}>
                <p className='font-semibold text-white'>{proj.name}</p>
                <p className='text-xs text-gray-400'>{proj.tech}</p>
                <p className='text-sm text-gray-300 mt-1'>{proj.description}</p>
              </div>
            ))}
          </ResumeCard>
          <ResumeCard title={resumeData.activities.title}>
            {resumeData.activities.entries.map((act, i) => (
              <div key={i}>
                <div>
                  <p className='font-semibold text-white'>{act.organization}</p>
                  <p className='text-sm text-gray-300 italic'>{act.role}</p>
                </div>
                <p className='text-sm text-gray-300 mt-1'>{act.description}</p>
              </div>
            ))}
          </ResumeCard>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePage;
