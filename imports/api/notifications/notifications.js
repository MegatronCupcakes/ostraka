import {Meteor} from "meteor/meteor";
import {check, Match} from 'meteor/check';
import _ from 'underscore';
import {logError} from '/imports/api/errorLogger/errorLogger';
import {markNotificationsRead} from '/imports/api/notifications/notificationCollection';

Meteor.methods({
    markNotificationsRead: async function(allBoolean, notificationId){
        check(notificationId, Match.Maybe(String));
        check(allBoolean, Match.Maybe(Boolean));

        const userId = this.userId;
        return await markNotificationsRead(allBoolean, notificationId, userId)
        .catch((error) => {
            logError(userId, error, __filename, new Error().stack);
        });
    }
})
