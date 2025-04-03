import React, { useState, useEffect, useRef } from 'react';
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
import PurchaseHistoryPage from './pages/PurchaseHistoryPage';
import SunflowerPage from './pages/SunflowerPage';
import MarigoldPage from './pages/MarigoldPage';
import { AnimatePresence } from 'framer-motion';
import annyang from 'annyang';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGazeTracking from './hooks/useGazeTracking';
import { startCalibration, stopCalibration } from './WebGazer/webGazerUtils';

function App() {
  const [showGreeting, setShowGreeting] = useState(() => {
    const tutorialCompleted = localStorage.getItem('tutorialCompleted') === 'true';
    return !tutorialCompleted; // Show greeting only if tutorial is not completed
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialProgress, setTutorialProgress] = useState(() => {
    const savedProgress = localStorage.getItem('tutorialProgress');
    return savedProgress ? parseInt(savedProgress, 10) : 0;
  });
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(true);
  const [gazeTarget, setGazeTarget] = useState(null);
  const gazeTimer = useRef(null);
  const [gazingEnabled, setGazingEnabled] = useState(true);
const [purchaseHistory, setPurchaseHistory] = useState(() => {
    const savedHistory = localStorage.getItem('purchaseHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('balance');
    return savedBalance ? Number(savedBalance) : 100; // Initialize with $100 if not set
  });
  const [purchasedPlants, setPurchasedPlants] = useState({
    roses: false,
    tulips: false,
    orchids: false,
  });

  // Synchronize tutorialProgress with localStorage
  useEffect(() => {
    localStorage.setItem('tutorialProgress', tutorialProgress);
  }, [tutorialProgress]);

  useEffect(() => {
    if (!localStorage.getItem('userBalance')) {
      localStorage.setItem('userBalance', '100'); // Initialize balance with $100
    }
  }, []);

  const handleGaze = ({ x, y }) => {
    const element = document.elementFromPoint(x, y);
    console.debug('Gaze detected at coordinates:', { x, y });
    if (element && element.tagName === 'BUTTON') {
      console.debug('Gaze is over a button:', element.innerText);
      if (gazeTarget !== element) {
        setGazeTarget(element);
        clearTimeout(gazeTimer.current);
        gazeTimer.current = setTimeout(() => {
          if (gazeTarget === element) { // Ensure gaze is still on the same button
            console.debug('Gaze duration met. Activating button:', element.innerText);
            element.click(); // Trigger button click after 4 seconds of gaze
            toast.info(`Activated button: ${element.innerText}`);
          } // Reduced to 2 seconds
        }, 4000);
      }
    } else {
      console.debug('Gaze is not over a button or moved away.');
      setGazeTarget(null);
      clearTimeout(gazeTimer.current);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(gazeTimer.current); // Cleanup timer on unmount
    };
  }, []);

  useGazeTracking(handleGaze, gazingEnabled);

  const startTutorial = () => {
    setShowGreeting(false);
    setShowTutorial(true);
    handleTaskComplete(1); // Mark the first step as complete
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
    localStorage.setItem('tutorialCompleted', 'true'); // Mark tutorial as completed
  };

  const handleTaskComplete = (progress) => {
    setTutorialProgress(progress);

    if (progress === 3) { // Tutorial is completed
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

  const toggleGazing = () => {
    setGazingEnabled((prev) => !prev);
    toast.info(gazingEnabled ? 'Gazing disabled. Camera input stopped.' : 'Gazing enabled.');
  };

  useEffect(() => {
    if (!gazingEnabled) {
      setGazeTarget(null);
      clearTimeout(gazeTimer.current);
    }
  }, [gazingEnabled]);

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

  const buyFlower = (flowerName, price, plantKey) => {
    if (purchasedPlants[plantKey]) {
      // Warn the user if the item has already been purchased
      toast.warn(`You can't buy ${flowerName} multiple times.`);
      return;
    }

    if (balance >= price) {
      const newBalance = balance - price;
      setBalance(newBalance); // Update balance state
      localStorage.setItem('balance', newBalance);

      const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
      const newPurchase = { flowerName, price, date: new Date().toISOString() };
      const updatedHistory = [...purchaseHistory, newPurchase];
      localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));

      setPurchasedPlants((prev) => ({ ...prev, [plantKey]: true })); // Mark as purchased
      toast.success(`Successfully purchased ${flowerName}!`);
    } else {
      toast.error('Insufficient balance!');
    }
  };

  useEffect(() => {
    localStorage.setItem('balance', balance); // Synchronize balance with localStorage
  }, [balance]);

  useEffect(() => {
    if (annyang && voiceCommandsEnabled) {
      const pages = ['/roses', '/tulips', '/orchids', '/sunflowers'];
      let currentIndex = pages.indexOf(window.location.pathname);

      const voiceCommands = {
        'show welcome message': () => {
          if (tutorialProgress === 1) {
            const welcomeMessage = document.createElement('div');
            welcomeMessage.textContent = 'Welcome to Teodora\'s Florist!';
            welcomeMessage.style.position = 'fixed';
            welcomeMessage.style.top = '20px';
            welcomeMessage.style.left = '50%';
            welcomeMessage.style.transform = 'translateX(-50%)';
            welcomeMessage.style.background = '#4caf50';
            welcomeMessage.style.color = 'white';
            welcomeMessage.style.padding = '1rem';
            welcomeMessage.style.borderRadius = '8px';
            welcomeMessage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            document.body.appendChild(welcomeMessage);

            setTimeout(() => {
              document.body.removeChild(welcomeMessage);
            }, 3000);

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
        'go to voice commands': () => {
          toast.info('Navigating to Voice Commands...');
          window.location.href = '/voice-commands';
        },
        'go to home': () => {
          toast.info('Navigating to Home...');
          window.location.href = '/';
        },
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
        'go to sunflowers': () => {
          toast.info('Navigating to Sunflowers...');
          window.location.href = '/sunflowers';
        },
        'go to marigold': () => {
          toast.info('Navigating to Marigold...');
          window.location.href = '/marigold';
        },
        'go to purchase history': () => {
          toast.info('Navigating to Purchase History...');
          window.location.href = '/purchase-history';
        },
        'scroll down': () => {
          toast.info('Scrolling down...');
          window.scrollBy({ top: 500, behavior: 'smooth' });
        },
        'close tutorial': () => {
          toast.info('Closing tutorial...');
          setShowTutorial(false);
        },
        'restart tutorial': () => {
          toast.info('Restarting tutorial...');
          setShowTutorial(true);
          setTutorialProgress(0);
          localStorage.setItem('tutorialCompleted', 'false'); // Reset tutorial completion
        },
        'scroll up': () => {
          toast.info('Scrolling up...');
          window.scrollBy({ top: -500, behavior: 'smooth' });
        },
        'show more information': () => {
          const infoElement = document.querySelector('.flower-more-info');
          if (infoElement) {
            const isVisible = infoElement.style.display === 'block';
            infoElement.style.display = isVisible ? 'none' : 'block';
            toast.info(isVisible ? 'Hiding more information.' : 'Showing more information.');
          } else {
            toast.error('No additional information available on this page.');
          }
        },
        'buy roses': () => {
          if (window.location.pathname === '/roses') {
            buyFlower('Roses', 25, 'roses');
          } else {
            toast.error('You can only buy Roses from the Roses page.');
          }
        },
        'buy tulips': () => {
          if (window.location.pathname === '/tulips') {
            buyFlower('Tulips', 20, 'tulips');
          } else {
            toast.error('You can only buy Tulips from the Tulips page.');
          }
        },
        'buy orchids': () => {
          if (window.location.pathname === '/orchids') {
            buyFlower('Orchids', 30, 'orchids');
          } else {
            toast.error('You can only buy Orchids from the Orchids page.');
          }
        },
        'buy sunflowers': () => {
          if (window.location.pathname === '/sunflowers') {
            buyFlower('Sunflowers', 50, 'sunflowers');
          } else {
            toast.error('You can only buy sunflowers from the Sunflowers page.');
          }
        },
        'buy marigold': () => {
          if (window.location.pathname === '/marigold') {
            buyFlower('Marigold', 18, 'marigold');
          } else {
            toast.error('You can only buy marigold from the Marigold page.');
          }
        },
        'change plant': () => {
          currentIndex = (currentIndex + 1) % pages.length;
          toast.info(`Navigating to ${pages[currentIndex].replace('/', '')}...`);
          window.location.href = pages[currentIndex];
        },
      };

      annyang.addCommands(voiceCommands);
      annyang.start();

      return () => {
        annyang.removeCommands([
          'show welcome message',
          'finish tutorial',
          'go to voice commands',
          'go to home',
          'go to roses',
          'go to tulips',
          'go to orchids',
          'go to sunflowers',
          'go to marigold',
          'go to purchase history',
          'scroll down',
          'close tutorial',
          'restart tutorial',
          'scroll up',
          'show more information',
          'buy roses',
          'buy tulips',
          'buy orchids',
          'buy sunflowers',
          'buy marigold',
          'change plant',
        ]);
      };
    }
  }, [tutorialProgress, voiceCommandsEnabled, purchasedPlants]);

  console.log('tutorialProgress:', tutorialProgress);

  return (
    <Router>
      <div className="App">
        <Navbar
          toggleVoiceCommands={toggleVoiceCommands}
          voiceCommandsEnabled={voiceCommandsEnabled}
          toggleGazing={toggleGazing}
          gazingEnabled={gazingEnabled}
          tutorialProgress={tutorialProgress}
          balance={balance} // Pass balance to Navbar
        />

        <ToastContainer position="top-right" autoClose={5000} />

        
        {/* <div className="calibration-controls">
          <button onClick={startCalibration}>Start Calibration</button>
          <button onClick={stopCalibration}>Stop Calibration</button>
        </div> */}
        

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
              tutorialProgress={tutorialProgress} // Pass tutorialProgress as a prop
            />
          )}
        </AnimatePresence>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roses" element={<RosesPage />} />
          <Route path="/tulips" element={<TulipsPage />} />
          <Route path="/orchids" element={<OrchidsPage />} />
          <Route path="/sunflowers" element={<SunflowerPage />} />
          <Route path="/voice-commands" element={<VoiceCommandsPage />} />
          <Route path="/purchase-history" element={<PurchaseHistoryPage />} />
          <Route path="/marigold" element={<MarigoldPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;