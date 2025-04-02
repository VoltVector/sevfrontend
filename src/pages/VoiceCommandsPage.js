import React from 'react';

function VoiceCommandsPage() {
  const commands = [
    { command: 'Go to Roses', description: 'Navigate to the Roses page.' },
    { command: 'Go to Tulips', description: 'Navigate to the Tulips page.' },
    { command: 'Go to Orchids', description: 'Navigate to the Orchids page.' },
    { command: 'Go Home', description: 'Navigate to the homepage.' },
    { command: 'Scroll Down', description: 'Scroll down the page.' },
    { command: 'Scroll Up', description: 'Scroll up the page.' },
    { command: 'Show More Information', description: 'Display additional information on flower pages.' },
    { command: 'Close Tutorial', description: 'Close the tutorial modal.' },
    { command: 'Restart Tutorial', description: 'Restart the tutorial modal.' },
  ];

  return (
    <div className="voice-commands-page">
      <h1 className="text-4xl font-bold">Available Voice Commands</h1>
      <ul className="mt-4">
        {commands.map((cmd, index) => (
          <li key={index} className="mb-2">
            <strong>{cmd.command}:</strong> {cmd.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VoiceCommandsPage;