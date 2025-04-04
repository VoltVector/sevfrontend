import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '../components/Tooltip';
import { flowers } from '../data/flowers';
import CalibrationOverlay from '../components/CalibrationOverlay';

const Home = ({ startCalibrationProcess, stopCalibration, calibrating, completeCalibration }) => {
  return (
    <div className="home-container">
      <main className="App-main">
        {flowers.map((flower) => (
          <div key={flower.id} className="product-card relative">
            {/* Flower Image Preview */}
            <div
              className="product-image"
              style={{
                backgroundImage: `url(${flower.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }}
            ></div>

            {/* Product Details */}
            <div className="product-details p-4">
              <h2 className="text-xl font-semibold">{flower.name}</h2>
              <p className="text-gray-600 mt-2">{flower.description}</p>
              <p className="text-green-600 font-bold mt-2">{flower.price}</p>
              <Link
                to={`/${flower.name.toLowerCase()}`}
                className="learn-more-btn mt-4 inline-block"
                style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                  color: 'white',
                  borderRadius: '4px',
                  textDecoration: 'none',
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
                Learn More
              </Link>
            </div>

            {/* Tooltip */}
            <Tooltip text={`Click to learn more about ${flower.name}!`} />
          </div>
        ))}
      </main>
      <div className="calibration-controls">
        <button onClick={startCalibrationProcess} className="calibration-button">Start Calibration</button>
        <button onClick={stopCalibration} className="calibration-button">Stop Calibration</button>
      </div>
      {calibrating && <CalibrationOverlay onComplete={completeCalibration} />}
    </div>
  );
};

export default Home;