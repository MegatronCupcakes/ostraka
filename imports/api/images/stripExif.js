import exifStripper from 'exif-stripper';

const StripExifData = (imageUrlArray) => {
    if(!(imageUrlArray instanceof Array)) imageUrlArray = [imageUrlArray];
    return new Promise(async (resolve, reject) => {
        try {
            const strippedUrls = await Promise.all(imageUrlArray.map((url) => {
                return exifStripper.strip(url);
            }));
            resolve(strippedUrls.map(({url}, index) => {
                if(url){
                    return url;
                } else {
                    return imageUrlArray[index];
                }
            }));
        } catch(error){
            reject(error);
        }
    });
};
export default StripExifData;
