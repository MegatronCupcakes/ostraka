import {Meteor} from "meteor/meteor";
import {Accounts} from 'meteor/accounts-base';
import { PostCollection } from './postCollection';
import {check, Match} from 'meteor/check';

Meteor.methods({
    createPost: function(post){
        this.unblock();
        const user = Meteor.users.findOne({_id: this.userId});
        check(post, Object);
        check(post.caption, String);
        check(post.url, String);
        check(post.type, String);
        check(post.tags, Array);
        check(post.mentions, Array);
        check(post.images, Array);
        check(post.video, String);

        // Create Post
        post.postedByTag = user.profile.profileTag;
        post.postedBy = user.profile.firstName + " " + user.profile.lastName;
        post.postedById = user._id;
        post.postedByProfilePic = user.profile.profileImage;
        post.likes = [];
        post.dislikes = [];
        post.comments = [];
        _create(post)
        .then((_id) => {
            return (null, _id);
        })
        .catch((error) => {
            return (error, null);
        });
        return;
    }
});

const _create = (_document) => {
    return new Promise((_resolve, _reject) => {
        PostCollection.insert(_document, (_error, _id) => {
            if(_error){
                _reject(_error);
            } else {
                _resolve(_id);
            }
        });
    })
}
