import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import {logError} from '/imports/api/errorLogger/errorLogger';
import {isBad} from '/imports/api/util/isBad';
import RuleSets from '/imports/api/rules/ruleSets';
import HistoryCollection from '/imports/api/history/historyCollection';

export class Rules {

    constructor(version){
        this.current = (_.isNumber(version) && _versionExists(version)) ? _getVersion(version) : _latestVersion();
    };

    apply(trigger, actingUserId, targetUserId, targetContentId, targetContentType){
        return new Promise(async (resolve, reject) => {
            try {
                const depthModifiers = this.current.depthModifiers;
                const userFields = {fields: {invitedBy: 1, 'profile.firstName': 1, 'profile.lastName': 1, 'profile.profileTag': 1, 'profile.profileImage': 1}};
                const actingUser = Meteor.users.findOne({_id: actingUserId}, userFields);
                const targetUser = Meteor.users.findOne({_id: targetUserId}, userFields);

                // acting
                const actingValue = this.current.values[trigger].acting.value;
                const actingDepth = this.current.values[trigger].acting.depth;
                // modify acting user tree
                await _modifyUserTree(
                    trigger,
                    'acting',
                    actingUser,
                    targetUser,
                    actingValue,
                    actingDepth,
                    depthModifiers,
                    userFields,
                    targetContentId,
                    targetContentType,
                    this.current.version
                );

                // target
                const targetValue = this.current.values[trigger].target.value;
                const targetDepth = this.current.values[trigger].target.depth;
                // modify target user tree
                await _modifyUserTree(
                    trigger,
                    'target',
                    actingUser,
                    targetUser,
                    targetValue,
                    targetDepth,
                    depthModifiers,
                    userFields,
                    targetContentId,
                    targetContentType,
                    this.current.version
                );
                resolve();
            } catch(error){
                reject(error);
            }
        });
    };

}
export default Rules;

const _modifyUserTree = (trigger, actionType, actingUser, targetUser, value, triggerDepth, depthModifiers, userFields, targetContentId, targetContentType, rulesVersion) => {
    return new Promise(async (resolve, reject) => {
        try {
            const _updateAtDepth = (_currentDepth, _user, _dependencies, _fn) => {
                if(isBad(_user) || _currentDepth > triggerDepth){
                    _fn();
                } else {
                    // modify user
                    const _updateValue = value * depthModifiers[_currentDepth];
                    Meteor.users.update({_id: _user._id},{$inc: {reputationScore: _updateValue}});
                    // create history
                    const _invitingUser = Meteor.users.findOne({_id: _user.invitedBy}, userFields);
                    _dependencies.push({
                        userId: _user._id,
                        userTag: _user.profile.profileTag,
                        userName: `${_user.profile.firstName} ${_user.profile.lastName}`,
                        actionType: actionType,
                        sequenceNumber: _currentDepth
                    });
                    HistoryCollection.insert({
                        userId: _user._id,
                        trigger: {
                            action: trigger,
                            actionType: actionType,
                            actingUserId: actingUser._id,
                            targetUserId: targetUser._id,
                            actingUserName: `${actingUser.profile.firstName} ${actingUser.profile.lastName}`,
                            actingUserTag: actingUser.profile.profileTag,
                            actingUserImage: actingUser.profile.profileImage,
                            targetContentId: targetContentId,
                            targetContentType: targetContentType,
                            targetUserName: `${targetUser.profile.firstName} ${targetUser.profile.lastName}`,
                            targetUserTag: targetUser.profile.profileTag,
                            targetUserImage: targetUser.profile.profileImage,
                            dependentRelationship: _dependencies
                        },
                        description: "",
                        appliedValue: _updateValue,
                        ruleSet: rulesVersion,
                        active: true,
                        createdAt: new Date()
                    });
                    _currentDepth++;
                    _updateAtDepth(_currentDepth, _invitingUser, _dependencies, _fn);
                }
            };
            _updateAtDepth(1, actionType == 'acting' ? actingUser : targetUser, [], resolve);
        } catch(error){
            logError(null, error, __filename, new Error().stack);
            reject(error);
        }
    })
}

const _versionExists = (version) => {
    return _.contains(_.pluck(RuleSets, "version"), version);
};

const _getVersion = (version) => {
    return _.findWhere(RuleSets, {version: version});
};

const _latestVersion = () => {
    return _.last(_.sortBy(RuleSets, "version"));
};
