import { VideoResolution } from "./constant.js";

export type VideoInformation = {
    home: number;
    away: number;
    resolution: VideoResolution;
};

export type GameState = {
    timeStart: Date;
    result: {
        home: number;
        away: number;
    };
    videoUrl: {
        "720p": string;
        "240p": string;
    };
    totalDuration: number;
    currentTime: number;
};

export type PrivateState = {
    timeoutId?: NodeJS.Timeout;
};
