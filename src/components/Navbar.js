import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar({ toggleVoiceCommands, voiceCommandsEnabled, toggleGazing, gazingEnabled, tutorialProgress, balance }) {
  const progressPercentage = tutorialProgress === 3 ? 100 : (tutorialProgress / 3) * 100;

  return (
    <nav
      className="navbar"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        color: 'white',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1
          style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          }}
        >
          Teodora's Flowershop
        </h1>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          Balance: ${balance} {/* Display the updated balance */}
        </div>
        <button
          className="tutorial-progress-btn"
          style={{
            padding: '0.5rem 1rem',
            background: `linear-gradient(90deg, #28a745 ${progressPercentage}%, #e0e0e0 ${progressPercentage}%)`,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'background 0.3s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          Tutorial Progress
        </button>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link
          to="/voice-commands"
          style={{
            padding: '0.5rem 1rem',
            background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'background 0.3s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          Voice Commands
        </Link>
        <Link
          to="/purchase-history"
          style={{
            padding: '0.5rem 1rem',
            background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'background 0.3s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          Purchase History
        </Link>
        <button
          onClick={toggleVoiceCommands}
          className="toggle-voice-btn"
          style={{
            padding: '0.75rem 1.5rem',
            background: voiceCommandsEnabled ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'background 0.3s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          {voiceCommandsEnabled ? 'Disable Voice Commands' : 'Enable Voice Commands'}
        </button>
        <button
          onClick={toggleGazing}
          className="toggle-gazing-btn"
          style={{
            padding: '0.75rem 1.5rem',
            background: gazingEnabled ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'background 0.3s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          {gazingEnabled ? 'Disable Gazing' : 'Enable Gazing'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;