import appConfig from "./config.js";
import { VideoInformation } from "./type.js";

const getVideoUrl = ({ home, away, resolution }: VideoInformation) => {
    const videoUrl = new URL(
        `football_marble_${home}-${away}_${resolution}.m3u8`,
        appConfig.liveStreamServer,
    );

    return videoUrl.toString();
};

export default getVideoUrl;
