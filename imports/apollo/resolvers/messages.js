import MessageCollection, {messageReturnFields} from '/imports/api/messaging/messageCollection';

const _indicatorChunkSize = Meteor.settings.pagination.messages.navIndicator;
const _inboxChunkSize = Meteor.settings.pagination.messages.messagingInbox;

export const getMessagesIndicator = (parent, args, context, info) => {
    const userId = context.user ? context.user._id : "";
    return {
        count: MessageCollection.find({toId: userId, active: true, notify: true}).count(),
        messages: MessageCollection.find({toId: userId, active: true, notify: true}, {fields: messageReturnFields(userId), limit: _indicatorChunkSize, sort: {createdAt: -1}}),
        pageSize: _indicatorChunkSize
    };
};

export const getMessages = (parent, args, context, info) => {
    const userId = context.user ? context.user._id : "";
    if(args.query){
        return {
            count:MessageCollection.find({
                toId: userId,
                active: true,
                $or: [{
                    fromName: new RegExp(args.query, "gi")
                },{
                    fromTag: new RegExp(args.query, "gi")
                },{
                    subject: new RegExp(args.query, "gi")
                }, {
                    body: new RegExp(args.query, "gi")
                }]
            }).count(),
            messages: MessageCollection.find({
                toId: userId,
                active: true,
                $or: [{
                    fromName: new RegExp(args.query, "gi")
                },{
                    fromTag: new RegExp(args.query, "gi")
                },{
                    subject: new RegExp(args.query, "gi")
                }, {
                    body: new RegExp(args.query, "gi")
                }]
            }, {fields: messageReturnFields(userId), skip: args.offset ? args.offset * _inboxChunkSize : 0, limit: _inboxChunkSize, sort: {createdAt: -1}}),
            pageSize: _inboxChunkSize
        };
    } else {
        return {
            count: MessageCollection.find({toId: userId, active: true}).count(),
            messages: MessageCollection.find({toId: userId, active: true}, {fields: messageReturnFields(userId), skip: args.offset ? args.offset * _inboxChunkSize : 0, limit: _inboxChunkSize, sort: {createdAt: -1}}),
            pageSize: _inboxChunkSize
        };
    }
};
