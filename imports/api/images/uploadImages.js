import {Meteor} from "meteor/meteor";
import {Accounts} from 'meteor/accounts-base';
import LocalStoreImages from './localStorage';
import {check, Match} from 'meteor/check';

const imageStrategy = JSON.parse(process.env.images).strategy;

Meteor.methods({
    uploadImages: async function(images){
        check(images, Array);
        // resize if necessary, move to storage solution, then return storage URIs
        // store images in userId directory
        let error = null;
        let newUrls;
        switch(imageStrategy){
            case 'local':
                newUrls = await LocalStoreImages(this.userId, images)
                .catch((_error) => {
                    error = _error;
                });
                break;
            case 'S3':
                break;
            case "CloudFront":
                break;
            case "CloudFlare":
                break;
            default:
                newUrls = await LocalStoreImages(this.userId, images)
                .catch((_error) => {
                    error = _error;
                });
                break;
        }
        return (error, newUrls);
    }
});
