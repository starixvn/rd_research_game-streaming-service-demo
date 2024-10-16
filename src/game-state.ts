import { GameState } from "./type.js";

const gameStateIntance: GameState = {
    timeStart: new Date(),
    result: {
        home: 0,
        away: 0,
    },
    videoUrl: {
        "720p": "",
        "240p": "",
    },
};

export default gameStateIntance;
