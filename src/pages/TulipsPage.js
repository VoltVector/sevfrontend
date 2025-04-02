import React from 'react';

function TulipsPage() {
  return (
    <div className="flower-page">
      <header className="flower-header">
        <h1 className="text-4xl font-bold">Tulips</h1>
        <p className="text-lg mt-4">Bright and colorful tulips to brighten your day.</p>
      </header>
      <main className="flower-main">
        <img
          src="/images/tulips.jpg"
          alt="Tulips"
          className="flower-image"
        />
        <p className="text-lg mt-4">
          Tulips are known for their vibrant colors and elegant shapes. They are perfect for spring celebrations.
        </p>
      </main>
    </div>
  );
}

export default TulipsPage;