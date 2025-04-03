import React from 'react';
import { flowers } from '../data/flowers';

function RosesPage() {
  const roseData = flowers.find((flower) => flower.name === "Roses");

  const handlePurchase = () => {
    const currentBalance = Number(localStorage.getItem('balance'));
    const price = 25; // Extracted from roseData.price
    const purchasedPlants = JSON.parse(localStorage.getItem('purchasedPlants') || '{}');

    if (purchasedPlants.roses) {
      alert('You can\'t buy Roses multiple times.');
      return;
    }

    if (currentBalance >= price) {
      const newBalance = currentBalance - price;
      localStorage.setItem('balance', newBalance);

      const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
      const newPurchase = { flowerName: 'Roses', price, date: new Date().toISOString() };
      const updatedHistory = [...purchaseHistory, newPurchase];
      localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));

      purchasedPlants.roses = true;
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
          backgroundImage: `url(${roseData.image})`,
          backgroundSize: 'contain', // Changed to 'contain' for uniform scaling
          backgroundRepeat: 'no-repeat', // Prevent tiling
          backgroundPosition: 'center',
          height: '50vh', // Adjusted height for better proportions
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
        }}
      >
        <h1 className="text-6xl font-extrabold">{roseData.name}</h1>
      </header>

      <main className="flower-main">
        <div className="product-details text-center"> {/* Centered text */}
          <p className="text-lg mt-4 text-gray-700">{roseData.description}</p>
          <p className="text-3xl font-bold text-green-700 mt-4">{roseData.price}</p> {/* Larger price text */}
          <button
            className="buy-now-btn mt-6"
            onClick={handlePurchase}
            style={{
              padding: '1rem 2rem', // Increased padding
              background: 'linear-gradient(135deg, #ff7eb3, #ff758c)', // AI-themed gradient
              color: 'white',
              border: 'none',
              borderRadius: '12px', // Rounded corners
              cursor: 'pointer',
              fontSize: '1.2rem', // Larger font size
              fontWeight: 'bold',
              transition: 'background 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)'; // Slightly larger hover effect
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            Buy Now
          </button>
        </div>

        {/* Additional Information */}
        <div className="flower-more-info mt-8">
          <h2 className="text-3xl font-bold text-pink-600">Why Choose Roses?</h2>
          <p className="text-lg mt-4 text-gray-700">
            Roses are a timeless symbol of love and beauty. Their vibrant colors and delicate petals make them perfect for any occasion.
          </p>
          <p className="text-lg mt-4 text-gray-700">
            Whether you're celebrating a wedding, anniversary, or simply expressing gratitude, roses convey emotions like no other flower.
          </p>
        </div>

        {/* More About Roses */}
        <div className="flower-more-info mt-8" style={{ display: 'block' }}>
          <h2 className="text-3xl font-bold text-pink-600">More About Roses</h2>
          <p className="text-lg mt-4 text-gray-700">
            Roses have been cherished for centuries, symbolizing love, passion, and admiration. They come in a variety of colors, each with its own meaning.
          </p>
          <p className="text-lg mt-4 text-gray-700">
            Red roses signify love and romance, while yellow roses represent friendship and joy. White roses are a symbol of purity and new beginnings.
          </p>
          <p className="text-lg mt-4 text-gray-700">
            Their enchanting fragrance and elegant appearance make roses a favorite choice for bouquets, gardens, and decorations.
          </p>
        </div>
      </main>
    </div>
  );
}

export default RosesPage;