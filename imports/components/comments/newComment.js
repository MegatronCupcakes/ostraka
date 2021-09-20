import React from 'react';
import PropTypes from 'prop-types';
import TagsAndMentions from '/imports/api/post/tagsAndMentions';

import UserIdentifier from '../profile/userIdentifier';

const NewComment = (props) => {
    const modalId = "newCommentModal_" + props.parentId;
    const _commentButton = (props.parentId || !props.noninteractive) && props.registeredUser  ? (
        <span style={{paddingRight: "1rem"}}>{props.commentCount} <i className="bi bi-chat-square-quote" data-bs-toggle="modal" data-bs-target={"#" + modalId}></i></span>
    ) : (
        <span style={{paddingRight: "1rem"}}>{props.commentCount} <i className="bi bi-chat-square-quote"></i></span>
    );
    return (
        <>
            {_commentButton}
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={modalId + "_Label"} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={modalId + "_Label"}>comment</h5>
                            <button type="button" className="btn-close dismissModal" onClick={props.handleCancel} aria-label="Close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row justify-content-start" style={{paddingBottom: "1rem"}}>
                                <UserIdentifier
                                    postedBy={props.postedBy}
                                    postedById={props.postedById}
                                    postedByTag={props.postedByTag}
                                    postedByProfilePic={props.postedByProfilePic}
                                    navStack={props.navStack}
                                />
                            </div>
                            <div className="row">
                                <div style={{paddingBottom: "1rem", fontSize: "larger"}}>"{TagsAndMentions(props.parentText, props.tags, props.tagIds, props.mentions, props.mentionIds, props.navStack)}"</div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <textarea className="form-control" placeholder="share your thoughts..." aria-label="share something" onChange={props.onChange} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.deleteComment}><i className="bi bi-x-lg"></i></button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.publishComment}><i className="bi bi-pen"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
NewComment.propTypes = {
    parentId: PropTypes.string,
    parentText: PropTypes.string.isRequired,
    postedBy: PropTypes.string.isRequired,
    postedByTag: PropTypes.string.isRequired,
    postedById: PropTypes.string.isRequired,
    postedByProfilePic: PropTypes.string.isRequired,
    tags: PropTypes.array,
    tagIds: PropTypes.array,
    mentions: PropTypes.array,
    mentionIds: PropTypes.array,
    commentCount: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    publishComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    noninteractive: PropTypes.bool,
    registeredUser: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default NewComment;
