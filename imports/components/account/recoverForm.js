import React from 'react';
import PropTypes from 'prop-types';

const RecoverForm = (props) => {
    return (
        <div className="col-sm-12 col-md-6 offset-md-3 mb-3">
            <form>
                <div className="mb-3 text-danger" style={{textAlign: 'center'}}>
                    {props.error}
                </div>
                <div className="mb-3 text-success" style={{textAlign: 'center'}}>
                    {props.message}
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="emailInput" aria-describedby="emailInputHelp" onChange={props.setEmail} placeholder="recovery email"/>
                    <label className="form-label">recovery email</label>
                    <div className="invalid-feedback">invalid email address</div>
                </div>
                <div className="mb-3" style={{textAlign: "right"}}>
                    <div className={props.buttonClasses} onClick={props.recover} data-bs-toggle="tooltip" data-bs-placement="top" title="recover account"><i className="bi bi-life-preserver"></i></div>
                </div>
            </form>
            <div style={{textAlign: "center"}}>
                {/*
                <div>
                    <a onClick={props.setNoUserState} id="Register">create account</a>
                </div>
                */}
                <div>
                    <a onClick={props.setNoUserState} id="Login">remember your password? login now</a>
                </div>
                {/*
                <div>
                    <a onClick={props.setNoUserState} id="Verify">resend verification email</a>
                </div>
                */}
            </div>
        </div>
    );
};
RecoverForm.propTypes = {
    setNoUserState: PropTypes.func.isRequired,
    buttonClasses: PropTypes.string.isRequired,
    recover: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    error: PropTypes.string,
    message: PropTypes.string
};
export default RecoverForm;
