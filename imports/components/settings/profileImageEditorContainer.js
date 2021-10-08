import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ProfileImageEditor from '/imports/components/settings/profileImageEditor';
import {currentUserProfilePic} from '/imports/api/profile/profilePic';
import MeteorCall from '/imports/api/util/callPromise';
import StripExifData from '/imports/api/images/stripExif';
import BlobToBase64 from '/imports/api/images/blobToBase64';

const ProfileImageEditorContainer = (props) => {
    const [imageUrl, setImageUrl] = useState(currentUserProfilePic());
    const [activity, setActivity] = useState('crop');
    const [crop, setCrop] = useState({
        aspect: 4 / 3,
        x: 0,
        y: 0
    });

    const cancel = () => {
        setActivity('crop');
        setImageUrl(currentUserProfilePic());
    };

    const save = () => {
        _saveCroppedImage(crop);
        setActivity('crop');
    };

    return (
        <ProfileImageEditor
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            crop={crop}
            setCrop={setCrop}
            cancel={cancel}
            save={save}
            activity={activity}
            setActivity={setActivity}
        />
    )
};
ProfileImageEditorContainer.propTypes = {

};
export default ProfileImageEditorContainer;

const _saveCroppedImage = async (crop) => {
    try {
        const image = document.getElementsByClassName("ReactCrop__image")[0];
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        // New lines to be added
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        // As a blob
       const newImage = await new Promise((resolve, reject) => {
           canvas.toBlob(
               (blob) => {
                   resolve(blob);
               }
           );
       });
       const newImageUrl = URL.createObjectURL(newImage);
       const exifStripped = await StripExifData(newImageUrl);
       const convertedToBase64 = await BlobToBase64(exifStripped);
       const newUrls = await MeteorCall('uploadImages', convertedToBase64);
       await MeteorCall('updateProfilePic', newUrls[0]);
    } catch(error){
        console.log("error saving profile image:", error);
    }
};
