import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check';
import {logError} from '/imports/api/errorLogger/errorLogger';
import {notifyUser} from '/imports/api/notifications/notify';
import Rules from '/imports/api/rules/rules';

Meteor.methods({
    ostracizeUser: async function(ostracizedId){
        check(ostracizedId, String);
        this.unblock();
        const votingId = this.userId;
        return await new Promise(async (resolve, reject) => {
            try {
                // you can't ostracize yourself.
                if(votingId !== ostracizedId){
                    if(Meteor.users.findOne(({_id: ostracizedId, ostracizedBy: votingId}))){
                        // reject if user has already cast vote
                        reject(new Error('vote already cast'));
                    } else {
                        // update ostracized user
                        Meteor.users.update({_id: ostracizedId},{$addToSet: {ostracizedBy: votingId}});
                        // APPLY RULES
                        const rules = new Rules();
                        await rules.apply('ostracize', votingId, ostracizedId, ostracizedId, 'profile')
                        .catch((error) => logError(userId, error, __filename, new Error().stack));
                        // NOTIFY
                        await notifyUser(votingId, 'ostracizeVote', {
                            userId: ostracizedId
                        })
                        .catch((error) => {
                            reject(error);
                        });
                        resolve();
                    }
                } else {
                    resolve();
                }
            } catch(error){
                logError(votingId, error, __filename, new Error().stack);
                reject(error);
            }
        });
    }
});
