import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Empty} from '/imports/components/loadingStatus/loadingStatus';
import MultipleProfilesContainer from '/imports/components/profile/multipleProfilesContainer';

const ProfileProfilesContainer = (props) => {
    if(props.profileIds && props.profileIds.length > 0){
        <MultipleProfilesContainer
            navStack={props.navStack}
            profileIds={props.profileIds}
        />
    } else {
        return <Empty message="no invited users (yet)"/>;
    }
};
ProfileProfilesContainer.propTypes = {
    navStack: PropTypes.object.isRequired,
    profileIds: PropTypes.array
};
export default ProfileProfilesContainer;
