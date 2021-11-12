import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import TopicsContainer from '/imports/components/topics/topicsContainer';
import {iframeResizer} from '/imports/api/share/client/share';

const ViewSharedTopic = (props) => {
    const resizeFrame = iframeResizer(props.tag.viewId, props.sharedById);
    useEffect(() => {
        _.defer(() => {
            resizeFrame();
        });
    });
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
