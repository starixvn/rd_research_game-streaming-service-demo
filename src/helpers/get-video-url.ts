import appConfig from "../config.js";
import { VideoInformation } from "../type.js";
import * as crypto from "crypto";

const getVideoUrl = ({
    result,
    numberOfVideos,
    resolution,
}: VideoInformation) => {
    const videoIndex =
        numberOfVideos > 1
            ? Math.floor(Math.random() * (numberOfVideos - 1))
            : 1;
    const videoName = crypto
        .createHash("md5")
        .update(`${result}-${videoIndex}`)
        .digest("hex");
    const videoUrl = new URL(
        `${videoName}_${resolution}.m3u8`,
        appConfig.liveStreamServer,
    );

    return videoUrl.toString();
};

export default getVideoUrl;
