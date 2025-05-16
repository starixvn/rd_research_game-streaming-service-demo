import express from "express";
import cors from "cors";
import socketInstance from "./init-socket.js";
import startGameLoop from "../start-game-loop.js";
import gameStateInstance from "../states/game-state.js";
import privateStateInstance from "../states/private-state.js";
import { generateM3U8 } from "../helpers/generate-stream-file.js";

const expressInstance = express();
let increment = 0;
expressInstance.use(
  cors({
    origin: "*",
  }),
);

expressInstance.get("/", (_, res) => {
  res.send("Server is running!");
});

expressInstance.get("/setTime/:time", (req, res) => {
  gameStateInstance.currentTime = Number(req.params.time);
  privateStateInstance.changeTimeMoment = new Date();
  socketInstance.emit("syncVideo", gameStateInstance);
  if (privateStateInstance.timeoutId) {
    clearTimeout(privateStateInstance.timeoutId);
    const remainTime =
      gameStateInstance.totalDuration - gameStateInstance.currentTime;
    if (remainTime > 0) {
      console.log("New game will send after", remainTime);
      privateStateInstance.timeoutId = setTimeout(() => {
        startGameLoop();
      }, remainTime * 1000);
      res.send(`New game will send after ${remainTime}`);
    } else {
      res.send("Time is invalid");
    }
  }
});

expressInstance.get("/playlist.m3u8", (req, res) => {
  const m3u8Content = generateM3U8(increment);
  increment++;
  if (increment > 10) {
    increment = 0;
  }
  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  res.send(m3u8Content);
});

export default expressInstance;
