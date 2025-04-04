import React from 'react';
import { flowers } from '../data/flowers';

function TulipsPage() {
  const tulipData = flowers.find((flower) => flower.name === "Tulips");

  const handlePurchase = () => {
    const currentBalance = Number(localStorage.getItem('balance'));
    const price = 20; // Extracted from tulipData.price
    const purchasedPlants = JSON.parse(localStorage.getItem('purchasedPlants') || '{}');

    if (purchasedPlants.tulips) {
      alert('You can\'t buy Tulips multiple times.');
      return;
    }

    if (currentBalance >= price) {
      const newBalance = currentBalance - price;
      localStorage.setItem('balance', newBalance);

      const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
      const newPurchase = { flowerName: 'Tulips', price, date: new Date().toISOString() };
      const updatedHistory = [...purchaseHistory, newPurchase];
      localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));

      purchasedPlants.tulips = true;
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
          backgroundImage: `url(${tulipData.image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textShadow: '3px 3px 8px rgba(0, 0, 0, 0.7)',
        }}
      >
      </header>

      <main className="flower-main">
        <div className="product-details text-center">
          <p className="text-lg mt-4 text-gray-700" style={{ lineHeight: '1.8', fontStyle: 'italic' }}>
            {tulipData.description}
          </p>
          <p className="text-3xl font-bold text-green-700 mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {tulipData.price}
          </p>
          <button
            className="buy-now-btn mt-6"
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #ff7eb3, #ff758c)', // AI-themed gradient
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
            onClick={handlePurchase}
          >
            Buy Now
          </button>
        </div>

        <div className="flower-more-info mt-8">
          <h2 className="text-3xl font-bold text-purple-600" style={{ fontFamily: "'Playfair Display', serif", marginBottom: '1rem' }}>
            Why Choose Tulips?
          </h2>
          <p className="text-lg mt-4 text-gray-700">
            Tulips are known for their vibrant colors and cheerful appearance. They bring a sense of joy and renewal, perfect for spring celebrations.
          </p>
          <p className="text-lg mt-4 text-gray-700">
            Their versatility and charm make them a popular choice for gifts, decorations, and garden displays.
          </p>
        </div>

        <div className="flower-more-info mt-8" style={{ display: 'block' }}>
          <h2 className="text-3xl font-bold text-purple-600">More About Tulips</h2>
          <p className="text-lg mt-4 text-gray-700">
            Tulips originated in Central Asia and became a symbol of wealth and prosperity during the Ottoman Empire. They are now a global favorite.
          </p>
          <p className="text-lg mt-4 text-gray-700">
            Available in a wide range of colors, tulips symbolize perfect love, happiness, and elegance. They are a must-have for any flower enthusiast.
          </p>
        </div>
      </main>
    </div>
  );
}

export default TulipsPage;