import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({
    likePost: (likedId, likedType, action) => {
        this.unblock();
        check(likedId, String);
        check(likedType, String);
        check(action, String); // "like" or "dislike"

        console.log("doing " + action + " stuff for type: " + likedType + " id: " + likedId);
        return;
    }
});
