import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({
    recoverUser: (email) => {
        check(email, String);

        const user = Accounts.findUserByEmail(email);
        if(user){
            return Accounts.sendResetPasswordEmail(user._id);
        } else {
            return Accounts.sendResetPasswordEmail("");            
        }
    }
});
