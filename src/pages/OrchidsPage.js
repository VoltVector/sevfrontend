import React from 'react';

function OrchidsPage() {
  return (
    <div className="flower-page">
      <header className="flower-header">
        <h1 className="text-4xl font-bold">Orchids</h1>
        <p className="text-lg mt-4">Elegant orchids for a touch of luxury.</p>
      </header>
      <main className="flower-main">
        <img
          src="/images/orchids.jpg"
          alt="Orchids"
          className="flower-image"
        />
        <p className="text-lg mt-4">
          Orchids are exotic and luxurious flowers, perfect for adding a touch of sophistication to any occasion.
        </p>
      </main>
    </div>
  );
}

export default OrchidsPage;