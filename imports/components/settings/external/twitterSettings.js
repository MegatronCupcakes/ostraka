import React, {useState} from 'react';
import PropTypes from 'prop-types';

const TwitterSettings = (props) => {
    return (
        <div>
            <img src="/images/sign-in-with-twitter-gray.png.twimg.2560.png"  data-bs-toggle="modal" data-bs-target="#twitterSettingsModal" />
            <div className="modal fade" id="twitterSettingsModal" tabIndex="-1" aria-labelledby="twitterSettingsModal_Label" aria-hidden="true">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="twitterSettingsModal_Label" style={{color: "black"}}>link your Twitter account</h5>
                            <button type="button" className="btn-close dismissModal" onClick={props.handleCancel} aria-label="Close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="emailInput" aria-describedby="emailInputHelp" onChange={props.setEmail} placeholder="name@example.com"/>
                                <label className="form-label">email</label>
                                <div className="invalid-feedback">invalid email address</div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="loginPasswordInput" aria-describedby="passwordInputHelp" onChange={props.setPassword} placeholder="password"/>
                                <label className="form-label">password</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.handleCancel}><i className="bi bi-x-lg"></i></button>
                            <button type="button" className="btn btn-primary" onClick={props.twitterLogin}><i className="bi bi-twitter"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
TwitterSettings.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    twitterLogin: PropTypes.func.isRequired
};
export default TwitterSettings;
