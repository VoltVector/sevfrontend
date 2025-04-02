import { Link } from 'react-router-dom';

function Navbar({ toggleVoiceCommands, voiceCommandsEnabled }) {
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
      <h1
        style={{
          margin: 0,
          fontSize: '1.8rem',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        }}
      >
        Teodora's Florist
      </h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link
          to="/voice-commands"
          style={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          Voice Commands
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
      </div>
    </nav>
  );
}

export default Navbar;