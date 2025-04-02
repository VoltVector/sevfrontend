import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '../components/Tooltip';

function Home() {
  return (
    <main className="App-main">
      <div className="product-card relative">
        <Link to="/roses">
          <h2 className="text-xl font-semibold">Roses</h2>
          <p>Beautiful red roses for any occasion.</p>
          <Tooltip text="Click to learn more about Roses!" />
        </Link>
      </div>
      <div className="product-card relative">
        <Link to="/tulips">
          <h2 className="text-xl font-semibold">Tulips</h2>
          <p>Bright and colorful tulips to brighten your day.</p>
          <Tooltip text="Click to learn more about Tulips!" />
        </Link>
      </div>
      <div className="product-card relative">
        <Link to="/orchids">
          <h2 className="text-xl font-semibold">Orchids</h2>
          <p>Elegant orchids for a touch of luxury.</p>
          <Tooltip text="Click to learn more about Orchids!" />
        </Link>
      </div>
    </main>
  );
}

export default Home;