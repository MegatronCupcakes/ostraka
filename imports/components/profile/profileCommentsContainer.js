import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import {UserCommentsQuery} from '/imports/api/comments/commentQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import ProfileCommentView from '/imports/components/profile/profileCommentView';

const ProfileCommentsContainer = (props) => {
    const {loading, error, data} = useQuery(UserCommentsQuery, {variables: {postedById: props.userId}, pollInterval: 1000});
    let content;
    if(loading){
        content = <Loading />
    } else if(error){
        content = <Error />
        console.log("ERROR:", error);
    } else if(data && data.getUserComments && data.getUserComments.length > 0){
        content = data.getUserComments.map((comment, index) => {
            const goToPost = () => {
                props.navStack.update({navState: "PostView", viewContent: comment.parentId, activeTag: null});
            }
            return (
                <ProfileCommentView
                    key={index}
                    comment={comment}
                    goToPost={goToPost}
                    navStack={props.navStack}
                />
            )
        });
    } else {
        content = <Empty message="no comments found"/>;
    }
    return content;
};
ProfileCommentsContainer.propTypes = {
    navStack: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired
};
export default ProfileCommentsContainer;
