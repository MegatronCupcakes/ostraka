import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import {UserPostsQuery} from '/imports/api/post/postQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import PostView from '/imports/components/feed/postView';

const ProfilePostsContainer = (props) => {
    const {loading, error, data} = useQuery(UserPostsQuery, {variables: {postedById: props.userId}, pollInterval: 1000});
    let content = <div>"Hi!"</div>;
    if(loading){
        content = <Loading />
    } else if(error){
        content = <Error />
        console.log("ERROR:", error);
    } else if(data && data.getUserPosts){
        content = data.getUserPosts.map((post, index) => {
            return (
                <PostView
                    key={index}
                    viewSize="small"
                    navStack={props.navStack}
                    post={post}
                />
            );
        });
    }else {
        content = <Empty message="oops, we couldn't find what you're looking for :-("/>;
    }
    return content;
};
ProfilePostsContainer.propTypes = {
    navStack: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired
};
export default ProfilePostsContainer;
