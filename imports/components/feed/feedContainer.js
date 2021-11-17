import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {useQuery} from '@apollo/client';
import {useTracker} from 'meteor/react-meteor-data';
import PostQuery from '../../api/post/postQuery';
import NewPostContainer from './newPostContainer';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import PostView from './postView';
import ContentWrapper from '/imports/components/layout/contentWrapper';

const FeedContainer = (props) => {
    const [scrollChunkCount, setScrollChunkCount] = useState(1);
    const {loading, error, data, fetchMore} = useQuery(PostQuery, {
        variables: {offset: 0},
        fetchPolicy: "cache-first",
        pollInterval: 1000
    });
    const moreChunks = useCallback(_.debounce((count) => {
        // fetch more when the last post is visible.  Debouncing prevents recalling
        // fetch more should the user scroll the final post out of view and then back into view.
        fetchMore({
            variables: {offset: count}
        });
    }, 1000, true), []);
    let feedContent;
    if(loading){
        feedContent = <Loading />;
    } else if(error){
        feedContent = <Error />;
        console.log("ERROR:", error);
    } else if(data.getPosts.length > 0){
        feedContent = data.getPosts.map((post, index) => {
            const postView = (
                <PostView
                    post={post}
                    viewSize="medium"
                    navStack={props.navStack}
                    visibleCallback={() => {if(index === data.getPosts.length - 1) moreChunks(data.getPosts.length)}}
                />
            );
            return (
                <ContentWrapper key={index} content={postView}/>
            );
        });
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
