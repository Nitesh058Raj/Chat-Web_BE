import { kafka, topic } from "../configs/kafka.js";

// HTTP request handler

// Store a message to a Kafka topic
export const storeMessage = (req, res) => {
  const data = req.body;
  try {
    _storeMessage(topic, data);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "Internal Server Error",
      message: error.message,
    });
  }
  res.status(200).json({
    statusCode: 200,
    status: "OK",
    message: "Message sent successfully",
  });
};

/**
 *
 * @param {string} topic
 * @param {object} data
 */

async function _storeMessage(topic, data) {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(data) }],
  });
  await producer.disconnect();
}

// Get the WebSocket URL
export const getWebSocketUrl = (req, res) => {
  const webSocketUrl = `ws://${req.headers.host}`;
  res.status(200).json({
    statusCode: 200,
    status: "OK",
    message: "WebSocket URL received successfully",
    data: webSocketUrl,
  });
};
