import React from 'react';
import PropTypes from 'prop-types';
import ReactTags from 'react-tag-autocomplete'
import _ from 'underscore';
import {tagSearchClasses} from '/imports/api/messaging/tagSearchClasses';
import {dateFormatter} from '/imports/api/util/dateFormatter';
import {ProfileTag, ProfileSuggestion} from '/imports/components/messaging/tagSearchComponents';
import {Empty} from '/imports/components/loadingStatus/loadingStatus';
import MessageContainer from '/imports/components/messaging/messageContainer';

const Inbox = (props) => {
    const selectedMessage = _.findWhere(props.messages, {_id: props.activeMessage});
    const addTag = (newTag) => {
        props.setToAddress([newTag]);
    };
    const removeTag = () => {
        if(!props.replyToActive) props.setToAddress([]);
    };
    const handleReply = () => {
        props.setReplyToActive(true);
        props.handleReplyBody();
    };
    const tagChooser = props.toAddress.length > 0 || props.replyToActive? (
        <>
            <label className="form-label">{props.replyToActive ? "reply to: " : "send message to: "}</label>
            <ProfileTag
                tag={props.replyToActive ? {id: selectedMessage.fromId, name: selectedMessage.fromTag} : props.toAddress[0]}
                removeButtonText={""}
                onDelete={removeTag}
                replyToActive={props.replyToActive}
            />
        </>
    ) : (
        <ReactTags
            placeholderText="send message to"
            tags={props.toAddress}
            suggestions={props.addressSuggestions}
            onAddition={(newTag) => addTag(newTag)}
            onDelete={(tagIndex) => removeTag(tagIndex)}
            onInput={(query) => props.userQuery(query)}
            classNames={tagSearchClasses}
            allowBackspace={false}
            tagComponent={ProfileTag}
            suggestionComponent={ProfileSuggestion}
        />
    );
    let inboxList;
    if(props.alternativeMessage){
        inboxList = props.alternativeMessage;
    } else if(props.messages.length < 1){
        inboxList = <Empty message="no messages found"/>;
    } else {
        inboxList = props.messages.map((message, index) => {
            return (
                <div key={index} className={message._id === props.activeMessage ? "row inboxListItem selected" : "row inboxListItem"} onClick={() => props.handleMessageClick(message)}>
                    <span className={message.read ? "inboxIndicatorFrom read" : "inboxIndicatorFrom"}>{message.fromTag}</span>
                    <span className={message.read ? "inboxDate read" : "inboxDate"}>{dateFormatter(message.createdAt)}</span>
                    <span className={message.read ? "inboxIndicatorSubject read" : "inboxIndicatorSubject"}>{message.subject}</span>
                </div>
            );
        });
    }
    const activeMessage = props.activeMessage && selectedMessage ? (
        <MessageContainer
            message={selectedMessage}
            navStack={props.navStack}
        />
    ) : (
        <Empty message="no message selected"/>
    );
    return (
        <>
            <div className="col-12 position-relative" style={{paddingBottom: "1rem", height: "3rem"}}>
                <div className="top-0 start-0 position-absolute">
                    <div className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="messaging settings" style={{marginRight: "1rem"}} onClick={props.onSettingsClick}><i className="bi bi-gear" style={{fontSize: "1rem"}}></i></div>
                    <div className="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="compose message" data-bs-toggle="modal" data-bs-target="#newMessageModal"><i className="bi bi-pencil-square" style={{fontSize: "1rem"}}></i></div>
                </div>
                <div className="top-0 end-0 position-absolute">
                    <div className={props.activeMessage ? "btn btn-primary" : "btn btn-primary disabled"} style={{marginRight: "1rem"}} data-bs-toggle="tooltip" data-bs-placement="top" title="reply to message" data-bs-toggle="modal" data-bs-target="#newMessageModal" onClick={handleReply}><i className="bi bi bi-reply" style={{fontSize: "1rem"}}></i></div>
                    <div className={props.activeMessage ? "btn btn-secondary" : "btn btn-secondary disabled"} data-bs-toggle="tooltip" data-bs-placement="top" title="delete message" onClick={props.handleMessageDelete}><i className="bi bi-trash" style={{fontSize: "1rem"}}></i></div>
                </div>
            </div>
            <div className="row">
                <div className="d-flex">
                    <div className="inboxComponent" style={{width: "30%", marginRight: "0.5rem"}}>
                        <div className="row inboxListItem" style={{paddingBottom: "1rem"}}>
                            <input className="form-control me-2" type="search" placeholder="search" aria-label="search" onChange={({target}) => props.inboxQuery(target.value)} />
                        </div>
                        <div style={{overflowY: "scroll"}}>
                            {inboxList}
                        </div>
                    </div>
                    <div className="vr"></div>
                    <div className="inboxComponent" style={{width: "70%", marginLeft: "0.5rem"}}>
                        {activeMessage}
                    </div>
                </div>
            </div>
            <div className="modal fade" id="newMessageModal" tabIndex="-1" aria-labelledby="newMessageModal_Label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newMessageModal_Label">message</h5>
                            <button type="button" className="btn-close dismissModal" onClick={props.handleSendReplyCancel} aria-label="Close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-12 composeElement text-danger" style={{textAlign: "center"}}>
                                {props.messageError}
                            </div>
                            <div className="col-12 composeElement">
                                {tagChooser}
                            </div>
                            <div className="col-12 form-floating composeElement">
                                <input type="text" className={props.replyToActive ? "form-control disabled" : "form-control"} placeholder="subject" value={props.replyToActive ? selectedMessage.subject : props.subject} onChange={({target}) => props.setSubject(target.value)}/>
                                <label className="form-label">subject</label>
                            </div>
                            <div className="col-12 form-floating composeElement">
                                <textarea className="form-control" placeholder="message" rows="10" style={{height: "100%"}} value={props.body} onChange={({target}) => props.setBody(target.value)}/>
                                <label className="form-label">message</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <span id="messageSuccessMessage" className="text-success" style={{paddingRight: "1rem", display: "none"}}>message sent!</span>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.handleSendReplyCancel}><i className="bi bi-x-lg"></i></button>
                            <button type="button" className="btn btn-primary" onClick={props.sendMessage}><i className="bi bi-envelope"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
Inbox.propTypes = {
    onSettingsClick: PropTypes.func.isRequired,
    userQuery: PropTypes.func.isRequired,
    addressSuggestions: PropTypes.array.isRequired,
    toAddress: PropTypes.array.isRequired,
    setToAddress: PropTypes.func.isRequired,
    subject: PropTypes.string.isRequired,
    setSubject: PropTypes.func.isRequired,
    body: PropTypes.string.isRequired,
    setBody: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    messageError: PropTypes.string.isRequired,
    activeMessage: PropTypes.string,
    replyToActive: PropTypes.bool.isRequired,
    setReplyToActive: PropTypes.func.isRequired,
    handleReplyBody: PropTypes.func.isRequired,
    handleMessageClick: PropTypes.func.isRequired,
    handleMessageDelete: PropTypes.func.isRequired,
    handleSendReplyCancel: PropTypes.func.isRequired,
    alternativeMessage: PropTypes.object,
    messages: PropTypes.array.isRequired,
    navStack: PropTypes.object.isRequired
};
export default Inbox;
