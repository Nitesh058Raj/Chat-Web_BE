import chalk from "chalk";
import cors from "cors";
import express from "express";

import routes from "./routes/routes.js";
import { debugLog } from "./utils/logging.util.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API WORKING FINE!");
});

app.listen(PORT, () => {
  debugLog(`Server is running on port ${chalk.green(PORT)}`);
});
