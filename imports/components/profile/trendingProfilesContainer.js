import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import {TrendingProfilesQuery} from '/imports/api/profile/profileQuery';
import UserIdentifierWithScore from '/imports/components/profile/userIdentifierWithScore';
import ContentWrapper from '/imports/components/layout/contentWrapper';

const TrendingProfilesContainer = (props) => {
    const {loading, error, data} = useQuery(TrendingProfilesQuery, {pollInterval: 1000000000});
    let content;
    if(loading){
        content = <Loading />
    } else if(error){
        content = <Error />
        console.log("ERROR:", error);
    } else if(data && data.getTrendingProfiles){
        content = data.getTrendingProfiles.map((item, index) => {
            const userIdentifier = (
                <UserIdentifierWithScore
                    user={item}
                    noninteractive={true}
                    viewSize={props.viewSize}
                    navStack={props.navStack}
                />
            );
            return <ContentWrapper key={index} content={userIdentifier} />
        });
    }else {
        content = <Empty message="oops, we couldn't find what you're looking for :-("/>;
    }
    return content;
};
TrendingProfilesContainer.propTypes = {
    navStack: PropTypes.object.isRequired,
    viewSize: PropTypes.string
};
export default TrendingProfilesContainer;
