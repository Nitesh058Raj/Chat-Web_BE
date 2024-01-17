import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "chat-web-backend-01",
  brokers: ["192.168.59.115:9092"],
});

const topic = "chat";
const groupId = "chat";

export { kafka, topic, groupId };
