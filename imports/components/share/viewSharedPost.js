import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {iframeResizer} from '/imports/api/share/client/share';
import PostView from '/imports/components/feed/postView';

const ViewSharedPost = (props) => {
    const resizeFrame = iframeResizer(props.post.viewId, props.sharedById);
    useEffect(() => {
        _.defer(() => {
            resizeFrame();
        });
    });
    return (
        <PostView
            post={props.post}
            sharedById={props.sharedById}
            noninteractive={props.noninteractive}
            viewSize={props.viewSize}
            viewType={props.viewType}
            navStack={props.navStack}
        />
    )
};
ViewSharedPost.propTypes = {
    post: PropTypes.object.isRequired,
    sharedById: PropTypes.string.isRequired,
    noninteractive: PropTypes.bool.isRequired,
    viewSize: PropTypes.string.isRequired,
    viewType: PropTypes.string,
    navStack: PropTypes.object.isRequired
};
export default ViewSharedPost;
