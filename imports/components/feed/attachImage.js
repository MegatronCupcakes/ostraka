import React from 'react';
import PropTypes from 'prop-types';

export const AttachImage = (props) => {

    const handleImageInput = () => {
        const imageInput = document.getElementById("attachImageInput");
        const path = URL.createObjectURL(imageInput.files[0]);
        props.addToQueue(path);
        imageInput.value = '';
    }
    const handleCancel = () => {
        props.handleCancel();
        document.getElementById("attachImageModal").hide();
    }
    return (
        <div>
            <div className="modal-header">
                <h5 className="modal-title" id="attachVideoModalLabel">attach image(s)</h5>
                <button type="button" className="btn-close" onClick={props.handleCancel} aria-label="Close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
                <div style={{width: "100%"}}>
                    {props.previews}
                </div>
                <div style={{width: "100%"}}>
                    <input type="file" id="attachImageInput" onChange={handleImageInput} accept="image/*" />
                </div>
            </div>
            <div className="modal-footer">
            <button type="button" className={props.deleteButtonClass} onClick={props.handleCancel} data-bs-dismiss="modal"><i className="bi bi-trash"></i></button>
            <button type="button" className={props.uploadButtonClass} onClick={props.handleUpload} data-bs-dismiss="modal"><i className="bi bi-cloud-arrow-up"></i></button>
            </div>
        </div>
    )
};
AttachImage.propTypes = {
    addToQueue: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleUpload: PropTypes.func.isRequired,
    uploadButtonClass: PropTypes.string.isRequired,
    deleteButtonClass: PropTypes.string.isRequired
};

export const ImagePreview = (props) => {
    return (
        <img src={props.imagePath} onClick={props.removeImage} className="imagePreview col"/>
    )
};
ImagePreview.propTypes = {
    imagePath: PropTypes.string.isRequired,
    removeImage: PropTypes.func.isRequired
};
