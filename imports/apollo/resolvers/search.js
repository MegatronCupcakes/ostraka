import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import PostCollection, {postReturnFields} from '/imports/api/post/postCollection';
import CommentCollection, {commentReturnFields} from '/imports/api/comments/commentCollection';
import TagCollection, {tagReturnFields} from '/imports/api/tag/tagCollection';
import {profileReturnFields} from '/imports/api/profile/profileReturnFields';

export const searchSite = async (parent, args, context, info) => {
    const userId = context.user ? context.user._id : "";
    if(args.query.charAt(0) === '@'){
        // query starts with "@" so we restrict to profiles, post mentions, and comment mentions.
        return _.sortBy(_.flatten(await Promise.all([
            //_doQuery("Post", PostCollection, {mentions: new RegExp(args.query.substring(1), "gi")}, postReturnFields, userId),
            //_doQuery("Comment", CommentCollection, {mentions: new RegExp(args.query.substring(1), "gi")}, commentReturnFields, userId),
            _doQuery("User", Meteor.users, {"profile.profileTag": new RegExp(args.query.substring(1), "gi")}, profileReturnFields, userId)
        ]), true), 'createdAt');

    } else if(args.query.charAt(0) === '#'){
        // query starts with "#" so we restrict to tags, post tags, and comment tags.
        return _.sortBy(_.flatten(await Promise.all([
            _doQuery("Tag", TagCollection, {tag: new RegExp(args.query.substring(1), "gi")}, tagReturnFields, userId),
            //_doQuery("Post", PostCollection, {tags: new RegExp(args.query.substring(1), "gi")}, postReturnFields, userId),
            //_doQuery("Comment", CommentCollection, {tags: new RegExp(args.query.substring(1), "gi")}, commentReturnFields, userId)
        ]), true), 'createdAt');
    } else {
        return _.sortBy(_.flatten(await Promise.all([
            _doQuery("Post", PostCollection, {$or: [
                {caption: new RegExp(args.query, "gi")},
                {postedByTag: new RegExp(args.query, "gi")},
                {postedBy: new RegExp(args.query, "gi")}
            ]}, postReturnFields, userId),
            _doQuery("Tag", TagCollection, {tag: new RegExp(args.query, "gi")}, tagReturnFields, userId),
            _doQuery("Comment", CommentCollection, {comment: new RegExp(args.query, "gi")}, commentReturnFields, userId),
            _doQuery("User", Meteor.users, {$or: [
                {"profile.profileTag": new RegExp(args.query, "gi")},
                {"profile.firstName": new RegExp(args.query, "gi")},
                {"profile.lastName": new RegExp(args.query, "gi")}
            ]}, profileReturnFields, userId)
        ]), true), 'createdAt');
    }
};

const _doQuery = (type, collection, query, returnFieldsFn, userId) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(collection.find(query, {sort: {createdAt:1}, fields: returnFieldsFn(userId)}).map((doc) => {
                doc._type = type;
                return doc;
            }));
        } catch(error){
            reject(error);
        }
    });
}
