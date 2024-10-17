import { Server } from "socket.io";
import serverInstance from "./init-server.js";
import { addPlayer, removePlayer } from "../states/players.js";
import gameStateInstance from "../states/game-state.js";
import calculateTimeDistanceInSecond from "../helpers/calculate-time-distance-in-second.js";
import privateStateInstance from "../states/private-state.js";

const initSocket = () => {
    const io = new Server(serverInstance, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        addPlayer(socket.id);
        socket.on("disconnect", () => {
            removePlayer(socket.id);
        });
        const now = new Date();
        socket.emit("joinGame", {
            ...gameStateInstance,
            timeSend: now,
            currentTime:
                gameStateInstance.currentTime +
                calculateTimeDistanceInSecond(
                    now,
                    privateStateInstance.changeTimeMoment ??
                        gameStateInstance.timeStart,
                ),
        });
        socket.on("syncVideo", (socketId) => {
            console.log("syncVideo", socketId);
            const now = new Date();
            socket.emit("syncVideo", {
                ...gameStateInstance,
                timeSend: now,
                currentTime:
                    gameStateInstance.currentTime +
                    calculateTimeDistanceInSecond(
                        now,
                        privateStateInstance.changeTimeMoment ??
                            gameStateInstance.timeStart,
                    ),
            });
        });
    });

    return io;
};

const socketInstance = initSocket();
export default socketInstance;
