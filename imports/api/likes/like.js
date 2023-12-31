import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import {logError} from '/imports/api/errorLogger/errorLogger';
import {notifyUser} from '/imports/api/notifications/notify';
import PostCollection from '../post/postCollection';
import CommentCollection from '../comments/commentCollection';
import Rules from '/imports/api/rules/rules';

Meteor.methods({
    likePost: async function(likedId, likedType, action){
        this.unblock();
        check(likedId, String);
        check(likedType, String);
        check(action, String); // "like", "unlike", "dislike", "undislike"
        const userId = this.userId;
        const rules = new Rules();
        // double check to make sure the user is not acting on their own content.
        // in case we split post types into seperate collections; currently all
        // post types are stored in PostCollection
        let _collection;
        let _notificationType;
        switch(likedType.toLowerCase()){
            case 'comment':
                _collection = CommentCollection;
                _notificationType = `${action}Comment`;
                break;
            default:
                _collection = PostCollection;
                _notificationType = `${action}Post`;
                break;

        }
        try {
            const notificationPayload = _collection.findOne({_id: likedId});
            if(this.userId !== notificationPayload.postedById){
                let updateObj = {};
                if(action.includes("un")){
                    updateObj["$pull"] = {};
                    updateObj["$pull"][action.replace("un","") + 's'] = this.userId;
                } else {
                    // liking a post should "undo" a previous dislike (and vice versa)
                    const undoAction = action === 'like' ? 'dislike' : 'like';
                    updateObj["$addToSet"] = {};
                    updateObj["$addToSet"][action + 's'] = this.userId;
                    updateObj["$pull"] = {};
                    updateObj["$pull"][undoAction + 's'] = this.userId;
                }
                _collection.update({_id: likedId}, updateObj);

                await rules.apply(action, userId, notificationPayload.postedById, likedId, likedType)
                .catch((error) => logError(userId, error, __filename, new Error().stack));

                await notifyUser(this.userId, _notificationType, notificationPayload)
                .catch((error) => logError(userId, error, __filename, new Error().stack));
            }
        } catch(error){
            logError(userId, error, __filename, new Error().stack);
        }
        return;
    }
});
