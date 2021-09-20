import {Meteor} from 'meteor/meteor';
import PostCollection from '/imports/api/post/postCollection';
import CommentCollection from '/imports/api/comments/commentCollection';
import TagCollection from '/imports/api/tag/tagCollection';

export const createShareUrl = (type, sharedId, sharedById) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("type:", type, "sharedId:", sharedId, "sharedById:", sharedById);
            const sharedByViewId = Meteor.users.findOne({$or: [{_id: sharedById}, {viewId: sharedById}], active: true},{viewId:1}).viewId;
            let sharedViewId;
            switch(type){ // post, comment, tag, or profile
                case "post":
                    sharedViewId = PostCollection.findOne({$or: [{_id: sharedId}, {viewId: sharedId}], active: true},{viewId:1}).viewId;
                    break;
                case "comment":
                    sharedViewId = CommentCollection.findOne({$or: [{_id: sharedId}, {viewId: sharedId}], active: true},{viewId:1}).viewId;
                    break;
                case "tag":
                    sharedViewId = TagCollection.findOne({$or: [{_id: sharedId}, {viewId: sharedId}], active: true},{viewId:1}).viewId;
                    break;
                case "profile":
                    sharedViewId = Meteor.users.findOne({$or: [{_id: sharedId}, {viewId: sharedId}], active: true},{viewId:1}).viewId;
                    break;
            }
            resolve(`${process.env.APP_URL}/view?${sharedViewId}&${sharedByViewId}`);
        } catch(error){
            reject(error);
        }
    });
};
