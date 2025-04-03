import React from 'react';
import { flowers } from '../data/flowers';

function MarigoldPage() {
  const marigoldData = flowers.find((flower) => flower.name === "Marigold");

  const handlePurchase = () => {
    const currentBalance = Number(localStorage.getItem('balance'));
    const price = 18; // Extracted from marigoldData.price
    const purchasedPlants = JSON.parse(localStorage.getItem('purchasedPlants') || '{}');

    if (purchasedPlants.marigold) {
      alert('You can\'t buy Marigold multiple times.');
      return;
    }

    if (currentBalance >= price) {
      const newBalance = currentBalance - price;
      localStorage.setItem('balance', newBalance);

      const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
      const newPurchase = { flowerName: 'Marigold', price, date: new Date().toISOString() };
      const updatedHistory = [...purchaseHistory, newPurchase];
      localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));

      purchasedPlants.marigold = true;
      localStorage.setItem('purchasedPlants', JSON.stringify(purchasedPlants));
      alert('Purchase successful!');
    } else {
      alert('Insufficient balance!');
    }
  };

  return (
    <div className="flower-page">
      {/* Hero Section */}
      <header
        className="flower-header"
        style={{
          backgroundImage: `url(${marigoldData.image})`,
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
        <h1 className="text-6xl font-extrabold">{marigoldData.name}</h1>
      </header>

      {/* Product Details */}
      <main className="flower-main">
        <div className="product-details text-center">
          <p className="text-lg mt-4 text-gray-700">{marigoldData.description}</p>
          <p className="text-3xl font-bold text-green-700 mt-4">{marigoldData.price}</p>
          <button
            className="buy-now-btn mt-6"
            onClick={handlePurchase}
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #ffcc00, #ff9900)',
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

        {/* Additional Information */}
        <div className="flower-more-info mt-8">
          <h2 className="text-3xl font-bold text-orange-600">Why Choose Marigolds?</h2>
          <p className="text-lg mt-4 text-gray-700">
            Marigolds are known for their vibrant orange and yellow hues, symbolizing warmth and positivity. They are perfect for brightening up any garden.
          </p>
          <p className="text-lg mt-4 text-gray-700">
            These flowers are easy to grow and maintain, making them a favorite among gardeners. They also have natural pest-repellent properties.
          </p>
        </div>

        {/* More About Marigolds */}
        <div className="flower-more-info mt-8" style={{ display: 'block' }}>
          <h2 className="text-3xl font-bold text-orange-600">More About Marigolds</h2>
          <p className="text-lg mt-4 text-gray-700">
            Marigolds have been cherished for centuries in various cultures for their beauty and symbolism. They are often used in festivals and ceremonies.
          </p>
          <p className="text-lg mt-4 text-gray-700">
            Their bright colors and cheerful appearance make them a popular choice for decorations and gifts.
          </p>
        </div>
      </main>
    </div>
  );
}

export default MarigoldPage;
