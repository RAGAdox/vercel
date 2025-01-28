import { useTime, useTransform } from "framer-motion";
import type { MotionValue } from "motion";

/**
 * Custom hook to create a time-based oscillating value within a range.
 * @param {number} initialValue - The starting value within the range.
 * @param {number[]} range - The range [min, max] within which the value oscillates.
 * @param {number} duration - The duration of one oscillation cycle (in milliseconds).
 * @returns {MotionValue} A MotionValue that updates over time within the specified range.
 */
export const useTimeEquation = (
  initialValue: number,
  range: number[],
  duration: number,
  gradient: number
) => {
  const time = useTime(); // Continuously updating timestamp in milliseconds
  const [min, max] = range;

  // Ensure initialValue is clamped to the range
  const clampedInitial = Math.max(min, Math.min(initialValue, max));

  // Map time to oscillate smoothly between min and max
  const oscillation = useTransform(time, (t) => {
    const progress = ((t % duration) / duration) * 2 * Math.PI; // Normalize time to [0, 2π]
    const mid = (min + max) / 2; // Midpoint of the range
    const amplitude = (max - min) / 2; // Amplitude of oscillation

    return mid + amplitude * Math.sin(progress) * gradient; // Oscillate around the midpoint
  });

  return useTransform(oscillation, (value) => {
    // Offset to start at the initial value
    const offset = clampedInitial - (min + max) / 2;
    return value + offset;
  });
};
