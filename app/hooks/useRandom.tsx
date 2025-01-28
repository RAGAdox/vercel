import { useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Custom hook to provide random continuous values within a given range
 * @param {number} min - Minimum value of the range
 * @param {number} max - Maximum value of the range
 * @param {number} duration - Duration between random changes (in milliseconds)
 * @returns {MotionValue} A MotionValue that smoothly animates between random values
 */
export const useRandomTransform = (
  min: number,
  max: number,
  duration: number = 1000
) => {
  const [targetValue, setTargetValue] = useState(
    Math.random() * (max - min) + min
  );
  const springValue = useSpring(targetValue, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const interval = setInterval(() => {
      const randomValue = Math.random() * (max - min) + min;
      setTargetValue(randomValue);
    }, duration);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [min, max, duration]);

  return springValue;
};
