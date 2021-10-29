import {Meteor} from "meteor/meteor";
import {check, Match} from 'meteor/check';
import _ from 'underscore';
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
    },
    updateMessagingSettings: async function(key, value){
        check(key, String);
        check(value, Match.OneOf(Boolean, [String], [{
            id: String,
            name: String,
            _id: String
        }]));

        this.unblock();
        const userId = this.userId;
        try {
            let settingsUpdate = {[`settings.messaging.${key}`]: value};
            Meteor.users.update({_id: this.userId},{$set: settingsUpdate});
        } catch(error){
            logError(userId, error, __filename, new Error().stack);
            throw new Meteor.Error("profile update", error);
        }
        return;
    },
    allowBlockLookup: async function(queryString, searchType){
        check(queryString, String);
        check(searchType, String);
        this.unblock();
        const userId = this.userId;
        console.log("querying", queryString);
        return await new Promise((resolve, reject) => {
            try {
                const userSettings = Meteor.users.findOne({_id: userId},{fields: {'settings':1}}).settings;
                let exclusions = [];
                if(userSettings.messaging && userSettings.messaging[searchType]){
                    exclusions = userSettings.messaging[searchType].map((user) => {
                        return user._id;
                    });
                }
                const matchingUsers = Meteor.users.find({
                    active: true,
                    _id: {$nin: exclusions},
                    "profile.profileTag": new RegExp(queryString, "gi")
                },{fields: {"profile.profileTag": 1}, limit: Meteor.settings.search.profileTagLimit, sort: {"profile.profileTag": 1}}).fetch();
                resolve(matchingUsers);
            } catch(error){
                logError(userId, error, __filename, new Error().stack);
                reject(error);
            }
        });
    }
});
