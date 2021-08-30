import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import {Random} from 'meteor/random';
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
            viewId: Random.secret(),
            active: true,
            profile: {
                firstName: first,
                lastName: last,
                profileTag: "",
                profileImage: "",
                role: "user",
                invitedBy: "",
                invited: [],
                followedUsers: [],
                followedTopics: [],
                reputationScore: 100,
                status: "active",
                settings: {},
                sharedViewRedirect: null
            }
        });
    }
});
