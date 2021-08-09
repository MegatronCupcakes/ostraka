import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Nav from './nav';
import NoUserNav from './no_user_nav';

function NavContainer(props){

    const handleLogOut = () => {
        props.setNoUserState('Login');
        Meteor.logout();
        props.resetClientStore();
    }

    const noUserOnClick = ({target}) => {
        props.setNoUserState(target.id);
    };

    const userOnClick = ({target}) => {
        props.setNavState(target.id);
    };

    const noUserIsActive = (activity) => {
        return props.noUserState === activity ? ' active' : '';
    };

    const userIsActive = (activity) => {
        return props.navState === activity ? ' active' : '';
    };

    if(props.user){
        return (
            <Nav
                isActive={userIsActive}
                onClick={userOnClick}
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
    navState: PropTypes.string.isRequired,
    setNavState: PropTypes.func.isRequired,
    resetClientStore: PropTypes.func.isRequired
}

export default NavContainer;
