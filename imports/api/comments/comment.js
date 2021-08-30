import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import CommentCollection from './commentCollection';
import PostCollection from '../post/postCollection';
import {TagLookup} from '../tag/tagCollection';
import MapMentions from '/imports/api/mentions/mapMentions';

Meteor.methods({
    comment: async function(parentId, parentType, comment, tags, mentions){
        this.unblock();
        check(parentId, String);
        check(parentType, String);
        check(comment, String);
        check(tags, Array);
        check(mentions, Array);

        const user = Meteor.users.findOne({_id: this.userId});

        _create({
            parentId: parentId,
            parentType: parentType,
            userId: this.userId,
            postedByTag: user.profile.profileTag,
            postedBy: user.profile.firstName + " " + user.profile.lastName,
            postedById: user._id,
            postedByProfilePic: user.profile.profileImage,
            comment: comment,
            tags: tags,
            tagIds: await TagLookup(tags, this.userId),
            mentions: mentions,
            mentionIds: await MapMentions(mentions),
            likes: [],
            dislikes: [],
            comments: [],
            active: true,
            createdAt: new Date()
        })
        .then((commentId) => {
            // use switch in case we split post types into seperate collections; currently all
            // post types are stored in PostCollection
            let _collection;
            switch(parentType.toLowerCase()){
                case 'comment':
                    _collection = CommentCollection;
                    break;
                default:
                    _collection = PostCollection;
                    break;
            }
            _collection.update({_id: parentId},{$addToSet: {comments: commentId}});
            return (null, commentId);
        })
        .catch((error) => {
            return (error, null);
        });
    }
});

const _create = (_document) => {
    return new Promise((_resolve, _reject) => {
        CommentCollection.insert(_document, (_error, _id) => {
            if(_error){
                _reject(_error);
            } else {
                _resolve(_id);
            }
        });
    })
}
