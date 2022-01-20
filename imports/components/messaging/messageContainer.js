import React from 'react';
import PropTypes from 'prop-types';
import Message from '/imports/components/messaging/message';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import Profile from '/imports/components/profile/profile';
import ProfileQuery from '/imports/api/profile/profileQuery';

const MessageContainer = (props) => {
    const {loading, error, data} = useQuery(ProfileQuery, {variables: {_id: props.message.fromId}, pollInterval: Meteor.settings.public.pollInterval});
    let content;
    if(loading){
        content = <Loading />
    } else if(error){
        content = <Error />
        console.log("ERROR:", error);
    } else if(data && data.getProfile){
        content = (
            <Message
                fromUser={data.getProfile}
                message={props.message}
                navStack={props.navStack}
            />
        );
    }else {
        content = <Empty message="oops, something went wrong :-("/>;
    }
    return content;
};
MessageContainer.propTypes = {
    message: PropTypes.object.isRequired,
    navStack: PropTypes.object.isRequired
};
export default MessageContainer;
