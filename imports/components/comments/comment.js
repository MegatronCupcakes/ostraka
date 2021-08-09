import React from 'react';
import PropTypes from 'prop-types';

const Comment = (props) => {
    return (
        <div><span className="commentUserId">{props.comment.user}</span> <span className="commentText">{props.comment.comment}</span></div>
    );
};
Comment.propTypes = {
    comment: PropTypes.object.isRequired
};
export default Comment;
