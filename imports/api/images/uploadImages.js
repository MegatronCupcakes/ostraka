import {Meteor} from "meteor/meteor";
import {Accounts} from 'meteor/accounts-base';
import StoreImages from './localStorage';
import {check, Match} from 'meteor/check';


Meteor.methods({
    uploadImages: async function(images){
        //this.unblock();
        check(images, Array);
        // resize if necessary, move to storage solution, then return storage URIs
        // store images in userId directory
        let error = null;
        const newUrls = StoreImages(this.userId, images)
        .catch((_error) => {
            error = _error;
        });
        return (error, newUrls);
    }
});
