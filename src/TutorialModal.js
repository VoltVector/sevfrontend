import React from 'react';

function TutorialModal({ onClose, children }) {
  return (
    <div className="tutorial-modal">
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default TutorialModal;
