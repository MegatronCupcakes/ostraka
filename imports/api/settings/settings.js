import {Meteor} from "meteor/meteor";
import {check, Match} from 'meteor/check';

Meteor.methods({
    updateShareSettings: async function(key, value){
        check(key, String);
        check(value, Boolean);

        this.unblock();
        let settingsUpdate = {[`settings.sharing.${key}`]: value};
        Meteor.users.update({_id: this.userId},{$set: settingsUpdate});
        return;
    }
});
