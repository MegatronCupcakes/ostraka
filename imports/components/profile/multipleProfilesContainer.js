import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {MultipleProfilesQuery} from '/imports/api/profile/profileQuery';
import {Loading, Error} from '/imports/components/loadingStatus/loadingStatus';
import ContentWrapper from '/imports/components/layout/contentWrapper';
import UserIdentifierWithScore from '/imports/components/profile/userIdentifierWithScore';

const MultipleProfilesContainer = (props) => {
    let content;
    const {loading, error, data, fetchMore} = useQuery(MultipleProfilesQuery, {variables: {userIds: props.profileIds, offset: 0}, pollInterval: Meteor.settings.public.pollInterval});
    const moreChunks = useCallback(_.debounce((count) => {
        fetchMore({
            variables: {
                userIds: props.profileIds,
                offset: count
            }
        });
    }, 100, true), []);
    if(loading){
        content = <Loading />;
    } else if(error){
        content = <Error />;
    } else if(data && data.getProfiles.length > 0){
        content = data.getProfiles.map((item, index) => {
            const userIdentifier = (
                <UserIdentifierWithScore
                    noninteractive={false}
                    viewSize={props.viewSize}
                    user={item}
                    navStack={props.navStack}
                    visibleCallback={() => {
                        if(index === data.getProfiles.length - 1){
                            moreChunks(data.getProfiles.length);
                        }
                    }}
                />
            );
            return (
                <ContentWrapper key={index} content={userIdentifier} />
            )
        });
    } else {
        content = <div></div>;
    }
    return content;
};
MultipleProfilesContainer.propTypes = {
    navStack: PropTypes.object.isRequired,
    profileIds: PropTypes.array,
    viewSize: PropTypes.string
};
export default MultipleProfilesContainer;
