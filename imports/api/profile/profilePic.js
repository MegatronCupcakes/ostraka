import {Meteor} from 'meteor/meteor';
import ParseUri from '/imports/api/util/parseUri';
import {isBad} from '/imports/api/util/isBad';

// supplies the profile picture for the current user; returns a default image if
// the profile contains an invalid reference.
export const currentUserProfilePic = () => {
    let profileImage = Meteor.user({fields: {'profile.profileImage': 1}}).profile.profileImage;
    if(isBad(profileImage)){
        const parsedUri = ParseUri(window.location.href);
        profileImage = `${parsedUri.protocol}://${parsedUri.host}:${parsedUri.port}${Meteor.settings.public.profile.defaultImage}`;
    }
    return profileImage;
}

export const userProfilePic = (url) => {
    if(isBad(url)){
        const parsedUri = ParseUri(window.location.href);
        url = `${parsedUri.protocol}://${parsedUri.host}:${parsedUri.port}${Meteor.settings.public.profile.defaultImage}`;
    }
    return url;
}
