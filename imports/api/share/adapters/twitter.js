import {Meteor} from "meteor/meteor";
import {check, Match} from 'meteor/check';
import Twitter from 'twitter';
import {WebApp} from 'meteor/webapp';

const twitterAuthCallback ="/externalSharing/twitter"

export const twitterShare = (userId, sharedId, sharedContentType, shareType, caption, tags, mentions) => {
    return new Promise((resolve, reject) => {

    });
};

Meteor.methods({
    "getTwitterToken": async function (){
        const twitterSettings = JSON.parse(process.env.shareSettings).twitter;
        const twitterClient = new Twitter({
            consumer_key: twitterSettings.consumer_key,
            consumer_secret: twitterSettings.consumer_secret,
            access_token_key: twitterSettings.access_token_key,
            access_token_secret: twitterSettings.access_token_secret
        });
        await twitterClient.post('/oauth/request_token', {oauth_callback: `${process.env.APP_URL}${twitterAuthCallback}`})

    }
})

WebApp.connectHandlers.use(twitterAuthCallback, (req, res, next) => {

});
