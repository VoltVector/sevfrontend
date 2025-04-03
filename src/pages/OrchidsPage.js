import React from 'react';
import { flowers } from '../data/flowers';

function OrchidsPage() {
  const orchidData = flowers.find((flower) => flower.name === "Orchids");

  const handlePurchase = () => {
    const currentBalance = Number(localStorage.getItem('balance'));
    const price = 30; // Extracted from orchidData.price
    if (currentBalance >= price) {
      const newBalance = currentBalance - price;
      localStorage.setItem('balance', newBalance);
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
          backgroundPosition: 'center',
          height: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        }}
      >
        <h1 className="text-5xl font-bold">{orchidData.name}</h1>
      </header>

      {/* Product Details */}
      <main className="flower-main">
        <div className="product-details">
          <p className="text-lg mt-4">{orchidData.description}</p>
          <p className="text-2xl font-bold text-green-600 mt-4">{orchidData.price}</p>
          <button
            className="buy-now-btn mt-6"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'background 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
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
          <h2 className="text-2xl font-semibold">Why Choose Orchids?</h2>
          <p className="text-lg mt-4">
            Orchids are a symbol of elegance and luxury. They are perfect for special occasions or as a sophisticated gift.
          </p>
        </div>
      </main>
    </div>
  );
}

export default OrchidsPage;