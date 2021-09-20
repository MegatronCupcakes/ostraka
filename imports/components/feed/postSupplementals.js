import React from 'react';
import PropTypes from 'prop-types';

import NewCommentContainer from '/imports/components/comments/newCommentContainer';
import CommentsContainer from '/imports/components/comments/commentsContainer';
import LikesContainer from '/imports/components/likes/likesContainer';
import ShareContainer from '/imports/components/share/shareContainer';

const PostSupplementals = (props) => {
    if(!props.noninteractive){
        return (
            <>
                <div className="">
                    <LikesContainer
                        likedId={props.post._id}
                        likedType={props.post.type}
                        userId={props.post.postedById}
                        liked={props.post.liked}
                        likeCount={props.post.likeCount}
                        disliked={props.post.disliked}
                        dislikeCount={props.post.dislikeCount}
                        noninteractive={props.noninteractive}
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
                        noninteractive={props.noninteractive}

                        mentions={props.post.mentions}
                        mentionIds={props.post.mentionIds}
                        tags={props.post.tags}
                        tagIds={props.post.tagIds}

                        navStack={props.navStack}
                    />
                    <ShareContainer
                        sharedContent={props.post}
                        sharedType="post"
                        viewSize={props.viewSize}
                        noninteractive={props.noninteractive}
                        navStack={props.navStack}
                    />
                </div>
                <div className="row" style={{paddingTop: "1rem"}}>
                    <CommentsContainer
                        parentId={props.post._id}
                        viewType={props.viewType}
                        sharedById={props.sharedById}
                        viewSize={props.viewSize}
                        noninteractive={props.noninteractive}
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
    sharedById: PropTypes.string,
    viewType: PropTypes.string, // "embed" and perhaps other specialized content views.
    viewSize: PropTypes.string,
    noninteractive: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default PostSupplementals;
