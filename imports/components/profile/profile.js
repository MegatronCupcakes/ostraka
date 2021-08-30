import React from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import UserIdentifier from '/imports/components/feed/userIdentifier';
import ProfilePostsContainer from '/imports/components/profile/profilePostsContainer';
import ProfileCommentsContainer from '/imports/components/profile/profileCommentsContainer';
import ProfileTopicsContainer from '/imports/components/profile/profileTopicsContainer';
import ProfileProfilesContainer from '/imports/components/profile/profileProfilesContainer';

const _tabClasses = "nav-link profileNav";
const _activeTabClasses = _tabClasses + " active";

const _tabPanelClasses = "tab-pane fade";
const _activeTabPanelClasses = _tabPanelClasses + " active show";

const Profile = (props) => {
    const _setActiveTab = ({target}) => {props.setActiveTab(target.id)};
    const _getClasses = (type, id) => {
        if(type === "tab"){
            return id === props.activeTab ? _activeTabClasses : _tabClasses;
        } else {
            return id === props.activeTab ? _activeTabPanelClasses : _tabPanelClasses;
        }
    }
    return (
        <div className="col-xs-12 col-sm-12 col-md-8 offset-md-2 mb-3 ma-3" style={{paddingTop: "1rem"}}>
            <UserIdentifier
                displaySize="large"
                postedBy={props.user.profile.firstName + " " + props.user.profile.lastName}
                postedByTag={props.user.profile.profileTag}
                postedById={props.user._id}
                postedByProfilePic={props.user.profile.profileImage}
                navStack={props.navStack}
            />
            reputation score: {props.user.profile.reputationScore}
            <ul className="nav justify-content-center" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className={_getClasses("tab", "posts")} id="posts" onClick={_setActiveTab}>posts</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className={_getClasses("tab", "comments")} id="comments" onClick={_setActiveTab}>comments</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className={_getClasses("tab", "topics")} id="topics" onClick={_setActiveTab}>topics</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className={_getClasses("tab", "invited")} id="invited" onClick={_setActiveTab}>invited</a>
                </li>
            </ul>
            <div className="tab-content" style={{paddingTop: "2rem"}}>
                <div className={_getClasses("tabPanel", "posts")} id="posts" aria-labelledby="posts-tab">
                    <ProfilePostsContainer
                        navStack={props.navStack}
                        userId={props.user._id}
                    />
                </div>
                <div className={_getClasses("tabPanel", "comments")} id="comments" aria-labelledby="comments-tab">
                    <ProfileCommentsContainer
                        navStack={props.navStack}
                        userId={props.user._id}
                    />
                </div>
                <div className={_getClasses("tabPanel", "topics")} id="topics" aria-labelledby="topics-tab">
                    <ProfileTopicsContainer
                        navStack={props.navStack}
                        profileTags={props.profileTags}
                    />
                </div>
                <div className={_getClasses("tabPanel", "invited")} id="invited" aria-labelledby="invited-tab">
                    <ProfileProfilesContainer
                        navStack={props.navStack}
                        profileIds={props.user.profile.invited}
                    />
                </div>
            </div>

        </div>
    )
};
Profile.propTypes = {
    navStack: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    profileTags: PropTypes.array.isRequired
};
export default Profile;
