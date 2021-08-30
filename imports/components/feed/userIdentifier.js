import React from 'react';
import PropTypes from 'prop-types';
import {dismissModals} from '/imports/api/util/dismissModals';

const UserIdentifier = (props) => {

    const handleUserClick = ({target}) => {
        dismissModals();
        props.navStack.update({navState: 'Profile', viewContent: props.postedById, activeTag: null})
    };

    const _userClass = props.displaySize ? 'userIdentifier_user_' + props.displaySize : 'userIdentifier_user';
    const _tagClass = props.displaySize ? 'userIdentifier_tag_' + props.displaySize : 'userIdentifier_tag';
    const _pictureClass = props.displaySize ? 'float-md-start rounded userIdentifier_pic_' + props.displaySize : 'float-md-start rounded userIdentifier_pic';

    return (
        <div className="clearfix" style={{paddingBottom: '0.5rem'}}>
            <img className={_pictureClass} src={props.postedByProfilePic}  onClick={handleUserClick}/>
            <div style={{paddingLeft: "1rem"}}>
                <span className={_userClass} onClick={handleUserClick}>{props.postedBy}</span><br />
                <span className={_tagClass} onClick={handleUserClick}>@{props.postedByTag}</span>
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
    postPreview: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default UserIdentifier;
