import React from 'react';
import PropTypes from 'prop-types';
import Logo from '/imports/components/nav/logo';

const SharedViewNav = (props) => {
    const handleClick = () => {
        props.navStack.back();
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" onClick={handleClick}>
                    <Logo />
                </a>
            </div>
        </nav>
    )
}
SharedViewNav.propTypes ={
    navStack: PropTypes.object.isRequired
};
export default SharedViewNav;
