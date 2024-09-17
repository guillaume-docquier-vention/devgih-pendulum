import mqtt from "mqtt";
import dotenv from "dotenv";
import { handleMessage } from "../handlers/messageHandler";

dotenv.config();

const mqttBrokerUrl = process.env.MQTT_BROKER_URL ?? "";
const mqttBrokerTopic = process.env.MQTT_TOPIC ?? "";
const client = mqtt.connect(mqttBrokerUrl);

client.on("connect", () => {
  console.info(`MQTT Client Connected to ${mqttBrokerUrl}`);
  client.subscribe(mqttBrokerTopic, (err) => {
    if (err) {
      console.error("Subscription error:", err);
    } else {
      console.info(`Subscribed to topic ${mqttBrokerTopic}`);
    }
  });
});

client.on("error", (err) => {
  console.error("MQTT Client Error:", err);
});

client.on("message", (topic, message) => {
  if (topic === mqttBrokerTopic) {
    switch (message.toString()) {
      case "STOP":
        handleMessage("STOP");
        break;
      case "PAUSE":
        handleMessage("PAUSE");
        break;
      case "RESUME":
        handleMessage("RESUME");
        break;
      default:
        break;
    }
  }
});

export const publishMessage = (topic: string, message: string) => {
  if (client.connected) {
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
};
export default client;
