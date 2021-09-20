import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import {registerUser} from '/imports/api/account/register';
import PostCollection, {createPost} from '/imports/api/post/postCollection';
import CommentCollection from '/imports/api/comments/commentCollection';
import TagCollection from '/imports/api/tag/tagCollection';

const mainUserId = 'JzzE7goHv6PhqNbJY';
const testRecordCount = 10;

export const seedTestData = async () => {
    await _cleanUp();
    await _makeTestUsers(testRecordCount);
    await Promise.all(_.flatten(Meteor.users.find({_id: {$ne: mainUserId}}).map((user) => {
        return _makeTestPosts(user, testRecordCount);
    })));
}

const _cleanUp = () => {
    return new Promise((resolve, reject) => {
        // remove invited ids from main user
        Meteor.users.update({_id: mainUserId},{$set: {invited: []}});
        const seededUserIds = Meteor.users.find({_id: {$ne: mainUserId}},{_id: 1}).map((user) => {return user._id});
        // remove all content created by previously seeded users
        PostCollection.remove({postedById: {$in: seededUserIds}});
        CommentCollection.remove({postedById: {$in: seededUserIds}});
        TagCollection.remove({createdBy: {$in: seededUserIds}});
        // remove previously seeded users
        Meteor.users.remove({_id: {$in: seededUserIds}});
        resolve();
    });
}

const _makeTestUsers = (recordCount) => {
    return new Promise((resolve, reject) => {
        const _registerUser = (_range, _invitedBy) => {
            if(_range.length === 0){
                resolve();
            } else {
                const _number = _range.shift();
                registerUser(`email_${_number}@email.com`, `password_${_number}`, `firstName_${_number}`, `lastName_${_number}`, _invitedBy)
                .then((_userId) => {
                    const imageUrl = `https://dummyimage.com/600x400/bbc1c7/9132d1&text=user+${_number}`;
                    Meteor.users.update({_id: _userId},{$set: {'profile.profileImage': imageUrl, 'profile.profileTag': `user${_number}`}});
                    Meteor.users.update({_id: _invitedBy},{$addToSet: {invited: _userId}});
                    _registerUser(_range, _userId);
                })
                .catch((error) => {
                    console.log("ERROR:", error);
                    reject(error);
                });
            }
        };
        _registerUser(_.range(recordCount), mainUserId);
    });
};

const _makeTestPosts = (user, recordCount) => {
    return _.range(recordCount).map((number) => {
        return createPost(user._id, {
            caption: `Test post ${number} for user ${user.profile.firstName} ${user.profile.lastName} (${user._id})`,
            url: '',
            type: 'text',
            tags: [],
            mentions: [],
            images: [],
            video: ''
        });
    });
}
