import { Parser } from "m3u8-parser";
import { VideoResolution } from "./constant.js";
import gameStateInstance from "./states/game-state.js";
import generateResult from "./helpers/generate-result.js";
import getVideoUrl from "./helpers/get-video-url.js";
import socketInstance from "./network-instances/init-socket.js";
import players from "./states/players.js";
import privateStateInstance from "./states/private-state.js";

const startGameLoop = async () => {
    if (players.length < 1) {
        console.log("no players", players);
        privateStateInstance.timeoutId = setTimeout(() => {
            startGameLoop();
        }, 1000);
        return;
    }

    const { home, away, result, numberOfVideos } = generateResult();
    const videoUrl = getVideoUrl({
        result,
        numberOfVideos,
        resolution: VideoResolution["720p"],
    });
    try {
        await fetch(videoUrl);
    } catch (e) {
        console.log(e);
        privateStateInstance.timeoutId = setTimeout(() => {
            startGameLoop();
        }, 1000);
        return;
    }
    const propertiesRequest = await fetch(videoUrl);
    const properties = await propertiesRequest.text();
    var parser = new Parser();
    parser.push(properties);
    parser.end();
    const segments = parser.manifest.segments as { duration: number }[];
    const totalDuration = Math.ceil(
        segments.reduce((acc, segment) => acc + segment.duration, 0),
    );
    const now = new Date();
    gameStateInstance.timeStart = now;
    privateStateInstance.changeTimeMoment = now;
    gameStateInstance.result = {
        home,
        away,
    };
    gameStateInstance.currentTime = 0;

    gameStateInstance.videoUrl = {
        "720p": videoUrl,
        "240p": getVideoUrl({
            result,
            numberOfVideos,
            resolution: VideoResolution["240p"],
        }),
    };
    gameStateInstance.totalDuration = totalDuration;

    console.log("sendGameResult", gameStateInstance);
    socketInstance.emit("gameResult", gameStateInstance);

    console.log("New game will send after", totalDuration);

    privateStateInstance.timeoutId = setTimeout(() => {
        startGameLoop();
    }, totalDuration * 1000);
};

export default startGameLoop;
