import React from 'react';
import PropTypes from 'prop-types';
import UserIdentifierWithScore from '/imports/components/profile/userIdentifierWithScore';

const Ostracize = (props) => {
    const modalId = "ostracizeModal_" + props.user._id;
    const _ostracizeCountClasses = props.displaySize ? "userAction_" + props.displaySize : "userAction";
    const _ostracizeButtonClasses = "bi bi-person-x";
    const _disabledOstracizeButtonClasses = _ostracizeButtonClasses + " disabled";
    const _ostracizeButton = props.activeButton ? (
        <span className={_ostracizeCountClasses}>{props.ostracizeCount} <i className={_ostracizeButtonClasses} data-bs-toggle="modal" data-bs-target={"#" + modalId}></i></span>
    ) : (
        <span className={_ostracizeCountClasses}>{props.ostracizeCount} <i className={_disabledOstracizeButtonClasses}></i></span>
    );
    return (
        <>
            {_ostracizeButton}
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={modalId + "_Label"} aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={modalId + "_Label"}>ostracize</h5>
                            <button type="button" className="btn-close dismissModal" onClick={props.handleCancel} aria-label="Close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-xs-12">
                                    <UserIdentifierWithScore
                                        noninteractive={true}
                                        user={props.user}
                                        displaySize={props.displaySize}
                                        navStack={props.navStack}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <p>
                                        Voting to ostracize another member is a serioius action.  Are you sure you want to vote to ostracize {props.user.profile.firstName} {props.user.profile.lastName}?
                                    </p>
                                    <p style={{textAlign: "center"}}>
                                        <span style={{fontWeight: "bold"}}>This action cannot be undone and will count againt your reputation score.</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.handleCancel}><i className="bi bi-x-lg"></i></button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.ostracizeUser}><i className="bi bi-person-x"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
Ostracize.propTypes = {
    user: PropTypes.object.isRequired,
    activeButton: PropTypes.bool.isRequired,
    ostracizeUser: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    ostracizeCount: PropTypes.number,
    displaySize: PropTypes.string,
    noninteractive: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default Ostracize;
