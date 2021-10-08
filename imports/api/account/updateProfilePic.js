import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';

Meteor.methods({
    updateProfilePic: function(url){
        check(url, String);
        this.unblock();
        Meteor.users.update({_id: this.userId},{$set: {'profile.profileImage': url}});
        return;
    }
})
