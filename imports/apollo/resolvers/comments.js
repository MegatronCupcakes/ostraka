import CommentCollection from '/imports/api/comments/commentCollection';

export const getComments = (parent, args, context, info) => {
    return CommentCollection.find({parentId: args.parentId, active: true},{sort: {createdAt: -1}}).fetch()
};

export const getTaggedComments = (parent, args, context, info) => {
    return CommentCollection.find({tagIds: args.tagId, active: true}, {sort: {createdAt: -1}}).fetch();
};

export const getUserComments = (parent, args, context, info) => {
    return CommentCollection.find({postedById: args.postedById, active: true}, {sort: {createdAt: -1}}).fetch();
};
