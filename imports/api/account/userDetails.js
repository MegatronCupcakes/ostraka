import { Meteor } from "meteor/meteor";

// publish additional user fields for the current logged-in user
Meteor.publish('userData', function () {
  if(this.userId){
      return Meteor.users.find({_id: this.userId},{
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
      });
  } else {
      this.ready();
  }
});

//forbid direct user updates to the user document
Meteor.users.deny({ update: () => true });
