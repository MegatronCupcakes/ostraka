import React from 'react';
import PropTypes from 'prop-types';
import {dismissModals} from '/imports/api/util/dismissModals';
import PostView from '/imports/components/feed/postView';
import TopicViewComment from '/imports/components/comments/topicViewComment';
import UserIdentifierWithScore from '/imports/components/profile/userIdentifierWithScore';
import ShareSettingsContainer from '/imports/components/settings/shareSettingsContainer';
import ShareResult from '/imports/components/share/shareResult';

const Share = (props) => {
    const modalId = "shareModal_" + props.sharedContent._id;
    const _shareButtonClasses = "bi bi-box-arrow-up";
    const _disabledShareButtonClasses = _shareButtonClasses + " disabled";
    const _shareButton = !props.noninteractive && props.registeredUser ? (
        <span className={props.viewSize ? `userAction ${props.viewSize}` : "userAction"}>{props.shareCount} <i className={_shareButtonClasses} data-bs-toggle="tooltip" data-bs-placement="top" title="share" data-bs-toggle="modal" data-bs-target={"#" + modalId}></i></span>
    ) : (
        <span className={props.viewSize ? `userAction ${props.viewSize}` : "userAction"}>{props.shareCount} <i className={_disabledShareButtonClasses} data-bs-toggle="tooltip" data-bs-placement="top" title="share"></i></span>
    );
    let _preview;
    switch(props.sharedType){
        case "post":
            _preview = (
                <div className="col-xs-12">
                    <PostView
                        noninteractive={true}
                        viewSize="small"
                        post={props.sharedContent}
                        navStack={props.navStack}
                    />
                </div>
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
                        viewSize={props.viewSize}
                        user={props.sharedContent}
                        navStack={props.navStack}
                    />
                </div>
            );
            break;
    }
    const _resultsView = props.shareResults.map((_result, _index) => {
        return (
            <ShareResult
                key={_index}
                result={_result}
                navStack={props.navStack}
            />
        );
    });
    return (
        <>
            {_shareButton}
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={modalId + "_Label"} aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={modalId + "_Label"} style={{color: "black"}}>share</h5>
                            <button type="button" className="btn-close dismissModal" onClick={props.handleCancel} aria-label="Close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {_preview}
                            </div>
                            <div className="row">
                                <div className="col-xs-12" style={{paddingTop: "1rem"}}>
                                    <textarea className="form-control" placeholder="share your thoughts..." aria-label="share something" onChange={props.handleCaptionChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12" style={{textAlign: "center", paddingTop: "1rem", marginTop: "1rem", color: "black"}}>
                                    <ShareSettingsContainer
                                        setShareEnabled={props.setShareEnabled}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12" style={{paddingTop: "1rem", color: "black"}}>
                                    {_resultsView}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.handleCancel}><i className="bi bi-x-lg"></i></button>
                            <button type="button" className={(!props.shareEnabled || props.shareResults.length > 0) ? "btn btn-primary disabled" : "btn btn-primary"} onClick={props.shareContent}><i className="bi bi-box-arrow-up"></i></button>
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
    shareResults: PropTypes.array.isRequired,
    noninteractive: PropTypes.bool,
    registeredUser: PropTypes.bool.isRequired,
    navStack: PropTypes.object.isRequired,
    viewType: PropTypes.string,
    viewSize: PropTypes.string,

    shareEnabled: PropTypes.bool.isRequired,
    setShareEnabled: PropTypes.func.isRequired
};
export default Share;
