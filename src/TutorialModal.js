import React from 'react';

function TutorialModal({ onClose }) {
  return (
    <div className="tutorial-modal">
      <h2>How to Use</h2>
      <p>1. Use your gaze to navigate through the site.</p>
      <p>2. Use gestures to interact with elements.</p>
      <p>3. Use voice commands for scrolling and selecting items.</p>
      <button onClick={onClose}>Got it!</button>
    </div>
  );
}

export default TutorialModal;
