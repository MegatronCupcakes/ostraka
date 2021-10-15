import {Meteor} from "meteor/meteor";
import {createPost} from './postCollection';
import {check, Match} from 'meteor/check';
import {logError} from '/imports/api/errorLogger/errorLogger';

Meteor.methods({
    createPost: function(post){
        check(post, Object);
        check(post.caption, String);
        check(post.url, String);
        check(post.type, String);
        check(post.tags, Array);
        check(post.mentions, Array);
        check(post.images, Array);
        check(post.video, String);

        this.unblock();
        const userId = this.userId;

        createPost(this.userId, post)
        .then((_id) => {
            return (null, _id);
        })
        .catch((error) => {
            logError(userId, error, __filename, new Error().stack);
            return (error, null);
        });
    }
});
