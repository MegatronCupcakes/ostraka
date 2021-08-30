import {Mongo} from 'meteor/mongo';
import IndexCollection from '../util/indexCollection';

const PostCollection = new Mongo.Collection('posts');

const _indexes = [
    {tags: "text", mentions: "text", postedByTag: "text", postedBy: "text"},
    {postedById: 1},
    {viewId: 1},
    {active: 1},
    {createdAt: 1}
]

IndexCollection(PostCollection, _indexes);

export default PostCollection;
