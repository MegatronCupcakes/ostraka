import {Meteor} from 'meteor/meteor';
import IndexCollection from '/imports/api/util/indexCollection';

const _indexes = [
    {"profile.profileTag": "text"},
    {viewId: 1},
    {active: 1}
];
IndexCollection(Meteor.users, _indexes);
