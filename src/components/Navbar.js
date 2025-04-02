import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="App-header updated-header">
      <h1 className="text-4xl font-bold">Welcome to Teodora's Florist</h1>
      <p className="text-lg mt-4">
        Explore our products using gaze tracking, gestures, and voice commands!
      </p>
    </header>
  );
}

export default Navbar;