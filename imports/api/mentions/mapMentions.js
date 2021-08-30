import { Meteor } from "meteor/meteor";

const MapMentions = (mentionArray) => {
    return new Promise(async (resolve, reject) => {
        const mentionedIds = await Promise.all(mentionArray.map((mention) => {
            return new Promise((_resolve, _reject) => {
                const mentionedUser = Meteor.users.findOne({'profile.profileTag': mention},{_id:1});
                _resolve(mentionedUser ? mentionedUser._id : null);
            })
        }));
        resolve(mentionedIds);
    });
}
export default MapMentions;
