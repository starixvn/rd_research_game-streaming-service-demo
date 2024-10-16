import { Server } from "socket.io";
import serverInstance from "./init-server.js";
import { addPlayer, removePlayer } from "./players.js";
import gameStateInstance from "./game-state.js";

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
        socket.emit("joinGame", {
            ...gameStateInstance,
            timeSend: new Date(),
        });
        socket.on("syncVideo", (socketId) => {
            console.log("syncVideo", socketId);
            const now = new Date();
            socket.emit("syncVideo", {
                ...gameStateInstance,
                timeSend: now,
                now:
                    Math.abs(
                        now.getTime() - gameStateInstance.timeStart.getTime(),
                    ) / 1000,
            });
        });
    });

    return io;
};

const socketInstance = initSocket();
export default socketInstance;
