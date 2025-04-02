import React from 'react';
import { flowers } from '../data/flowers';

function RosesPage() {
  const roseData = flowers.find((flower) => flower.name === "Roses");

  return (
    <div className="flower-page">
      {/* Hero Section */}
      <header
        className="flower-header"
        style={{
          backgroundImage: `url(${roseData.image})`,
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
        <h1 className="text-5xl font-bold">{roseData.name}</h1>
      </header>

      {/* Product Details */}
      <main className="flower-main">
        <div className="product-details">
          <p className="text-lg mt-4">{roseData.description}</p>
          <p className="text-2xl font-bold text-green-600 mt-4">{roseData.price}</p>
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
          >
            Buy Now
          </button>
        </div>

        {/* Additional Information */}
        <div className="flower-more-info mt-8">
          <h2 className="text-2xl font-semibold">Why Choose Roses?</h2>
          <p className="text-lg mt-4">
            Roses are a symbol of love and beauty. They are perfect for weddings, anniversaries, or just to brighten someone's day.
          </p>
        </div>
      </main>
    </div>
  );
}

export default RosesPage;