import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {MessageQuery} from '/imports/api/messaging/messageQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import MeteorCall from '/imports/api/util/callPromise';
import {isBad} from '/imports/api/util/isBad';
import {dateFormatter} from '/imports/api/util/dateFormatter';
import {dismissModals} from '/imports/api/util/dismissModals';
import Inbox from '/imports/components/messaging/inbox';

const InboxContainer = (props) => {
    // new message state
    const [addressSuggestions, setAddressSuggestions] = useState([]);
    const [toAddress, setToAddress] = useState([]);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [messageError, setMessageError] = useState('');
    // active message state
    const [activeMessage, setActiveMessage] = useState(props.navStack.current.viewContent ? props.navStack.current.viewContent : null);
    // reply state
    const [replyToActive, setReplyToActive] = useState(false);
    // inbox query state
    const [inboxQueryString, setInboxQueryString] = useState(null);

    const {loading, error, data} = useQuery(MessageQuery, {variables: {query: inboxQueryString}, pollInterval: 1000});

    const onSettingsClick = () => {
        props.navStack.update({navState: 'Settings', viewContent: 'messaging', activeTag: null});
    };

    const inboxQuery = _.debounce((query) => {
        setActiveMessage(null);
        setReplyToActive(false);
        setInboxQueryString(isBad(query) || !_.isString(query) ? null : query);
    }, 500);

    const userQuery = _.debounce((query, type) => {
        MeteorCall('messageToLookup', query)
        .catch((error) => {
            console.log("PROFILE TAG QUERY ERROR:", error);
        })
        .then((_profiles) => {
            const profiles = _profiles.map((_profile, index) => {
                return {id: _profile._id, name: _profile.profile.profileTag};
            });
            setAddressSuggestions(profiles);
        });
    }, 500);
    const sendMessage = () => {
        setMessageError('');
        MeteorCall('sendMessage', {
            toId: toAddress[0].id,
            subject: subject,
            body: body
        })
        .then((response) => {
            setAddressSuggestions([]);
            setToAddress([]);
            setSubject('');
            setBody('');
            setMessageError('');
            const successMessage = document.getElementById('messageSuccessMessage');
            successMessage.style.display = "inline";
            _.delay(() => {
                successMessage.style.display = "none";
                dismissModals();
            }, 3000);
        })
        .catch((error) => {
            setMessageError(error.reason);
        });
    };
    const handleReplyBody = () => {
        const selectedMessage = _.findWhere(data.getMessages, {_id: activeMessage});
        setBody(`\n\n\n\n${dateFormatter(selectedMessage.createdAt)} @${selectedMessage.fromTag} said "${selectedMessage.body}"`);
    };
    const handleSendReplyCancel = () => {
        setAddressSuggestions([]);
        setToAddress([]);
        setSubject('');
        setBody('');
        setMessageError('');
        setReplyToActive(false);
    };
    const handleMessageClick = async (message) => {
        setActiveMessage(message._id);
        props.navStack.setViewContent(message._id);
        if(!message.read){
            await MeteorCall('markMessageAsRead', message._id)
            .catch((error) => {
                console.log("error marking message as read:", error);
            });
        }
    };
    const handleMessageDelete = async () => {
        await MeteorCall('markMessageAsDeleted', activeMessage)
        .catch((error) => {
            console.log("error marking message as read:", error);
        });
        setActiveMessage(null);
    };

    let alternativeMessage;
    if(loading){
        alternativeMessage = <Loading />;
    } else if(error){
        alternativeMessage = <Error />;
        console.log("ERROR:", error);
    } else if(data && data.getMessages){
        alternativeMessage = null;
    } else {
        alternativeMessage = <Empty message="oops, something went wrong :-("/>;
    }

    return (
        <Inbox
            onSettingsClick={onSettingsClick}
            userQuery={userQuery}
            inboxQuery={inboxQuery}
            addressSuggestions={addressSuggestions}
            toAddress={toAddress}
            setToAddress={setToAddress}
            subject={subject}
            setSubject={setSubject}
            body={body}
            setBody={setBody}
            sendMessage={sendMessage}
            messageError={messageError}
            activeMessage={activeMessage}
            replyToActive={replyToActive}
            handleReplyBody={handleReplyBody}
            setReplyToActive={setReplyToActive}
            handleMessageClick={handleMessageClick}
            handleMessageDelete={handleMessageDelete}
            handleSendReplyCancel={handleSendReplyCancel}
            alternativeMessage={alternativeMessage}
            messages={data && data.getMessages ? data.getMessages : []}
            navStack={props.navStack}
        />
    );
};
InboxContainer.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default InboxContainer;
