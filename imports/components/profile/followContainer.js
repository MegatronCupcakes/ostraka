import React from 'react';
import PropTypes from 'prop-types';
import Follow from '/imports/components/profile/follow';
import {Meteor} from 'meteor/meteor';
import MeteorCall from '../../api/util/callPromise';

const FollowContainer = (props) => {
    const handleClick = async () => {
        await MeteorCall('followUser', props.user._id)
        .catch((error) => {
            console.log("ERROR TOGGLING FOLLOW STATUS:", error);
        });
    };
    return (
        <Follow
            isCurrentUser={props.user._id === Meteor.userId()}
            followed={props.user.followed}
            followedByCount={props.user.followedByCount}
            handleClick={handleClick}
            viewSize={props.viewSize}
        />
    )
};
FollowContainer.propTypes = {
    user: PropTypes.object.isRequired,
    viewSize: PropTypes.string,
    navStack: PropTypes.object.isRequired
};
export default FollowContainer;
