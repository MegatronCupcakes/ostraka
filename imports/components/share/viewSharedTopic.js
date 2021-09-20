import React from 'react';
import PropTypes from 'prop-types';
import TopicsContainer from '/imports/components/topics/topicsContainer';

const ViewSharedTopic = (props) => {
    return (
        <TopicsContainer
            tag={props.tag}
            sharedById={props.sharedById}
            viewType={props.viewType}
            noninteractive={props.noninteractive}
            navStack={props.navStack}
        />
    )
};
ViewSharedTopic.propTypes = {
    tag: PropTypes.object.isRequired,
    noninteractive: PropTypes.bool.isRequired,
    viewSize: PropTypes.string.isRequired,
    sharedById: PropTypes.string.isRequired,
    viewType: PropTypes.string,
    navStack: PropTypes.object.isRequired
};
export default ViewSharedTopic;
