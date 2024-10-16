import { createServer } from "http";
import expressInstance from "./init-express.js";

const serverInstance = createServer(expressInstance);

export default serverInstance;
