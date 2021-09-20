import React from 'react';
import PropTypes from 'prop-types';

const Likes = (props) => {
    return (
        <span style={{paddingRight: "1rem"}}>{props.count} <i className={props.thumbClass} onClick={props.thumbClick}></i></span>
    )
};
Likes.propTypes = {
    thumbClass: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
};
export default Likes;
