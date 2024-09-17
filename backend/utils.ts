/**
 * Converts polar coordinates to Cartesian coordinates.
 * @param angle The angle of the pendulum.
 * @param length The length of the pendulum.
 * @returns The Cartesian coordinates.
 */
export const convertToCartesianCoordinates = (
  angle: number,
  length: number
): { x: number; y: number } => {
  const x = length * Math.sin(angle);
  const y = -length * Math.cos(angle);
  return { x, y };
};

/**
 * Calculates the distance between two Cartesian points.
 * @param x1 The x-coordinate of the first point.
 * @param y1 The y-coordinate of the first point.
 * @param x2 The x-coordinate of the second point.
 * @param y2 The y-coordinate of the second point.
 * @returns The distance between the points.
 */
export const calculateDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};
