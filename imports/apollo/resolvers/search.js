import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import PostCollection, {postReturnFields} from '/imports/api/post/postCollection';
import CommentCollection, {commentReturnFields} from '/imports/api/comments/commentCollection';
import TagCollection, {tagReturnFields} from '/imports/api/tag/tagCollection';
import {profileReturnFields} from '/imports/api/profile/profileReturnFields';

const _chunkSize = Meteor.settings.pagination.search.chunkSize;

export const searchSite = async (parent, args, context, info) => {
    const userId = context.user ? context.user._id : "";
    if(args.query.charAt(0) === '@'){
        // query starts with "@" so we restrict to profiles, post mentions, and comment mentions.
        return _packageResults(await Promise.all([
            //_doQuery("Post", PostCollection, {mentions: new RegExp(args.query.substring(1), "gi")}, postReturnFields, userId),
            //_doQuery("Comment", CommentCollection, {mentions: new RegExp(args.query.substring(1), "gi")}, commentReturnFields, userId),
            _doQuery("User", Meteor.users, {"profile.profileTag": new RegExp(args.query.substring(1), "gi")}, args.userOffset, profileReturnFields, userId)
        ]));

    } else if(args.query.charAt(0) === '#'){
        // query starts with "#" so we restrict to tags, post tags, and comment tags.
        return _packageResults(await Promise.all([
            _doQuery("Tag", TagCollection, {tag: new RegExp(args.query.substring(1), "gi")}, args.tagOffset, tagReturnFields, userId),
            //_doQuery("Post", PostCollection, {tags: new RegExp(args.query.substring(1), "gi")}, postReturnFields, userId),
            //_doQuery("Comment", CommentCollection, {tags: new RegExp(args.query.substring(1), "gi")}, commentReturnFields, userId)
        ]));
    } else {
        return _packageResults(await Promise.all([
            _doQuery("Post", PostCollection, {$or: [
                {caption: new RegExp(args.query, "gi")},
                {postedByTag: new RegExp(args.query, "gi")},
                {postedBy: new RegExp(args.query, "gi")}
            ]}, args.postOffset, postReturnFields, userId),
            _doQuery("Tag", TagCollection, {tag: new RegExp(args.query, "gi")}, args.tagOffset, tagReturnFields, userId),
            _doQuery("Comment", CommentCollection, {comment: new RegExp(args.query, "gi")}, args.commentOffset, commentReturnFields, userId),
            _doQuery("User", Meteor.users, {$or: [
                {"profile.profileTag": new RegExp(args.query, "gi")},
                {"profile.firstName": new RegExp(args.query, "gi")},
                {"profile.lastName": new RegExp(args.query, "gi")}
            ]}, args.userOffset, profileReturnFields, userId)
        ]));
    }
};

const _doQuery = (type, collection, query, offset, returnFieldsFn, userId) => {
    return new Promise((resolve, reject) => {
        try {
            const count = collection.find(query).count();
            const results = collection.find(query, {sort: {createdAt:1}, fields: returnFieldsFn(userId), skip: offset ? offset * _chunkSize : 0, limit: _chunkSize}).map((doc) => {
                doc._type = type;
                return doc;
            });
            resolve({
                type: type,
                count: count,
                results: results,
                pageSize: _chunkSize // leaving the door open to define custom pagesizes per content type at a later date if needed.
            });
        } catch(error){
            reject(error);
        }
    });
}

const _packageResults = (resultsArray) => {
    let packagedResults = {};
    resultsArray.forEach((result) => {
        packagedResults[result.type] = {
            count: result.count,
            results: result.results,
            pageSize: result.pageSize
        };
    });
    return packagedResults;
}
