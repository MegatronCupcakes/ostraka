import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const NotificationSettings = (props) => {
    return _.keys(props.notificationDefaults).map((key, index) => {
        const _handleNotificationChange = () => {
            props.handleNotificationChange(key, !props.settings[key]);
        };
        return (
            <div className="mb-3" key={index}>
                <div className="form-check form-switch form-check-inline settingsSwitch">
                    <label className="form-check-label">
                        {props.notificationDefaults[key].label}
                    </label>
                    <input className="form-check-input" type="checkbox" value="" id="allowFromAny" checked={props.settings[key]} onChange={_handleNotificationChange}/>
                </div>
            </div>
        )
    })
};
NotificationSettings.propTypes = {
    settings: PropTypes.object.isRequired,
    notificationDefaults: PropTypes.object.isRequired,
    handleNotificationChange: PropTypes.func.isRequired
};
export default NotificationSettings;
