import { useEffect } from 'react';

const useGazeTracking = (onGaze) => {
  useEffect(() => {
    const initializeWebGazer = async () => {
      const webgazer = window.webgazer;

      if (!webgazer) {
        console.error('WebGazer is not loaded. Ensure the script is included in index.html.');
        return;
      }

      // Initialize WebGazer
      webgazer.setGazeListener((data, timestamp) => {
        if (data) {
          const { x, y } = data; // Extract gaze coordinates
          onGaze({ x, y });
        }
      });

      webgazer.begin(); // Start gaze tracking

      // Disable unnecessary overlays
      webgazer.showVideo(false).showFaceOverlay(false).showFaceFeedbackBox(false);
    };

    initializeWebGazer();

    return () => {
      const webgazer = window.webgazer;
      /*
      if (webgazer) {
        webgazer.end(); // Stop gaze tracking on cleanup
      } */
    };
  }, [onGaze]);
};

export default useGazeTracking;