import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {TrendingTopicsQuery} from '/imports/api/tag/tagQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import TopicsContainer from '/imports/components/topics/topicsContainer';

const TrendingTopicsContainer = (props) => {
    let content = <Loading />;

    const {error, data} = useQuery(TrendingTopicsQuery, {pollInterval: Meteor.settings.public.pollInterval000000});

    useEffect(() => {
        if(data && data.getTrendingTopics.length > 0){
            const trendingTags = data.getTrendingTopics.map((tag, index) => {
                // set "active" value for tag if undefined (here "active" determines display)
                return {...tag, active: _.isUndefined(tag.active) ? tag.active = index === 0 : tag.active};
            });
            props.navStack.setTags(trendingTags);
        }
    }, [data]);

    if(error){
        console.log("ERROR:", error);
        content = <Error />;
    }
    if(props.navStack.current.tags){
        content = (
            <TopicsContainer
                navStack={props.navStack}
            />
        );
    }
    return content;
};
TrendingTopicsContainer.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default TrendingTopicsContainer;
