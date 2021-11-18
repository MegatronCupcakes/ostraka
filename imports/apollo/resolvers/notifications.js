import NotificationCollection, {notificationReturnFields} from '/imports/api/notifications/notificationCollection';

const _indicatorChunkSize = Meteor.settings.pagination.notifications.navIndicator;
const _inboxChunkSize = Meteor.settings.pagination.notifications.notificationInbox;

export const getNotifications = (parent, args, context, info) => {
    return {
        count: NotificationCollection.find({active: true, userId: context.user._id}).count(),
        notifications: NotificationCollection.find({active: true, userId: context.user._id}, {fields: notificationReturnFields(context.user._id), skip: args.offset ? args.offset * _inboxChunkSize : 0, limit: _inboxChunkSize, sort: {createdAt: -1}}),
        pageSize: _inboxChunkSize
    };
};

export const getNotificationsForIndicator = (parent, args, context, info) => {
    return {
        count: NotificationCollection.find({active: true, read: false, notify: true, userId: context.user._id}, {sort: {createdAt: -1}}).count(),
        notifications: NotificationCollection.find({active: true, read: false, notify: true, userId: context.user._id}, {fields: notificationReturnFields(context.user._id), limit: _indicatorChunkSize, sort: {createdAt: -1}}),
        pageSize: _indicatorChunkSize
    };
};
