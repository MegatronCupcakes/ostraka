import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Comment from '../comments/comment';
import LikesContainer from '../likes/likesContainer';

const TopicViewComment = (props) => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-9 offset-md-1 mb-3 ma-3" style={{paddingTop: "1rem"}}>
            <div className="row">
                <div className="comment_large col">
                    <Comment
                        comment={props.comment}
                        navStack={props.navStack}
                    />
                    <LikesContainer
                        likedId={props.comment._id}
                        likedType="Comment"
                        userId={props.comment.userId}
                        likes={props.comment.likes}
                        dislikes={props.comment.dislikes}
                    />
                </div>
                <div className="col">
                    <div className="goToPost">
                        <i className="bi bi-arrow-right-square" onClick={props.goToPost}></i>
                    </div>
                </div>
            </div>
        </div>
    )
};
TopicViewComment.propTypes = {
    comment: PropTypes.object.isRequired,
    goToPost: PropTypes.func.isRequired,
    navStack: PropTypes.object.isRequired
};
export default TopicViewComment;
