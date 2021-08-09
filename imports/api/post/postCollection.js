import {Mongo} from 'meteor/mongo';

const PostCollection = new Mongo.Collection('posts');
PostCollection.rawCollection().createIndex({
    tags: "text",
    mentions: "text"
});

export default PostCollection;
