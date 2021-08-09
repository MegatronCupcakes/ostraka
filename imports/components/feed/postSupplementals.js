import React from 'react';
import PropTypes from 'prop-types';

import NewCommentContainer from '../comments/newCommentContainer';
import CommentsContainer from '../comments/commentsContainer';
import LikesContainer from '../likes/likesContainer';
import MentionsContainer from '../mentions/mentionsContainer';
import TagsContainer from '../tags/tagsContainer';

const PostSupplementals = (props) => {

    return (
        <>
            <div className="row justify-content-start">
                <LikesContainer
                    likedId={props.postId}
                    likedType={props.likedType}
                    likes={props.likes}
                    dislikes={props.dislikes}
                />
                <NewCommentContainer
                    postId={props.postId}
                    commentCount={props.comments.length}
                />
            </div>
            <div className="row">
                <MentionsContainer
                    postId={props.postId}
                    mentions={props.mentions}
                />
            </div>
            <div className="row">
                <TagsContainer
                    postId={props.postId}
                    tags={props.tags}
                />
            </div>
            <div className="row">
                <CommentsContainer
                    postId={props.postId}
                    comments={props.comments}
                />
            </div>
        </>
    );
};
PostSupplementals.propTypes = {
    postId: PropTypes.string,
    likedType: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    mentions: PropTypes.array.isRequired,
    likes: PropTypes.array.isRequired,
    dislikes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired
};
export default PostSupplementals;
