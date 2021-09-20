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
                    return MeteorCall('share', id, contentType, shareType, cleanPost, postTags, postMentions);
                } else {
                    return _clientShareMap[shareType](Meteor.userId(), sharedContent, contentType, shareType, cleanPost, postTags, postMentions);
                }
            }));
            resolve(results);
        } catch(error){
            reject(error);
        }
    });
}

export default ShareContent;
