import {createPost} from '/imports/api/post/postCollection';
import {createShareUrl} from '/imports/api/share/createShareUrl';

export const ostrakaShare = (userId, sharedId, sharedContentType, shareToArray, caption, tags, mentions) => {
    return new Promise(async (resolve, reject) => {
        try {
            const shareUrl = await createShareUrl(sharedContentType, sharedId, userId);
            //await createPost(userId, post);
            console.log("CREATING SHARED POST:", userId, sharedId, sharedContentType, shareToArray, caption, tags, mentions, shareUrl);
            resolve();
        } catch(error){
            reject(error);
        }
    });
};
