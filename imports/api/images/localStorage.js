/*

Convert base64 string data to image files then copy to webserver image root.
Currently saves to a directory and returns filepaths.  Update to move files to webserver
and return full URLs for serving images.
*/
import fs from 'fs';
import path from 'path';
import {Random} from 'meteor/random';
import RsyncFiles from '../util/rsyncFiles';
import ResizeImage from './resizeImages';

const imageRoot = process.env.APP_URL + '/user_images/';
const tempPath = '/home/dhoward/Storage/Projects/ostraka/images/';
const imageServerPath = 'dhoward@woorkhoorse.local:/mnt/worker2/Ostraka/user_images';

const StoreImages = async (userId, imageUrlArray) => {
    const imageUrls = [];
    if(!(imageUrlArray instanceof Array)) imageUrlArray = [imageUrlArray];
    const userImageDir = tempPath + userId;
    // create user image directory if it doesn't exist
    await fs.promises.stat(userImageDir)
    .catch(async (error) => {
        await fs.promises.mkdir(userImageDir);
    });
    const localPaths = await Promise.all(imageUrlArray.map((image) => {
        return new Promise(async (resolve, reject) => {
            try {
                const imageExtension = image.substring(image.indexOf('/') + 1, image.indexOf(';base64'));
                // strip off the data: url prefix to get just the base64-encoded bytes
                const data = image.replace(/^data:image\/\w+;base64,/, "");
                const imageName = Random.id() + "." + imageExtension;
                const imageTempPath = path.resolve(userImageDir, imageName);
                // resize image
                const resizedData = await ResizeImage(data)
                    .catch((error) => {
                        console.error("Image Resize Error:", error);
                    });
                await fs.promises.writeFile(imageTempPath, resizedData, 'base64');
                imageUrls.push(imageRoot + userId + '/' + imageName);
                resolve(imageTempPath);
            } catch(error){
                reject(error);
            }
        });
    }));
    await RsyncFiles(userImageDir, imageServerPath);
    // Remove temp files after rsync.
    await fs.promises.rmdir(userImageDir, {recursive: true});
    return imageUrls;
};
export default StoreImages;
