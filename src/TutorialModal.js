import React from 'react';
import { motion } from 'framer-motion';

function TutorialModal({ onClose, children }) {
  return (
    <>
      {/* Overlay */}
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose} // Close modal when clicking on the overlay
      />

      {/* Modal */}
      <motion.div
        className="tutorial-modal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
        <button onClick={onClose}>Close</button>
      </motion.div>
    </>
  );
}

export default TutorialModal;