import {Random} from 'meteor/random';

export const viewId = () => {
    return Random.secret().toLowerCase();
}
