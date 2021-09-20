import React from 'react';
import PropTypes from 'prop-types';
import ProfileContainer from '/imports/components/profile/profileContainer';

const ViewSharedProfile = (props) => {
    return (
        <ProfileContainer
            user={props.user}
            sharedById={props.sharedById}
            viewType={props.viewType}
            navStack={props.navStack}
            viewSize="large"
        />
    );
};
ViewSharedProfile.propTypes = {
    user: PropTypes.object.isRequired,
    sharedById: PropTypes.string.isRequired,
    noninteractive: PropTypes.bool.isRequired,
    viewSize: PropTypes.string.isRequired,
    viewType: PropTypes.string,
    navStack: PropTypes.object.isRequired
};
export default ViewSharedProfile;
