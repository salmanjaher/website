import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton: React.FC = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className='px-6 py-3 bg-indigo-600 text-white rounded-md shadow-md'
    >
      Click Me
    </motion.button>
  );
};

export default AnimatedButton;
