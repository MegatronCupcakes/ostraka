import React from 'react';
import PropTypes from 'prop-types';

// Messaging Exclusing/Inclusion Components

const ProfileTag = (props) => {
    if(props.replyToActive){
        return (
            <div className="listedProfile">{props.tag.name}</div>
        );
    } else {
        return (
            <div className="listedProfile" onClick={props.onDelete}>{props.tag.name}<i className="bi bi-x-lg profileListActionIcon"></i></div>
        );
    }
};
ProfileTag.propTypes = {
    tag: PropTypes.object.isRequired,
    removeButtonText: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    replyToActive: PropTypes.bool.isRequired
};

const ProfileSuggestion = (props) => {
    return (
        <div className="suggestion">{props.item.name}<i className="bi bi-plus profileListActionIcon"></i></div>
    );
};
ProfileSuggestion.propTypes = {
    item: PropTypes.object.isRequired,
    query: PropTypes.string.isRequired
};

export {ProfileTag, ProfileSuggestion};
