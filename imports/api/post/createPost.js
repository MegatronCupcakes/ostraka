import {Meteor} from "meteor/meteor";
import {createPost} from './postCollection';
import {check, Match} from 'meteor/check';

Meteor.methods({
    createPost: function(post){
        this.unblock();
        check(post, Object);
        check(post.caption, String);
        check(post.url, String);
        check(post.type, String);
        check(post.tags, Array);
        check(post.mentions, Array);
        check(post.images, Array);
        check(post.video, String);

        createPost(this.userId, post)
        .then((_id) => {
            return (null, _id);
        })
        .catch((error) => {
            console.log("ERROR:", error);
            return (error, null);
        });
    }
});
