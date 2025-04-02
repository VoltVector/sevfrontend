import React, { useState } from 'react';
import './App.css';
import TutorialModal from './TutorialModal';
import Tooltip from './components/Tooltip';
import usePredictiveUX from './hooks/usePredictiveUX';

function App() {
  const [showTutorial, setShowTutorial] = useState(true);

  const closeTutorial = () => setShowTutorial(false);

  usePredictiveUX();

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-4xl font-bold">Welcome to Teodora's Florist</h1>
        <p className="text-lg mt-4">
          Explore our products using gaze tracking, gestures, and voice commands!
        </p>
      </header>

      <main className="App-main grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="product-card relative">
          <h2 className="text-xl font-semibold">Roses</h2>
          <p>Beautiful red roses for any occasion.</p>
          <Tooltip text="Click to learn more about Roses!" />
        </div>
        <div className="product-card relative">
          <h2 className="text-xl font-semibold">Tulips</h2>
          <p>Bright and colorful tulips to brighten your day.</p>
          <Tooltip text="Click to learn more about Tulips!" />
        </div>
        <div className="product-card relative">
          <h2 className="text-xl font-semibold">Orchids</h2>
          <p>Elegant orchids for a touch of luxury.</p>
          <Tooltip text="Click to learn more about Orchids!" />
        </div>
      </main>

      <footer className="App-footer p-4 bg-gray-800 text-white">
        <p>&copy; 2025 Teodora's Florist. All rights reserved.</p>
      </footer>

      {showTutorial && <TutorialModal onClose={closeTutorial} />}
    </div>
  );
}

export default App;