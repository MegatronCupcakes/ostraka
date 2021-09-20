import React from 'react';
import PropTypes from 'prop-types';
import UserIdentifier from '/imports/components/profile/userIdentifier';
import {goTo} from '/imports/api/navStack/goTo';

const UserIdentifierGoToPost = (props) => {
    const goToPost = () => {
        goTo(props.post, "post", props.navStack, props.viewType, props.sharedById);
    };
    return (
        <div>
            <UserIdentifier
                postedBy={props.post.postedBy}
                postedByTag={props.post.postedByTag}
                postedById={props.post.postedById}
                postedByProfilePic={props.post.postedByProfilePic}
                noninteractive={props.noninteractive}
                viewType={props.viewType}
                sharedById={props.sharedById}
                navStack={props.navStack}
                profileLink={props.post.profileLink}
            />
            <div className="goToPost col-1" style={{textAlign: "right", float: "right", display: "inline-block"}}><i className="bi bi-arrow-right-square" onClick={goToPost} ></i></div>
        </div>
    )
};
UserIdentifierGoToPost.propTypes = {
    post: PropTypes.object.isRequired,
    displaySize: PropTypes.string,
    noninteractive: PropTypes.bool,
    sharedById: PropTypes.string,
    viewType: PropTypes.string, // "embed" and perhaps other specialized content views.
    navStack: PropTypes.object.isRequired
};
export default UserIdentifierGoToPost;
