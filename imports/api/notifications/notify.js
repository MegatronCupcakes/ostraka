import {Meteor} from "meteor/meteor";
import {check, Match} from 'meteor/check';
import _ from 'underscore';
import {logError} from '/imports/api/errorLogger/errorLogger';
import {getSettings} from '/imports/api/settings/getSettings';
import {createNotification} from '/imports/api/notifications/notificationCollection';

/*
    triggeringUserId: String (identifying the user whose action triggered the notification)
    notificationType: String. possible values:
        [
            "commented",
            "likePost",
            "unlikePost",
            "dislikePost",
            "undislikePost",
            "likeComment",
            "unlikeComment",
            "dislikeComment",
            "undislikeComment",
            "sharedPost",
            "sharedComment",
            "sharedProfile",
            "ostracizeVote",
            "scoreCritical",
            "followed",
            "unfollowed"
            "sharedTag",
            "followedTag",
            "unfollowedTag",
            "postWithFollowedTag",
            "mentionedPost",
            "mentionedComment"
        ]
    payload: Post, Profile, Comment, or Vote
*/
export const notifyUser = (triggeringUserId, notificationType, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const notifiedUserId = payload.postedById || payload.userId;
            const userNotificationPreferences = getSettings(payload.userId).notifications;
            // create notification if the triggering user is not the same as the user to be notified
            // AND the user to be notified has notifications enabled for this type of notification.
            if(notifiedUserId !== triggeringUserId && userNotificationPreferences[notificationType]){
                // assemble notification
                let notification;
                const triggeringUser = Meteor.users.findOne({_id: triggeringUserId},{fields: {viewId: 1, profile: 1}});
                // using "case fall-through" to trigger shared actions for related notificationTypes
                switch(notificationType){
                    // posts
                    case 'likePost':
                    case 'unlikePost':
                    case 'dislikePost':
                    case 'undislikePost':
                    case 'sharedPost':
                    case 'commented':
                        notification = await _postNotification(notifiedUserId, triggeringUser, notificationType, payload);
                        break;
                    // comments
                    case 'likeComment':
                    case 'unlikeComment':
                    case 'dislikeComment':
                    case 'undislikeComment':
                    case 'sharedComment':
                        notification = await _commentNotification(notifiedUserId, triggeringUser, notificationType, payload);
                        break;
                    // profiles
                    case 'sharedProfile':
                    case 'ostracizeVote':
                    case 'scoreCritical':
                    case 'followed':
                    case 'unfollowed':
                        notification = await _profileNotification(notifiedUserId, triggeringUser, notificationType, payload);
                        break;
                    // tags
                    case 'sharedTag':
                    case 'followedTag':
                    case 'unfollowedTag':
                    case 'postWithTag':
                    case 'commentWithTag':
                    case 'postWithFollowedTag':
                    case 'commentWithFollowedTag':
                        notification = await _tagNotification(notifiedUserId, triggeringUser, notificationType, payload);
                        break;
                    case 'mentionedPost':
                    case 'mentionedComment':
                        notification = await _mentionNotification(notifiedUserId, triggeringUser, notificationType, payload);
                        break;
                };
                // create notification
                createNotification(notification)
                .catch((error) => {
                    logError(triggeringUserId, error, __filename, new Error().stack);
                    reject(error);
                })
                .then(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        } catch(error){
            logError(triggeringUserId, error, __filename, new Error().stack);
            reject(error);
        }
    });
};

const _postNotification = (notifiedUserId, triggeringUser, notificationType, payload) => {
    return new Promise((resolve, reject) => {
        try {
            let verb;
            switch(notificationType){
                case 'likePost':
                    verb = 'liked';
                    break;
                case 'unlikePost':
                    verb = 'unliked';
                    break;
                case 'dislikePost':
                    verb = 'disliked';
                    break;
                case 'undislikePost':
                    verb = 'undisliked';
                    break;
                case 'sharedPost':
                    verb = 'shared';
                    break;
                case 'commented':
                    verb = 'commented on';
                    break;
            }
            const notification =  {
                userId: notifiedUserId,
                triggeringUserId: triggeringUser._id,
                triggeringUserViewId: triggeringUser.viewId,
                subject: `@${triggeringUser.profile.profileTag} ${verb} your post`,
                body: `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) ${verb} your post: "${payload.caption}"`,
                navTo: {
                    navState: 'PostView',
                    viewContent: payload._id,
                    activeTag: null
                }
            };
            resolve(notification);
        } catch(error){
            reject(error);
        }
    });
};
const _commentNotification = (notifiedUserId, triggeringUser, notificationType, payload) => {
    return new Promise((resolve, reject) => {
        try {
            let verb;
            switch(notificationType){
                case 'likeComment':
                    verb = 'liked';
                    break;
                case 'unlikeComment':
                    verb = 'unliked';
                    break;
                case 'dislikeComment':
                    verb = 'disliked';
                    break;
                case 'undislikeComment':
                    verb = 'undisliked';
                    break;
                case 'sharedComment':
                    verb = 'shared';
                    break;
            }
            const notification = {
                userId: notifiedUserId,
                triggeringUserId: triggeringUser._id,
                triggeringUserViewId: triggeringUser.viewId,
                subject: `@${triggeringUser.profile.profileTag} ${verb} your post`,
                body: `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) ${verb} your post: "${payload.caption}"`,
                navTo: {
                    navState: 'CommentView',
                    viewContent: payload._id,
                    activeTag: null
                }
            };
            resolve(notification);
        } catch(error){
            reject(error);
        }
    });
};
const _profileNotification = (notifiedUserId, triggeringUser, notificationType, payload) => {
    return new Promise((resolve, reject) => {
        try {
            let _subject;
            let _body;
            switch(notificationType){
                case 'sharedProfile':
                    _subject = `@${triggeringUser.profile.profileTag} shared your profile`;
                    _body = `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) shared your profile`;
                    break;
                case 'ostracizeVote':
                    _subject = `@${triggeringUser.profile.profileTag} voted to ostracize you`;
                    _body = `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) voted to ostracize you`;
                    break;
                case 'scoreCritical':
                    _reputationScore = Meteor.users.findOne({_id: payload.postedById},{fields: {reputationScore: 1}}).reputationScore;
                    _subject = 'your reputation score has reached a critical level';
                    _body = `your reputation score has reached a critical level (${_reputationScore})`;
                    break;
                case 'followed':
                    _subject = `@${triggeringUser.profile.profileTag} is now following you`;
                    _body = `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) is now following you`;
                    break;
                case 'unfollowed':
                    _subject = `@${triggeringUser.profile.profileTag} is no longer following you`;
                    _body = `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) is no longer following you`;
                    break;
            }
            const notification = {
                userId: notifiedUserId,
                triggeringUserId: triggeringUser._id,
                triggeringUserViewId: triggeringUser.viewId,
                subject: _subject,
                body: _body,
                navTo: {
                    navState: 'Profile',
                    viewContent: payload.postedById  || payload.userId,
                    activeTag: null
                }
            };
            resolve(notification);
        } catch(error){
            reject(error);
        }
    });
};
const _tagNotification = (notifiedUserId, triggeringUser, notificationType, payload) => {
    return new Promise((resolve, reject) => {
        try {
            let _subject;
            let _body;
            switch(notificationType){
                case 'sharedTag':
                    _subject = `@${triggeringUser.profile.profileTag} shared #${payload.tag}`;
                    _body = `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) shared a topic you created (#${payload.tag})`;
                    break;
                case 'followedTag':
                    _subject = `@${triggeringUser.profile.profileTag} followed #${payload.tag}`;
                    _body = `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) followed a topic you created (#${payload.tag})`;
                    break;
                case 'unfollowedTag':
                    _subject = `@${triggeringUser.profile.profileTag} unfollowed #${payload.tag}`;
                    _body = `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) unfollowed a topic you created (#${payload.tag})`;
                    break;
                case 'postWithTag':
                    _subject = `@${triggeringUser.profile.profileTag} posted with #${payload.tag}`;
                    _body = `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) posted with a topic you created (#${payload.tag})`;
                    break;
                case 'commentWithTag':
                    _subject = `@${triggeringUser.profile.profileTag} commented with #${payload.tag}`;
                    _body = `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) commented with a topic you created (#${payload.tag})`;
                    break;
                case 'postWithFollowedTag':
                    _subject = `@${triggeringUser.profile.profileTag} posted with #${payload.tag}`;
                    _body = `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) posted with a topic you follow (#${payload.tag})`;
                    break;
                case 'commentWithFollowedTag':
                    _subject = `@${triggeringUser.profile.profileTag} commented with  #${payload.tag}`;
                    _body = `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) commented with a topic you follow (#${payload.tag})`;
                    break;
            }
            const notification = {
                userId: notifiedUserId,
                triggeringUserId: triggeringUser._id,
                triggeringUserViewId: triggeringUser.viewId,
                subject: _subject,
                body: _body,
                navTo: {
                    navState: 'TagView',
                    viewContent: payload,
                    activeTag: null,
                    tags: [payload]
                }
            };
            resolve(notification);
        } catch(error){
            reject(error);
        }
    });
};
const _mentionNotification = (notifiedUserId, triggeringUser, notificationType, payload) => {
    return new Promise((resolve, reject) => {
        try {
            let _mentionedWhere;
            let _navTo;
            switch(notificationType){
                case 'mentionedPost':
                    _mentionedWhere = 'post';
                    _navTo = {
                        navState: 'PostView',
                        viewContent: payload._id,
                        activeTag: null
                    };
                    break;
                case 'mentionedComment':
                    _mentionedWhere = 'comment';
                    _navTo = {
                        navState: 'CommentView',
                        viewContent: payload._id,
                        activeTag: null
                    };
                    break;
            }
            const notification =  {
                userId: notifiedUserId,
                triggeringUserId: triggeringUser._id,
                triggeringUserViewId: triggeringUser.viewId,
                subject: `@${triggeringUser.profile.profileTag} mentioned you in a ${_mentionedWhere}`,
                body: `${triggeringUser.profile.firstName} ${triggeringUser.profile.lastName} (@${triggeringUser.profile.profileTag}) mentioned you in a ${_mentionedWhere}`,
                navTo: _navTo
            };
            resolve(notification);
        } catch(error){
            reject(error);
        }
    });
};
