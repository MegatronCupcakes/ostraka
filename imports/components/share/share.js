import React from 'react';
import PropTypes from 'prop-types';
import PostView from '/imports/components/feed/postView';
import ShareSettings from '/imports/components/settings/shareSettings'; // view only; update when shareSettingsContainer is ready.

const Share = (props) => {
    const modalId = "shareModal_" + props.post._id;
    const _shareButton = !props.postPreview && props.registeredUser ? (
        <span style={{paddingRight: "1rem"}}><i className="bi bi-box-arrow-up" data-bs-toggle="modal" data-bs-target={"#" + modalId}></i> {props.shareCount}</span>
    ) : (
        <span style={{paddingRight: "1rem"}}><i className="bi bi-box-arrow-up"></i> {props.shareCount}</span>
    );
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
                                <PostView
                                    postPreview={true}
                                    viewSize={props.viewSize}
                                    post={props.post}
                                    navStack={props.navStack}
                                />
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <textarea className="form-control" placeholder="share your thoughts..." aria-label="share something" onChange={props.onChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12" style={{textAlign: "center", paddingTop: "1rem"}}>
                                    <ShareSettings />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.handleCancel}><i className="bi bi-trash"></i></button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.shareContent}><i className="bi bi-box-arrow-up"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
Share.propTypes = {
    post: PropTypes.object.isRequired,
    shareContent: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    shareCount: PropTypes.number,
    viewSize: PropTypes.string,
    postPreview: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default Share;
