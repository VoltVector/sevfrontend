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
      <header className="App-header updated-header">
        <h1 className="text-4xl font-bold">Welcome to Teodora's Florist</h1>
        <p className="text-lg mt-4">
          Explore our products using gaze tracking, gestures, and voice commands!
        </p>
      </header>

      <main className="App-main">
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

      <footer className="App-footer">
        <p>&copy; 2025 Teodora's Florist. All rights reserved.</p>
      </footer>

      {showTutorial && (
        <TutorialModal onClose={closeTutorial}>
          <h2>Welcome to Teodora's Florist</h2>
          <p>1. Use your gaze to navigate through the site.</p>
          <p>2. Use gestures to interact with elements.</p>
          <p>3. Use voice commands for scrolling and selecting items.</p>
          <p>4. Hover over products to see more details.</p>
          <button onClick={closeTutorial}>Got it!</button>
        </TutorialModal>
      )}
    </div>
  );
}

export default App;