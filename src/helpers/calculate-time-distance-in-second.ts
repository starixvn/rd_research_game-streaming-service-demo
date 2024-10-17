const calculateTimeDistanceInSecond = (
    timeStart: Date,
    timeEnd: Date,
): number => Math.abs((timeEnd.getTime() - timeStart.getTime()) / 1000);

export default calculateTimeDistanceInSecond;
