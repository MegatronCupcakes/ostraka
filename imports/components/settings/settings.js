import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
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
    return (
        <ContentWrapper content={(
            <>
                <div style={{paddingTop: "1rem"}}>
                    <h6>profile picture</h6>
                    <img className="rounded" src={profileImage} style={{maxHeight: "4rem", paddingRight: "1rem"}}/>
                    <ProfileImageEditorContainer />
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

};
export default Settings;
