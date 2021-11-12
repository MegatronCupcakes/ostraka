import {Mongo} from 'meteor/mongo';
import {check, Match} from 'meteor/check';
import {Random} from 'meteor/random';
import IndexCollection from '../util/indexCollection';
import {viewId} from '/imports/api/util/viewId';

const NotificationCollection = new Mongo.Collection('notifications');

const _indexes = [
    {userId: 1},
    {viewId: 1},
    {active: 1},
    {read: 1},
    {notify: 1},
    {createdAt: 1}
];

IndexCollection(NotificationCollection, _indexes);

export default NotificationCollection;

export const notificationReturnFields = (userId) => {
    return {
        _id: 1,
        viewId: 1,
        userId: 1,
        subject: 1,
        body: 1,
        navTo: 1,
        active: 1,
        read: 1,
        notify: 1,
        createdAt: 1
    };
};

export const createNotification = (notification) => {
    return new Promise((resolve, reject) => {
        NotificationCollection.insert({...notification,
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
    });
};

export const markNotificationsRead = (allBoolean, notificationId, userId) => {
    return new Promise((resolve, reject) => {
        const selector = allBoolean ? {userId: userId} : {_id: notificationId, userId: userId};
        const options = allBoolean ? {multi: true} : null;
        NotificationCollection.update(selector, {$set: {read: true, notify: false}}, options, (error) => {
            if(error){
                reject(error);
            } else {
                resolve();
            }
        });
    });
};
