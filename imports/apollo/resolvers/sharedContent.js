import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import {isBad} from '/imports/api/util/isBad'
import PostCollection, {postReturnFields} from '/imports/api/post/postCollection';
import CommentCollection, {commentReturnFields} from '/imports/api/comments/commentCollection';
import TagCollection, {tagReturnFields} from '/imports/api/tag/tagCollection';
import {profileReturnFields} from '/imports/api/profile/profileReturnFields';

export const getSharedContent = (parent, args, context, info) => {
    // viewId should always be lowercase; if a sharedContentId was provided, use it to find the shared content.
    // Otherwise, use the viewId.
    const query = isBad(args.sharedContentId) ? {viewId: args.viewId.toLowerCase(), active: true} : {_id: args.sharedContentId, active: true};
    const userId = context.user ? context.user._id : "";
    const sharedById = args.sharedById; //use to track shared views; not implemented yet.

    let _post = PostCollection.findOne(query, {fields: postReturnFields(userId)});
    if(_post) _post._type = "Post";

    let _tag = TagCollection.findOne(query, {fields: tagReturnFields(userId)});
    if(_tag) _tag._type = "Tag";

    let _comment = CommentCollection.findOne(query, {fields: commentReturnFields(userId)});
    if(_comment) _comment._type = "Comment";

    let _profile = Meteor.users.findOne(query, {fields: profileReturnFields(userId)});
    if(_profile) _profile._type = "User";

    return  _post || _tag || _comment || _profile;
};
