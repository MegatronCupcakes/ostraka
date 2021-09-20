import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Empty} from '/imports/components/loadingStatus/loadingStatus';
import MultipleProfilesContainer from '/imports/components/profile/multipleProfilesContainer';

const FriendsProfileContainer = (props) => {
    if(props.profileIds && props.profileIds.length > 0){
        return (
            <MultipleProfilesContainer
                navStack={props.navStack}
                profileIds={props.profileIds}
            />
        );
    } else {
        return <Empty message="try following some people..."/>;
    }
};
FriendsProfileContainer.propTypes = {
    navStack: PropTypes.object.isRequired,
    profileIds: PropTypes.array
};
export default FriendsProfileContainer;
