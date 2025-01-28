import { getRandomIntInRange } from ".";

export default function getRandomCoordinates({
  minX,
  minY,
  maxX,
  maxY,
}: BoundingPoints): Coordinate {
  return {
    x: getRandomIntInRange(minX, maxX),
    y: getRandomIntInRange(minY, maxY),
  };
}
