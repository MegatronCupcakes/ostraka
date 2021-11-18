import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {NotificationsIndicatorQuery} from '/imports/api/notifications/notificationsQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import MeteorCall from '/imports/api/util/callPromise';
import {isBad} from '/imports/api/util/isBad';
import {dateFormatter} from '/imports/api/util/dateFormatter';
import NotificationsNav from '/imports/components/notifications/notificationsNav';

const NotificationsNavContainer = (props) => {
    const {loading, error, data} = useQuery(NotificationsIndicatorQuery, {pollInterval: 1000});
    let alternativeMessage;
    if(loading){
        alternativeMessage = <Loading />;
    } else if(error){
        alternativeMessage = <Error />;
        console.log("ERROR:", error);
    } else if(data && data.getNotificationsForIndicator){
        alternativeMessage = null;
    } else {
        alternativeMessage = <Empty message="oops, something went wrong :-("/>;
    }

    const handleNotificationClick = (notification) => {
        // spread operator prevents us from attempting to update an immutable
        // object (instead we're creating a new one based on its properties/values)
        props.navStack.update({...notification.navTo});
        // Mark notification as read.
        MeteorCall('markNotificationsRead', false, notification._id)
        .catch((error) => console.log("ERROR marking notification read:", error));
    };

    const markAllRead = () => {
        MeteorCall('markNotificationsRead', true)
        .catch((error) => console.log("ERROR marking notification read:", error));
    };

    return (
        <NotificationsNav
            navOnClick={props.navOnClick}
            alternativeMessage={alternativeMessage}
            notificationCount={data && data.getNotificationsForIndicator && data.getNotificationsForIndicator.count ? data.getNotificationsForIndicator.count : null}
            notifications={data && data.getNotificationsForIndicator && data.getNotificationsForIndicator.notifications ? data.getNotificationsForIndicator.notifications : []}
            handleNotificationClick={handleNotificationClick}
            markAllRead={markAllRead}
        />
    );
};
NotificationsNavContainer.propTypes = {
    navOnClick: PropTypes.func.isRequired,
    navStack: PropTypes.object.isRequired
};
export default NotificationsNavContainer;
