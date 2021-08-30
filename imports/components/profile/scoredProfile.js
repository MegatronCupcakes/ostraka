import React from 'react';
import PropTypes from 'prop-types';
import UserIdentifier from '/imports/components/feed/userIdentifier';

const ScoredProfile = (props) => {
    return (
        <div className="fade-in">
            <UserIdentifier
                displaySize={props.displaySize ? props.displaySize : "small"}
                postedBy={props.user.profile.firstName + " " + props.user.profile.lastName}
                postedByTag={props.user.profile.profileTag}
                postedById={props.user._id}
                postedByProfilePic={props.user.profile.profileImage}
                navStack={props.navStack}
            />
            reputation score: {props.user.profile.reputationScore}
        </div>
    )
}
ScoredProfile.propTypes = {
    navStack: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    displaySize: PropTypes.string
};
export default ScoredProfile;
