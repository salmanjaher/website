import React, { useState } from 'react';
import Tile from './Tile';

const TilesGrid: React.FC = () => {
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 grid-rows-auto gap-4 p-6'>
      {/* Row 1: Large, Small, Small */}
      <Tile
        size='large'
        index={1}
        title='Project A'
        description='Description of Project A'
        hoveredTile={hoveredTile}
        setHoveredTile={setHoveredTile}
      />
      <Tile
        size='small'
        index={2}
        title='Project A'
        description='Description of Project A'
        hoveredTile={hoveredTile}
        setHoveredTile={setHoveredTile}
      />
      <Tile
        size='small'
        index={3}
        title='Project A'
        description='Description of Project A'
        hoveredTile={hoveredTile}
        setHoveredTile={setHoveredTile}
      />
      {/* Row 2: Small, Small, Large */}
      <Tile
        size='small'
        index={4}
        title='Project A'
        description='Description of Project A'
        hoveredTile={hoveredTile}
        setHoveredTile={setHoveredTile}
      />
      <Tile
        size='small'
        index={5}
        title='Project A'
        description='Description of Project A'
        hoveredTile={hoveredTile}
        setHoveredTile={setHoveredTile}
      />
      <Tile
        size='large'
        index={6}
        title='Project A'
        description='Description of Project A'
        hoveredTile={hoveredTile}
        setHoveredTile={setHoveredTile}
      />
    </div>
  );
};

export default TilesGrid;
