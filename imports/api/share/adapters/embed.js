import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MeteorCall from '/imports/api/util/callPromise';
import ParseUri from '/imports/api/util/parseUri';
import {postContent} from '/imports/components/feed/postView';

const Embed = (userId, sharedContent, contentType, shareType, cleanPost, postTags, postMentions) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contentLink = await MeteorCall('createShareUrl', contentType, sharedContent._id, userId);
            const parsedUri = ParseUri(contentLink);
            const embed = `<div data-url="${contentLink}&embed"><script src="${parsedUri.protocol}://${parsedUri.host}:${parsedUri.port}/scripts/ostraka-embed.js"></script></div>`;
            resolve({
                shareType: "embed",
                dataUrl: `${contentLink}&embed`,
                scriptUrl: `${parsedUri.protocol}://${parsedUri.host}:${parsedUri.port}/scripts/ostraka-embed.js`
            })
        } catch(error){
            reject(error);
        }
    });
};
export default Embed;
