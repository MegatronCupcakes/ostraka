import {Mongo} from 'meteor/mongo';
import _ from 'underscore';
import IndexCollection from '../util/indexCollection';

const CommentCollection = new Mongo.Collection('comments');

const _indexes = [
    {tags: "text", mentions: "text"},
    {parentId: 1},
    {userId: 1},
    {active: 1},
    {createdAt: 1}
];

IndexCollection(CommentCollection, _indexes);

export default CommentCollection;

export const commentReturnFields = (userId) => {
    return {
        _id: 1,
        parentId: 1,
        userId: 1,
        postedByTag: 1,
        postedBy: 1,
        postedById: 1,
        postedByProfilePic: 1,
        comment: 1,
        tags: 1,
        mentions: 1,
        comments: 1,
        tagIds: 1,
        active: 1,
        mentionIds: 1,
        viewId: 1,
        liked: {$in: [userId, "$likes"]},
        likeCount: {$size: "$likes"},
        disliked: {$in: [userId, "$dislikes"]},
        dislikeCount: {$size: "$dislikes"},
        shared: {$in: [userId, "$sharedBy"]},
        shareCount: {$size: "$sharedBy"},
        createdAt: 1
    };
};

if(false){
    const comment = CommentCollection.findOne({_id: "MavcnHpP7SWomxmY2"});
    _.times(10, (number) =>{
        delete comment._id;
        comment.createdAt = new Date();
        CommentCollection.insert(comment);
    });
}
