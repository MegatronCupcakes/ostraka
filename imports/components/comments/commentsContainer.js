import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import CommentQuery from '/imports/api/comments/commentQuery';
import Comment from './comment';
import LikesContainer from '../likes/likesContainer';
import NewCommentContainer from './newCommentContainer';
import {Loading, Error} from '/imports/components/loadingStatus/loadingStatus';

const CommentsContainer = (props) => {

    const {loading, error, data} = useQuery(CommentQuery, {variables: {parentId: props.parentId}, pollInterval: 1000});

    let comments;

    if(props.parentId && loading){
        comments = <Loading />
    } else if(props.parentId && error){
        comments = <Error />
    } else if(props.parentId){
        comments = comments = data.getComments.map((comment, index) => {
            return (
                <div className="comment" key={index}>
                    <div className="">
                        <Comment
                            comment={comment}
                            navStack={props.navStack}
                        />
                    </div>
                    <div className="comment">
                        <LikesContainer
                            likedId={comment._id}
                            likedType="Comment"
                            userId={comment.userId}
                            likes={comment.likes}
                            dislikes={comment.dislikes}
                        />
                    </div>
                </div>
            )
        });
    }
    const _commentClasses = props.viewSize ? 'comments_' + props.viewSize : 'comments';
    return (
        <div className={_commentClasses}>
            {comments}
        </div>
    )
};
CommentsContainer.propTypes = {
    parentId: PropTypes.string,
    viewSize: PropTypes.string,
    navStack: PropTypes.object.isRequired
};
export default CommentsContainer;
