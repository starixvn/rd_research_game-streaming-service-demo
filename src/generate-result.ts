const generateResult = () => {
    const home = [0, 1, 2, 3, 4];
    const away = [0, 1, 2, 3, 4];

    const homeIndex = Math.floor(Math.random() * home.length);
    const awayIndex = Math.floor(Math.random() * away.length);

    return { home: home[homeIndex], away: away[awayIndex] };
};

export default generateResult;
