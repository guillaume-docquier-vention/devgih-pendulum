import axios from "axios";
import { publishMessage } from "../messaging/mqttClient";
import { convertToCartesianCoordinates, calculateDistance } from "../utils";
import {
  DAMPING_COEFF,
  GRAVITY,
  PENDULUM_DEFAULT_LENGTH,
  PENDULUM_OFFSET,
  PENDULUM_RADIUS,
  PENDULUM_TIME_STEP,
} from "../constants";

export class Pendulum {
  private static instance: Pendulum | null = null;
  private initialAngle: number;
  private length: number;
  private currentAngle: number;
  private intervalId?: NodeJS.Timeout;

  private constructor() {
    // TODO Initialize pendulum state
  }

  /**
   * Gets the singleton instance of the Pendulum class.
   * @param initialConfig Initial configuration for the pendulum.
   * @returns The singleton instance of the Pendulum.
   */
  public static getInstance(): Pendulum {
    // TODO Initialize pendulum state
  }

  /**
   * Configures the pendulum with new parameters and starts calculations.
   * @param config The new configuration for the pendulum.
   */
  public configure(config: Record<string, unknown>): void {
    // TODO Implement pendulum configuration
  }

  /**
   * Pause the pendulum calculations.
   */
  public pause(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  /**
   * Resumes pendulum calculations from where they were paused.
   */
  public resume(): void {
    this.startCalculations();
  }

  /**
   * Stops the pendulum and resets its state.
   */
  public stop(): void {
    this.pause();
    this.resetState();
  }

  /**
   * Resets the pendulum state to default values.
   */
  private resetState(): void {
    this.initialAngle = 0;
    this.currentAngle = 0;
    this.length = PENDULUM_DEFAULT_LENGTH;
  }

  /**
   * Checks if there is a conflict with another pendulum based on their angles and lengths.
   * @param neighborAngle The angle of the neighboring pendulum.
   * @param neighborLength The length of the neighboring pendulum.
   * @returns True if a conflict is detected; otherwise, false.
   */
  private checkConflict(
    neighborAngle: number,
    neighborLength: number
  ): boolean {
    const { x: x1, y: y1 } = convertToCartesianCoordinates(
      this.currentAngle,
      this.length
    );
    const { x: x2, y: y2 } = convertToCartesianCoordinates(
      neighborAngle,
      neighborLength
    );

    const distance = calculateDistance(x1, y1, x2 + PENDULUM_OFFSET, y2);
    const conflictDistance = 2 * PENDULUM_RADIUS;
    return distance <= conflictDistance;
  }

  /**
   * Calculates the angle of the pendulum at a given time using the simple harmonic motion formula.
   * @param t The time in seconds.
   * @param length The length of the pendulum.
   * @param initialAngle The initial angle of the pendulum.
   */
  private calculateAngle(
    t: number,
    length: number,
    initialAngle: number
  ): void {
    const omega = Math.sqrt(GRAVITY / length);
    this.currentAngle =
      initialAngle * Math.exp(-t * DAMPING_COEFF) * Math.cos(omega * t);
  }

  /**
   * Starts the pendulum calculations and updates the angle at regular intervals.
   */
  private async startCalculations(): Promise<void> {
    let t = 0; // Initial time in seconds

    this.pause();
    this.intervalId = setInterval(async () => {
      this.calculateAngle(t, this.length, this.initialAngle);
      t += PENDULUM_TIME_STEP;

      const neighborData = await this.getNeighborStatus();
      if (neighborData) {
        const { angle, length } = neighborData;
        if (this.checkConflict(angle, length)) {
          publishMessage(process.env.MQTT_TOPIC ?? "", "STOP");
          this.stop();
        }
      }
    }, 50);
  }

  /**
   * Retrieves the status of the neighboring pendulum from an external service.
   * @returns The status of the neighboring pendulum or null if no status is available.
   */
  private async getNeighborStatus(): Promise<Record<string, unknown> | null> {
    const neighbor = process.env.NEIGHBOR;
    if (neighbor) {
      try {
        const response = await axios.get(`http://${neighbor}/status`);
        return response.data;
      } catch (error) {
        console.error("Error retrieving neighbor status:", error);
        return null;
      }
    }
    return null;
  }

  /**
   * Gets the current status of the pendulum.
   * @returns An object containing the current angle, length, and mass of the pendulum.
   */
  public getStatus(): Record<string, unknown> {
    // TODO Implement getStatus
  }
}
