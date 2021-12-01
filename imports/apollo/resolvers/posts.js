import {Meteor} from 'meteor/meteor';
import PostCollection, {postReturnFields} from '/imports/api/post/postCollection';

const _chunkSize = Meteor.settings.pagination.feed.chunkSize;

export const getPost = (parent, args, context, info) => {
    return PostCollection.findOne({_id: args._id, active: true}, {fields: postReturnFields(context.user._id)});
};

export const getPosts = (parent, args, context, info) => {
    return PostCollection.find({active: true}, {fields: postReturnFields(context.user._id), sort: {createdAt: -1}, skip: args.offset, limit: _chunkSize});
};

export const getTaggedPosts = (parent, args, context, info) => {
    return PostCollection.find({tagIds: args.tagId, active: true}, {fields: postReturnFields(context.user._id), sort: {createdAt: -1}});
};

export const getUserPosts = (parent, args, context, info) => {
    return PostCollection.find({postedById: args.postedById, active: true}, {fields: postReturnFields(context.user._id), sort: {createdAt: -1}, skip: args.offset, limit: _chunkSize});
};
