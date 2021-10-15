import {Meteor} from "meteor/meteor";
import {check, Match} from 'meteor/check';
import {logError} from '/imports/api/errorLogger/errorLogger';

Meteor.methods({
    updateShareSettings: async function(key, value){
        check(key, String);
        check(value, Boolean);

        this.unblock();
        const userId = this.userId;
        try {
            let settingsUpdate = {[`settings.sharing.${key}`]: value};
            Meteor.users.update({_id: this.userId},{$set: settingsUpdate});            
        } catch(error){
            logError(userId, error, __filename, new Error().stack);
        }
        return;
    }
});
