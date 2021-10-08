import MeteorCall from '/imports/api/util/callPromise';

const Link = (userId, sharedContent, contentType, shareType, cleanPost, postTags, postMentions) => {
    return new Promise(async (resolve, reject) => {
        const link = await MeteorCall("createShareUrl", contentType, sharedContent._id, userId).catch((error) => {reject(error)});
        resolve({
            shareType: "link",
            link: link
        });
    })
};

export default Link;
