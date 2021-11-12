import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import MeteorCall from '/imports/api/util/callPromise';
import Nav from './nav';
import NoUserNav from './no_user_nav';
import {isBad} from '/imports/api/util/isBad';

function NavContainer(props){
    const [query, setQuery] = useState("");
    // debounce the search function to avoid spamming the query
    const doSearch = useCallback(_.debounce((_query, _navState) => {
        if(_query.length > 0){
            props.navStack.search(_query);
        } else if(_navState === 'Search' && _query.length === 0){
            // empty search; go back.
            props.navStack.back();
        }
    }, 400), []);

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

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        doSearch(searchQuery, props.navStack.current.navState);
    };

    if(Meteor.user()){
        return (
            <Nav
                isActive={userIsActive}
                navOnClick={navOnClick}
                navStack={props.navStack}
                profileImage={Meteor.user({fields: {'profile.profileImage': 1}}).profile.profileImage}
                profileOnClick={profileOnClick}
                messageOnClick={messageOnClick}
                logOut={handleLogOut}

                query={query}
                handleSearch={handleSearch}
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
