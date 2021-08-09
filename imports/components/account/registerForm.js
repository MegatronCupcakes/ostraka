import React from 'react';
import PropTypes from 'prop-types';

const RegisterForm = (props) => {

    return (
        <div className="col-sm-12 col-md-6 offset-md-3 mb-3">
            <form className="">
                <div className="mb-3 text-danger" style={{textAlign: 'center'}}>
                    {props.error}
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="firstInput" aria-describedby="firstInputHelp" onChange={props.setFirst} placeholder="first name"/>
                    <label className="form-label">first name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="lastInput" aria-describedby="lastInputHelp" onChange={props.setLast} placeholder="last name"/>
                    <label className="form-label">last name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="emailInput" aria-describedby="emailInputHelp" onChange={props.setEmail} placeholder="email"/>
                    <label className="form-label">email</label>
                    <div className="invalid-feedback">invalid email address</div>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="passwordInput" aria-describedby="passwordInputHelp" onChange={props.setPassword} placeholder="password"/>
                    <label className="form-label">password</label>
                    <div className="valid-feedback">{props.passwordStrength}</div>
                    <div className="invalid-feedback">{props.passwordStrength}</div>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="confirmInput" aria-describedby="confirmInputHelp" onChange={props.setConfirm} placeholder="confirm password"/>
                    <label className="form-label">confirm password</label>
                    <div className="invalid-feedback">must match password</div>
                </div>

                <div className="mb-3" style={{textAlign: "right"}}>
                    <div className={props.buttonClasses} onClick={props.registerUser}>register <i className="bi bi-person-plus"></i></div>
                </div>
            </form>
            <div style={{textAlign: "center"}}>
                <div>
                    <a onClick={props.setAccountActivity} id="Login">login</a>
                </div>
                <div>
                    <a onClick={props.setAccountActivity} id="Recover">forgot password?</a>
                </div>
                <div>
                    <a onClick={props.setAccountActivity} id="Verify">resend verification email</a>
                </div>
            </div>
        </div>
    )
};
RegisterForm.propTypes = {
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setAccountActivity: PropTypes.func.isRequired,
    passwordStrength: PropTypes.string,
    buttonClasses: PropTypes.string.isRequired,
    error: PropTypes.string
};
export default RegisterForm;
