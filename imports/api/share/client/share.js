import _ from 'underscore';
import {Meteor} from 'meteor/meteor';
import MeteorCall from '/imports/api/util/callPromise';
import Link from '/imports/api/share/adapters/link';
import Embed from '/imports/api/share/adapters/embed';

const clientTypes = [
    "link",
    "embed"
];
const serverTypes = [
    "ostraka",
    "facebook",
    "instagram",
    "twitter"
];

const _clientShareMap = {
    link: Link,
    embed: Embed
};

const ShareContent = (sharedContent, contentType, shareToArray, cleanPost, postTags, postMentions) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await Promise.all(shareToArray.map((shareType) => {
                if(_.contains(serverTypes, shareType)){
                    return MeteorCall(
                        'share',
                        sharedContent._id,
                        sharedContent.type == 'shared' ? 'shared' : contentType,
                        shareType,
                        cleanPost,
                        postTags,
                        postMentions
                    );
                } else {
                    return _clientShareMap[shareType](Meteor.userId(), sharedContent, contentType, shareType, cleanPost, postTags, postMentions);
                }
            }));
            await MeteorCall(
                'notifyUserOfShare',
                `shared${contentType[0].toUpperCase() + contentType.slice(1)}`,
                sharedContent.userId || sharedContent.createdBy || sharedContent.postedById || sharedContent._id,
                sharedContent._id,
                contentType
            )
            .catch((error) => {
                console.log("NOTIFICATION ERROR:", error);
            });
            resolve(results);
        } catch(error){
            reject(error);
        }
    });
}

export default ShareContent;

export const iframeResizer = (viewId, sharedById) => {
    const frameId = viewId + sharedById;
    let height;
    const sendPostMessage = () => {
        if (document.getElementById(frameId) && height !== document.getElementById(frameId).offsetHeight) {
            height = document.getElementById(frameId).offsetHeight;
            window.parent.postMessage({
                frameHeight: height,
                frameId: frameId
            }, '*');
            console.log(height);
        }
    }
    return sendPostMessage;
};
