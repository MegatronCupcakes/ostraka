import _ from 'underscore';

export const isBad = (value) => {
    return _.isUndefined(value) || _.isNull(value) || _.isEmpty(value);
}
