import {Meteor} from 'meteor/meteor';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './loginForm';
import _ from 'underscore';
import {useTracker} from 'meteor/react-meteor-data';
import {validateAccountForm} from '../../api/account/validateAccountForm'
import {Loading} from '/imports/components/loadingStatus/loadingStatus';

const _enabled = "btn btn-primary col-auto";
const _disabled = _enabled + " disabled";

const LoginFormContainer = (props) => {
    const loggingIn = useTracker(() => Meteor.loggingIn(), []);
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

    const doLogin = async () => {
        setbuttonClasses(_disabled);
        setError(null);
        Meteor.loginWithPassword(email, password, (error) => {
            if(error){
                if(error.error == 403){
                    setError("incorrect email or password");
                } else {
                    setError("oops, looks like something went wrong...");
                }
                setbuttonClasses(_enabled);
            }
        });
    };
    let activity;
    if(loggingIn){
        activity = (
            <Loading />
        )
    } else {
        activity = (
            <LoginForm
                setEmail={handleEmail}
                setPassword={handlePassword}
                setAccountActivity={({target}) => {props.setNoUserState(target.id)}}
                buttonClasses={buttonClasses}
                login={doLogin}
                error={error}
            />
        );
    }
    return activity;
};
LoginFormContainer.propTypes = {
    noUserState: PropTypes.string.isRequired,
    setNoUserState: PropTypes.func.isRequired
};
export default LoginFormContainer;
