import React from 'react';
import { flowers } from '../data/flowers';

function TulipsPage() {
  const tulipData = flowers.find((flower) => flower.name === "Tulips");

  return (
    <div className="flower-page">
      <header className="flower-header">
        <h1 className="text-4xl font-bold">{tulipData.name}</h1>
        <p className="text-lg mt-4">{tulipData.description}</p>
      </header>
      <main className="flower-main">
        <img
          src={tulipData.image}
          alt={tulipData.name}
          className="flower-image"
        />
        <p className="text-lg mt-4">{tulipData.price}</p>
      </main>
    </div>
  );
}

export default TulipsPage;