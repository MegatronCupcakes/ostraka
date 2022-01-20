import {Meteor} from "meteor/meteor";
import _ from 'underscore';
import {getSettings} from '/imports/api/settings/getSettings';

// publish additional user fields for the current logged-in user
// use getSettings to merge in all current settings.
Meteor.publish('userData', function(){
    let initializing = true;
    const queryHandler = Meteor.users.find({_id: this.userId},{
        fields: {
            profile: 1,
            viewId: 1,
            reputationScore: 1,
            invitedBy: 1,
            invited: 1,
            followedUsers: 1,
            followedTopics: 1,
            settings: 1,
            emails: 1
        }
    }).observe({
        added: (user) => {
            this.added('users', this.userId, {
                ...user,
                settings: getSettings(this.userId, user.settings)
            });
        },
        changed: (user) => {
            this.changed('users', this.userId, {
                ...user,
                settings: getSettings(this.userId, user.settings)
            });
        },
        removed: (user) => {
            this.removed('users', this.userId);
        }
    });
    initializing = false;
    this.ready();
    this.onStop(() => queryHandler.stop());
});

//forbid direct user updates to the user document
Meteor.users.deny({ update: () => true });
