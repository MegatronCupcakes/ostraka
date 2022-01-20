import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check';
import Rules from '/imports/api/rules/rules';
import {logError} from '/imports/api/errorLogger/errorLogger';
import {notifyUser} from '/imports/api/notifications/notify';

Meteor.methods({
    followUser: async function(followedId){
        check(followedId, String);
        this.unblock();
        const followingId = this.userId;
        const rules = new Rules();
        return await new Promise(async (resolve, reject) => {
            try {
                if(followingId !== followedId){
                    const followed = Meteor.users.findOne({_id: followedId}, {fields: {followed: {$in: [followingId, "$followedBy"]}}}).followed;
                    console.log("followed:", followed);
                    const followedUsersUpdate = followed ? {$pull: {followedUsers: followedId}} : {$addToSet: {followedUsers: followedId}};
                    const followedByUpdate = followed ? {$pull: {followedBy: followingId}} : {$addToSet: {followedBy: followingId}};
                    const actionType = followed ? 'unfollow' : 'follow';

                    // apply user updates
                    Meteor.users.update({_id: followingId}, followedUsersUpdate);
                    Meteor.users.update({_id: followedId}, followedByUpdate);

                    // apply rules
                    await rules.apply(actionType, followingId, followedId, followedId, 'profile')
                    .catch((error) => logError(userId, error, __filename, new Error().stack));

                    // send notifications
                    await notifyUser(followingId, `${actionType}ed`, {userId: followedId})
                    .catch((error) => logError(userId, error, __filename, new Error().stack));

                    resolve();
                }

            } catch(error){
                logError(followingId, error, __filename, new Error().stack);
                reject(error);
            }
        });
    }
});
