import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import _ from 'underscore';
import TagCollection from '/imports/api/tag/tagCollection';

Meteor.methods({
    followTopic: async function(tagId, tag){
        check(tagId, String);
        check(tag, String);
        this.unblock();
        const userId = this.userId;
        Meteor.users.update({_id: userId},{$addToSet: {"profile.followedTopics": {_id: tagId, tag: tag, createdAt: new Date(), updatedAt: new Date()}}});
    },
    unfollowTopic: async function(tagId, tag){
        check(tagId, String);
        check(tag, String);
        this.unblock();
        const userId = this.userId;
        console.log("removing tag:", tag, "(", tagId, ")");
        Meteor.users.update({_id: userId},{$pull: {followedTopics: {_id: tagId}}});
    }
});
