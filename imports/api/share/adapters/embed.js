import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MeteorCall from '/imports/api/util/callPromise';
import {postContent} from '/imports/components/feed/postView';


const Embed = (userId, sharedContent, contentType, shareType, cleanPost, postTags, postMentions) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contentLink = await MeteorCall('createShareUrl', contentType, sharedContent._id, userId);
            const viewString = contentLink.substr(contentLink.indexOf("?") + 1);
            const viewId = viewString.split("&")[0];
            const embeddedShare = (
                <iframe
                    id={viewId}
                    title="Straight from Ostraka"
                    src={`${contentLink}&embed`}
                />
            );
            const embed = ReactDOMServer.renderToStaticMarkup(embeddedShare);
            console.log("EMBED:", embed);
            resolve(embed)
        } catch(error){
            reject(error);
        }
    });
};
export default Embed;
