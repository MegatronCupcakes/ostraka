import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TwitterSettings from '/imports/components/settings/external/twitterSettings';

const TwitterSettingsContainer = (props) => {
    const handleCancel = () => {
        alert("CANCEL");
    };
    const twitterLogin = () => {
        alert("TWITTER LOGIN");
    };
    return (
        <TwitterSettings
            handleCancel={handleCancel}
            twitterLogin={twitterLogin}
        />
    )
};
TwitterSettingsContainer.propTypes = {

};
export default TwitterSettingsContainer;
