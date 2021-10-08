import React from 'react';
import PropTypes from 'prop-types';
import {goTo} from '/imports/api/navStack/goTo';
import {userProfilePic} from '/imports/api/profile/profilePic';
import {dateFormatter} from '/imports/api/util/dateFormatter';

const UserIdentifier = (props) => {

    const handleUserClick = () => {
        goTo(props.postedById, "profile", props.navStack, props.viewType, props.sharedById);
    };

    const displayClasses = (displayClass) => {
        return props.displaySize ? `${displayClass} ${props.displaySize}` : displayClass;
    }

    const timeStamp = props.date ? (
        <div className={displayClasses("userIdentifier_date")}>{dateFormatter(props.date)}</div>
    ) : (<></>)

    return (
        <div className="col-10">
            <div style={{float: "left", paddingRight: "0.5rem"}}>
                <img className={`rounded ${displayClasses("userIdentifier_pic")}`} src={userProfilePic(props.postedByProfilePic)}  onClick={handleUserClick} />
            </div>
            <div style={{float: "left"}}>
                <div className={displayClasses("userIdentifier_user")} onClick={handleUserClick}>{props.postedBy}</div>
                <div className={displayClasses("userIdentifier_tag")} onClick={handleUserClick}>@{props.postedByTag}</div>
                {timeStamp}
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
    navStack: PropTypes.object.isRequired,
    date: PropTypes.string
};
export default UserIdentifier;
