import React from 'react';

function RosesPage() {
  return (
    <div className="flower-page">
      <header className="flower-header">
        <h1 className="text-4xl font-bold">Roses</h1>
        <p className="text-lg mt-4">Beautiful red roses for any occasion.</p>
      </header>
      <main className="flower-main">
        <img
          src="/images/roses.jpg"
          alt="Roses"
          className="flower-image"
        />
        <p className="text-lg mt-4">
          Roses are a symbol of love and beauty. Perfect for weddings, anniversaries, or just to brighten someone's day.
        </p>
      </main>
    </div>
  );
}

export default RosesPage;