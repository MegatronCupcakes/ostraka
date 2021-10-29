import MessageCollection, {messageReturnFields} from '/imports/api/messaging/messageCollection';

export const getMessagesIndicator = (parent, args, context, info) => {
    const userId = context.user ? context.user._id : "";
    return MessageCollection.find({toId: userId, active: true, notify: true}, {fields: messageReturnFields(userId), sort: {createdAt: -1}});
};

export const getMessages = (parent, args, context, info) => {
    const userId = context.user ? context.user._id : "";
    if(args.query){
        return MessageCollection.find({
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
        }, {fields: messageReturnFields(userId), sort: {createdAt: -1}});
    } else {
        return MessageCollection.find({toId: userId, active: true}, {fields: messageReturnFields(userId), sort: {createdAt: -1}});
    }
};
