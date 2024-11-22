import appConfig from "../config.js";
import countCharacters from "./count-characters.js";

const generateResult = () => {
    const results = Object.keys(appConfig["results"]);
    const randomResultIndex = Math.floor(Math.random() * results.length);
    const result = results[randomResultIndex];
    const characterCounts = countCharacters(result);
    const home = characterCounts["H"];
    const away = characterCounts["A"];

    return {
        home: home,
        away: away,
        result: result,
        numberOfVideos: appConfig["results"][result],
    };
};

export default generateResult;
