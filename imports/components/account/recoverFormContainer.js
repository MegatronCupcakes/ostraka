import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import MeteorCall from '../../api/util/callPromise';

import RecoverForm from './recoverForm';
import {validateAccountForm} from '../../api/account/validateAccountForm';

const _enabled = "btn btn-primary col-auto";
const _disabled = _enabled + " disabled";

const RecoverFormContainer = (props) => {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState(null);
    const [buttonClasses, setbuttonClasses] = useState(_enabled);

    const handleEmail = ({target}) => {
        setEmail(target.value);
        validateField(target);
    };
    const validateField = (target) => {
        validateAccountForm[target.id]({
            email: email
        }, target);
    };
    const handleRecovery = () => {
        setbuttonClasses(_disabled);
        setError(null);
        setMessage(null);
        MeteorCall('recoverUser', email)
        .then(() => {
            setMessage("recovery email sent to " + email);
        })
        .catch((_error) => {
            setError(_error.reason);
        })
        .finally(() => {
            setbuttonClasses(_enabled);
        });
    };
    return (
        <RecoverForm
            setNoUserState={({target}) => {props.setNoUserState(target.id)}}
            buttonClasses={buttonClasses}
            setEmail={handleEmail}
            recover={handleRecovery}
            error={error}
            message={message}
        />
    );
};
RecoverFormContainer.propTypes = {
    noUserState: PropTypes.string.isRequired,
    setNoUserState: PropTypes.func.isRequired
};
export default RecoverFormContainer;
