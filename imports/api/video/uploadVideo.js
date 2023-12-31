import {Meteor} from "meteor/meteor";
import {Accounts} from 'meteor/accounts-base';
import {check, Match} from 'meteor/check';
import {logError} from '/imports/api/errorLogger/errorLogger';

Meteor.methods({
    uploadVideo: function(images){
        const userId = this.userId;
        //check(images, Array);

        // strip exif data, resize if necessary, upload to CDN and return CDN URI
        console.log("user: " + userId + " uploading video");
        try{

        } catch(error){
            logError(userId, error, __filename, new Error().stack);
        }
        return;
    }
});
