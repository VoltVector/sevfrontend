import React, { useState, useEffect } from 'react';
import annyang from 'annyang';

function TutorialModal({ onClose, onTaskComplete }) {
  const [currentTask, setCurrentTask] = useState(0);

  const tasks = [
    'Say "Go to Voice Commands"',
    'Say "Finish Tutorial"',
  ];

  const handleTaskComplete = () => {
    if (currentTask < tasks.length - 1) {
      setCurrentTask(currentTask + 1);
      onTaskComplete(currentTask + 1); // Notify parent component
    } else {
      onClose(); // Close the tutorial when all tasks are completed
    }
  };

  useEffect(() => {
    if (annyang) {
      // Define voice commands for the tutorial tasks
      const tutorialCommands = {
        'go to voice commands': () => {
          if (currentTask === 0) {
            handleTaskComplete();
          } else {
            console.error('This action is not part of the current tutorial step.');
          }
        },
        'finish tutorial': () => {
          if (currentTask === 1) {
            handleTaskComplete();
          } else {
            console.error('This action is not part of the current tutorial step.');
          }
        },
      };

      // Add commands to annyang
      annyang.addCommands(tutorialCommands);

      // Start listening
      annyang.start();

      return () => {
        // Remove commands and stop listening when the component unmounts
        annyang.removeCommands(['go to voice commands', 'finish tutorial']);
        annyang.abort();
      };
    }
  }, [currentTask]);

  return (
    <div className="tutorial-modal">
      <h2>Welcome to Teodora's Florist</h2>
      <p>Complete the following tasks to learn how to use voice commands:</p>
      <p className="text-lg mt-4">{tasks[currentTask]}</p>
      <div
        className="progress-bar"
        style={{
          width: `${((currentTask + 1) / tasks.length) * 100}%`,
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