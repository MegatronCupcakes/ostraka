import _ from 'underscore';
import RuleSets from '/imports/api/rules/ruleSets';

export class Rules {

    constructor(version){
        this._version = version;
        this.current = (_.isNumber(this._version) && _versionExists(this._version)) ? _getVersion(this._version) || _latestVersion();
    };

    get rule(trigger){
        return this.current.triggers[trigger];
    };

}
export default Rules;

const _versionExists = (version) => {
    return _.contains(_.pluck(RuleSets, "version"), version);
};

const _getVersion = (version) => {
    return _.findWhere(RuleSets, {version: version});
};

const _latestVersion = () => {
    return _.last(_.sortBy(RuleSets, "version"));
};
