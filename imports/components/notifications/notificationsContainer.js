import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {NotificationsQuery} from '/imports/api/notifications/notificationsQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import MeteorCall from '/imports/api/util/callPromise';
import {isBad} from '/imports/api/util/isBad';
import {dateFormatter} from '/imports/api/util/dateFormatter';
import Notifications from '/imports/components/notifications/notifications';

const NotificationsContainer = (props) => {
    const [offset, setOffset] = useState(0);
    const [activeNotification, setActiveNotification] = useState(null);
    const {loading, error, data, fetchMore} = useQuery(NotificationsQuery, {variables: {offset: offset}, pollInterval: Meteor.settings.public.pollInterval});

    useEffect(() => {
        fetchMore({variables: {
            offset: offset
        }});
    }, [offset]);

    let alternativeMessage;
    if(loading){
        alternativeMessage = <Loading />;
    } else if(error){
        alternativeMessage = <Error />;
        console.log("ERROR:", error);
    } else if(data && data.getNotifications && data.getNotifications.notifications){
        if(data.getNotifications.length < 1){
            alternativeMessage = <Empty message="no notifications"/>;
        } else {
            alternativeMessage = null;
        }
    } else {
        alternativeMessage = <Empty message="oops, something went wrong :-("/>;
    }

    const handleNotificationClick = (notification) => {
        setActiveNotification(notification);
        MeteorCall('markNotificationsRead', false, notification._id)
        .catch((error) => console.log("ERROR marking notification read:", error));
    };

    const markAllRead = () => {
        MeteorCall('markNotificationsRead', true)
        .catch((error) => console.log("ERROR marking notification read:", error));
    };

    return (
        <Notifications
            alternativeMessage={alternativeMessage}
            notificationCount={data && data.getNotifications && data.getNotifications.count ? data.getNotifications.count : null}
            notificationPageSize={data && data.getNotifications && data.getNotifications.pageSize ? data.getNotifications.pageSize : null}
            notifications={data && data.getNotifications && data.getNotifications.notifications ? data.getNotifications.notifications : []}
            activeNotification={activeNotification}
            handleNotificationClick={handleNotificationClick}
            markAllRead={markAllRead}
            offset={offset}
            setOffset={setOffset}
        />
    );
};
NotificationsContainer.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default NotificationsContainer;
