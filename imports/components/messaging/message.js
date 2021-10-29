import React from 'react';
import PropTypes from 'prop-types';
import {dateFormatter} from '/imports/api/util/dateFormatter';
import UserIdentifierWithScore from '/imports/components/profile/userIdentifierWithScore';

const Message = (props) => {
    return (
        <div>
            <UserIdentifierWithScore
                noninteractive={false}
                displaySize="small"
                user={props.fromUser}
                navStack={props.navStack}
            />
            <div className="messageViewDate">{dateFormatter(props.message.createdAt)}</div>
            <div className="messageViewSubject">{props.message.subject}</div>
            <div className="messageViewBody">{props.message.body}</div>
        </div>
    );
};
Message.propTypes = {
    fromUser: PropTypes.object,
    message: PropTypes.object.isRequired,
    navStack: PropTypes.object.isRequired
};
export default Message;
