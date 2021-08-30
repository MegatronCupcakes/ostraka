import React from 'react';
import PropTypes from 'prop-types';
import PostCaption from '../feed/postCaption';
import TagsAndMentions from '/imports/api/post/tagsAndMentions';

const Comment = (props) => {

    const handleUserClick = ({target}) => {
        props.navStack.update({navState: 'Profile', viewContent: props.comment.userId, activeTag: null})
    };

    return (
        <div>
            <div>
                <span className="commentUserId" onClick={handleUserClick}>{props.comment.postedBy}</span>
                <span className="commentUserTag" onClick={handleUserClick}>@{props.comment.postedByTag}</span>
            </div>
            <div className="commentText">
                {TagsAndMentions(props.comment.comment, props.comment.tags, props.comment.tagIds, props.comment.mentions, props.comment.mentionIds, props.navStack)}
            </div>
        </div>
    );
};
Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    navStack: PropTypes.object.isRequired
};
export default Comment;
