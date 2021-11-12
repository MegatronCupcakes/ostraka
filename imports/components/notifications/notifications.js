import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {Empty} from '/imports/components/loadingStatus/loadingStatus';

const Notifications = (props) => {
    let notificationList;
    if(props.alternativeMessage){
        notificationList = props.alternativeMessage;
    } else if(props.notifications.length < 1){
        notificationList = <Empty message="no notifications found"/>;
    } else {
        notificationList = props.notifications.map((notification, index) => {
            return (
                <div key={index} className={notification === props.activeNotification ? "row inboxListItem selected" : "row inboxListItem"} onClick={() => props.handleNotificationClick(notification)}>
                    <span className={notification.read ? "inboxIndicatorSubject read" : "inboxIndicatorSubject"}>{notification.subject}</span>
                </div>
            );
        });
    }
    const activeNotification = props.activeNotification ? (
        <tr>
            <td>
                {props.activeNotification.body}
            </td>
            <td>
                <span className="notificationGoTo">
                    <i className="bi bi-arrow-right" data-bs-toggle="tooltip" data-bs-placement="top" title="go" style={{paddingLeft: "1rem"}}></i>
                </span>
            </td>
        </tr>
    ) : (
        <tr>
            <Empty message="no notification selected"/>
        </tr>
    );
    return (
        <>
            <div className="col-12 position-relative" style={{paddingBottom: "1rem", height: "3rem"}}>
                <div className="top-0 start-0 position-absolute">
                    <div className={_.some(props.notifications, (notification) => {return !notification.read}) ? "btn btn-primary" : "btn btn-primary disabled"} onClick={props.markAllRead} data-bs-toggle="tooltip" data-bs-placement="top" title="mark all notifications as read"><i className="bi bi-book" style={{fontSize: "1rem"}}></i></div>
                </div>
            </div>
            <div className="row" style={{marginTop: "1rem"}}>
                <div className="d-flex">
                    <div className="inboxComponent" style={{width: "30%", marginRight: "0.5rem"}}>
                        <div style={{overflowY: "auto"}}>
                            {notificationList}
                        </div>
                    </div>
                    <div className="vr"></div>
                    <div className="inboxComponent" style={{width: "70%", marginLeft: "0.5rem"}}>
                        <table>
                            {activeNotification}
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
Notifications.propTypes = {
    alternativeMessage: PropTypes.object,
    notifications: PropTypes.array.isRequired,
    activeNotification: PropTypes.object,
    handleNotificationClick: PropTypes.func.isRequired,
    markAllRead: PropTypes.func.isRequired
};
export default Notifications;
