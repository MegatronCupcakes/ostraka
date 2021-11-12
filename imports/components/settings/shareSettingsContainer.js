import {Meteor} from 'meteor/meteor';
import MeteorCall from '/imports/api/util/callPromise';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {getSettings} from '/imports/api/settings/getSettings';
import ShareSettings from '/imports/components/settings/shareSettings';

const ShareSettingsContainer = (props) => {
    if(Meteor.user()){
        const onSettingChange = ({target}) => {
            const newValue = !settings.sharing[target.id];
            MeteorCall('updateShareSettings', target.id, newValue)
            .catch((error) => {
                console.log("ERROR:", error);
            });
        };
        return <ShareSettings settings={props.userSettings ? props.userSettings.sharing : getSettings().sharing} shareSettings={Meteor.settings.public.sharing} onChange={onSettingChange}/>
    } else {
        return <></>;
    }

};
ShareSettingsContainer.propTypes = {
    userSettings: PropTypes.object
};
export default ShareSettingsContainer;
