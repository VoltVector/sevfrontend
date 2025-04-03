import React, { useState } from 'react';

const CalibrationOverlay = ({ onComplete }) => {
  const [currentPoint, setCurrentPoint] = useState(0);

  const points = [
    { x: '10%', y: '10%' },
    { x: '90%', y: '10%' },
    { x: '10%', y: '90%' },
    { x: '90%', y: '90%' },
    { x: '50%', y: '50%' },
  ];

  const handlePointClick = () => {
    if (currentPoint < points.length - 1) {
      setCurrentPoint(currentPoint + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="calibration-overlay">
      <div
        className="calibration-point"
        style={{
          position: 'absolute',
          top: points[currentPoint].y,
          left: points[currentPoint].x,
          width: '20px',
          height: '20px',
          backgroundColor: 'red',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        onClick={handlePointClick}
      ></div>
    </div>
  );
};

export default CalibrationOverlay;