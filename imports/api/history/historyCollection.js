import {Mongo} from 'meteor/mongo';
import IndexCollection from '/imports/api/util/indexCollection';

const HistoryCollection = new Mongo.Collection('posts');

const _indexes = [
    {userId: 1},
    {active: 1},
    {createdAt: 1}
]

IndexCollection(HistoryCollection, _indexes);

export default HistoryCollection;
