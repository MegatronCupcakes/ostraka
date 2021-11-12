import React from 'react';
import PropTypes from 'prop-types';
import UserIdentifier from '/imports/components/profile/userIdentifier';
import {goTo} from '/imports/api/navStack/goTo';

const UserIdentifierGoToPost = (props) => {
    const goToPost = () => {
        goTo(props.post, "post", props.navStack, props.viewType, props.sharedById);
    };    
    return (
        <>
            <UserIdentifier
                postedBy={props.post.postedBy}
                postedByTag={props.post.postedByTag}
                postedById={props.post.postedById}
                postedByProfilePic={props.post.postedByProfilePic}
                viewSize={props.viewSize}
                noninteractive={props.noninteractive}
                viewType={props.viewType}
                sharedById={props.sharedById}
                navStack={props.navStack}
                profileLink={props.post.profileLink}
                date={props.date}
            />
            <div className="goToPost col-2" style={{textAlign: "right", float: "right", display: "inline-block", margin: "0 auto"}}>
                <i className="bi bi-arrow-right-square" onClick={goToPost} data-bs-toggle="tooltip" data-bs-placement="top" title="go to post"></i>
            </div>
        </>
    )
};
UserIdentifierGoToPost.propTypes = {
    post: PropTypes.object.isRequired,
    viewSize: PropTypes.string,
    noninteractive: PropTypes.bool,
    sharedById: PropTypes.string,
    viewType: PropTypes.string, // "embed" and perhaps other specialized content views.
    navStack: PropTypes.object.isRequired,
    date: PropTypes.string
};
export default UserIdentifierGoToPost;
