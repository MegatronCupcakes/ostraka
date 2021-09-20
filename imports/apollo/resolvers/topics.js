import _ from 'underscore';
import TimeFrame from '/imports/api/util/timeFrame';
import PostCollection, {postReturnFields} from '/imports/api/post/postCollection';
import CommentCollection, {commentReturnFields} from '/imports/api/comments/commentCollection';
import TagCollection, {tagReturnFields} from '/imports/api/tag/tagCollection';

export const getTopic = async (parent, args, context, info) => {
    const posts = PostCollection.find({tagIds: args.tagId, active: true},{fields: postReturnFields(context.user._id)}).map((post) => {
        post._type = "Post";
        return post;
    });
    const comments = CommentCollection.find({tagIds: args.tagId, active: true},{fields: commentReturnFields(context.user._id)}).map((comment) => {
        comment._type = "Comment";
        return comment;
    });
    return _.sortBy([...posts, ...comments], 'createdAt').reverse();
};

export const getTrendingTopics = async (parent, args, context, info) => {
    // return tag IdDs for tags with the greatest usage in the last 24hours
    // factor in activity (shares and comments) of posts using these tags.
    const [now, then] = TimeFrame(args.span);
    const trending = await new Promise((resolve, reject) => {
        try {
            const _trending = TagCollection.rawCollection().aggregate([
                {$match: {usage: {$gte: then, $lte: now}, active: true}},
                {$unwind: "$usage"},
                {$group: {_id:"$_id", usage: {$push:"$usage"}, size: {$sum:1}}},
                {$sort:{size:1}}
            ]).toArray();
            resolve(_trending);
        } catch(_error){
            reject(_error);
        }
    }).catch((error) => {
        console.log("ERROR:", error);
    });
    const trendingIds = _.sortBy(trending, 'size').map((summary) => {return summary._id});
    return TagCollection.find({_id: {$in: _.first(trendingIds, args.limit)}},{fields: tagReturnFields(context.user._id)});
}
