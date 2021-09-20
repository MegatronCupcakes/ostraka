import {Mongo} from 'meteor/mongo';
import IndexCollection from '../util/indexCollection';

const UserCollection = new Mongo.Collection('users');

const _indexes = [
    {viewId: 1},
    {active: 1}
];

IndexCollection(UserCollection, _indexes);
