import React from 'react';
import { flowers } from '../data/flowers';

function OrchidsPage() {
  const orchidData = flowers.find((flower) => flower.name === "Orchids");

  return (
    <div className="flower-page">
      <header className="flower-header">
        <h1 className="text-4xl font-bold">{orchidData.name}</h1>
        <p className="text-lg mt-4">{orchidData.description}</p>
      </header>
      <main className="flower-main">
        <img
          src={orchidData.image}
          alt={orchidData.name}
          className="flower-image"
        />
        <p className="text-lg mt-4">{orchidData.price}</p>
      </main>
    </div>
  );
}

export default OrchidsPage;