import express from "express";
import cors from "cors";

const expressInstance = express();
expressInstance.use(
    cors({
        origin: "*",
    }),
);

expressInstance.get("/", (_, res) => {
    res.send("Server is running!");
});

export default expressInstance;
