import React from 'react';
import PropTypes from 'prop-types';
import UserIdentifier from '/imports/components/feed/userIdentifier';
import {dismissModals} from '/imports/api/util/dismissModals';

const UserIdentifierGoToPost = (props) => {
    const goToPost = () => {
        dismissModals();
        props.navStack.update({navState: 'PostView', viewContent: props.post, activeTag: null});
    };
    return (
        <div>
            <div style={{float: "none"}}>
                <UserIdentifier
                    postedBy={props.postedBy}
                    postedByTag={props.postedByTag}
                    postedById={props.postedById}
                    postedByProfilePic={props.postedByProfilePic}
                    postPreview={props.postPreview}
                    navStack={props.navStack}
                />
            </div>
            <div className="goToPost" style={{float: "right", marginTop: "-4rem", position: "relative"}} ><i className="bi bi-arrow-right-square" onClick={goToPost} ></i></div>
        </div>
    )
};
UserIdentifierGoToPost.propTypes = {
    displaySize: PropTypes.string,
    postedBy: PropTypes.string.isRequired,
    postedByTag: PropTypes.string.isRequired,
    postedById: PropTypes.string.isRequired,
    postedByProfilePic: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    postPreview: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default UserIdentifierGoToPost;
