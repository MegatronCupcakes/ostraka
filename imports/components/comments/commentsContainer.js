import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useTracker} from 'meteor/react-meteor-data';

import Comment from './comment';
import LikesContainer from '../likes/likesContainer';
import NewCommentContainer from './newCommentContainer';

const CommentsContainer = (props) => {
    const comments = props.comments.map((comment, index) => {
        return (
            <div className="comment" key={index}>
                <div className="row">
                    <Comment
                        comment={comment}
                    />
                </div>
                <div className="row justify-content-start comment">
                    <LikesContainer
                        likedId={comment.commentId}
                        likedType="Comment"
                        likes={comment.likes}
                        dislikes={comment.dislikes}
                    />
                    <NewCommentContainer
                        postId={props.postId}
                        commentCount={props.comments.length}
                    />
                </div>
            </div>
        )
    });
    return (
        <div className="comments">
            {comments}
        </div>
    )
};
CommentsContainer.propTypes = {
    postId: PropTypes.string,
    comments: PropTypes.array.isRequired
};
export default CommentsContainer;
