export class PendulumConst {
  static readonly GRAVITY = 9.81; // m/s^2
  static readonly MAX_PENDULUMS = 5;
  static readonly PENDULUM_GAP = 10; // Meters
  static readonly FETCH_INTERVAL = 50; // ms

  // Rope length in meters
  static readonly MAX_LENGTH = 15;
  static readonly MIN_LENGTH = 5;
  static readonly LENGTH_STEP = 1;
  static readonly PENDULUM_RADIUS = 1;

  // Degrees from lower vertical position
  static readonly ANGLE_MIN = -1.57; // approx (-Math.PI / 2)
  static readonly ANGLE_MAX = 1.57; // approx (Math.PI / 2);
  static readonly ANGLE_STEP = 0.1;
}
