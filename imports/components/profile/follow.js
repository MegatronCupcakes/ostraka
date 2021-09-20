import React from 'react';
import PropTypes from 'prop-types';

const Follow = (props) => {
    const countClasses = props.displaySize ? "userAction_" + props.displaySize : "userAction";
    let buttonClasses = props.followed ? "bi bi-person-dash" : "bi bi-person-plus";
    if(props.isCurrentUser) buttonClasses = buttonClasses + " disabled";
    return <span className={countClasses} onClick={props.handleClick}>{props.followedByCount} <i className={buttonClasses}></i></span>
};
Follow.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
    followed: PropTypes.bool.isRequired,
    followedByCount: PropTypes.number,
    displaySize: PropTypes.string
};
export default Follow;
