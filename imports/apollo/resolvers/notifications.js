import NotificationCollection, {notificationReturnFields} from '/imports/api/notifications/notificationCollection';

export const getNotifications = (parent, args, context, info) => {
    return NotificationCollection.find({active: true, userId: context.user._id}, {fields: notificationReturnFields(context.user._id), sort: {createdAt: -1}});
};

export const getNotificationsForIndicator = (parent, args, context, info) => {
    return NotificationCollection.find({active: true, read: false, notify: true, userId: context.user._id}, {fields: notificationReturnFields(context.user._id), sort: {createdAt: -1}});
};
