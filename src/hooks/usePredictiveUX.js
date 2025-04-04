import { useEffect, useState } from 'react';

function usePredictiveUX(onBehaviorDetected, config = {}) {
  const [userPreferences, setUserPreferences] = useState({
    prefersScrolling: false,
    prefersClicking: false,
    prefersHovering: false,
  });

  const defaultConfig = {
    scrollThreshold: 5,
    clickThreshold: 5,
    hoverThreshold: 10,
    timeThreshold: 3000, // 3 seconds for hover detection
  };

  const settings = { ...defaultConfig, ...config };

  useEffect(() => {
    const behaviorCounts = { scroll: 0, click: 0, hover: 0 };
    const hoverStartTimes = new Map();

    const trackUserBehavior = (event) => {
      const behaviorData = {
        type: event.type,
        timestamp: Date.now(),
        x: event.clientX || 0,
        y: event.clientY || 0,
      };

      // Update behavior counts
      if (event.type === 'scroll') behaviorCounts.scroll++;
      if (event.type === 'click') behaviorCounts.click++;
      if (event.type === 'mouseover') {
        hoverStartTimes.set(event.target, Date.now());
      }
      if (event.type === 'mouseout') {
        const hoverTime = Date.now() - (hoverStartTimes.get(event.target) || 0);
        hoverStartTimes.delete(event.target);
        if (hoverTime >= settings.timeThreshold) {
          behaviorCounts.hover++;
        }
      }

      // Analyze preferences
      if (behaviorCounts.scroll > settings.scrollThreshold) {
        setUserPreferences((prev) => ({ ...prev, prefersScrolling: true }));
      }
      if (behaviorCounts.click > settings.clickThreshold) {
        setUserPreferences((prev) => ({ ...prev, prefersClicking: true }));
      }
      if (behaviorCounts.hover > settings.hoverThreshold) {
        setUserPreferences((prev) => ({ ...prev, prefersHovering: true }));
      }

      console.log('User behavior detected:', behaviorData);
      onBehaviorDetected(behaviorData);
    };

    document.addEventListener('mousemove', trackUserBehavior);
    document.addEventListener('click', trackUserBehavior);
    document.addEventListener('scroll', trackUserBehavior);
    document.addEventListener('mouseover', trackUserBehavior);
    document.addEventListener('mouseout', trackUserBehavior);

    return () => {
      document.removeEventListener('mousemove', trackUserBehavior);
      document.removeEventListener('click', trackUserBehavior);
      document.removeEventListener('scroll', trackUserBehavior);
      document.removeEventListener('mouseover', trackUserBehavior);
      document.removeEventListener('mouseout', trackUserBehavior);
    };
  }, [onBehaviorDetected, settings]);

  return userPreferences;
}

export default usePredictiveUX;