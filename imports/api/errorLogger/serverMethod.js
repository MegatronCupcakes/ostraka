import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {logError} from '/imports/api/errorLogger/errorLogger';

Meteor.methods({
    logError: function(error, stack, fileName){
        check(error, Object);
        check(stack, String);
        check(fileName, String);
        this.unblock();
        const userId = this.userId;
        logError(userId, error, __filename, new Error().stack);
    }
});
