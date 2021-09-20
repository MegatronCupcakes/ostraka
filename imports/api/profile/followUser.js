import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check';

Meteor.methods({
    followUser: async function(followedId){
        this.unblock();
        check(followedId, String);
        const followingId = this.userId;
        return await new Promise((resolve, reject) => {
            try {
                if(followingId !== followedId){
                    const followed = Meteor.users.findOne({_id: followedId}, {fields: {followed: {$in: [followingId, "$followedBy"]}}});
                    if(followed.followed){
                        // currently following user; unfollow.
                        Meteor.users.update({_id: followingId},{$pull: {followedUsers: followedId}});
                        Meteor.users.update({_id: followedId},{$pull: {followedBy: followingId}});
                    } else {
                        // not currently following user; follow.
                        Meteor.users.update({_id: followingId},{$addToSet: {followedUsers: followedId}});
                        Meteor.users.update({_id: followedId},{$addToSet: {followedBy: followingId}});
                    }
                }
                resolve();
            } catch(error){
                reject(error);
            }
        });
    }
});
