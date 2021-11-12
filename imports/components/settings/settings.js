import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import ProfileImageEditorContainer from '/imports/components/settings/profileImageEditorContainer';
import ShareSettingsContainer from '/imports/components/settings/shareSettingsContainer';
import MessagingSettingsContainer from '/imports/components/settings/messagingSettingsContainer';
import NotificationSettingsContainer from '/imports/components/settings/notificationSettingsContainer';
import ContentWrapper from '/imports/components/layout/contentWrapper';
import TwitterSettingsContainer from '/imports/components/settings/external/twitterSettingsContainer';
import {currentUserProfilePic} from '/imports/api/profile/profilePic';
import BottomSpacer from '/imports/components/layout/bottomSpacer';

const Settings = (props) => {
    let profileImage = currentUserProfilePic();
    const handleMenuClick = ({target}) => {
        props.setActiveMenu(target.id);
    };
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

    let settingsMenu;
    switch(props.activeMenu){
        case 'profile':
            settingsMenu = (
                <>
                    <div style={{paddingTop: "1rem"}}>
                        <img className="rounded" src={profileImage} style={{maxHeight: "4rem", paddingRight: "1rem"}}/>
                        <ProfileImageEditorContainer />
                    </div>
                    <div style={{paddingTop: "1rem"}}>
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
                </>
            );
            break;
        case 'password':
            settingsMenu = (
                <>
                    <div style={{paddingTop: "1rem"}}>
                        <div className="mb-3 text-danger" style={{textAlign: 'center'}}>
                            {props.passwordError}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="currentPasswordInput" aria-describedby="currentPasswordInputHelp" onChange={props.handle.currentPassword} placeholder="current password" value={props.currentPassword}/>
                            <label className="form-label">current password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="passwordInput" aria-describedby="newPasswordInputHelp" onChange={props.handle.newPassword} placeholder="new password" value={props.newPassword}/>
                            <label className="form-label">new password</label>
                            <div className="valid-feedback">{props.passwordStrength}</div>
                            <div className="invalid-feedback">{props.passwordStrength}</div>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="confirmInput" aria-describedby="confirmNewPasswordHelp" onChange={props.handle.confirm} placeholder="confirm new password" value={props.confirm}/>
                            <label className="form-label">confirm new password</label>
                            <div className="invalid-feedback">must match password</div>
                        </div>
                        <div className="mb-3" style={{textAlign: "right"}}>
                            <span id="passwordUpdateMessage" className="text-success" style={{paddingRight: "1rem", display: "none"}}>updated successfully</span><div className={props.passwordButtonEnabled ? 'btn btn-primary' : 'btn btn-primary disabled'} onClick={() => {handlePasswordUpdate()}}><i className="bi bi-save"></i></div>
                        </div>
                    </div>
                </>
            );
            break;
        case 'email':
            settingsMenu = (
                <>
                    <div style={{paddingTop: "1rem"}}>
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
                </>
            );
            break;
        case 'messaging':
            settingsMenu = (
                <>
                    <div style={{paddingTop: "1rem"}}>
                        <MessagingSettingsContainer
                            userSettings={props.userSettings}
                        />
                    </div>
                </>
            );
            break;
        case 'sharing':
            settingsMenu = (
                <>
                    <div style={{paddingTop: "1rem"}}>
                        <label className="form-label">sharing defaults</label>
                        <div>
                            <ShareSettingsContainer
                                userSettings={props.userSettings}
                            />
                        </div>
                    </div>
                    {twitterSettings}
                    {facebookSettings}
                    {instagramSettings}
                </>
            );
            break;
        case 'notifications':
            settingsMenu = (
                <>
                    <div style={{paddingTop: "1rem"}}>
                        <NotificationSettingsContainer
                            userSettings={props.userSettings}
                        />
                    </div>
                </>
            );
            break;
    }

    return (
        <ContentWrapper content={(
            <>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a className={"profile" === props.activeMenu ? 'nav-link active' : 'nav-link'} onClick={handleMenuClick} id="profile">profile</a>
                    </li>
                    <li className="nav-item">
                        <a className={"password" === props.activeMenu ? 'nav-link active' : 'nav-link'} onClick={handleMenuClick} id="password">password</a>
                    </li>
                    <li className="nav-item">
                        <a className={"email" === props.activeMenu ? 'nav-link active' : 'nav-link'}  onClick={handleMenuClick} id="email">email</a>
                    </li>
                    <li className="nav-item">
                        <a className={"messaging" === props.activeMenu ? 'nav-link active' : 'nav-link'} onClick={handleMenuClick} id="messaging">messaging</a>
                    </li>
                    <li className="nav-item">
                        <a className={"sharing" === props.activeMenu ? 'nav-link active' : 'nav-link'} onClick={handleMenuClick} id="sharing">sharing</a>
                    </li>
                    <li className="nav-item">
                        <a className={"notifications" === props.activeMenu ? 'nav-link active' : 'nav-link'} onClick={handleMenuClick} id="notifications">notifications</a>
                    </li>
                </ul>
                {settingsMenu}
                <BottomSpacer />
            </>
        )}/>
    );
};
Settings.propTypes = {
    userSettings: PropTypes.object.isRequired,
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
    save: PropTypes.object.isRequired,
    currentPassword: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
    confirm: PropTypes.string.isRequired,
    navStack: PropTypes.object.isRequired
};
export default Settings;
