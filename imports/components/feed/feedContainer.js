import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import {useTracker} from 'meteor/react-meteor-data';

import PostQuery from '../../api/post/postQuery';
import NewPostContainer from './newPostContainer';
import FeedContent from './feedContent';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';

const FeedContainer = (props) => {

    const {loading, error, data} = useQuery(PostQuery, {pollInterval: 1000});

    let feedContent;
    if(loading){
        feedContent = <Loading />;
    } else if(error){
        feedContent = <Error />;
        console.log("ERROR:", error);
    } else if(data.getPosts.length > 0){
        feedContent = (
            <FeedContent
                navStack={props.navStack}
                data={data.getPosts}
            />
        );
    } else {
        feedContent = (
            <Empty
                message="Looks like you don't have anything in your feed yet.  Try posting something or following some people and topics."
            />
        );
    }
    return (
        <>
            <NewPostContainer
                navStack={props.navStack}
            />
            {feedContent}
        </>
    );
};
FeedContainer.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default FeedContainer;


function _capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}
