import { Parser } from "m3u8-parser";
import { VideoResolution } from "./constant.js";
import gameStateInstance from "./game-state.js";
import generateResult from "./generate-result.js";
import socketInstance from "./init-socket.js";
import getVideoUrl from "./init-video.js";
import players from "./players.js";

const startGameLoop = async () => {
    if (players.length < 1) {
        console.log("no players", players);
        setTimeout(() => {
            startGameLoop();
        }, 1000);
        return;
    }

    const { home, away } = generateResult();
    const videoUrl = getVideoUrl({
        home,
        away,
        resolution: VideoResolution["720p"],
    });
    const propertiesRequest = await fetch(videoUrl);
    const properties = await propertiesRequest.text();
    var parser = new Parser();
    parser.push(properties);
    parser.end();
    const segments = parser.manifest.segments as { duration: number }[];
    const totalDuration = Math.ceil(
        segments.reduce((acc, segment) => acc + segment.duration, 0),
    );

    gameStateInstance.timeStart = new Date();
    gameStateInstance.result = {
        home,
        away,
    };

    gameStateInstance.videoUrl = {
        "720p": videoUrl,
        "240p": getVideoUrl({
            home,
            away,
            resolution: VideoResolution["240p"],
        }),
    };

    console.log("sendGameResult", gameStateInstance);
    socketInstance.emit("gameResult", gameStateInstance);

    console.log("Will send after ", totalDuration);
    setTimeout(() => {
        startGameLoop();
    }, totalDuration * 1000);
};

export default startGameLoop;
