import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './AppTailwind.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TutorialModal from './TutorialModal';
import Home from './pages/Home';
import RosesPage from './pages/RosesPage';
import TulipsPage from './pages/TulipsPage';
import OrchidsPage from './pages/OrchidsPage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [showTutorial, setShowTutorial] = useState(true);

  const closeTutorial = () => setShowTutorial(false);

  return (
    <Router>
      <div className="App">
        <Navbar />

        <AnimatePresence>
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
        </AnimatePresence>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roses" element={<RosesPage />} />
          <Route path="/tulips" element={<TulipsPage />} />
          <Route path="/orchids" element={<OrchidsPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App; 