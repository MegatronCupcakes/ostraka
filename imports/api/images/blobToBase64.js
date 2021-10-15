import {logError} from '/imports/api/errorLogger/clientLogger';

const BlobToBase64 = async (blobArray) => {
    if(!(blobArray instanceof Array)) blobArray = [blobArray];
    return await Promise.all(blobArray.map((blob) => {
        return new Promise(async (resolve, reject) => {
            try {
                // if passed an Object URL, fetch the Object URL and convert to Blob
                if(!(blob instanceof Blob)) blob = await fetch(blob).then(response => response.blob());
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function(){
                    resolve(reader.result);
                }
            } catch(error){
                logError(error, __filename, new Error().stack);
                reject(error);
            }
        });
    }));
}
export default BlobToBase64;
