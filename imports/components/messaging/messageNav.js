import React from 'react';
import PropTypes from 'prop-types';

const MessageNav = (props) => {
    let nav;
    const messages = props.messages.map((message, index) => {
        return (
            <li key={index} className="inboxIndicatorMessage">
                <a className="dropdown-item" onClick={() => props.messageOnClick(message._id)}>
                    <span className="inboxIndicatorFrom" data-bs-toggle="tooltip" data-bs-placement="top" title={`@${message.fromTag}`}>{message.fromTag}</span><br />
                    <span className="inboxIndicatorSubject" data-bs-toggle="tooltip" data-bs-placement="top" title={message.subject}>{message.subject}</span>
                </a>
            </li>
        );
    });
    if(props.alternativeMessage){
        nav = (
            <div className="nav-item dropdown navbar-nav" style={{paddingLeft: '1rem'}}>
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-envelope"></i>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>{props.alternativeMessage}</li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" id="Inbox" style={{textAlign: "center"}} onClick={props.navOnClick}><i className="bi bi-inbox" onClick={props.navOnClick}></i></a></li>
                </ul>
            </div>
        );
    } else if(messages.length < 1){
        nav = (
            <div className="nav-item navbar-nav" style={{paddingLeft: '1rem'}}>
                <i className="bi bi-envelope" id="Inbox" onClick={props.navOnClick}></i>
            </div>
        );
    } else {
        nav = (
            <div className="nav-item dropdown navbar-nav" style={{paddingLeft: '1rem'}}>
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-envelope">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                            {messages.length}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    </i>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" id="Inbox" style={{textAlign: "center"}} onClick={props.navOnClick}><i className="bi bi-inbox" onClick={props.navOnClick} data-bs-toggle="tooltip" data-bs-placement="top" title="inbox"></i></a></li>
                    <li><hr className="dropdown-divider" /></li>
                    {messages}
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" style={{textAlign: "center"}} onClick={props.clearMessageNotifications}><i className="bi bi-book" onClick={props.clearMessageNotifications} data-bs-toggle="tooltip" data-bs-placement="top" title="mark all messages as read"></i></a></li>
                </ul>
            </div>
        );
    }
    return nav;
};
MessageNav.propTypes = {
    messages: PropTypes.array,
    alternativeMessage: PropTypes.object,
    messageOnClick: PropTypes.func.isRequired,
    clearMessageNotifications: PropTypes.func.isRequired
};
export default MessageNav;
