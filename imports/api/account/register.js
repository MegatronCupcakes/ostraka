import {Meteor} from "meteor/meteor";
import {Accounts} from 'meteor/accounts-base';
import {Random} from 'meteor/random';
import {check} from 'meteor/check';
import {viewId} from '/imports/api/util/viewId';

Meteor.methods({
    registerUser: async function(email, password, first, last){
        check(email, String);
        check(password, String);
        check(first, String);
        check(last, String);

        return await registerUser(email, password, first, last);
    }
});

export const registerUser = (email, password, first, last, invitedBy) => {
    return new Promise((resolve, reject) => {
        try {
            const userId = Accounts.createUser({
                email: email,
                password: password,
                profile: {
                    firstName: first,
                    lastName: last,
                    profileTag: "",
                    profileImage: ""
                }
            });
            Meteor.users.update({_id: userId}, {$set: {
                viewId: viewId(),
                active: true,
                role: "user",
                invitedBy: invitedBy ? invitedBy : "",
                invited: [],
                followedUsers: [],
                followedTopics: [],
                followedBy: [],
                sharedBy: [],
                ostracizedBy: [],
                reputationScore: 100,
                status: "active",
                settings: {}
            }})
            resolve(userId);
        } catch(error){
            reject(error);
        }
    });
}
