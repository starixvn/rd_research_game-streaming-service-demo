import express from "express";
import cors from "cors";
import gameStateInstance from "./game-state.js";
import socketInstance from "./init-socket.js";
import privateStateInstance from "./private-state.js";
import startGameLoop from "./start-game-loop.js";

const expressInstance = express();
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
    socketInstance.emit("syncVideo", gameStateInstance.currentTime);
    if (privateStateInstance.timeoutId) {
        clearTimeout(privateStateInstance.timeoutId);
        const remainTime =
            gameStateInstance.totalDuration - gameStateInstance.currentTime;
        if (remainTime > 0) {
            console.log("Will send after", remainTime);
            privateStateInstance.timeoutId = setTimeout(() => {
                startGameLoop();
            }, remainTime * 1000);
            res.send(`Will send after ${remainTime}`);
        } else {
            res.send("Time is invalid");
        }
    }
});

export default expressInstance;
