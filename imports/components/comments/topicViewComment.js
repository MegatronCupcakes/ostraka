import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Comment from '../comments/comment';
import LikesContainer from '../likes/likesContainer';
import ShareContainer from '/imports/components/share/shareContainer';
import {goTo} from '/imports/api/navStack/goTo';

const TopicViewComment = (props) => {

    const goToPost = () => {
        goTo(props.comment.parentId, "post", props.navStack, props.viewType, props.sharedById);
    }
    const userInteractions = props.noninteractive ? (
        <></>
    ) : (
        <>
            <LikesContainer
                likedId={props.comment._id}
                likedType="Comment"
                userId={props.comment.userId}
                liked={props.comment.liked}
                likeCount={props.comment.likeCount}
                disliked={props.comment.disliked}
                dislikeCount={props.comment.dislikeCount}
            />
            <ShareContainer
                sharedContent={props.comment}
                sharedType="comment"
                viewSize={props.viewSize}
                noninteractive={props.noninteractive}
                navStack={props.navStack}
            />
        </>
    );
    return (
        <div className="row fade-in ">
            <div className="col-xs-12">
                <div className="comment_large" style={{float: "left"}}>
                    <Comment
                        comment={props.comment}
                        viewSize={props.viewSize}
                        viewType={props.viewType}
                        sharedById={props.sharedById}
                        navStack={props.navStack}
                    />
                    {userInteractions}
                </div>
                <div style={{float: "right"}}>
                    <div className="goToPost">
                        <i className="bi bi-arrow-right-square" onClick={goToPost}></i>
                    </div>
                </div>
            </div>
        </div>
    )
};
TopicViewComment.propTypes = {
    comment: PropTypes.object.isRequired,
    viewSize: PropTypes.string,
    viewType: PropTypes.string,
    sharedById: PropTypes.string,
    navStack: PropTypes.object.isRequired
};
export default TopicViewComment;
