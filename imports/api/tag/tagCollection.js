import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Random} from 'meteor/random';
import _ from 'underscore';
import IndexCollection from '../util/indexCollection';

const TagCollection = new Mongo.Collection('tags');

const _indexes = [
    {viewId: 1},
    {tag: "text"},
    {usage: -1},
    {createdBy: 1},
    {usedBy: 1},
    {createdAt: 1}
];

IndexCollection(TagCollection, _indexes);

export default TagCollection;

// intakes an array of text tags and returns an array of tag ids.
export const TagLookup = (tagArray, userId) => {
    return new Promise(async (resolve, reject) => {
        if(!(tagArray instanceof Array)) tagArray = [tagArray];
        const tagIds = await Promise.all(tagArray.map((tag) => {
            return new Promise((_resolve, _reject) => {
                const _tag = TagCollection.findOne({tag: tag},{_id:1});
                const _date = new Date();
                const tagId = _tag ? _tag._id : TagCollection.insert({
                    viewId: Random.secret(),
                    tag: tag,
                    active: true,
                    usage: [_date],
                    createdBy: userId,
                    usedBy: [],
                    createdAt: _date
                });
                TagCollection.update({_id: tagId},{$addToSet: {usedBy: userId, usage: _date}});
                // add tag to user's followed topics.
                const followedTopics = Meteor.users.findOne({_id: userId},{profile: 1}).profile.followedTopics;
                const existingTopic = _.findWhere(followed, {_id: tagId});
                if(existingTopic){
                    const topicIndex = followedTopics.indexOf(existingTopic);
                    let updateObject = {}
                    updateObject["profile.followedTopics." + topicIndex].updatedAt = new Date();
                    Meteor.users.update({_id: userId},{$set: updateObject});
                } else {
                    Meteor.users.update({_id: userId},{$addToSet: {"profile.followedTopics": {_id: tagId, tag: tag, createdAt: new Date(), updatedAt: new Date()}}});
                }
                _resolve(tagId);
            });
        }));
        resolve(tagIds);
    });
}
