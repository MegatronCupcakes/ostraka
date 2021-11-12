import React from 'react';
import PropTypes from 'prop-types';
import ViewSharedContentContainer from '/imports/components/share/viewSharedContentContainer';

const SharedPost = (props) => {
    return (
        <div className="sharedPost">
            <ViewSharedContentContainer
                sharedContentId={props.post.sharedContentId}
                sharedById={props.post.sharedById}
                viewType="sharedPost"
                navStack={props.navStack}
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
