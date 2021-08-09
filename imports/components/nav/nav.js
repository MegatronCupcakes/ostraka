import React from 'react';
import PropTypes from 'prop-types';

export default function Nav(props){
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">
                    <div className="text-center ostraka">
                        ostraka
                    </div>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={"nav-link" + props.isActive("Feed")} aria-current="Feed" onClick={props.onClick} id="Feed">my feed</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + props.isActive("Friends")} aria-current="Friends" onClick={props.onClick} id="Friends">my friends</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + props.isActive("Topics")} aria-current="Topics" onClick={props.onClick} id="Topics">my topics</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + props.isActive("Trending Topics")} aria-current="Trending Topics" onClick={props.onClick} id="Trending Topics">trending topics</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + props.isActive("Trending Users")} aria-current="Trending Users" onClick={props.onClick} id="Trending Users">trending users</a>
                        </li>
                    </ul>
                    <div className="nav-item">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                    <div className="nav-item dropdown navbar-nav" style={{paddingLeft: '1.5rem', paddingRight: '1.5rem'}}>
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            account
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" onClick={props.onClick} id="Profile">profile</a></li>
                            <li><a className="dropdown-item" onClick={props.onClick} id="Settings">settings</a></li>
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
    onClick: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired
}
