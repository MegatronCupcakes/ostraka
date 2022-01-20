import {Meteor} from 'meteor/meteor';
import MeteorCall from '/imports/api/util/callPromise';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {getSettings} from '/imports/api/settings/getSettings';
import ShareSettings from '/imports/components/settings/shareSettings';

const ShareSettingsContainer = (props) => {
    if(Meteor.user()){
        const sharingSettings = getSettings().sharing;

        const onSettingChange = ({target}) => {
            const newValue = !sharingSettings[target.id];
            MeteorCall('updateShareSettings', target.id, newValue)
            .catch((error) => {
                console.log("ERROR:", error);
            })
            .then(() => {
                if(props.setShareEnabled){
                    // we fetch settings again because the settings object may have been empty the first time
                    const _sharingSettings = getSettings().sharing;
                    props.setShareEnabled(_.some(_.keys(_sharingSettings), (key) => {
                        return target.id === key ? newValue : _sharingSettings[key];
                    }));
                }
            });
        };

        return (
            <ShareSettings
                settings={sharingSettings}
                shareAppSettings={Meteor.settings.public.sharing}
                onChange={onSettingChange}
            />
        );
    } else {
        return <></>;
    }

};
ShareSettingsContainer.propTypes = {
    setShareEnabled: PropTypes.func
};
export default ShareSettingsContainer;
