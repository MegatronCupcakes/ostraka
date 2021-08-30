import PostCollection from '/imports/api/post/postCollection';

export const getPost = (parent, args, context, info) => {
    return PostCollection.findOne({_id: args._id, active: true});
};

export const getPosts = (parent, args, context, info) => {
    return PostCollection.find({active: true}, {sort: {createdAt: -1}}).fetch();
};

export const getTaggedPosts = (parent, args, context, info) => {
    return PostCollection.find({tagIds: args.tagId, active: true}, {sort: {createdAt: -1}}).fetch();
};

export const getUserPosts = (parent, args, context, info) => {
    return PostCollection.find({postedById: args.postedById, active: true}, {sort: {createdAt: -1}}).fetch();
};
