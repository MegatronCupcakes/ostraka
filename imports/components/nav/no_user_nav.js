import React from 'react';
import PropTypes from 'prop-types';

export default function NoUserNav(props){
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
                            <a className={"nav-link" + props.isActive("Login")} aria-current="Login" onClick={props.onClick} id="Login">Login</a>
                        </li>
                        {/*
                        <li className="nav-item">
                            <a className={"nav-link" + props.isActive("Register")} aria-current="Register" onClick={props.onClick} id="Register">Register</a>
                        </li>
                        */}
                        <li className="nav-item">
                            <a className={"nav-link" + props.isActive("Recover")} aria-current="Recover" onClick={props.onClick} id="Recover">Recover</a>
                        </li>
                        {/*
                        <li className="nav-item">
                            <a className={"nav-link" + props.isActive("Verify")} aria-current="Verify" onClick={props.onClick} id="Verify">Verify</a>
                        </li>
                        */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
NoUserNav.propTypes = {
    isActive: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
}
