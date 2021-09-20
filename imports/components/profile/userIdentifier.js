import React from 'react';
import PropTypes from 'prop-types';
import {goTo} from '/imports/api/navStack/goTo';

const UserIdentifier = (props) => {

    const handleUserClick = () => {
        goTo(props.postedById, "profile", props.navStack, props.viewType, props.sharedById);
    };

    console.log("displaySize:", props.displaySize, "viewSize:", props.viewSize, "viewType:", props.viewType);

    return (
        <div className="col-11">
            <div style={{float: "left", paddingRight: "0.5rem"}}>
                <img className="rounded userIdentifier_pic" src={props.postedByProfilePic}  onClick={handleUserClick} />
            </div>
            <div style={{float: "left"}}>
                <span className="userIdentifier_user" onClick={handleUserClick}>{props.postedBy}</span><br />
                <span className="userIdentifier_tag" onClick={handleUserClick}>@{props.postedByTag}</span>
            </div>
        </div>
    );
};
UserIdentifier.propTypes = {
    displaySize: PropTypes.string,
    postedBy: PropTypes.string.isRequired,
    postedByTag: PropTypes.string.isRequired,
    postedById: PropTypes.string.isRequired,
    postedByProfilePic: PropTypes.string.isRequired,
    noninteractive: PropTypes.bool,
    sharedById: PropTypes.string,
    viewType: PropTypes.string, // "embed" and perhaps other specialized content views.
    viewSize: PropTypes.string,
    navStack: PropTypes.object.isRequired
};
export default UserIdentifier;
