import React from 'react';
import PropTypes from 'prop-types';

const Likes = (props) => {
    return (
        <span className={props.viewSize ? `userAction ${props.viewSize}` : "userAction"}>
            {props.count} <i className={props.thumbClass} onClick={props.thumbClick} data-bs-toggle="tooltip" data-bs-placement="top" title={props.label}></i>
        </span>
    )
};
Likes.propTypes = {
    viewSize: PropTypes.string,
    thumbClass: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
};
export default Likes;
