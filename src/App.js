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
import VoiceCommandsPage from './pages/VoiceCommandsPage';
import { AnimatePresence } from 'framer-motion';
import annyang from 'annyang';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [showTutorial, setShowTutorial] = useState(() => {
    // Check if the tutorial has already been completed
    return !localStorage.getItem('tutorialCompleted');
  });
  const [tutorialProgress, setTutorialProgress] = useState(0);

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialCompleted', 'true'); // Mark tutorial as completed
  };

  const handleTaskComplete = (progress) => {
    setTutorialProgress(progress);
    if (progress === 3) {
      toast.success('Tutorial completed! You can now explore the site.');
      closeTutorial();
    }
  };

  useEffect(() => {
    if (annyang) {
      // Define voice commands
      const voiceCommands = {
        'go to roses': () => {
          toast.info('Navigating to Roses...');
          window.location.href = '/roses';
          if (tutorialProgress === 0) handleTaskComplete(1);
        },
        'go to tulips': () => {
          toast.info('Navigating to Tulips...');
          window.location.href = '/tulips';
        },
        'go to orchids': () => {
          toast.info('Navigating to Orchids...');
          window.location.href = '/orchids';
        },
        'go home': () => {
          toast.info('Navigating to Home...');
          window.location.href = '/';
          if (tutorialProgress === 2) handleTaskComplete(3);
        },
        'close tutorial': () => {
          toast.info('Closing tutorial...');
          setShowTutorial(false);
        },
        'restart tutorial': () => {
          toast.info('Restarting tutorial...');
          setShowTutorial(true);
          setTutorialProgress(0);
        },
        'scroll down': () => {
          toast.info('Scrolling down...');
          window.scrollBy({ top: 500, behavior: 'smooth' });
          if (tutorialProgress === 1) handleTaskComplete(2);
        },
        'scroll up': () => {
          toast.info('Scrolling up...');
          window.scrollBy({ top: -500, behavior: 'smooth' });
        },
        'show more information': () => {
          toast.info('Displaying more information...');
          // Add logic to display additional information on flower pages
          const infoElement = document.querySelector('.flower-more-info');
          if (infoElement) {
            infoElement.style.display = 'block';
          }
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
  }, [tutorialProgress]);

  return (
    <Router>
      <div className="App">
        <Navbar />

        <AnimatePresence>
          {showTutorial && (
            <TutorialModal
              onClose={closeTutorial}
              onTaskComplete={handleTaskComplete}
            >
              <h2>Welcome to Teodora's Florist</h2>
              <p>Complete the following tasks to learn how to use voice commands:</p>
              <p className="text-lg mt-4">
                {tutorialProgress === 0 && 'Say "Go to Roses"'}
                {tutorialProgress === 1 && 'Say "Scroll Down"'}
                {tutorialProgress === 2 && 'Say "Go Home"'}
              </p>
              <div
                className="progress-bar"
                style={{
                  width: `${((tutorialProgress + 1) / 3) * 100}%`,
                  height: '10px',
                  background: '#4caf50',
                  marginTop: '1rem',
                }}
              ></div>
              <button onClick={closeTutorial}>Skip Tutorial</button>
            </TutorialModal>
          )}
        </AnimatePresence>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roses" element={<RosesPage />} />
          <Route path="/tulips" element={<TulipsPage />} />
          <Route path="/orchids" element={<OrchidsPage />} />
          <Route path="/voice-commands" element={<VoiceCommandsPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;