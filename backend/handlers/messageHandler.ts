import { Pendulum } from "../pendulum/pendulum";

export const handleMessage = (message: string) => {
  const pendulum = Pendulum.getInstance();
  switch (message) {
    case "STOP":
      pendulum.stop();
      break;
    case "PAUSE":
      pendulum.pause();
      break;
    case "RESUME":
      pendulum.resume();
      break;
    default:
      console.warn(`Unknown message: ${message}`);
      break;
  }
};
