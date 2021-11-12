import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check';
import {logError} from '/imports/api/errorLogger/errorLogger';
import {notifyUser} from '/imports/api/notifications/notify';

Meteor.methods({
    followUser: async function(followedId){
        check(followedId, String);
        this.unblock();
        const followingId = this.userId;
        return await new Promise((resolve, reject) => {
            try {
                if(followingId !== followedId){
                    const followed = Meteor.users.findOne({_id: followedId}, {fields: {followed: {$in: [followingId, "$followedBy"]}}});
                    if(followed.followed){
                        // currently following user; unfollow.
                        Meteor.users.update({_id: followingId},{$pull: {followedUsers: followedId}});
                        Meteor.users.update({_id: followedId},{$pull: {followedBy: followingId}});
                        // NOTIFY
                        notifyUser(followedId, 'unfollowed', {userId: followingId})
                        .catch((error) => {
                            reject();
                        })
                        .then(() => {
                            resolve();
                        });
                    } else {
                        // not currently following user; follow.
                        Meteor.users.update({_id: followingId},{$addToSet: {followedUsers: followedId}});
                        Meteor.users.update({_id: followedId},{$addToSet: {followedBy: followingId}});
                        // NOTIFY
                        notifyUser(followedId, 'followed', {userId: followingId})
                        .catch((error) => {
                            reject();
                        })
                        .then(() => {
                            resolve();
                        });
                    }
                }
            } catch(error){
                logError(followingId, error, __filename, new Error().stack);
                reject(error);
            }
        });
    }
});
