import HistoryCollection from '/imports/api/history/historyCollection';

const _chunkSize = Meteor.settings.pagination.history.chunkSize;

export const getUserHistory = async (parent, args, context, info) => {
    return await new Promise((resolve, reject) => {
        try {
            resolve({
                count: HistoryCollection.find({userId: args.userId}).count(),
                results: HistoryCollection.find({userId: args.userId}, {sort: {createdAt: -1}, skip: args.offset, limit: _chunkSize}),
                pageSize: _chunkSize // leaving the door open to define custom pagesizes per content type at a later date if needed.
            });
        } catch(error){
            reject(error);
        }
    });
};
