import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import MessagingSettings from '/imports/components/settings/messagingSettings';
import MeteorCall from '/imports/api/util/callPromise';
import {getSettings} from '/imports/api/settings/getSettings';

const MessagingSettingsContainer = (props) => {
    let settings = getSettings();
    const [blockMatches, setBlockMatches] = useState([]);
    const [allowMatches, setAllowMatches] = useState([]);
    const [profileTagSearchError, setProfileTagSearchError] = useState(null);

    const saveSettingChange = (id, value) => {
        MeteorCall('updateMessagingSettings', id, value)
        .catch((error) => {
            console.log("ERROR:", error);
        });
    };
    const userQuery = _.debounce((query, type) => {
        console.log("query:", query, "type:", type);
        MeteorCall('allowBlockLookup', query, type)
        .catch((error) => {
            console.log("PROFILE TAG QUERY ERROR:", error);
        })
        .then((_profiles) => {
            const profiles = _profiles.map((_profile, index) => {
                return {id: _profile._id, name: _profile.profile.profileTag};
            });
            if(type === "allowedUsers"){
                setAllowMatches(profiles)
            } else {
                setBlockMatches(profiles);
            }
        });
    }, 500);

    return (
        <MessagingSettings
            saveSettingChange={saveSettingChange}
            settings={settings.messaging}
            userQuery={userQuery}
            blockMatches={blockMatches}
            allowMatches={allowMatches}
            profileTagSearchError={profileTagSearchError}
        />
    );
};
MessagingSettingsContainer.propTypes = {

};
export default MessagingSettingsContainer;
