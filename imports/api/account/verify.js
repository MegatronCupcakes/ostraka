import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({
    verifyUser: (email) => {
        check(email, String);

        const user = Accounts.findUserByEmail(email);
        if(user){
            Accounts.sendVerificationEmail(user._id);
        } else {
            return Accounts.sendVerificationEmail("");            
        }
    }
});
