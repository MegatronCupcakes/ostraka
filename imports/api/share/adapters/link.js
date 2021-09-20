import MeteorCall from '/imports/api/util/callPromise';

const Link = (userId, sharedContent, contentType, shareType, cleanPost, postTags, postMentions) => {
    return MeteorCall("createShareUrl", contentType, sharedContent._id, userId);
};

export default Link;
