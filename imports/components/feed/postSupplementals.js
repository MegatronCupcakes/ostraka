import React from 'react';
import PropTypes from 'prop-types';

import NewCommentContainer from '/imports/components/comments/newCommentContainer';
import CommentsContainer from '/imports/components/comments/commentsContainer';
import LikesContainer from '/imports/components/likes/likesContainer';
import ShareContainer from '/imports/components/share/shareContainer';

const PostSupplementals = (props) => {
    if(!props.postPreview){
        return (
            <>
                <div className="">
                    <LikesContainer
                        likedId={props.post._id}
                        likedType={props.post.type}
                        userId={props.post.postedById}
                        likes={props.post.likes}
                        dislikes={props.post.dislikes}
                        postPreview={props.postPreview}
                    />
                    <NewCommentContainer
                        parentId={props.post._id}
                        parentType={props.post.type}
                        postedBy={props.post.postedBy}
                        postedByTag={props.post.postedByTag}
                        postedById={props.post.postedById}
                        postedByProfilePic={props.post.postedByProfilePic}
                        parentText={props.post.caption}
                        commentCount={props.post.comments.length}
                        postPreview={props.postPreview}

                        mentions={props.post.mentions}
                        mentionIds={props.post.mentionIds}
                        tags={props.post.tags}
                        tagIds={props.post.tagIds}

                        navStack={props.navStack}
                    />
                    <ShareContainer
                        post={props.post}
                        viewSize={props.viewSize}
                        postPreview={props.postPreview}
                        navStack={props.navStack}
                    />
                </div>
                <div className="row" style={{paddingTop: "1rem"}}>
                    <CommentsContainer
                        parentId={props.post._id}
                        viewSize={props.viewSize}
                        postPreview={props.postPreview}
                        navStack={props.navStack}
                    />
                </div>
            </>
        );
    } else {
        return (
            <></>
        )
    }
};
PostSupplementals.propTypes = {
    post: PropTypes.object.isRequired,
    viewSize: PropTypes.string,
    postPreview: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default PostSupplementals;
