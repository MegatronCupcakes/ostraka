import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import {MultipleProfilesQuery} from '/imports/api/profile/profileQuery';
import {Loading, Error} from '/imports/components/loadingStatus/loadingStatus';
import ScoredProfile from '/imports/components/profile/scoredProfile';

const MultipleProfilesContainer = (props) => {
    let content;
    const {loading, error, data} = useQuery(MultipleProfilesQuery, {variables: {userIds: props.profileIds}, pollInterval: 1000});
    if(loading){
        content = <Loading />;
    } else if(error){
        content = <Error />;
    } else if(data && data.getProfiles.length > 0){
        content = data.getProfiles.map((item, index) => {
            return (
                <ScoredProfile
                    user={item}
                    navStack={props.navStack}
                />
            );
        });
    } else {
        topicContent = <div></div>;
    }
    return {content};
};
MultipleProfilesContainer.propTypes = {
    navStack: PropTypes.object.isRequired,
    profileIds: PropTypes.array
};
export default MultipleProfilesContainer;
