import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
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
        props.navStack.update({navState: target.id, viewContent: null, activeTag: null});
    };

    const profileOnClick = ({target}) => {
        props.navStack.update({navState: 'Profile', viewContent: Meteor.userId(), activeTag: null});
    };

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
