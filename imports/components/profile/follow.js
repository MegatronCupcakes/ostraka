import React from 'react';
import PropTypes from 'prop-types';

const Follow = (props) => {
    const countClasses = props.viewSize ? "userAction " + props.viewSize : "userAction";
    const tooltip = props.followed ? "unfollow" : "follow";
    let buttonClasses = props.followed ? "bi bi-person-dash" : "bi bi-person-plus";
    if(props.isCurrentUser) buttonClasses = buttonClasses + " disabled";
    return <span className={countClasses} onClick={props.handleClick}>{props.followedByCount} <i className={buttonClasses} data-bs-toggle="tooltip" data-bs-placement="top" title={tooltip}></i></span>
};
Follow.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
    followed: PropTypes.bool.isRequired,
    followedByCount: PropTypes.number,
    viewSize: PropTypes.string
};
export default Follow;
