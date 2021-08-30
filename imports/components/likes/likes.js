import React from 'react';
import PropTypes from 'prop-types';

const Likes = (props) => {
    return (
        <span style={{paddingRight: "1rem"}}><i className={props.thumbClass} onClick={props.thumbClick}></i> {props.likes.length}</span>
    )
};
Likes.propTypes = {
    thumbClass: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired
};
export default Likes;
