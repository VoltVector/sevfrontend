import React from 'react';
import { flowers } from '../data/flowers';

function TulipsPage() {
  const tulipData = flowers.find((flower) => flower.name === "Tulips");

  return (
    <div className="flower-page">
      <header
        className="flower-header"
        style={{
          backgroundImage: `url(${tulipData.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        }}
      >
        <h1 className="text-5xl font-bold">{tulipData.name}</h1>
      </header>

      <main className="flower-main">
        <div className="product-details">
          <p className="text-lg mt-4">{tulipData.description}</p>
          <p className="text-2xl font-bold text-green-600 mt-4">{tulipData.price}</p>
          <button className="buy-now-btn mt-6">Buy Now</button>
        </div>

        <div className="flower-more-info mt-8">
          <h2 className="text-2xl font-semibold">Why Choose Tulips?</h2>
          <p className="text-lg mt-4">
            Tulips are known for their vibrant colors and cheerful appearance. They are perfect for spring celebrations and gifts.
          </p>
        </div>
      </main>
    </div>
  );
}

export default TulipsPage;