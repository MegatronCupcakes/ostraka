import {Meteor} from "meteor/meteor";
import _ from 'underscore';

const shareTypes = _.keys(Meteor.settings.public.sharing);
const messagingSettings = _.keys(Meteor.settings.public.messagingDefaults);

export const getSettings = () => {
    let settings = (Meteor.user() && Meteor.user({fields: {settings: 1}}).settings) ? Meteor.user({fields: {settings: 1}}).settings : {};
    if(!settings.sharing) settings.sharing = {};
    shareTypes.forEach((type) => {
        if(!settings.sharing[type]) settings[type] = false;
    });
    if(!settings.messaging) settings.messaging = {};
    messagingSettings.forEach((setting) => {
        if(!settings.messaging[setting]) settings.messaging[setting] = Meteor.settings.public.messagingDefaults[setting].default;
    });
    return settings;
}
