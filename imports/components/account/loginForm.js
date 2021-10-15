import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = (props) => {

    return (
        <div className="col-sm-12 col-md-6 offset-md-3 mb-3">
            <form>
                <div className="mb-3 text-danger" style={{textAlign: 'center'}}>
                    {props.error}
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="emailInput" aria-describedby="emailInputHelp" onChange={props.setEmail} placeholder="name@example.com"/>
                    <label className="form-label">email</label>
                    <div className="invalid-feedback">invalid email address</div>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="loginPasswordInput" aria-describedby="passwordInputHelp" onChange={props.setPassword} placeholder="password"/>
                    <label className="form-label">password</label>
                </div>
                <div className="mb-3" style={{textAlign: "right"}}>
                    <div className={props.buttonClasses} onClick={props.login} data-bs-toggle="tooltip" data-bs-placement="top" title="login"><i className="bi bi-door-open"></i></div>
                </div>
            </form>
            <div style={{textAlign: "center"}}>
                {/*
                <div>
                    <a onClick={props.setAccountActivity} id="Register">create account</a>
                </div>
                */}
                <div>
                    <a onClick={props.setAccountActivity} id="Recover">forgot password?</a>
                </div>
                {/*
                <div>
                    <a onClick={props.setAccountActivity} id="Verify">resend verification email</a>
                </div>
                */}
            </div>
        </div>
    )
};
LoginForm.propTypes = {
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setAccountActivity: PropTypes.func.isRequired,
    buttonClasses: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    error: PropTypes.string
};
export default LoginForm;
