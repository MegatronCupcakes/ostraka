import {Mongo} from 'meteor/mongo';
import {check, Match} from 'meteor/check';
import {Random} from 'meteor/random';
import IndexCollection from '../util/indexCollection';
import {viewId} from '/imports/api/util/viewId';

const MessageCollection = new Mongo.Collection('messages');

const _indexes = [
    {toId: 1},
    {fromId: 1},
    {viewId: 1},
    {active: 1},
    {read: 1},
    {notify: 1},
    {createdAt: 1}
]

IndexCollection(MessageCollection, _indexes);

export default MessageCollection;

export const messageReturnFields = (userId) => {
    return {
        _id: 1,
        viewId: 1,
        toId: 1,
        subject: 1,
        body: 1,
        fromId: 1,
        fromViewId: 1,
        fromName: 1,
        fromTag: 1,
        fromImage: 1,
        active: 1,
        read: 1,
        notify: 1,
        createdAt: 1
    };
};

export const createMessage = (fromId, message) => {
    check(fromId, String);
    check(message, {
        toId: String,
        subject: String,
        body: String
    });
    return new Promise((resolve, reject) => {
        const fromUser = Meteor.users.findOne({_id: fromId},{fields: {viewId: 1, profile: 1}});
        const toUser = Meteor.users.findOne(
            {_id: message.toId},
            {fields: {
                tag: "$profile.profileTag",
                allowFromAny: "$settings.messaging.allowFromAny",
                blocked: {$in: [fromId, "$settings.messaging.blockedUsers"]},
                allowed: {$in: [fromId, "$settings.messaging.allowedUsers"]}
            }
        });
        if((toUser.allowFromAny && !toUser.blocked) || (!toUser.allowFromAny && toUser.allowed)){
            // Create Message;
            MessageCollection.insert({...message,
                fromId: fromId,
                fromViewId:fromUser.viewId,
                fromName: `${fromUser.profile.firstName} ${fromUser.profile.lastName}`,
                fromTag: fromUser.profile.profileTag,
                fromImage: fromUser.profile.profileImage,
                viewId: viewId(),
                active: true,
                read: false,
                notify: true,
                createdAt: new Date()
            }, (error, _id) => {
                if(error){
                    console.log("ERROR:", error);
                    reject(error);
                } else {
                    resolve(_id);
                }
            });
        } else {
            // Messaging this user is not permitted
            reject(`@${toUser.tag}'s settings prevent you from sending this message`);
        }
    });
};

export const markMessageAsRead = (userId, messageId) => {
    return new Promise((resolve, reject) => {
        try {
            MessageCollection.update({_id: messageId, toId: userId},{$set: {read: true, notify: false}}, (error, numberOfDocs) => {
                if(error){
                    reject(error);
                } else {
                    resolve();
                }
            });
        } catch(error){
            reject(error);
        }
    });
};
export const clearMessageNotifications = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            MessageCollection.update({toId: userId, notify: true},{$set: {notify: false}}, {multi: true}, (error, numberOfDocs) => {
                if(error){
                    reject(error);
                } else {
                    resolve();
                }
            });
        } catch(error){
            reject(error);
        }
    });
};
export const markMessageAsDeleted = (userId, messageId) => {
    return new Promise((resolve, reject) => {
        try {
            MessageCollection.update({_id: messageId, toId: userId},{$set: {active: false}}, (error, numberOfDocs) => {
                if(error){
                    reject(error);
                } else {
                    resolve();
                }
            });
        } catch(error){
            reject(error);
        }
    });
};

/*
MessageCollection.find({}).forEach((message) => {
    delete message._id;
    MessageCollection.insert(message);
});
*/
