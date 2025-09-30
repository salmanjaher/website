import { motion } from 'framer-motion';

const AnimatedName = ({ onAnimationComplete, duration = 2 }) => {
  return (
    <div className='relative text-5xl font-bold'>
      <span className='text-gray-500 whitespace-nowrap lowercase'>
        salman jaher
      </span>
      <motion.div
        className='absolute left-0 top-0 h-full w-0 overflow-hidden'
        animate={{ width: '100%' }}
        transition={{ duration: duration, ease: 'easeInOut' }}
        onAnimationComplete={onAnimationComplete}
      >
        <span className='text-white whitespace-nowrap lowercase'>
          salman jaher
        </span>
      </motion.div>
    </div>
  );
};

export default AnimatedName;
