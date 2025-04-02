import React, { useState, useEffect } from 'react';
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
import annyang from 'annyang';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [showTutorial, setShowTutorial] = useState(true);

  const closeTutorial = () => setShowTutorial(false);

  useEffect(() => {
    if (annyang) {
      // Define voice commands
      const voiceCommands = {
        'go to roses': () => {
          toast.info('Navigating to Roses...');
          window.location.href = '/roses';
        },
        'go to tulips': () => {
          toast.info('Navigating to Tulips...');
          window.location.href = '/tulips';
        },
        'go to orchids': () => {
          toast.info('Navigating to Orchids...');
          window.location.href = '/orchids';
        },
        'close tutorial': () => {
          toast.info('Closing tutorial...');
          setShowTutorial(false);
        },
        'scroll down': () => {
          toast.info('Scrolling down...');
          window.scrollBy({ top: 500, behavior: 'smooth' });
        },
        'scroll up': () => {
          toast.info('Scrolling up...');
          window.scrollBy({ top: -500, behavior: 'smooth' });
        },
      };

      // Add commands to annyang
      annyang.addCommands(voiceCommands);

      // Start listening
      annyang.start();

      return () => {
        // Stop listening when the component unmounts
        annyang.abort();
      };
    }
  }, []);

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