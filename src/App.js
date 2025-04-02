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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [showGreeting, setShowGreeting] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialProgress, setTutorialProgress] = useState(() => {
    const savedProgress = localStorage.getItem('tutorialProgress');
    return savedProgress ? parseInt(savedProgress, 10) : 0;
  });
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(true);

  const startTutorial = () => {
    setShowGreeting(false);
    setShowTutorial(true);
  };

  const declineTutorial = () => {
    setShowGreeting(false);
    toast.info('Voice Command Tutorial skipped.');
    askToKeepVoiceCommands();
  };

  const askToKeepVoiceCommands = () => {
    const keepVoiceCommands = window.confirm(
      'Do you want to keep Voice Commands enabled?'
    );
    setVoiceCommandsEnabled(keepVoiceCommands);
    toast.info(
      keepVoiceCommands
        ? 'Voice Commands will remain enabled.'
        : 'Voice Commands have been disabled.'
    );
    if (!keepVoiceCommands && annyang) {
      annyang.abort();
    }
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialCompleted', 'true');
  };

  const handleTaskComplete = (progress) => {
    setTutorialProgress(progress);
    localStorage.setItem('tutorialProgress', progress);
    if (progress === 3) {
      toast.success('Tutorial completed! You can now explore the site.');
      closeTutorial();
    }
  };

  const toggleVoiceCommands = () => {
    setVoiceCommandsEnabled((prev) => !prev);
    if (annyang) {
      if (voiceCommandsEnabled) {
        annyang.abort();
        toast.info('Voice commands disabled.');
      } else {
        annyang.start();
        toast.info('Voice commands enabled.');
      }
    }
  };

  useEffect(() => {
    if (annyang && showGreeting) {
      const greetingCommands = {
        'yes': () => {
          startTutorial();
        },
        'no': () => {
          declineTutorial();
        },
      };

      annyang.addCommands(greetingCommands);
      annyang.start();

      return () => {
        annyang.removeCommands(['yes', 'no']);
      };
    }
  }, [showGreeting]);

  useEffect(() => {
    if (annyang && voiceCommandsEnabled) {
      const voiceCommands = {
        'go to voice commands': () => {
          if (tutorialProgress === 1) {
            toast.info('Navigating to Voice Commands page...');
            window.location.href = '/voice-commands';
            handleTaskComplete(2);
          } else {
            toast.error('This action is not part of the current tutorial step.');
          }
        },
        'finish tutorial': () => {
          if (tutorialProgress === 2) {
            toast.success('Tutorial completed! You can now explore the site.');
            handleTaskComplete(3);
          } else {
            toast.error('This action is not part of the current tutorial step.');
          }
        },
        'go to roses': () => {
          toast.info('Navigating to Roses...');
          window.location.href = '/roses';
        },
        'scroll down': () => {
          toast.info('Scrolling down...');
          window.scrollBy({ top: 500, behavior: 'smooth' });
        },
        'go home': () => {
          toast.info('Navigating to Home...');
          window.location.href = '/';
        },
        'close tutorial': () => {
          toast.info('Closing tutorial...');
          setShowTutorial(false);
        },
        'restart tutorial': () => {
          toast.info('Restarting tutorial...');
          setShowTutorial(true);
          setTutorialProgress(0);
          localStorage.setItem('tutorialProgress', 0);
        },
        'scroll up': () => {
          toast.info('Scrolling up...');
          window.scrollBy({ top: -500, behavior: 'smooth' });
        },
        'show more information': () => {
          toast.info('Displaying more information...');
          const infoElement = document.querySelector('.flower-more-info');
          if (infoElement) {
            infoElement.style.display = 'block';
          }
        },
      };

      annyang.addCommands(voiceCommands);
      annyang.start();

      return () => {
        annyang.abort();
      };
    }
  }, [tutorialProgress, voiceCommandsEnabled]);

  return (
    <Router>
      <div className="App">
        <Navbar
          toggleVoiceCommands={toggleVoiceCommands}
          voiceCommandsEnabled={voiceCommandsEnabled}
        />

        <ToastContainer position="top-right" autoClose={5000} />

        <AnimatePresence>
          {showGreeting && (
            <div className="greeting-modal">
              <h2>Welcome to Teodora's Florist!</h2>
              <p>Do you wish to take the Voice Command Tutorial?</p>
              <div className="greeting-buttons">
                <button onClick={startTutorial}>Yes</button>
                <button onClick={declineTutorial}>No</button>
              </div>
            </div>
          )}

          {showTutorial && (
            <TutorialModal
              onClose={closeTutorial}
              onTaskComplete={handleTaskComplete}
            />
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