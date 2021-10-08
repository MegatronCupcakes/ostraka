import React from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import _ from 'underscore';

const ProfileImageEditor = (props) => {
    let fileSelection;
    const handleCancel = () => {
        // delay allows dismissal of modal before resetting its interface.
        _.delay(() => {
            props.cancel();
        }, 400);
    };
    const handleFileSelection = () => {
        const imageInput = document.getElementById("profileImageInput");
        const _imageUrl = URL.createObjectURL(imageInput.files[0]);
        props.setImageUrl(_imageUrl);
        props.setActivity('crop');
    };
    const startImageCapture = () => {
        props.setActivity('capture');
        _.defer(async () => {
            const previewWindow = document.getElementById("cameraPreview");
            const captureCanvas = document.getElementById("cameraCaptureCanvas");
            const videoStream = await navigator.mediaDevices.getUserMedia({video: {facingMode: "user"}, audio: false});
            previewWindow.srcObject = videoStream;
        });
    };
    const handleImageCapture = () => {
        const previewWindow = document.getElementById("cameraPreview");
        const captureCanvas = document.getElementById("cameraCaptureCanvas");
        captureCanvas.getContext('2d').drawImage(previewWindow, 0, 0, captureCanvas.width, captureCanvas.height);
   	    const _imageUrl = captureCanvas.toDataURL('image/jpeg');
        props.setImageUrl(_imageUrl);
        stopImageCapture();
    };
    const stopImageCapture = () => {
        const previewWindow = document.getElementById("cameraPreview");
        previewWindow.srcObject.getTracks().forEach((track) => {
            track.stop();
        });
        previewWindow.srcObject = null;
        props.setActivity('crop');
    };
    let modalContent;
    switch(props.activity){
        case 'crop':
            modalContent = (
                <>
                    <div className="modal-body">
                        <div className="row">
                            <div style={{textAlign: "center", maxHeight: "100%", maxWidth: "100%"}}>
                                <ReactCrop
                                    src={props.imageUrl}
                                    crop={props.crop}
                                    onChange={newCrop => props.setCrop(newCrop)}
                                    onImageLoaded={(image) => {
                                        let update = {};
                                        if(image.height > image.width){
                                            update.height = image.height;
                                            update.width = image.height * props.crop.aspect;
                                        } else {
                                            update.width = image.width;
                                            update.height =  image.width / props.crop.aspect;
                                        }
                                        props.setCrop({...props.crop, ...update});
                                        return false;
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div style={{textAlign: "center"}}>
                                <div className="btn btn-secondary" style={{marginRight: "0.5rem"}} data-bs-toggle="tooltip" data-bs-placement="top" title="choose a new picture" onClick={() => {props.setActivity('choose')}}><i className="bi bi-images"></i></div>
                                <div className="btn btn-secondary" style={{marginLeft: "0.5rem"}} data-bs-toggle="tooltip" data-bs-placement="top" title="take a new picture" onClick={startImageCapture}><i className="bi bi-camera"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancel}><i className="bi bi-x-lg"></i></button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.save}><i className="bi bi-image"></i></button>
                    </div>
                </>
            );
            break;
        case 'choose':
            modalContent = (
                <>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <label className="form-label">choose an image</label>
                                <input className="form-control" type="file" accept="image/*" id="profileImageInput" onChange={handleFileSelection}/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => {props.setActivity('crop')}}><i className="bi bi-x-lg"></i></button>
                    </div>
                </>
            );
            break;
        case 'capture':
            modalContent = (
                <>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12" style={{textAlign: "center"}}>
                                <video id="cameraPreview" width="320" height="240" autoPlay></video>
                                <canvas id="cameraCaptureCanvas" width="320" height="240" style={{display: "none"}}></canvas>
                            </div>
                        </div>
                        <div className="col-12" style={{textAlign: "center"}}>
                            <button type="button" className="btn btn-primary" onClick={handleImageCapture}><i className="bi bi-camera"></i></button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={stopImageCapture}><i className="bi bi-x-lg"></i></button>
                    </div>
                </>
            );
            break;
    }
    return (
        <>
            <div className="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="change profile picture" data-bs-toggle="modal" data-bs-target="#changeProfilePictureModal"><i className="bi bi-image"></i></div>
            <div className="modal fade" id="changeProfilePictureModal" tabIndex="-1" aria-labelledby="changeProfilePictureModal_Label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="changeProfilePictureModal_Label">update profile image</h5>
                            <button type="button" className="btn-close dismissModal" onClick={handleCancel} aria-label="Close" data-bs-dismiss="modal"></button>
                        </div>
                        {modalContent}
                    </div>
                </div>
            </div>
        </>
    )
};
ProfileImageEditor.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    setImageUrl: PropTypes.func.isRequired,
    crop: PropTypes.object.isRequired,
    setCrop: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    activity: PropTypes.string.isRequired,
    setActivity: PropTypes.func.isRequired
};
export default ProfileImageEditor;
