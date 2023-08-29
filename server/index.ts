import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { setupSocket } from "./src/socket";

const app = express();
const PORT = 9000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

// sätta upp Socket.IO-funktionaliteten
setupSocket(server);

const start = () => {
  try {
    server.listen(PORT, () => {
      console.log(`Servern lyssnar på port: http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(`Ett fel uppstod vid start av servern: ${e}`);
    throw new Error("Något gick fel!");
  }
};

start();
