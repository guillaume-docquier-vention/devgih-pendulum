import { useEffect, useState, useCallback } from "react";
import mqtt, { MqttClient } from "mqtt";

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL ?? "ws://localhost:30001";

export const useMqttClient = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_BROKER_URL);

    mqttClient.on("connect", () => {
      console.info("MQTT Client Connected");
      setConnected(true);
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT Client Error:", err);
      setConnected(false);
    });

    mqttClient.on("message", (topic, message) => {
      console.info(`Received message on topic ${topic}:`, message.toString());
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  // Publish message to a topic
  const publishMessage = useCallback(
    (topic: string, message: string) => {
      if (client && connected) {
        client.publish(topic, message, { qos: 1 }, (err) => {
          if (err) {
            console.error("Publish error:", err);
          } else {
            console.info("Message published:", message);
          }
        });
      } else {
        console.error("MQTT Client is not connected");
      }
    },
    [client, connected]
  );

  // Subscribe to a topic
  const subscribe = useCallback(
    (topic: string) => {
      if (client && connected) {
        client.subscribe(topic, (err) => {
          if (err) {
            console.error("Subscription error:", err);
          } else {
            console.info(`Subscribed to topic ${topic}`);
          }
        });
      } else {
        console.error("MQTT Client is not connected");
      }
    },
    [client, connected]
  );

  return { publishMessage, subscribe, connected };
};
