import {Meteor} from "meteor/meteor";
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MeteorCall from '/imports/api/util/callPromise';
import NotificationSettings from '/imports/components/settings/notificationSettings';

const NotificationSettingsContainer = (props) => {
    const handleNotificationChange = (id, value) => {
        MeteorCall('updateNotificationSettings', id, value)
        .catch((error) => {
            console.log("ERROR:", error);
        });
    };
    return (
        <NotificationSettings
            settings={props.userSettings.notifications}
            notificationDefaults={Meteor.settings.public.notificationDefaults}
            handleNotificationChange={handleNotificationChange}
        />
    );
};
NotificationSettingsContainer.propTypes = {
    userSettings: PropTypes.object.isRequired
};
export default NotificationSettingsContainer;
