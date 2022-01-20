import {Meteor} from "meteor/meteor";
import _ from 'underscore';
import {isBad} from '/imports/api/util/isBad';

const shareTypes = _.keys(Meteor.settings.public.sharing);
const messagingSettings = _.keys(Meteor.settings.public.messagingDefaults);
const notificationSettings = _.keys(Meteor.settings.public.notificationDefaults);

export const getSettings = (userId, settings) => {
    settings = settings ? settings : _getSettings(userId);
    if(!settings.sharing) settings.sharing = {};
    shareTypes.forEach((type) => {
        if(!settings.sharing[type]) settings[type] = false;
    });
    if(!settings.messaging) settings.messaging = {};
    messagingSettings.forEach((setting) => {
        if(!settings.messaging[setting]) settings.messaging[setting] = Meteor.settings.public.messagingDefaults[setting].default;
    });
    if(!settings.notifications) settings.notifications = {};
    notificationSettings.forEach((setting) => {
        // careful; the setting values are Boolean so false values get reset to
        // the default value unless we explicitly check for existing Booean values.
        if(!_.isBoolean(settings.notifications[setting]) && isBad(settings.notifications[setting])) settings.notifications[setting] = Meteor.settings.public.notificationDefaults[setting].default;
    });
    return settings;
};

const _getSettings = (userId) => {
    if(Meteor.isClient){
        return (Meteor.user() && Meteor.user({fields: {settings: 1}}).settings) ? Meteor.user({fields: {settings: 1}}).settings : {};
    } else if(Meteor.isServer && userId){
        return Meteor.users.findOne({_id: userId}, {fields: {settings: 1}}).settings;
    } else {
        return {};
    }
};
