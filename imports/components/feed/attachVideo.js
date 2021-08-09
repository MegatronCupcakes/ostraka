import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const AttachVideo = (props) => {
    const handleVideoInput = () => {
        props.setVideoType(null);
        props.queueVideo(null);

        const videoInput = document.getElementById("attachVideoInput");
        const fileType = _.last(videoInput.files[0].name.split("."));
        const path = URL.createObjectURL(videoInput.files[0]);

        props.setVideoType(fileType);
        props.queueVideo(path);
        videoInput.value = '';
    }
    const handleCancel = () => {
        props.handleCancel();
        document.getElementById("attachVideoModal").hide();
    }
    const videoPreview = props.queuedVideo ? (
        <video controls style={{maxWidth: "100%"}}>
            <source type={"video/" + props.videoType} src={props.queuedVideo}/>
        </video>
    ) : <div>video preview</div>;
    return (
        <div>
            <div className="modal-header">
                <h5 className="modal-title" id="attachVideoModalLabel">attach video</h5>
                <button type="button" className="btn-close" onClick={props.handleCancel} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {videoPreview}
                <input type="file" id="attachVideoInput" onChange={handleVideoInput} accept="video/*" />
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={props.handleCancel} data-bs-dismiss="modal"><i className="bi bi-trash"></i></button>
            <button type="button" className="btn btn-primary" onClick={props.handleUpload}><i className="bi bi-cloud-arrow-up"></i></button>
            </div>
        </div>
    )
};
AttachVideo.propTypes = {
    queuedVideo: PropTypes.string,
    queueVideo: PropTypes.func.isRequired,
    videoType: PropTypes.string,
    setVideoType:PropTypes.func.isRequired,
    handleUpload: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};
export default AttachVideo;
