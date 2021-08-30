import React from 'react';
import PropTypes from 'prop-types';
import PostView from '/imports/components/feed/postView';

const ViewSharedPost = (props) => {
    if(props.postPreview){
        return (
            <div className="col-xs-12 col-sm-12 col-md-8 offset-md-2 mb-3 ma-3" style={{paddingTop: "1rem"}}>
                <PostView
                    post={props.post}
                    postPreview={props.postPreview}
                    viewSize={props.viewSize}
                    navStack={props.navStack}
                />
            </div>
        )
    } else {
        return (
            <PostView
                post={props.post}
                postPreview={props.postPreview}
                viewSize={props.viewSize}
                navStack={props.navStack}
            />
        )
    }
};
ViewSharedPost.propTypes = {
    post: PropTypes.object.isRequired,
    postPreview: PropTypes.bool.isRequired,
    viewSize: PropTypes.string.isRequired,
    navStack: PropTypes.object.isRequired
};
export default ViewSharedPost;
