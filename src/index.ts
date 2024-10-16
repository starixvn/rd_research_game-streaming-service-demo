import socketInstance from "./init-socket.js";
import serverInstance from "./init-server.js";
import startGameLoop from "./start-game-loop.js";

socketInstance;
serverInstance.listen(5000);
await startGameLoop();
