import React from 'react';
import PropTypes from 'prop-types';
import {ReactTinyLink} from 'react-tiny-link';

const Video = (props) => {
    return (
        <ReactTinyLink
            cardSize="large"
            showGraphic={true}
            maxLine={2}
            minLine={1}
            url={props.post.url}
            proxyUrl={window.location.href + "corsProxy"}
        />
    );
};
Video.propTypes = {
    post: PropTypes.object.isRequired,
    sharedById: PropTypes.string,
    viewType: PropTypes.string, // "embed" and perhaps other specialized content views.
    viewSize: PropTypes.string,
    noninteractive: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default Video;
