import {Meteor} from 'meteor/meteor';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './loginForm';
import _ from 'underscore';
import {validateAccountForm} from '../../api/account/validateAccountForm'

const _enabled = "btn btn-primary col-auto";
const _disabled = _enabled + " disabled";

const LoginFormContainer = (props) => {
    const [buttonClasses, setbuttonClasses] = useState(_enabled);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    const handleEmail = ({target}) => {
        setEmail(target.value);
        validateField(target);
    };
    const handlePassword = ({target}) => {
        setPassword(target.value);
        validateField(target);
    };

    const validateField = (target) => {
        validateAccountForm[target.id]({
            email: email,
            password: password
        }, target);
    };

    const doLogin = () => {
        setbuttonClasses(_disabled);
        setError(null);
        _doLogin(email, password)
        .then(() => {
            console.log("I should be logged in.")
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setbuttonClasses(_enabled);
        });
    };

    return (
        <LoginForm
            setEmail={handleEmail}
            setPassword={handlePassword}
            setAccountActivity={({target}) => {props.setNoUserState(target.id)}}
            buttonClasses={buttonClasses}
            login={doLogin}
            error={error}
        />
    );
};
LoginFormContainer.propTypes = {
    noUserState: PropTypes.string.isRequired,
    setNoUserState: PropTypes.func.isRequired
};
export default LoginFormContainer;

const _doLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        Meteor.loginWithPassword(email, password, (error) => {
            if(error){
                reject(error);
            } else {
                resolve();
            }
        });
    });
}
