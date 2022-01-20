import {Meteor} from "meteor/meteor";
import {check, Match} from 'meteor/check';
import Rules from '/imports/api/rules/rules';

import PostCollection from '/imports/api/post/postCollection';
import CommentCollection from '/imports/api/comments/commentCollection';

import {logError} from '/imports/api/errorLogger/errorLogger';
import {createShareUrl} from '/imports/api/share/createShareUrl';
import {notifyUser} from '/imports/api/notifications/notify';
import {ostrakaShare} from '/imports/api/share/adapters/ostraka';
import {facebookShare} from '/imports/api/share/adapters/facebook';
import {instagramShare} from '/imports/api/share/adapters/instagram';
import {twitterShare} from '/imports/api/share/adapters/twitter';
import {capitalizeFirstLetter} from '/imports/api/util/capitalize';

const _shareTypeMap = {
    ostrakaShare: ostrakaShare,
    facebookShare: facebookShare,
    instagramShare: instagramShare,
    twitterShare: twitterShare
};

Meteor.methods({
    share: async function(sharedId, sharedContentType, shareType, caption, tags, mentions){
        check(sharedId, String);
        check(sharedContentType, String); // post, comment, tag, profile, shared
        check(shareType, String);
        check(caption, String);
        check(tags, [String]);
        check(mentions, [String]);

        console.log("sharedId:", sharedId, "; sharedContentType:", sharedContentType, "; shareType:", shareType);

        const userId = this.userId;
        return _shareTypeMap[`${shareType}Share`](userId, sharedId, sharedContentType, shareType, caption, tags, mentions);
    },
    createShareUrl: async function(contentType, id, userId){
        check(contentType, String);
        check(id, String);
        check(userId, String);

        return await createShareUrl(contentType, id, userId);
    },
    notifyUserOfShare: async function(type, notificationUserId, sharedId, sharedContentType){
        check(type, String);
        check(notificationUserId, String);
        check(sharedId, String);
        check(sharedContentType, String);
        const userId = this.userId;
        // apply rules
        const rules = new Rules();
        await rules.apply('share', userId, notificationUserId, sharedId, sharedContentType)
        .catch((error) => logError(userId, error, __filename, new Error().stack));
        // notify
        let _collection;
        switch(sharedContentType.toLowerCase()){
            case 'comment':
                _collection = CommentCollection;
                break;
            case 'post':
                _collection = PostCollection;
                break;
            case 'profile':
                _collection = Meteor.users();
        };
        const payload = _collection.findOne({_id: sharedId});
        //notifyUser(triggeringUserId, notificationType, payload)
        return await notifyUser(userId, `shared${capitalizeFirstLetter(sharedContentType)}`, payload)
        .catch((error) => {
            const _error = error;
            console.error(_error);
            logError(userId, _error, __filename, new Error().stack);
        })
    }
});
