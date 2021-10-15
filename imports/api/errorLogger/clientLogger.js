import MeteorCall from '/imports/api/util/callPromise';

export const logError = async (error, stack, fileName) => {
    await MeteorCall('logError', error, stack, fileName)
    .catch((error) => {
        console.error("could not report error to the mothership; are you connected to the Internet?");
    });
}
