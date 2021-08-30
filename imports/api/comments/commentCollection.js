import {Mongo} from 'meteor/mongo';
import IndexCollection from '../util/indexCollection';

const CommentCollection = new Mongo.Collection('comments');

const _indexes = [
    {tags: "text", mentions: "text"},
    {parentId: 1},
    {userId: 1},
    {active: 1},
    {createdAt: 1}
];

IndexCollection(CommentCollection, _indexes);

export default CommentCollection;
