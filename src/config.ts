import fs from "fs/promises";
const getAppConfig = async () => {
    const appConfigRaw = await fs.readFile("configs.json", "utf8");
    return JSON.parse(appConfigRaw);
};

const appConfig = await getAppConfig();

export default appConfig;
