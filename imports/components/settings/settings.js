import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import ProfileImageEditorContainer from '/imports/components/settings/profileImageEditorContainer';
import ShareSettingsContainer from '/imports/components/settings/shareSettingsContainer';
import ContentWrapper from '/imports/components/layout/contentWrapper';
import TwitterSettingsContainer from '/imports/components/settings/external/twitterSettingsContainer';
import {currentUserProfilePic} from '/imports/api/profile/profilePic';

const Settings = (props) => {
    let profileImage = currentUserProfilePic();
    const twitterSettings = Meteor.settings.public.sharing.twitter.enabled ? (
        <div style={{paddingTop: "1rem"}}>
            <h6>link Twitter account</h6>
            <TwitterSettingsContainer />
        </div>
    ) : (<></>);
    const facebookSettings = Meteor.settings.public.sharing.facebook.enabled ? (
        <div style={{paddingTop: "1rem"}}>
            <h6>link facebook account</h6>
            <div>facebook stuff</div>
        </div>
    ) : (<></>);
    const instagramSettings = Meteor.settings.public.sharing.instagram.enabled ? (
        <div style={{paddingTop: "1rem"}}>
            <h6>link instagram account</h6>
            <div>instagram stuff</div>
        </div>
    ) : (<></>);

    const handleProfileUpdate = () => {
        if(props.save.profile()) indicateUpdateSuccess(['firstInput', 'lastInput', 'locationInput'], 'profileUpdateMessage');
    };
    const handleEmailUpdate = () => {
        if(props.save.email()) indicateUpdateSuccess(['emailInput'], 'emailUpdateMessage');
    };
    const handlePasswordUpdate = () => {
        if(props.save.password()) indicateUpdateSuccess(['currentPasswordInput', 'passwordInput', 'confirmInput'], 'passwordUpdateMessage');
    };

    const indicateUpdateSuccess = (idArray, messageId) => {
        if(!(idArray instanceof Array)) idArray = [idArray];
        idArray.forEach((id) => {
            document.getElementById(id).classList.remove('is-valid');
        });
        const successMessage = document.getElementById(messageId);
        successMessage.style.display = "inline";
        _.delay(() => {
            successMessage.style.display = "none";
        }, 3000);
    };

    return (
        <ContentWrapper content={(
            <>
                <div style={{paddingTop: "1rem"}}>
                    <h6>profile picture</h6>
                    <img className="rounded" src={profileImage} style={{maxHeight: "4rem", paddingRight: "1rem"}}/>
                    <ProfileImageEditorContainer />
                </div>
                <div style={{paddingTop: "1rem"}}>
                    <h6>profile details</h6>
                    <div className="mb-3 text-danger" style={{textAlign: 'center'}}>
                        {props.profileError}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="firstInput" aria-describedby="firstInputHelp" onChange={props.handle.first} placeholder="first name" value={props.first}/>
                        <label className="form-label">first name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="lastInput" aria-describedby="lastInputHelp" onChange={props.handle.last} placeholder="last name" value={props.last}/>
                        <label className="form-label">last name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="locationInput" aria-describedby="locationInputHelp" onChange={props.handle.location} placeholder="location" value={props.location}/>
                        <label className="form-label">location</label>
                    </div>
                    <div className="mb-3" style={{textAlign: "right"}}>
                        <span id="profileUpdateMessage" className="text-success" style={{paddingRight: "1rem", display: "none"}}>updated successfully</span><div className={props.profileButtonEnabled ? 'btn btn-primary' : 'btn btn-primary disabled'} onClick={() => {handleProfileUpdate()}}><i className="bi bi-save"></i></div>
                    </div>
                </div>
                <div style={{paddingTop: "1rem"}}>
                    <h6>email</h6>
                    <div className="mb-3 text-danger" style={{textAlign: 'center'}}>
                        {props.emailError}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="emailInput" aria-describedby="emailInputHelp" onChange={props.handle.email} placeholder="email" value={props.email}/>
                        <label className="form-label">email</label>
                        <div className="invalid-feedback">invalid email address</div>
                    </div>
                    <div className="mb-3" style={{textAlign: "right"}}>
                        <span id="emailUpdateMessage" className="text-success" style={{paddingRight: "1rem", display: "none"}}>updated successfully</span><div className={props.emailButtonEnabled ? 'btn btn-primary' : 'btn btn-primary disabled'} onClick={() => {handleEmailUpdate()}}><i className="bi bi-save"></i></div>
                    </div>
                </div>
                <div style={{paddingTop: "1rem"}}>
                    <h6>password</h6>
                    <div className="mb-3 text-danger" style={{textAlign: 'center'}}>
                        {props.passwordError}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="currentPasswordInput" aria-describedby="currentPasswordInputHelp" onChange={props.handle.currentPassword} placeholder="current password"/>
                        <label className="form-label">current password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="passwordInput" aria-describedby="newPasswordInputHelp" onChange={props.handle.newPassword} placeholder="new password"/>
                        <label className="form-label">new password</label>
                        <div className="valid-feedback">{props.passwordStrength}</div>
                        <div className="invalid-feedback">{props.passwordStrength}</div>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="confirmInput" aria-describedby="confirmNewPasswordHelp" onChange={props.handle.confirm} placeholder="confirm new password"/>
                        <label className="form-label">confirm new password</label>
                        <div className="invalid-feedback">must match password</div>
                    </div>
                    <div className="mb-3" style={{textAlign: "right"}}>
                        <span id="passwordUpdateMessage" className="text-success" style={{paddingRight: "1rem", display: "none"}}>updated successfully</span><div className={props.passwordButtonEnabled ? 'btn btn-primary' : 'btn btn-primary disabled'} onClick={() => {handlePasswordUpdate()}}><i className="bi bi-save"></i></div>
                    </div>
                </div>
                <div style={{paddingTop: "1rem"}}>
                    <h6>sharing defaults</h6>
                    <ShareSettingsContainer />
                </div>
                {twitterSettings}
                {facebookSettings}
                {instagramSettings}
            </>
        )}/>
    );
};
Settings.propTypes = {
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    profileError: PropTypes.string,
    profileButtonEnabled: PropTypes.bool.isRequired,
    email: PropTypes.string,
    emailError: PropTypes.string,
    emailButtonEnabled: PropTypes.bool.isRequired,
    passwordStrength: PropTypes.string,
    passwordError: PropTypes.string,
    passwordButtonEnabled: PropTypes.bool.isRequired,
    handle: PropTypes.object.isRequired,
    save: PropTypes.object.isRequired
};
export default Settings;
