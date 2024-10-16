import { GameState } from "./type.js";

const gameStateInstance: GameState = {
    timeStart: new Date(),
    result: {
        home: 0,
        away: 0,
    },
    videoUrl: {
        "720p": "",
        "240p": "",
    },
    totalDuration: 0,
};

export default gameStateInstance;
