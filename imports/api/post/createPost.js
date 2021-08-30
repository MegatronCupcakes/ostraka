import {Meteor} from "meteor/meteor";
import {Random} from 'meteor/random';
import {Accounts} from 'meteor/accounts-base';
import PostCollection from './postCollection';
import {TagLookup} from '../tag/tagCollection';
import MapMentions from '/imports/api/mentions/mapMentions';
import {check, Match} from 'meteor/check';

Meteor.methods({
    createPost: async function(post){
        this.unblock();
        check(post, Object);
        check(post.caption, String);
        check(post.url, String);
        check(post.type, String);
        check(post.tags, Array);
        check(post.mentions, Array);
        check(post.images, Array);
        check(post.video, String);

        const user = Meteor.users.findOne({_id: this.userId});

        // Create Post
        post.viewId = Random.secret();
        post.postedByTag = user.profile.profileTag;
        post.postedBy = user.profile.firstName + " " + user.profile.lastName;
        post.postedById = user._id;
        post.postedByProfilePic = user.profile.profileImage;
        post.tagIds = await TagLookup(post.tags, this.userId);
        post.mentionIds = await MapMentions(post.mentions);
        post.comments = [];
        post.likes = [];
        post.dislikes = [];
        post.sharedBy = [];
        post.active = true;
        post.createdAt = new Date();
        _create(post)
        .then((_id) => {
            return (null, _id);
        })
        .catch((error) => {
            console.log("ERROR:", error);
            return (error, null);
        });
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
};
