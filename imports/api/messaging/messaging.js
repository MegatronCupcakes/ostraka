import {Meteor} from "meteor/meteor";
import {check, Match} from 'meteor/check';
import _ from 'underscore';
import {logError} from '/imports/api/errorLogger/errorLogger';
import {createMessage, markMessageAsRead, clearMessageNotifications, markMessageAsDeleted} from '/imports/api/messaging/messageCollection';

Meteor.methods({
    messageToLookup: async function(queryString){
        check(queryString, String);
        this.unblock();
        const userId = this.userId;
        return await new Promise((resolve, reject) => {
            try {
                const matchingUsers = Meteor.users.find({
                    _id: {$ne: userId},
                    active: true,
                    "profile.profileTag": new RegExp(queryString, "gi")
                },{
                    fields: {
                        "profile.profileTag": 1,
                        allowFromAny: "$settings.messaging.allowFromAny",
                        blocked: {$in: [userId, "$settings.messaging.blockedUsers"]},
                        allowed: {$in: [userId, "$settings.messaging.allowedUsers"]}
                    },
                    limit: Meteor.settings.search.profileTagLimit,
                    sort: {"profile.profileTag": 1}
                }).fetch();
                resolve(matchingUsers);
            } catch(error){
                logError(userId, error, __filename, new Error().stack);
                reject(error);
            }
        });
    },
    clearMessageNotifications: async function(){
        this.unblock();
        const userId = this.userId;
        return await clearMessageNotifications(userId)
        .catch((error) => {throw new Meteor.Error("clear message notifications failure", error)});
    },
    markMessageAsRead: async function(messageId){
        check(messageId, String);
        this.unblock();
        const userId = this.userId;
        return await markMessageAsRead(userId, messageId)
        .catch((error) => {throw new Meteor.Error("mark message read failure", error)});
    },
    markMessageAsDeleted: async function(messageId){
        check(messageId, String);
        this.unblock();
        const userId = this.userId;
        return await markMessageAsDeleted(userId, messageId)
        .catch((error) => {throw new Meteor.Error("mark message deleted failure", error)});
    },
    sendMessage: async function(message){
        check(message, {
            toId: String,
            subject: String,
            body: String
        });
        this.unblock();
        const userId = this.userId;
        let error = null;
        await createMessage(userId, message)
        .catch((error) => {
            throw new Meteor.Error("send message error", error);
        });
        return;
    }
})
