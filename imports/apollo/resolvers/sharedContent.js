import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import PostCollection from '/imports/api/post/postCollection';
import TagCollection from '/imports/api/tag/tagCollection';

export const getSharedContent = (parent, args, context, info) => {
    const query = {viewId: args.viewId, active: true};

    let _post = PostCollection.findOne(query);
    if(_post) _post._type = "Post";

    let _tag = TagCollection.findOne(query);
    if(_tag) _tag._type = "Tag";

    let _profile = Meteor.users.findOne(query);
    if(_profile) _profile._type = "User";

    return  _post || _tag || _profile;
};
