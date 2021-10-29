import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import MeteorCall from '/imports/api/util/callPromise';
import {MessageIndicatorQuery} from '/imports/api/messaging/messageQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import MessageNav from '/imports/components/messaging/messageNav';

const MessageNavContainer = (props) => {
    const {loading, error, data} = useQuery(MessageIndicatorQuery, {pollInterval: 1000});
    let alternativeMessage;
    if(loading){
        alternativeMessage = <Loading />;
    } else if(error){
        alternativeMessage = <Error />;
        console.log("ERROR:", error);
    } else if(data && data.getMessagesIndicator){
        alternativeMessage = null;
    } else {
        alternativeMessage = <Empty message="oops, something went wrong :-("/>;
    }
    const handleClearMessageNotifications = async () => {
        await MeteorCall('clearMessageNotifications')
        .catch((error) => {
            console.log("error clearing message notifications:", error);
        });
    };
    return (
        <MessageNav
            navOnClick={props.navOnClick}
            messages={data && data.getMessagesIndicator ? data.getMessagesIndicator : []}
            alternativeMessage={alternativeMessage}
            messageOnClick={props.messageOnClick}
            clearMessageNotifications={handleClearMessageNotifications}
        />
    );
};
MessageNavContainer.propTypes = {
    navOnClick: PropTypes.func.isRequired,
    messageOnClick: PropTypes.func.isRequired
};
export default MessageNavContainer;
