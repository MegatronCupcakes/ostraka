import {WebApp} from 'meteor/webapp';
import ParseUri from '../util/parseUri';
import _ from 'underscore';
import {createServer} from 'cors-anywhere';

const originBlacklist = [];
const originWhitelist = [];
const corsProxy = createServer({
    originBlacklist: originBlacklist,
    originWhitelist: originWhitelist,
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: [
        'cookie',
        'cookie2',
        'x-heroku-queue-wait-time',
        'x-heroku-queue-depth',
        'x-heroku-dynos-in-use',
        'x-request-start'
    ],
    redirectSameOrigin: true,
    httpProxyOptions: {
        xfwd: false
    }
});

WebApp.connectHandlers.use('/corsProxy', (req, res, next) => {
    req.url = req.url.replace('/corsProxy/', '/'); // Strip "/proxy" from the front of the URL.
    corsProxy.emit('request', req, res);
});
