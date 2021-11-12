import {Mongo} from 'meteor/mongo';
import IndexCollection from '../util/indexCollection';
import {Random} from 'meteor/random';
import {TagLookup} from '/imports/api/tag/tagCollection';
import MapMentions from '/imports/api/mentions/mapMentions';
import {viewId} from '/imports/api/util/viewId';
const PostCollection = new Mongo.Collection('posts');

const _indexes = [
    {tags: "text", mentions: "text", postedByTag: "text", postedBy: "text"},
    {postedById: 1},
    {sharedBy: 1},
    {viewedBy: 1},
    {viewId: 1},
    {active: 1},
    {createdAt: 1}
]

IndexCollection(PostCollection, _indexes);

export default PostCollection;

export const createPost = (userId, post) => {
    const callingUserId = this.userId;
    const user = Meteor.users.findOne({_id: userId});
    // Create Post
    return new Promise(async (resolve, reject) => {
        PostCollection.insert({
            ...post,
            viewId: viewId(),
            postedByTag: user.profile.profileTag,
            postedBy: `${user.profile.firstName} ${user.profile.lastName}`,
            postedById: user._id,
            postedByProfilePic: user.profile.profileImage,
            tagIds: await TagLookup(post.tags, callingUserId),
            mentionIds: await MapMentions(post.mentions),
            comments: [],
            likes: [],
            dislikes: [],
            sharedBy: [],
            active: true,
            createdAt: new Date()
        }, (error, _id) => {
            if(error){
                reject(error);
            } else {
                resolve(_id);
            }
        });
    });
};

export const postReturnFields = (userId) => {
    return {
        _id: 1,
        viewId: 1,
        caption: 1,
        url: 1,
        type: 1,
        tags: 1,
        tagIds: 1,
        mentions: 1,
        mentionIds: 1,
        images: 1,
        video: 1,
        postedByTag: 1,
        postedBy: 1,
        postedById: 1,
        postedByProfilePic: 1,
        comments: 1,
        liked: {$in: [userId, "$likes"]},
        likeCount: {$size: "$likes"},
        disliked: {$in: [userId, "$dislikes"]},
        dislikeCount: {$size: "$dislikes"},
        shared: {$in: [userId, "$sharedBy"]},
        shareCount: {$size: "$sharedBy"},
        sharedContentId: 1,
        sharedById: 1,
        createdAt: 1
    };
};
