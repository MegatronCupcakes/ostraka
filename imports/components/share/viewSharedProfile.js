import React from 'react';
import PropTypes from 'prop-types';
import ProfileContainer from '/imports/components/profile/profileContainer';

const ViewSharedProfile = (props) => {
    if(props.postPreview){
        // add feature to disable actions for non-logged in users....
        return (
            <ProfileContainer
                user={props.user}
                navStack={props.navStack}
                viewSize="large"
            />
        );
    } else {
        return (
            <ProfileContainer
                user={props.user}
                navStack={props.navStack}
                viewSize="large"
            />
        );
    }
};
ViewSharedProfile.propTypes = {
    user: PropTypes.object.isRequired,
    postPreview: PropTypes.bool.isRequired,
    viewSize: PropTypes.string.isRequired,
    navStack: PropTypes.object.isRequired
};
export default ViewSharedProfile;
