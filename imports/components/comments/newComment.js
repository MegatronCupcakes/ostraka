import React from 'react';
import PropTypes from 'prop-types';

const NewComment = (props) => {
    return (
        <div className="col-2" onClick={props.handleNewComment}><i className="bi bi-chat-square-quote"></i> {props.commentCount}</div>
    );
};
NewComment.propTypes = {
    handleNewComment: PropTypes.func.isRequired,
    commentCount: PropTypes.number.isRequired
};
export default NewComment;
