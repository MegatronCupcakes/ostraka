import {Meteor} from "meteor/meteor";

const shareTypes = ["ostraka", "facebook", "instagram", "twitter", "link", "embed"];

export const getSettings = () => {
    let settings = (Meteor.user() && Meteor.user({fields: {settings: 1}}).settings) ? Meteor.user({fields: {settings: 1}}).settings : {};
    if(!settings.sharing) settings.sharing = {};
    shareTypes.forEach((type) => {
        if(!settings.sharing[type]) settings[type] = false;
    });
    return settings;
}
