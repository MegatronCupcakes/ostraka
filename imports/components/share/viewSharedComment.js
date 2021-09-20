import React from 'react';
import PropTypes from 'prop-types';
import TopicViewComment from '/imports/components/comments/topicViewComment';

const ViewSharedComment = (props) => {
    return (
        <TopicViewComment
            comment={props.comment}
            sharedById={props.sharedById}
            noninteractive={props.noninteractive}
            viewSize={props.viewSize}
            viewType={props.viewType}
            navStack={props.navStack}
        />
    )
};
ViewSharedComment.propTypes = {
    comment: PropTypes.object.isRequired,
    sharedById: PropTypes.string.isRequired,
    noninteractive: PropTypes.bool.isRequired,
    viewSize: PropTypes.string.isRequired,
    viewType: PropTypes.string.isRequired,
    navStack: PropTypes.object.isRequired
};
export default ViewSharedComment;
