import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const ShareSettings = (props) => {
    return (
        <>
            {_.compact(_.keys(props.shareAppSettings).map((shareTo, index) => {
                return props.shareAppSettings[shareTo].enabled ? (
                    <div className="form-check form-switch form-check-inline settingsSwitch" key={index}>
                        <label className="form-check-label">
                            <i className={props.shareAppSettings[shareTo].iconClass} data-bs-toggle="tooltip" data-bs-placement="top" title={shareTo}>{props.shareAppSettings[shareTo].iconSupplemental}</i>
                        </label>
                        <input className="form-check-input" type="checkbox" value="" id={shareTo} checked={props.settings[shareTo] || false} onChange={props.onChange}/>
                    </div>
                ) : null;
            }))}
        </>
    );
};
ShareSettings.propTypes = {
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    shareAppSettings: PropTypes.object.isRequired
};
export default ShareSettings;
