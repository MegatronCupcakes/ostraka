import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MeteorCall from '../../api/util/callPromise';

import AttachVideo from './attachVideo';

const AttachVideoContainer = (props) => {
    const [queuedVideo, setQueuedVideo] = useState(null);
    const [videoType, setVideoType] =useState(null);
    const handleCancel = () => {
        setQueuedVideo(null);
        setVideoType(null);
    }
    const queueVideo = (path) => {
        // limiting posts to one vide at a time;
        setQueuedVideo(path);
    };
    const handleUpload = () => {
        // upload video to CDN then use props.setPostVideo to set its URI
        MeteorCall('uploadVideo', {})
        .then(() => {
            // upload was successful.

        })
        .catch((error) => {
            // error ocurred;
        });
    };
    return (
        <AttachVideo
            queuedVideo={queuedVideo}
            queueVideo={queueVideo}
            videoType={videoType}
            setVideoType={setVideoType}
            handleCancel={handleCancel}
            handleUpload={handleUpload}
        />
    )
};
AttachVideoContainer.propTypes = {
    setPostType: PropTypes.func.isRequired
};
export default AttachVideoContainer;
