import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import {TrendingProfilesQuery} from '/imports/api/profile/profileQuery';
import TrendingProfile from '/imports/components/profile/trendingProfile';

const TrendingProfilesContainer = (props) => {
    const {loading, error, data} = useQuery(TrendingProfilesQuery, {variables: {limit: 10, span: "year"}, pollInterval: 1000000000});
    let content;
    if(loading){
        content = <Loading />
    } else if(error){
        content = <Error />
        console.log("ERROR:", error);
    } else if(data && data.getTrendingProfiles){
        content = data.getTrendingProfiles.map((item, index) => {
            return (
                <TrendingProfile
                    key={index}
                    user={item}
                    navStack={props.navStack}
                />
            );
        });
    }else {
        content = <Empty message="oops, we couldn't find what you're looking for :-("/>;
    }
    return content;
};
TrendingProfilesContainer.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default TrendingProfilesContainer;
