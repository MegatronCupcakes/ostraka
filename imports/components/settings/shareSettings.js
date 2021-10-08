import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const ShareSettings = (props) => {
    const shareToSettings = _.compact(_.keys(props.shareSettings).map((shareTo, index) => {
        return props.shareSettings[shareTo].enabled ? (
            <div className="form-check form-switch form-check-inline settingsSwitch" key={index}>
                <label className="form-check-label">
                    <i className={props.shareSettings[shareTo].iconClass} data-bs-toggle="tooltip" data-bs-placement="top" title={shareTo}>{props.shareSettings[shareTo].iconSupplemental}</i>
                </label>
                <input className="form-check-input" type="checkbox" value="" id={shareTo} checked={props.settings[shareTo]} onChange={props.onChange}/>
            </div>
        ) : null;
    }));


    return (
        <>
            {shareToSettings}
        </>
    );
};
ShareSettings.propTypes = {
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    shareSettings: PropTypes.object.isRequired
};
export default ShareSettings;
