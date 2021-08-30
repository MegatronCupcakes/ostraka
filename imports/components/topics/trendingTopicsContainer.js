import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {TrendingTopicQuery} from '/imports/api/tag/tagQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import TopicsContainer from '/imports/components/topics/topicsContainer';

const TrendingTopicsContainer = (props) => {
    let content;
    const {loading, error, data} = useQuery(TrendingTopicQuery, {variables: {limit: 10, span: "year"}, pollInterval: 1000000000});
    if(loading){
        content = <Loading />;
    } else if(error){
        content = <Error />;
    } else if(data && data.getTrendingTopics.length > 0){
        console.log("data.getTrendingTopics:", data.getTrendingTopics);
        props.navStack.setTags(data.getTrendingTopics);
    } else {
        content = <div></div>;
    }
    return content;
};
TrendingTopicsContainer.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default TrendingTopicsContainer;
