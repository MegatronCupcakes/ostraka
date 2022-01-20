import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Empty} from '/imports/components/loadingStatus/loadingStatus';
import MultipleProfilesContainer from '/imports/components/profile/multipleProfilesContainer';

const ProfileProfilesContainer = (props) => {
    if(props.profileIds && props.profileIds.length > 0){
        return (
            <MultipleProfilesContainer
                navStack={props.navStack}
                profileIds={props.profileIds}
                viewSize={"medium"}
            />
        );
    } else {
        return <Empty message={props.emptyMessage ? props.emptyMessage : "nothing found"}/>;
    }
};
ProfileProfilesContainer.propTypes = {
    navStack: PropTypes.object.isRequired,
    profileIds: PropTypes.array,
    emptyMessage: PropTypes.string
};
export default ProfileProfilesContainer;
