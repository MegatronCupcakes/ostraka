import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import Logo from '/imports/components/nav/logo';
import NotificationsNavContainer from '/imports/components/notifications/notificationsNavContainer';
import MessageNavContainer from '/imports/components/messaging/messageNavContainer';

export default function Nav(props){
    const _handleQuery = ({target}) => props.handleSearch(target.value);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">
                    <Logo />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={"nav-link" + props.isActive("Feed")} aria-current="Feed" onClick={props.navOnClick} id="Feed">my feed</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + props.isActive("Friends")} aria-current="Friends" onClick={props.navOnClick} id="Friends">my friends</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + props.isActive("Topics")} aria-current="Topics" onClick={props.navOnClick} id="Topics">my topics</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + props.isActive("Trending Topics")} aria-current="Trending Topics" onClick={props.navOnClick} id="Trending Topics">trending topics</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + props.isActive("Trending Users")} aria-current="Trending Users" onClick={props.navOnClick} id="Trending Users">trending users</a>
                        </li>
                    </ul>
                    <div className="nav-item">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="search" aria-label="search" onChange={_handleQuery} value={props.query}/>
                        </form>
                    </div>
                    <NotificationsNavContainer
                        navOnClick={props.navOnClick}
                        navStack={props.navStack}
                    />
                    <MessageNavContainer
                        navOnClick={props.navOnClick}
                        messageOnClick={props.messageOnClick}
                    />
                    <div className="nav-item dropdown navbar-nav" style={{paddingLeft: '1rem', paddingRight: '1.5rem'}}>
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img className="rounded" src={props.profileImage} style={{maxHeight: "2.5rem"}}/>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" onClick={props.profileOnClick}>profile</a></li>
                            <li><a className="dropdown-item" onClick={props.navOnClick} id="Settings">settings</a></li>
                            <li><a className="dropdown-item" onClick={props.navOnClick} id="Support">support</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" onClick={props.logOut}>log out</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </nav>
    )
}
Nav.propTypes = {
    isActive: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    profileImage: PropTypes.string.isRequired,
    navOnClick: PropTypes.func.isRequired,
    navStack: PropTypes.object.isRequired,
    profileOnClick: PropTypes.func.isRequired,
    messageOnClick: PropTypes.func.isRequired,

    query: PropTypes.string,
    handleSearch: PropTypes.func.isRequired
}
