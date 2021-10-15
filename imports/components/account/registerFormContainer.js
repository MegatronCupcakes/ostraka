import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base';

import RegisterForm from './registerForm';
import {validateAccountForm, testPasswordStrength} from '../../api/account/validateAccountForm'

const _enabled = "btn btn-primary col-auto";
const _disabled = _enabled + " disabled";

const RegisterFormContainer = (props) => {
    const [buttonClasses, setbuttonClasses] = useState(_enabled);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [first, setFirst] = useState(null);
    const [last, setLast] = useState(null);
    const [error, setError] = useState(null);

    const registerUser = () => {
        setbuttonClasses(_disabled);
        setError(null);
        _createUser(email, password, first, last)
        .then(() => {
            props.setNoUserState('Login');
        })
        .catch((_error) => {
            setError(_error.reason);
        })
        .finally(() => {
            setbuttonClasses(_enabled);
        });
    };
    const handleEmail = ({target}) => {
        setEmail(target.value);
        validateField(target);
    };
    const handleConfirm = ({target}) => {
        setConfirm(target.value);
        validateField(target);
    };
    const handleFirst = ({target}) => {
        setFirst(target.value);
        validateField(target);
    };
    const handleLast = ({target}) => {
        setLast(target.value);
        validateField(target);
    };
    const setAndTestPassword = ({target}) => {
        setPassword(target.value);
        setPasswordStrength(testPasswordStrength(target.value));
        validateField(target);
    }

    const validateField = (target) => {
        validateAccountForm[target.id]({
            first: first,
            last: last,
            email: email,
            password: password,
            confirm: confirm,
            passwordStrength: passwordStrength
        }, target);
    };

    return (
        <RegisterForm
            buttonClasses={buttonClasses}
            setEmail={handleEmail}
            setPassword={setAndTestPassword}
            passwordStrength={passwordStrength}
            setConfirm={handleConfirm}
            setFirst={handleFirst}
            setLast={handleLast}
            setAccountActivity={({target}) => {props.setNoUserState(target.id)}}
            registerUser={registerUser}
            error={error}
        />
    )
}
RegisterFormContainer.propTypes = {
    noUserState: PropTypes.string.isRequired,
    setNoUserState: PropTypes.func.isRequired
};
export default RegisterFormContainer;

const _createUser = (email, password, first, last) => {
    return new Promise((resolve, reject) => {
        Accounts.createUser({
            email: email,
            password: password,
            profile: {
                firstName: first,
                lastName: last,
                role: "user",
                status: "active",
                invitedBy: "",
                invited: {},
                followedUsers: {},
                followedTopics: {},
                reputationScore: null
            }
        }, (error) => {
            if(error){
                reject(error);
            } else {
                resolve();
            }
        });
    })
}
