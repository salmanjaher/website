import React from 'react';
import { motion } from 'framer-motion';

interface TileProps {
  size: 'small' | 'large';
  index: number;
  hoveredTile: number | null;
  setHoveredTile: React.Dispatch<React.SetStateAction<number | null>>;
  title?: string;
  description?: string;
}

const Tile: React.FC<TileProps> = ({
  size,
  index,
  hoveredTile,
  setHoveredTile,
  title,
  description,
}) => {
  const isHovered = hoveredTile === index;
  const isDimmed = hoveredTile !== null && !isHovered;

  const sizeClasses =
    size === 'large'
      ? 'md:col-span-2 md:row-span-2 col-span-1 row-span-1'
      : 'col-span-1 row-span-1';

  return (
    <motion.div
      className={`rounded-lg bg-white shadow-md flex items-center justify-center text-2xl font-bold
        ${sizeClasses} ${isDimmed ? 'opacity-50' : 'opacity-100'}`}
      onMouseEnter={() => setHoveredTile(index)}
      onMouseLeave={() => setHoveredTile(null)}
      whileHover={{ scale: 1.05 }}
    >
      Tile {index}
    </motion.div>
  );
};

export default Tile;
