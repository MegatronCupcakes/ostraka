import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {UserPostsQuery} from '/imports/api/post/postQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import SimpleSpacer from '/imports/components/layout/simpleSpacer';
import PostView from '/imports/components/feed/postView';

const ProfilePostsContainer = (props) => {
    const {loading, error, data, fetchMore} = useQuery(UserPostsQuery, {
        variables: {
            postedById: props.userId,
            offset: 0
        },
        fetchPolicy: "cache-first",
        pollInterval: Meteor.settings.public.pollInterval0
    });
    const moreChunks = useCallback(_.debounce((count) => {
        fetchMore({
            variables: {offset: count}
        });
    }, 100, true), []);
    let content;
    if(loading){
        content = <Loading />
    } else if(error){
        content = <Error />
        console.log("ERROR:", error);
    } else if(data && data.getUserPosts && data.getUserPosts.length > 0){
        content = data.getUserPosts.map((post, index) => {
            return <SimpleSpacer
                content={(
                    <PostView
                        viewSize="small"
                        navStack={props.navStack}
                        post={post}
                        visibleCallback={() => {
                            if(index === data.getUserPosts.length - 1){
                                moreChunks(data.getUserPosts.length);
                            }
                        }}
                    />
                )}
                key={index}
            />
        });
    } else {
        content = <Empty message="no posts found"/>;;
    }
    return content;
};
ProfilePostsContainer.propTypes = {
    navStack: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired
};
export default ProfilePostsContainer;
