import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import TimeFrame from '/imports/api/util/timeFrame';
import PostCollection from '/imports/api/post/postCollection';
import CommentCollection from '/imports/api/comments/commentCollection';
import {profileReturnFields} from '/imports/api/profile/profileReturnFields';

const _userLimit = Meteor.settings.content.trendingUsers.limit;
const _userSpan = Meteor.settings.content.trendingUsers.span;

export const getProfile = (parent, args, context, info) => {
    return Meteor.users.findOne({_id: args._id, active: true},{fields: profileReturnFields(context.user._id)});
}

export const getProfiles = (parent, args, context, info) => {
    return Meteor.users.find({_id: {$in: args.userIds}, active: true},{fields: profileReturnFields(context.user._id), skip: args.offset, limit: _userLimit});
}

export const getTrendingProfiles = async (parent, args, context, info) => {
    // find profiles with the most tags and comments in the last 24 hours.
    const {now, then} = TimeFrame(_userSpan);
    const [recentShares, recentPosts, recentComments, recentMentions] = await Promise.all([
        new Promise((resolve, reject) => {
            // count recent shares
            const _recentShares =  PostCollection.rawCollection().aggregate([
                {$match: {createdAt: {$gte: then, $lte: now}, active: true}},
                {$project: {"sharedBy": 1}},
                {$group: {_id: "$sharedBy", count: {$sum: 1}}}
            ]).toArray();
            resolve(_recentShares);
        }),
        new Promise((resolve, reject) => {
            // get posts in last 24 hours sort by number of posts per user.
            const _recentPosts =  PostCollection.rawCollection().aggregate([
                {$match: {createdAt: {$gte: then, $lte: now}, active: true}},
                {$project: {"postedById": 1}},
                {$group: {_id: "$postedById", count: {$sum: 1}}}
            ]).toArray();
            resolve(_recentPosts);
        }),
        new Promise((resolve, reject) => {
            // get comments in last 24 hours and sort by number of comments per users
            const _recentComments =  CommentCollection.rawCollection().aggregate([
                {$match: {createdAt: {$gte: then, $lte: now}, active: true}},
                {$project: {"postedById": 1}},
                {$group: {_id: "$postedById", count: {$sum: 1}}}
            ]).toArray();
            resolve(_recentComments);
        }),
        new Promise((resolve, reject) => {
            // count mentions per user in last 24 hours.
            const _recentMentions = PostCollection.rawCollection().aggregate([
                {$match: {createdAt: {$gte: then, $lte: now}, active: true}},
                {$unwind: "$mentionIds"},
                {$project: {"mentionIds": 1}},
                {$group: {_id: "$mentionIds", count: {$sum: 1}}}
            ]).toArray();
            resolve(_recentMentions);
        })
    ]);
    //console.log("recentMentions:", recentMentions);
    //console.log("recentShares:", recentShares);
    //console.log("recentPosts:", recentPosts);
    //console.log("recentComments:", recentComments);
    //console.log("recentMentions:", recentMentions);
    // add each user's number of posts and comments and then sort to find more active users.
    let countById = {};
    [...recentMentions, ...recentShares, ...recentPosts, ...recentComments, ...recentMentions].forEach((item, index) => {
        if(!countById[item._id]) countById[item._id] = 0;
        countById[item._id] += item.count;
    });
    let sortedCountArray = _.sortBy(_.keys(countById).map((key) => {
        return {_id: key, count: countById[key]};
    }), 'count');
    const trendingIds = _.first(sortedCountArray, _userLimit).map((item) => {return item._id})
    return Meteor.users.find({_id: {$in: trendingIds}, active: true}, {fields: profileReturnFields(context.user._id)});
}
