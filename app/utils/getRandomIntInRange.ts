export default function getRandomIntInRange(
  min: number,
  max: number,
  requireInt?: boolean
) {
  return requireInt
    ? Math.floor(Math.random() * (max - min + 1)) + min
    : Math.random() * (max - min + 1) + min;
}
