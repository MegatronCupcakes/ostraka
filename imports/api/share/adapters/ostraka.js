import {Meteor} from 'meteor/meteor';
import PostCollection, {createPost} from '/imports/api/post/postCollection';
import CommentCollection from '/imports/api/comments/commentCollection';
import TagCollection from '/imports/api/tag/tagCollection';
import {createShareUrl} from '/imports/api/share/createShareUrl';
import {logError} from '/imports/api/errorLogger/errorLogger';

export const ostrakaShare = (userId, sharedId, sharedContentType, shareType, caption, tags, mentions) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sharedCollection;
            // check to see if the user is sharing a shared post to avoid Share Inception.
            if(sharedContentType == 'shared'){
                // record that this shared typed post was shared by this user.
                PostCollection.update({_id: sharedId},{$push: {sharedBy: userId}});
                // now overwrite the shared id with the source id from the shared post
                sharedId = PostCollection.findOne({_id: sharedId}, {sharedContentId: 1}).sharedContentId;
                let _post = PostCollection.findOne({_id: sharedId}, {_id: 1});
                if(_post){
                     sharedContentType = 'post';
                } else {
                    let _tag = TagCollection.findOne({_id: sharedId}, {_id: 1});
                    if(_tag){
                        sharedContentType = 'tag';
                    } else {
                        let _comment = CommentCollection.findOne({_id: sharedId}, {_id: 1});
                        if(_comment){
                            sharedContentType = 'comment';
                        } else {
                            let _profile = Meteor.users.findOne({_id: sharedId}, {_id: 1});
                            if(_profile) sharedContentType = 'profile';
                        }
                    }
                }
            }
            switch(sharedContentType){ // post, comment, tag, or profile
                case 'post':
                    sharedCollection = PostCollection;
                    break;
                case 'comment':
                    sharedCollection = CommentCollection;
                    break;
                case 'tag':
                    sharedCollection = TagCollection;
                    break;
                case 'profile':
                    sharedCollection = Meteor.users;
                    break;
            };
            const shareUrl = await createShareUrl(sharedContentType, sharedId, userId);
            const postId = await createPost(userId, {
                sharedContentId: sharedId,
                sharedById: userId,
                caption: caption,
                url: shareUrl,
                type: "shared",
                tags: tags,
                mentions: mentions,
                images: [],
                video: ""
            });
            // record that this content was shared by this user
            sharedCollection.update({_id: sharedId},{$push: {sharedBy: userId}});
            const post = PostCollection.findOne({_id: postId});
            resolve({
                shareType: "ostraka",
                post: post
            });
        } catch(error){
            logError(userId, error, __filename, new Error().stack);
            reject(error);
        }
    });
};
