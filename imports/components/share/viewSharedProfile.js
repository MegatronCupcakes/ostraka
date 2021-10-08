import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import ProfileContainer from '/imports/components/profile/profileContainer';
import {iframeResizer} from '/imports/api/share/client/share';

const ViewSharedProfile = (props) => {
    const resizeFrame = iframeResizer(props.user.viewId, props.sharedById);
    useEffect(() => {
        _.defer(() => {
            resizeFrame();
        });
    });
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
