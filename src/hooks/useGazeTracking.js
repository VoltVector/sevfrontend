import { useEffect } from 'react';
import { initializeWebGazer, safelyEndWebGazer } from '../WebGazer/webGazerUtils';

const useGazeTracking = (onGaze, gazingEnabled) => {
  useEffect(() => {
    if (!gazingEnabled) {
      safelyEndWebGazer(window.webgazer); // Stop WebGazer when gazing is disabled
      return;
    }

    const webgazer = initializeWebGazer(onGaze);

    return () => {
      safelyEndWebGazer(webgazer); // Cleanup WebGazer on unmount
    };
  }, [onGaze, gazingEnabled]);
};

export default useGazeTracking;