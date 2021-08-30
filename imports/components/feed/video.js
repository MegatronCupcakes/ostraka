import React from 'react';
import PropTypes from 'prop-types';
import {ReactTinyLink} from 'react-tiny-link';

import PostSupplementals from '/imports/components/feed/postSupplementals';
import UserIdentifier from '/imports/components/feed/userIdentifier';
import UserIdentifierGoToPost from '/imports/components/feed/userIdentifierGoToPost';
import PostCaption from '/imports/components/feed/postCaption';

const Video = (props) => {

    const _handlePostClick = () => {
        props.setNavContentState([...props.navContentState, {navState: 'PostView', viewContent: props.post, activeTag: null}]);
    }

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
            postPreview={props.postPreview}
            navStack={props.navStack}
        />
    );

    return (
        <div className="mb-3 fade-in row align-items-start post">
            <div className="col">
                <ReactTinyLink
                    cardSize="large"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    url={props.post.url}
                    proxyUrl={window.location.href + "corsProxy"}
                />
            </div>
            <div className="col">
                {_userIdentifier}
                <PostCaption
                    caption={props.post.caption}
                    tags={props.post.tags}
                    tagIds={props.post.tagIds}
                    mentions={props.post.mentions}
                    mentionIds={props.post.mentionIds}
                    navStack={props.navStack}
                />
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
Video.propTypes = {
    post: PropTypes.object.isRequired,
    viewSize: PropTypes.string,
    postPreview: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default Video;
