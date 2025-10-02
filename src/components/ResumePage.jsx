// src/components/ResumePage.jsx

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
// UPDATED: Import the data from its new file
import resumeData from '../data/resumeData.js';

// The large `resumeData` object has been removed from here

const ResumeCard = ({ title, children, className = '', ...props }) => (
  <motion.div
    className={`rounded-2xl bg-white/5 p-6 backdrop-blur-md ${className}`}
    variants={cardVariants}
    whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
    {...props}
  >
    <h2 className='text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 lowercase'>
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
  const scrollRef = useRef(null);

  return (
    <div
      ref={scrollRef}
      className='relative w-full min-h-screen bg-gray-900 text-white overflow-y-auto px-8 md:px-16 lg:px-24'
    >
      <button
        onClick={onNavigateHome}
        className='absolute top-10 left-10 flex cursor-pointer items-center space-x-2 text-xs opacity-75 transition-opacity hover:opacity-100 lowercase z-20 pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)]'
      >
        <FaArrowUp />
        <span>home</span>
      </button>

      <div className='absolute bottom-10 right-10 text-xs opacity-75 lowercase pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]'>
        want a copy?
      </div>

      <motion.div
        className='w-full max-w-7xl mx-auto py-32 grid grid-cols-1 lg:grid-cols-4 gap-8'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Left Column */}
        <div className='lg:col-span-1 flex flex-col gap-8'>
          <ResumeCard title={resumeData.education.title}>
            {resumeData.education.entries.map((edu, i) => (
              <div key={i} className={i > 0 ? 'mt-4' : ''}>
                <p className='font-semibold text-white'>{edu.degree}</p>
                <p className='text-sm text-gray-300'>{edu.university}</p>
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

        {/* Center Column */}
        <ResumeCard
          title={resumeData.experience.title}
          className='lg:col-span-2'
        >
          {resumeData.experience.entries.map((exp, i) => (
            <div key={i} className={i > 0 ? 'mt-6' : ''}>
              <div className='flex justify-between items-baseline'>
                <h3 className='font-semibold text-white'>
                  {exp.role} @ {exp.company}
                </h3>
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

        {/* Right Column */}
        <div className='lg:col-span-1 flex flex-col gap-8'>
          <ResumeCard title={resumeData.projects.title}>
            {resumeData.projects.entries.map((proj, i) => (
              <div key={i} className={i > 0 ? 'mt-4' : ''}>
                <p className='font-semibold text-white'>{proj.name}</p>
                <p className='text-xs text-gray-500'>{proj.tech}</p>
                <p className='text-sm text-gray-300 mt-1'>{proj.description}</p>
              </div>
            ))}
          </ResumeCard>
          <ResumeCard title={resumeData.activities.title}>
            {resumeData.activities.entries.map((act, i) => (
              <div key={i}>
                <h3 className='font-semibold text-white'>
                  {act.role} @ {act.organization}
                </h3>
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
