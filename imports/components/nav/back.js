import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Back = (props) => {
    const goBack = () => {
        props.navStack.back();
    }
    return (
        <span className="navBack"><i className="bi bi-arrow-left" onClick={goBack}></i></span>
    )
};
Back.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default Back;