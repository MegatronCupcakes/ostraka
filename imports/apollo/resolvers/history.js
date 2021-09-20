import HistoryCollection from '/imports/api/history/historyCollection';

export const getUserHistory = (parent, args, context, info) => {
    return HistoryCollection.find({userId: args.userId});
};
