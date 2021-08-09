import React from 'react';
import PropTypes from 'prop-types';

const Likes = (props) => {
    return (
        <div className="col-2"><i className={props.thumbClass} onClick={props.thumbClick}></i> {props.likes.length}</div>
    )
};
Likes.propTypes = {
    thumbClass: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired
};
export default Likes;
