import React from 'react';
import PropTypes from 'prop-types';

import NewComment from './newComment'

const NewCommentContainer = (props) => {

    const handleNewComment = () => {
        if(props.postId){
            console.log("make new comment.");            
        }
    };

    return (
        <NewComment
            handleNewComment={handleNewComment}
            commentCount={props.commentCount}
        />
    )
};
NewCommentContainer.propTypes = {
    postId: PropTypes.string,
    commentCount: PropTypes.number.isRequired
};
export default NewCommentContainer;
