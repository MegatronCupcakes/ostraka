import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {check, Match} from 'meteor/check';
import _ from 'underscore';
import MeteorCall from '/imports/api/util/callPromise';
import {logError} from '/imports/api/errorLogger/errorLogger';
import {isBad} from '/imports/api/util/isBad';
import {validateEmail, testPasswordStrength} from '/imports/api/account/validateAccountForm';

Meteor.methods({
    updateProfilePic: function(url){
        check(url, String);
        this.unblock();
        const userId = this.userId;
        try {
            Meteor.users.update({_id: this.userId},{$set: {'profile.profileImage': url}});
        } catch(error){
            logError(userId, error, __filename, new Error().stack);
            throw new Meteor.Error("profile picture update", "profile picture update failed");
        }
        return;
    },
    updateProfileDetails: function(first, last, location){
        check(first, String);
        check(last, String);
        check(location, String);
        this.unblock();
        const userId = this.userId;
        let update = {};
        const errors = [];
        if(isBad(first)){
            errors.push("invalid first name");
        } else {
            update['profile.firstName'] = first;
        }
        if(isBad(last)){
            errors.push("invalid last name");
        } else {
            update['profile.lastName'] = last;
        }
        if(isBad(location)){
            errors.push("invalid location");
        } else {
            update['profile.location'] = location;
        }
        if(errors.length > 0){
            throw new Meteor.Error("profile update", errors.join("; "));
        } else {
            try {
                Meteor.users.update({_id: this.userId},{$set: update});
            } catch(error){
                logError(userId, error, __filename, new Error().stack);
                throw new Meteor.Error("profile update", "profile update failed");
            }
        }
        return;
    },
    updateAccountEmail: function(email){
        check(email, String);
        this.unblock();
        const userId = this.userId;
        if(isBad(email) || !validateEmail(email)){
            throw new Meteor.Error("email update", "invalid email address");
        } else {
            try {
                const oldEmail = Meteor.users.findOne({_id: userId},{fields: {"emails":1}}).emails[0].address;
                Accounts.addEmail(userId, email);
                Accounts.removeEmail(userId, oldEmail);
            } catch(error){
                logError(userId, error, __filename, new Error().stack);
                throw new Meteor.Error("email update", "email update failed");
            }
        }
        return;
    },
    updateAccountPassword: async function(currentPassword, newPassword, confirm){
        check(currentPassword, String);
        check(newPassword, String);
        check(confirm, String);
        this.unblock();
        const userId = this.userId;
        const errors = [];
        if(isBad(currentPassword)) errors.push("current password is invalid");
        if(isBad(newPassword)) errors.push("new password is invalid");
        if(isBad(confirm)) errors.push("confirm password is invalid");
        if(newPassword !== confirm) errors.push("new password and confirm password must match");
        if(testPasswordStrength(newPassword) == 'too weak') errors.push("new password is too weak");
        if(errors.length > 0){
            throw new Meteor.Error("password update", errors.join("; "));
        } else {
            try {
                //if(Meteor.isServer) Accounts.changePassword(currentPassword, newPassword);
                await MeteorCall('changePassword', currentPassword, newPassword);
            } catch(error){
                console.error("ErrOr:", error);
                logError(userId, error, __filename, new Error().stack);
                throw new Meteor.Error("password update", "password update failed");
            }
        }
        return;
    }
});
