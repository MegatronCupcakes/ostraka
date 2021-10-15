import {Mongo} from 'meteor/mongo';
import IndexCollection from '/imports/api/util/indexCollection';
const ErrorCollection = new Mongo.Collection('errors');

IndexCollection(ErrorCollection, [
    {fileName: "text"},
    {userId: 1},
    {createdAt: 1}
]);

// logError(userId, error, __filename, new Error().stack);
export const logError = async (userId, error, fileName, stack) => {
    return await new Promise((resolve, reject) => {
        const errorRecord = {
            userId: userId,
            error: error,
            stack: stack,
            fileName: fileName,
            createdAt: new Date()
        };
        ErrorCollection.insert(errorRecord, (_error, _id) => {
            if(_error){
                reject(_error);
            } else {
                resolve(_id);
            }
        });
    })
    .catch((_error) => {
        console.error("ERROR LOGGING ERRORS:", _error);
        console.error("ERROR LOGGING ERRORS (original error):", error);
    });
}
