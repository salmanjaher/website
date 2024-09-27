// src/App.tsx
import React from 'react';
import Header from './components/Header';
import TilesGrid from './components/TilesGrid';

function App() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <TilesGrid />
    </div>
  );
}

export default App;
