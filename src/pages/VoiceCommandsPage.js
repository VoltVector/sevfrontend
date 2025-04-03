import React from 'react';

function VoiceCommandsPage() {
  const commands = [
    { command: 'go to roses', description: 'Navigate to the Roses page.' },
    { command: 'scroll down', description: 'Scroll down the page.' },
    { command: 'go to home', description: 'Navigate back to the Home page.' },
    { command: 'close tutorial', description: 'Close the tutorial modal.' },
    /* { command: 'restart tutorial', description: 'Restart the tutorial from the beginning.' }, */
    { command: 'go to tulips', description: 'Navigate to the Tulips page.' },
    { command: 'go to orchids', description: 'Navigate to the Orchids page.' },
    { command: 'scroll up', description: 'Scroll up the page.' },
    { command: 'show more information', description: 'Display additional information about flowers.' },
    { command: 'buy roses', description: 'Purchase Roses.' },
    { command: 'buy tulips', description: 'Purchase Tulips.' },
    { command: 'buy orchids', description: 'Purchase Orchids.' },
  ];

  return (
    <div className="voice-commands-page">
      <header
        className="voice-commands-header"
        style={{
          background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
          color: 'white',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h1 className="text-4xl font-bold">Voice Commands</h1>
        <p className="text-lg mt-2">Learn how to use voice commands to navigate the site.</p>
      </header>

      <main className="voice-commands-main" style={{ padding: '2rem' }}>
        <ul className="commands-list" style={{ listStyle: 'none', padding: 0 }}>
          {commands.map((cmd, index) => (
            <li
              key={index}
              className="command-item"
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                background: 'white',
              }}
            >
              <p className="command-text" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                {cmd.command}
              </p>
              <p className="command-description" style={{ color: '#666', marginTop: '0.5rem' }}>
                {cmd.description}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default VoiceCommandsPage;