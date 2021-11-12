import React from 'react';
import PropTypes from 'prop-types';

const NotificationsNav = (props) => {
    if(props.alternativeMessage){
        return (
            <div className="nav-item dropdown navbar-nav" style={{paddingLeft: '1rem'}}>
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-bell"></i>
                </a>
                <ul className="dropdown-menu notificationsMenu" aria-labelledby="navbarDropdown">
                    <li>{props.alternativeMessage}</li>
                </ul>
            </div>
        )
    } else if(props.notifications.length < 1){
        return (
            <div className="nav-item navbar-nav" style={{paddingLeft: '1rem'}}>
                <a className="nav-link" id="Notifications" onClick={props.navOnClick} role="button" aria-expanded="false">
                    <i className="bi bi-bell"></i>
                </a>
            </div>
        )
    } else {
        return (
            <div className="nav-item dropdown navbar-nav" style={{paddingLeft: '1rem'}}>
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-bell">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                            {props.notifications.length}
                            <span className="visually-hidden">unread notifications</span>
                         </span>
                    </i>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{whiteSpace: "normal", overflowWrap: "word"}}>
                    <li><a id="Notifications" onClick={props.navOnClick} className="dropdown-item" style={{textAlign: "center"}}><i className="bi bi-bell" data-bs-toggle="tooltip" data-bs-placement="top" title="see all notifications"></i></a></li>
                    <li><hr className="dropdown-divider" /></li>
                    {props.notifications.map((notification, index) => {
                        const _handleNotificationClick = () => props.handleNotificationClick(notification);
                        return (
                            <li key={index}>
                                <a className="dropdown-item notificationsMenu" onClick={_handleNotificationClick}>{notification.subject}</a>
                            </li>
                        )
                    })}
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" style={{textAlign: "center"}}><i className="bi bi-book" onClick={props.markAllRead} data-bs-toggle="tooltip" data-bs-placement="top" title="mark all notifications as read"></i></a></li>
                </ul>
            </div>
        )
    }
};
NotificationsNav.propTyps = {
    navOnClick: PropTypes.func.isRequired,
    alternativeMessage: PropTypes.object,
    notifications: PropTypes.array.isRequired,
    handleNotificationClick: PropTypes.func.isRequired,
    markAllRead: PropTypes.func.isRequired
};
export default NotificationsNav;
