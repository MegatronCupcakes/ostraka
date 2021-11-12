import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check';
import {logError} from '/imports/api/errorLogger/errorLogger';
import {notifyUser} from '/imports/api/notifications/notify';

Meteor.methods({
    ostracizeUser: async function(ostracizedId){
        check(ostracizedId, String);
        this.unblock();
        const votingId = this.userId;
        return await new Promise(async (resolve, reject) => {
            try {
                // you can't ostracize yourself.
                if(votingId !== ostracizedId){

                    // DO STUFF.  Output will be a Vote object that must contain a userId key
                    // to identify the voting user.
                    const vote = {
                        userId: votingId
                    };

                    // NOTIFY
                    await notifyUser(ostracizedId, 'ostracizeVote', vote)
                    .catch((error) => {
                        reject();
                    })
                    .then(() => {
                        resolve();
                    });
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
