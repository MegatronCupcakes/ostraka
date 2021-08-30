import React from 'react';
import PropTypes from 'prop-types';

import PostSupplementals from '/imports/components/feed/postSupplementals';
import UserIdentifier from '/imports/components/feed/userIdentifier';
import UserIdentifierGoToPost from '/imports/components/feed/userIdentifierGoToPost';
import PostCaption from '/imports/components/feed/postCaption';
import TextBubble from '/imports/components/feed/textBubble';

const Text = (props) => {

    const _handlePostClick = () => {
        props.setNavContentState([...props.navContentState, {navState: 'PostView', viewContent: props.post, activeTag: null}]);
    }

    const _caption = (
        <PostCaption
            caption={props.post.caption}
            tags={props.post.tags}
            tagIds={props.post.tagIds}
            mentions={props.post.mentions}
            mentionIds={props.post.mentionIds}
            postPreview={props.postPreview}
            navStack={props.navStack}
        />
    );

    const _userIdentifier = props.viewSize !== 'large' ? (
        <UserIdentifierGoToPost
            displaySize={props.post.viewSize}
            postedBy={props.post.postedBy}
            postedByTag={props.post.postedByTag}
            postedById={props.post.postedById}
            postedByProfilePic={props.post.postedByProfilePic}
            post={props.post}
            postPreview={props.postPreview}
            navStack={props.navStack}
        />
    ) : (
        <UserIdentifier
            displaySize={props.post.viewSize}
            postedBy={props.post.postedBy}
            postedByTag={props.post.postedByTag}
            postedById={props.post.postedById}
            postedByProfilePic={props.post.postedByProfilePic}
            navStack={props.navStack}
        />
    );

    return (
        <div className="mb-3 fade-in row align-items-start post">
            <div className="col">
                <TextBubble
                    caption={_caption}
                />
            </div>
            <div className="col">
                {_userIdentifier}
                <PostSupplementals
                    post={props.post}
                    viewSize={props.post.viewSize}
                    postPreview={props.postPreview}
                    navStack={props.navStack}
                />
            </div>
        </div>
    )
};
Text.propTypes = {
    post: PropTypes.object.isRequired,
    viewSize: PropTypes.string,
    postPreview: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default Text;
