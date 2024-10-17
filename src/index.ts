import socketInstance from "./network-instances/init-socket.js";
import serverInstance from "./network-instances/init-server.js";
import startGameLoop from "./start-game-loop.js";

socketInstance;
serverInstance.listen(5000);
await startGameLoop();
