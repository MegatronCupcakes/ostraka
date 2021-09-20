import {Meteor} from "meteor/meteor";
import {check, Match} from 'meteor/check';
import {createShareUrl} from '/imports/api/share/createShareUrl';
import {ostrakaShare} from '/imports/api/share/adapters/ostraka';
import {facebookShare} from '/imports/api/share/adapters/facebook';
import {instagramShare} from '/imports/api/share/adapters/instagram';
import {twitterShare} from '/imports/api/share/adapters/twitter';

const _shareTypeMap = {
    ostrakaShare: ostrakaShare,
    facebookShare: facebookShare,
    instagramShare: instagramShare,
    twitterShare: twitterShare
};

Meteor.methods({
    share: async function(sharedId, sharedContentType, shareType, caption, tags, mentions){
        check(sharedId, String);
        check(sharedContentType, String); // post, comment, tag, or profile
        check(shareToArray, [String]);
        check(caption, String);
        check(tags, [String]);
        check(mentions, [String]);

        const userId = this.userId;
        return _shareTypeMap[`${shareType}Share`](userId, sharedId, sharedContentType, shareToArray, caption, tags, mentions);
    },
    createShareUrl: async function(contentType, id, userId){
        check(contentType, String);
        check(id, String);
        check(userId, String);
        
        return await createShareUrl(contentType, id, userId);
    }
});
