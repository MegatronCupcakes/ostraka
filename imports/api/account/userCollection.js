import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';
import IndexCollection from '../util/indexCollection';

const _indexes = [
    {viewId: 1},
    {active: 1}
];

IndexCollection(Meteor.users, _indexes);
