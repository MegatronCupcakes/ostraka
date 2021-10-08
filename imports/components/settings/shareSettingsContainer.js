import {Meteor} from 'meteor/meteor';
import MeteorCall from '/imports/api/util/callPromise';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ShareSettings from '/imports/components/settings/shareSettings';
import {getSettings} from '/imports/api/settings/getSettings';

const ShareSettingsContainer = (props) => {
    let settings = getSettings();

    const onSettingChange = ({target}) => {
        const newValue = !settings.sharing[target.id];
        MeteorCall('updateShareSettings', target.id, newValue)
        .catch((error) => {
            console.log("ERROR:", error);
        });
    };
    return <ShareSettings settings={settings.sharing} shareSettings={Meteor.settings.public.sharing} onChange={onSettingChange}/>

};
ShareSettingsContainer.propTypes = {

};
export default ShareSettingsContainer;
