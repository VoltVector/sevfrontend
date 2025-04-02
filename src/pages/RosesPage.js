import React from 'react';
import { flowers } from '../data/flowers';

function RosesPage() {
  const roseData = flowers.find((flower) => flower.name === "Roses");

  return (
    <div className="flower-page">
      <header className="flower-header">
        <h1 className="text-4xl font-bold">{roseData.name}</h1>
        <p className="text-lg mt-4">{roseData.description}</p>
      </header>
      <main className="flower-main">
        <img
          src={roseData.image}
          alt={roseData.name}
          className="flower-image"
        />
        <p className="text-lg mt-4">{roseData.price}</p>
      </main>
    </div>
  );
}

export default RosesPage;