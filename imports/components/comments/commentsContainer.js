import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import CommentQuery from '/imports/api/comments/commentQuery';
import Comment from './comment';
import LikesContainer from '../likes/likesContainer';
import ShareContainer from '/imports/components/share/shareContainer';
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
                            viewType={props.viewType}
                            sharedById={props.sharedById}
                            navStack={props.navStack}
                        />
                    </div>
                    <div className="comment">
                        <LikesContainer
                            likedId={comment._id}
                            likedType="Comment"
                            userId={comment.userId}
                            liked={comment.liked}
                            likeCount={comment.likeCount}
                            disliked={comment.disliked}
                            dislikeCount={comment.dislikeCount}
                        />
                        <ShareContainer
                            sharedContent={comment}
                            sharedType="comment"
                            viewSize={props.viewSize}
                            noninteractive={props.noninteractive}
                            navStack={props.navStack}
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
    sharedById: PropTypes.string,
    viewType: PropTypes.string, // "embed" and perhaps other specialized content views.
    viewSize: PropTypes.string,
    noninteractive: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default CommentsContainer;
