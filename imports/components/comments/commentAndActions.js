import React from 'react';
import PropTypes from 'prop-types';
import Comment from './comment';
import LikesContainer from '../likes/likesContainer';
import ShareContainer from '/imports/components/share/shareContainer';
import NewCommentContainer from './newCommentContainer';

const CommentAndActions = (props) => {
    const _commentClasses = props.viewSize ? `comment ${props.viewSize}` : 'comment';
    return (
        <div className={_commentClasses}>
            <div>
                <Comment
                    comment={props.comment}
                    viewType={props.viewType}
                    viewSize={props.viewSize}
                    sharedById={props.sharedById}
                    navStack={props.navStack}
                    visibleCallback={props.visibleCallback}
                />
            </div>
            <div>
                <LikesContainer
                    likedId={props.comment._id}
                    likedType="Comment"
                    userId={props.comment.userId}
                    liked={props.comment.liked}
                    likeCount={props.comment.likeCount}
                    disliked={props.comment.disliked}
                    dislikeCount={props.comment.dislikeCount}
                    viewSize={props.viewSize}
                />
                <ShareContainer
                    sharedContent={props.comment}
                    sharedType="comment"
                    viewSize={props.viewSize}
                    noninteractive={props.noninteractive}
                    navStack={props.navStack}
                />
            </div>
        </div>
    );
};
CommentAndActions.propTypes = {
    comment: PropTypes.object.isRequired,
    sharedById: PropTypes.string,
    viewType: PropTypes.string, // "embed" and perhaps other specialized content views.
    viewSize: PropTypes.string,
    noninteractive: PropTypes.bool,
    visibleCallback: PropTypes.func,
    navStack: PropTypes.object.isRequired
};
export default CommentAndActions;
