import React from 'react';
import PropTypes from 'prop-types';
import PostView from '/imports/components/feed/postView';

const SharedPost = (props) => {
    return (
        <div className="sharedPost">
            <PostView
                sharedContentId={props.post.sharedContentId}
                sharedById={props.post.sharedById}
                navStack={props.navStack}
                viewSize="small"
            />
        </div>
    );
};
SharedPost.propTypes = {
    post: PropTypes.object.isRequired,
    sharedById: PropTypes.string,
    viewType: PropTypes.string, // "embed" and perhaps other specialized content views.
    viewSize: PropTypes.string,
    noninteractive: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default SharedPost;
