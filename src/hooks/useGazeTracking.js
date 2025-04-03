import { useEffect } from 'react';
import { initializeWebGazer, safelyEndWebGazer } from '../WebGazer/webGazerUtils';

const useGazeTracking = (onGaze) => {
  useEffect(() => {
    const webgazer = initializeWebGazer(onGaze);

    return () => {
      safelyEndWebGazer(webgazer); // Use safe cleanup
    };
  }, [onGaze]);
};

export default useGazeTracking;