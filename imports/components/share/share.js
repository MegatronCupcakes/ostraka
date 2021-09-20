import React from 'react';
import PropTypes from 'prop-types';
import PostView from '/imports/components/feed/postView';
import TopicViewComment from '/imports/components/comments/topicViewComment';
import UserIdentifierWithScore from '/imports/components/profile/userIdentifierWithScore';
import ShareSettingsContainer from '/imports/components/settings/shareSettingsContainer';
import {dismissModals} from '/imports/api/util/dismissModals';

const Share = (props) => {
    const modalId = "shareModal_" + props.sharedContent._id;
    const _shareCountClasses = props.displaySize ? "share_" + props.displaySize : "share";
    const _shareButtonClasses = "bi bi-box-arrow-up";
    const _disabledShareButtonClasses = _shareButtonClasses + " disabled";
    const _shareButton = !props.noninteractive && props.registeredUser ? (
        <span className={_shareCountClasses}>{props.shareCount} <i className={_shareButtonClasses} data-bs-toggle="modal" data-bs-target={"#" + modalId}></i></span>
    ) : (
        <span className={_shareCountClasses}>{props.shareCount} <i className={_disabledShareButtonClasses}></i></span>
    );
    let _preview;
    switch(props.sharedType){
        case "post":
            _preview = (
                <PostView
                    noninteractive={true}
                    displaySize={props.displaySize}
                    post={props.sharedContent}
                    navStack={props.navStack}
                />
            );
            break;
        case "comment":
            _preview = (
                <TopicViewComment
                    noninteractive={true}
                    comment={props.sharedContent}
                    viewSize={props.viewSize}
                    viewType={props.viewType}
                    navStack={props.navStack}
                />
            );
            break;
        case "tag":
            _preview = (
                <div className="tags justify-content-center">
                    <span className="tag shared">#{props.sharedContent.tag}</span>
                </div>
            );
            break;
        case "profile":
            _preview = (
                <div className="col-xs-12">
                    <UserIdentifierWithScore
                        noninteractive={true}
                        displaySize={props.displaySize}
                        user={props.sharedContent}
                        navStack={props.navStack}
                    />
                </div>
            );
            break;
    }
    return (
        <>
            {_shareButton}
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={modalId + "_Label"} aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={modalId + "_Label"}>share</h5>
                            <button type="button" className="btn-close dismissModal" onClick={props.handleCancel} aria-label="Close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {_preview}
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <textarea className="form-control" placeholder="share your thoughts..." aria-label="share something" onChange={props.handleCaptionChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12" style={{textAlign: "center", paddingTop: "1rem"}}>
                                    <ShareSettingsContainer />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.handleCancel}><i className="bi bi-x-lg"></i></button>
                            <button type="button" className="btn btn-primary" onClick={props.shareContent}><i className="bi bi-box-arrow-up"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
Share.propTypes = {
    sharedContent: PropTypes.object.isRequired,
    sharedType: PropTypes.string.isRequired,
    handleCaptionChange: PropTypes.func.isRequired,
    shareContent: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    shareCount: PropTypes.number,
    displaySize: PropTypes.string,
    noninteractive: PropTypes.bool,
    registeredUser: PropTypes.bool.isRequired,
    navStack: PropTypes.object.isRequired,
    viewSize: PropTypes.string,
    viewType: PropTypes.string
};
export default Share;
