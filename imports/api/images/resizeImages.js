import Sharp from 'sharp';
//import Buffer from 'buffer';

const resize = 600;

const ResizeImage = (base64String) => {
    return new Promise(async (resolve, reject) => {
        const inputBuffer = Buffer.from(base64String, 'base64');
        const outputBuffer = await Sharp(inputBuffer)
            .resize(resize)
            .toBuffer()
            .catch((error) => {
                reject(error);
            });
        const outputBase64String = outputBuffer.toString('base64');
        resolve(outputBase64String)
    })
};
export default ResizeImage;
