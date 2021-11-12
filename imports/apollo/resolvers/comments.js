import CommentCollection, {commentReturnFields} from '/imports/api/comments/commentCollection';

export const getComments = (parent, args, context, info) => {
    const userId = context.user ? context.user._id : "";
    return CommentCollection.find({parentId: args.parentId, active: true}, {fields: commentReturnFields(userId), sort: {createdAt: -1}});
};

export const getTaggedComments = (parent, args, context, info) => {
    return CommentCollection.find({tagIds: args.tagId, active: true}, {fields: commentReturnFields(context.user._id), sort: {createdAt: -1}});
};

export const getUserComments = (parent, args, context, info) => {
    return CommentCollection.find({postedById: args.postedById, active: true}, {fields: commentReturnFields(context.user._id), sort: {createdAt: -1}});
};

export const getCommentById = (parent, args, context, info) => {
    return CommentCollection.findOne({_id: args._id, active: true}, {fields: commentReturnFields(context.user._id)});
};
