import chalk from "chalk";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";

import { storeMessage, startConsumer } from "./controllers/ws.controller.js";
import routes from "./routes/routes.js";
import { debugLog } from "./utils/logging.util.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use("/api", routes);
app.use(errorMiddleware);

const server = http.createServer(app); // Create an HTTP server
const wss = new WebSocketServer({ server }); // Create a WebSocket server attached to the HTTP server

// Add WebSocket server to the startConsumer function's scope
startConsumer(wss);

// Handle incoming WebSocket messages from clients
wss.on("connection", (ws) => {
  debugLog("WebSocket client connected");

  ws.on("message", (message) => {
    message = JSON.parse(message);
    storeMessage(message);
  });

  ws.on("close", () => {
    debugLog("WebSocket client disconnected");
  });

  ws.on("error", (error) => {
    debugLog("Error: " + error);
  });
});

app.get("/test", (req, res) => {
  res.send("API WORKING FINE!");
});

server.listen(PORT, () => {
  debugLog(`Server is running on port ${chalk.green(PORT)}`);
});
