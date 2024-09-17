import { FC, useEffect, useRef } from "react";
import { Pendulum } from "../models/pendulum";
import "./PendulumViewer.scss";

interface PendulumViewerProps {
  pendulums: Pendulum[];
}

const width: number = 1000;
const height: number = 200;
const pxMeterRatio = 15; // 1 meter = 10 pixels
const pendulumGap = 10; // 15 meters
const pxPendulumGap = pendulumGap * pxMeterRatio;

export const PendulumViewer: FC<PendulumViewerProps> = ({ pendulums }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Effect to draw the pendulums at each angle update
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const hPadding = (width - pendulums.length * pxPendulumGap) / 2; // Left and right padding
      const vPadding = 20; // Top padding

      if (ctx) {
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        pendulums.forEach((pendulum, i) => {
          const angle = pendulum.angle ?? pendulum.initialAngle;
          if (angle !== null) {
            const originX = i * pxPendulumGap + hPadding;
            const originY = vPadding;
            const pendulumLength = pendulum.length * pxMeterRatio;

            const pendulumX = originX + pendulumLength * Math.sin(angle);
            const pendulumY = originY + pendulumLength * Math.cos(angle);

            ctx.beginPath();
            ctx.moveTo(originX, originY);
            ctx.lineTo(pendulumX, pendulumY);
            ctx.strokeStyle = pendulum.color;
            ctx.lineWidth = 4;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(
              pendulumX,
              pendulumY,
              pendulum.radius * pxMeterRatio,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = pendulum.color;
            ctx.fill();
          }
        });
      }
    }
  }, [pendulums]);

  return (
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      style={{ width, height }}
    ></canvas>
  );
};
