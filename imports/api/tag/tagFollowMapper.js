import {Meteor} from 'meteor/meteor';
import _ from 'underscore';

export const tagFollowMapper = (tags) => {
    const followedTopicIds = Meteor.user().followedTopics.map((_topic) => {return _topic._id});
    return tags.map((_tag) => {
        return {..._tag, followed: _.isUndefined(_tag.followed) ? _.contains(followedTopicIds, _tag._id) : _tag.followed};
    });
};
