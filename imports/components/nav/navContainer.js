import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import MeteorCall from '/imports/api/util/callPromise';
import Nav from './nav';
import NoUserNav from './no_user_nav';

function NavContainer(props){

    const handleLogOut = () => {
        props.logOut();
    }

    const noUserOnClick = ({target}) => {
        props.setNoUserState(target.id);
    };

    const navOnClick = ({target}) => {
        const id = target.id ? target.id : target.parentNode.id;
        props.navStack.update({navState: id, viewContent: null, activeTag: null});
    };

    const profileOnClick = ({target}) => {
        props.navStack.update({navState: 'Profile', viewContent: Meteor.userId(), activeTag: null});
    };

    const messageOnClick = async (messageId) => {
        props.navStack.update({navState: 'Inbox', viewContent: messageId, activeTag: null});
        await MeteorCall('markMessageAsRead', messageId)
        .catch((error) => {
            console.log("error marking message as read:", error);
        });
    }

    const noUserIsActive = (activity) => {
        return props.noUserState === activity ? ' active' : '';
    };

    const userIsActive = (activity) => {
        return props.navStack.current.navState === activity ? ' active' : '';
    };

    if(Meteor.user()){
        return (
            <Nav
                isActive={userIsActive}
                navOnClick={navOnClick}
                profileImage={Meteor.user({fields: {'profile.profileImage': 1}}).profile.profileImage}
                profileOnClick={profileOnClick}
                messageOnClick={messageOnClick}
                logOut={handleLogOut}
            />
        )
    } else {
        return (
            <NoUserNav
                isActive={noUserIsActive}
                onClick={noUserOnClick}
            />
        )
    }
}
NavContainer.propTypes = {
    user: PropTypes.object,
    noUserState: PropTypes.string.isRequired,
    setNoUserState: PropTypes.func.isRequired,
    navStack: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired
}

export default NavContainer;
