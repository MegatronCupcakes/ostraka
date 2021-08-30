/*

Resize Image, convert base64 string data to image file, then copy to webserver image root.
Returns Promise.

*/
import fs from 'fs';
import path from 'path';
import {Random} from 'meteor/random';
import RsyncFiles from '../util/rsyncFiles';
import ResizeImage from './resizeImages';

const imageRoot = process.env.APP_URL + JSON.parse(process.env.images).localSettings.imageRoot;
const tempPath = JSON.parse(process.env.images).localSettings.tempPath;
const imageServerPath = JSON.parse(process.env.images).localSettings.serverPath;

const LocalStoreImages = async (userId, imageUrlArray) => {
    return new Promise(async (resolve, reject) => {
        try {
            const imageUrls = [];
            if(!(imageUrlArray instanceof Array)) imageUrlArray = [imageUrlArray];
            const userImageDir = tempPath + userId;
            // create user image directory if it doesn't exist
            await fs.promises.stat(userImageDir)
            .catch(async (error) => {
                await fs.promises.mkdir(userImageDir);
            });
            const localPaths = await Promise.all(imageUrlArray.map((image) => {
                return new Promise(async (_resolve, _reject) => {
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
                        _resolve(imageTempPath);
                    } catch(_error){
                        _reject(_error);
                    }
                });
            }));
            console.log("userImageDir:", userImageDir);
            console.log("imageServerPath:", imageServerPath);
            await RsyncFiles(userImageDir, imageServerPath);
            // Remove temp files after rsync.
            await fs.promises.rmdir(userImageDir, {recursive: true});
            resolve(imageUrls);
        } catch(error){
            reject(error);
        }
    });
};
export default LocalStoreImages;
