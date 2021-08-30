import React from 'react';
import PropTypes from 'prop-types';
import PostView from './postView';

const FeedContent = (props) => {
    const feedContent = props.data.map((post, index) => {
        return (
            <PostView
                key={index}
                post={post}
                navStack={props.navStack}
            />
        );
    });
    return (
        <div className="col-xs-12 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 mb-3 ma-3">
            {feedContent}
        </div>
    );
};
FeedContent.propTypes = {
    navStack: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};
export default FeedContent;
