import React from 'react';
import { flowers } from '../data/flowers';

function SunflowerPage() {
  const sunflowerData = flowers.find((flower) => flower.name === "Sunflowers");

  const handlePurchase = () => {
    const currentBalance = Number(localStorage.getItem('balance'));
    const price = 15; // Extracted from sunflowerData.price
    const purchasedPlants = JSON.parse(localStorage.getItem('purchasedPlants') || '{}');

    if (purchasedPlants.sunflowers) {
      alert('You can\'t buy Sunflowers multiple times.');
      return;
    }

    if (currentBalance >= price) {
      const newBalance = currentBalance - price;
      localStorage.setItem('balance', newBalance);

      const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
      const newPurchase = { flowerName: 'Sunflowers', price, date: new Date().toISOString() };
      const updatedHistory = [...purchaseHistory, newPurchase];
      localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));

      purchasedPlants.sunflowers = true;
      localStorage.setItem('purchasedPlants', JSON.stringify(purchasedPlants));
      alert('Purchase successful!');
    } else {
      alert('Insufficient balance!');
    }
  };

  return (
    <div className="flower-page">
      <header
        className="flower-header"
        style={{
          backgroundImage: `url(${sunflowerData.image})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
        }}
      >
        <h1 className="text-6xl font-extrabold">{sunflowerData.name}</h1>
      </header>

      <main className="flower-main">
        <div className="product-details text-center">
          <p className="text-lg mt-4 text-gray-700">{sunflowerData.description}</p>
          <p className="text-3xl font-bold text-green-700 mt-4">{sunflowerData.price}</p>
          <button
            className="buy-now-btn mt-6"
            onClick={handlePurchase}
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #ffeb3b, #ffc107)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              transition: 'background 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            Buy Now
          </button>
        </div>

        <div className="flower-more-info mt-8">
          <h2 className="text-3xl font-bold text-yellow-600">Why Choose Sunflowers?</h2>
          <p className="text-lg mt-4 text-gray-700">
            Sunflowers are a symbol of happiness and positivity. Their bright yellow petals and towering stems bring warmth and cheer to any space.
          </p>
          <p className="text-lg mt-4 text-gray-700">
            They are perfect for summer celebrations, garden displays, or as a gift to brighten someone's day.
          </p>
        </div>

        <div className="flower-more-info mt-8" style={{ display: 'block' }}>
          <h2 className="text-3xl font-bold text-yellow-600">More About Sunflowers</h2>
          <p className="text-lg mt-4 text-gray-700">
            Sunflowers are native to North America and have been cultivated for thousands of years. They are known for their ability to track the sun.
          </p>
          <p className="text-lg mt-4 text-gray-700">
            Beyond their beauty, sunflowers are also valued for their seeds, which are a source of nutrition and oil. They symbolize loyalty and longevity.
          </p>
        </div>
      </main>
    </div>
  );
}

export default SunflowerPage;
