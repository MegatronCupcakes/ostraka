import React from 'react';
import PropTypes from 'prop-types';

const UserIdentifier = (props) => {

    const handleUserClick = ({target}) => {
        console.log("user click: " + props.postedById);
    };
    return (
        <div className="row justify-content-start" style={{paddingBottom: '0.5rem'}} onClick={handleUserClick}>
            <div className="col-3">
                <img
                    src={props.postedByProfilePic}
                    style={{maxHeight: '4rem'}}
                />
            </div>
            <div className="col-9">
                <span className="userIdentifier_user"> {props.postedBy}</span><br />
                <span className="userIdentifier_tag"> @{props.postedByTag}</span>
            </div>
        </div>
    );
};
UserIdentifier.propTypes = {
    postedBy: PropTypes.string.isRequired,
    postedByTag: PropTypes.string.isRequired,
    postedById: PropTypes.string.isRequired,
    postedByProfilePic: PropTypes.string.isRequired
};
export default UserIdentifier;
