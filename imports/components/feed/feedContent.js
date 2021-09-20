import React from 'react';
import PropTypes from 'prop-types';
import PostView from './postView';
import ContentWrapper from '/imports/components/layout/contentWrapper';

const FeedContent = (props) => {
    return props.data.map((post, index) => {
        const postView = (
            <PostView
                post={post}
                viewSize="small"
                navStack={props.navStack}
            />
        );
        return (
            <ContentWrapper key={index} content={postView}/>
        );
    });
};
FeedContent.propTypes = {
    navStack: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};
export default FeedContent;
