import express from "express";
import {
  getWebSocketUrl,
  storeMessage,
} from "../controllers/http.controller.js";

const routes = express.Router();

routes.route("/chat").post(storeMessage);
routes.route("/websocket-url").get(getWebSocketUrl);

export default routes;
