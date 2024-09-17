import axios from "axios";
import { useEffect, useRef, useState } from "react";
import initialPendulumData from "../assets/pendulum-data.json";
import { PendulumConst } from "../constants/pendulum.const";
import { Pendulum } from "../models/pendulum";
import { RunStatus } from "../models/run-status.enum";
import { useMqttClient } from "./UseMqttClient";

export const usePendulumManager = () => {
  const [pendulums, setPendulums] = useState<Pendulum[]>(initialPendulumData);
  const [status, setStatus] = useState<RunStatus>(RunStatus.STOPPED);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { publishMessage } = useMqttClient();

  const resetPendulums = () => setPendulums(initialPendulumData);

  const fetchPendulumData = async (url: string) => {
    const response = await axios.get(url);
    return response.data.angle;
  };

  const configurePendulums = async () => {
    try {
      const requests = pendulums.map((pendulum) =>
        axios.post(`${pendulum.url}/configure`, {
          angle: pendulum.initialAngle,
          length: pendulum.length,
        })
      );
      await Promise.all(requests);
    } catch (error) {
      console.error("Error during configuration:", error);
    }
  };

  const startCalculation = async () => {
    try {
      const requests = pendulums.map((pendulum) =>
        fetchPendulumData(`${pendulum.url}/status`).then((angle) => ({
          id: pendulum.id,
          angle,
        }))
      );

      const results = await Promise.all(requests);

      setPendulums((prevPendulums) =>
        prevPendulums.map((pendulum) => {
          const result = results.find((res) => res.id === pendulum.id);
          return result ? { ...pendulum, angle: result.angle } : pendulum;
        })
      );
    } catch (error) {
      console.error("Error during calculation:", error);
    }
  };

  const startInterval = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(
        startCalculation,
        PendulumConst.FETCH_INTERVAL
      );
    }
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if ([RunStatus.STARTED, RunStatus.RESUMED].includes(status)) {
      if (status === RunStatus.STARTED) {
        // Case first start, needs to send configuration
        configurePendulums();
      }
      startInterval();
    } else {
      publishMessage("test/topic", "STOP");
      stopInterval();
    }

    return () => {
      stopInterval();
    };
  }, [status]);

  return {
    pendulums,
    setPendulums,
    status,
    setStatus,
    resetPendulums,
  };
};
