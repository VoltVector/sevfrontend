import React, { useEffect } from 'react';
import annyang from 'annyang';

function TutorialModal({ onClose, onTaskComplete, tutorialProgress }) {
  const tasks = [
    'Say "Show Welcome Message"',
    'Say "Show Hello Message"',
    'Say "Finish Tutorial"',
  ];

  const handleTaskComplete = () => {
    if (tutorialProgress < tasks.length - 1) {
      onTaskComplete(tutorialProgress + 1); // Notify parent component
    } else {
      onClose(); // Close the tutorial when all tasks are completed
    }
  };

  useEffect(() => {
    if (annyang) {
      console.log('Current tutorialProgress:', tutorialProgress);
  
      // Define voice commands
      const tutorialCommands = {
        'show welcome message': () => {
          if (tutorialProgress === 0) { // Ensure this is the correct step
            console.log('Executing "show welcome message" command');
            onTaskComplete(1); // Move to the next step
          } else {
            console.error(
              'This action is not part of the current tutorial step. Expected step: 0'
            );
          }
        },
        'show hello message': () => {
          if (tutorialProgress === 1) { // Ensure this is the correct step
            console.log('Executing "show hello message" command');
            onTaskComplete(2); // Move to the next step
          } else {
            console.error(
              'This action is not part of the current tutorial step. Expected step: 1'
            );
          }
        },
        'finish tutorial': () => {
          if (tutorialProgress === 2) { // Ensure this is the correct step
            console.log('Executing "finish tutorial" command');
            onTaskComplete(3); // Complete the tutorial
            onClose(); // Close the tutorial
            // Do NOT abort annyang here to keep the microphone active
          } else {
            console.error(
              'This action is not part of the current tutorial step. Expected step: 2'
            );
          }
        },
      };
  
      // Add commands to annyang
      annyang.addCommands(tutorialCommands);
      annyang.start();
  
      // Cleanup on component unmount
      return () => {
        annyang.removeCommands(['show welcome message', 'show hello message', 'finish tutorial']);
        // Do NOT call annyang.abort() here to keep the microphone active
      };
    }
  }, [tutorialProgress]); // Re-run effect when tutorialProgress changes

  return (
    <div className="tutorial-modal">
      <h2>Welcome to Teodora's Flowershop</h2>
      <p>Complete the following tasks to learn how to use voice commands:</p>
      <p className="text-lg mt-4">{tasks[tutorialProgress]}</p>
      <div
        className="progress-bar"
        style={{
          width: `${((tutorialProgress + 1) / tasks.length) * 100}%`,
          height: '10px',
          background: '#4caf50',
          marginTop: '1rem',
        }}
      ></div>
      <button onClick={handleTaskComplete}>Mark Task as Complete</button>
    </div>
  );
}

export default TutorialModal;