import WebSocket from "ws";
import { kafka, topic, groupId } from "../configs/kafka.js";

// WebSocket request handler

// startConsumer function to consume messages from Kafka and
// broadcast them to all connected WebSocket clients
export async function startConsumer(wss) {
  const consumer = kafka.consumer({ groupId: groupId });
  await consumer.connect();
  await consumer.subscribe({ topic });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      var decodedMessage;
      try {
        decodedMessage = JSON.parse(message.value.toString());
      } catch (error) {
        decodedMessage = message.value.toString();
      }

      // Broadcast the message to all connected WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify((message = decodedMessage.data)));
        }
      });
    },
  });
}

export async function storeMessage(data) {
  try {
    await _sendMessageToProducer(topic, data);
  } catch (error) {
    debugLog("Error: " + error);
    throw error;
  }
}

async function _sendMessageToProducer(topic, data) {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify({ data: data }) }],
  });
  await producer.disconnect();
}
