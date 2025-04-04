import React from 'react';
import { flowers } from '../data/flowers';

function OrchidsPage() {
  const orchidData = flowers.find((flower) => flower.name === "Orchids");

  const handlePurchase = () => {
    const currentBalance = Number(localStorage.getItem('balance'));
    const price = 30; // Extracted from orchidData.price
    const purchasedPlants = JSON.parse(localStorage.getItem('purchasedPlants') || '{}');

    if (purchasedPlants.orchids) {
      alert('You can\'t buy Orchids multiple times.');
      return;
    }

    if (currentBalance >= price) {
      const newBalance = currentBalance - price;
      localStorage.setItem('balance', newBalance);

      const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
      const newPurchase = { flowerName: 'Orchids', price, date: new Date().toISOString() };
      const updatedHistory = [...purchaseHistory, newPurchase];
      localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));

      purchasedPlants.orchids = true;
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
          backgroundImage: `url(${orchidData.image})`,
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

      {/* Product Details */}
      <main className="flower-main">
        <div className="product-details text-center">
          <p className="text-lg mt-4 text-gray-700" style={{ lineHeight: '1.8', fontStyle: 'italic' }}>
            {orchidData.description}
          </p>
          <p className="text-3xl font-bold text-green-700 mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {orchidData.price}
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

        {/* Additional Information */}
        <div className="flower-more-info mt-8">
          <h2 className="text-3xl font-bold text-indigo-600" style={{ fontFamily: "'Playfair Display', serif", marginBottom: '1rem' }}>
            Why Choose Orchids?
          </h2>
          <p className="text-lg mt-4 text-gray-700">
            Orchids are a symbol of elegance and luxury. Their exotic beauty and intricate patterns make them a sophisticated choice for any occasion.
          </p>
          <p className="text-lg mt-4 text-gray-700">
            They are perfect for adding a touch of refinement to your home or as a thoughtful gift for someone special.
          </p>
        </div>

        {/* More Information */}
        <div className="flower-more-info mt-8" style={{ display: 'block' }}>
          <h2 className="text-3xl font-bold text-indigo-600">More About Orchids</h2>
          <p className="text-lg mt-4 text-gray-700">
            Orchids are one of the largest families of flowering plants, with over 25,000 species. They are known for their resilience and adaptability.
          </p>
          <p className="text-lg mt-4 text-gray-700">
            Each orchid variety has its own unique charm, from the vibrant Phalaenopsis to the delicate Dendrobium. They symbolize beauty, strength, and love.
          </p>
        </div>
      </main>
    </div>
  );
}

export default OrchidsPage;