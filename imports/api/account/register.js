import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({
    registerUser: (email, password, first, last) => {
        check(email, String);
        check(password, String);
        check(first, String);
        check(last, String);

        let response = null;
        let error = null;
        return Accounts.createUser({
            email: email,
            password: password,
            profile: {
                firstName: first,
                lastName: last,
                role: "user"
            }
        });
    }
});
