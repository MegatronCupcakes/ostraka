import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import MeteorCall from '../../api/util/callPromise';
import StripExifData from '../../api/images/stripExif';
import BlobToBase64 from '../../api/images/blobToBase64'

import {AttachImage, ImagePreview} from './attachImage';

const _uploadEnabled = "btn btn-primary col-auto";
const _uploadDisabled = _uploadEnabled + " disabled";

const _deleteEnabled = "btn btn-secondary col-auto";
const _deleteDisabled = _deleteEnabled + " disabled";

const AttachImageContainer = (props) => {
    const [tempQueue, setTempQueue] = useState([]);
    const [uploadButtonClass, setUploadButtonClass] = useState(_uploadEnabled);
    const [deleteButtonClass, setDeleteButtonClass] = useState(_deleteEnabled);
    const [error, setError] = useState(null);
    const imagePreviews = tempQueue.map((imagePath, index) => {
        const handleRemove = () => {
            console.log("REMOVE IMAGE AT INDEX ", index);
        };
        return (
            <ImagePreview
                imagePath={imagePath}
                key={index}
                removeImage={handleRemove}
            />
        );
    });
    const handleCancel = () => {
        setTempQueue([]);
        setUploadButtonClass(_uploadEnabled);
        setDeleteButtonClass(_deleteEnabled);
    }
    const addToQueue = (path) => {
        setTempQueue([...tempQueue, path]);
    };
    const handleUpload = async () => {
        setUploadButtonClass(_uploadDisabled);
        setDeleteButtonClass(_deleteDisabled);
        const exifStripped = await StripExifData(tempQueue);
        const convertedToBase64 = await BlobToBase64(exifStripped);
        // upload images to CDN then use props.setPostImages to set their URIs
        MeteorCall('uploadImages', convertedToBase64)
        .then((newUrls) => {
            // upload was successful.
            console.log("newUrls:", newUrls);
            props.setPostImages([...props.postImages, ...newUrls]);
            console.log("postImages:", props.postImages);
            props.setPostType('image');
            setTempQueue([]);
            document.getElementById("attachImageModal").hide();
        })
        .catch((error) => {
            // error ocurred;
            setError(error);
        })
        .finally(() => {
            setUploadButtonClass(_uploadEnabled);
            setDeleteButtonClass(_deleteEnabled);
        });
    };

    return (
        <AttachImage
            addToQueue={addToQueue}
            previews={imagePreviews}
            handleCancel={handleCancel}
            handleUpload={handleUpload}
            uploadButtonClass={uploadButtonClass}
            deleteButtonClass={deleteButtonClass}
        />
    );
};
AttachImageContainer.propTypes = {
    postImages: PropTypes.array.isRequired,
    setPostImages: PropTypes.func.isRequired,
    setPostType: PropTypes.func.isRequired
};
export default AttachImageContainer;
