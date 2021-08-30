import React from 'react';
import PropTypes from 'prop-types';
import Logo from '/imports/components/nav/logo';

export default function Nav(props){
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
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                    <div className="nav-item dropdown navbar-nav" style={{paddingLeft: '1rem'}}>
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">                            
                            <i className="bi bi-bell">
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                    3
                                    <span className="visually-hidden">unread notifications</span>
                                 </span>
                            </i>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item">notification 1</a></li>
                            <li><a className="dropdown-item">notification 2</a></li>
                            <li><a className="dropdown-item">notification 3</a></li>
                        </ul>
                    </div>
                    <div className="nav-item dropdown navbar-nav" style={{paddingLeft: '1rem'}}>
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-envelope">
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                    6
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </i>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item">message 1</a></li>
                            <li><a className="dropdown-item">message 2</a></li>
                            <li><a className="dropdown-item">message 3</a></li>
                            <li><a className="dropdown-item">message 4</a></li>
                            <li><a className="dropdown-item">message 5</a></li>
                            <li><a className="dropdown-item">message 6</a></li>
                        </ul>
                    </div>
                    <div className="nav-item dropdown navbar-nav" style={{paddingLeft: '1rem', paddingRight: '1.5rem'}}>
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img className="rounded" src={props.profileImage} style={{maxHeight: "2.5rem"}}/>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" onClick={props.profileOnClick}>profile</a></li>
                            <li><a className="dropdown-item" onClick={props.navOnClick} id="Settings">settings</a></li>
                            <li><a className="dropdown-item"  onClick={props.logOut}>log out</a></li>
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
    profileOnClick: PropTypes.func.isRequired
}
