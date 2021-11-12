import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const Back = (props) => {
    const goBack = _.debounce(() => {
        props.navStack.back();
    }, 400, true);
    return (
        <div className="navBack" onClick={goBack}>
            <i className="bi bi-arrow-left" onClick={goBack} data-bs-toggle="tooltip" data-bs-placement="top" title="back"></i>
        </div>
    )
};
Back.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default Back;
