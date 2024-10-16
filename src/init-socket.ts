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
        socket.emit("joinGame", gameStateInstance);
    });

    io.on("playAnimation", (data) => {
        console.log(data);
        io.emit("playAnimation", data);
    });

    return io;
};

const socketInstance = initSocket();
export default socketInstance;
