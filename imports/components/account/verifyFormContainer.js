import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MeteorCall from '../../api/util/callPromise';

import VerifyForm from './verifyForm';
import {validateAccountForm} from '../../api/account/validateAccountForm'

const _enabled = "btn btn-primary col-auto";
const _disabled = _enabled + " disabled";

const VerifyFormContainer = (props) => {
    const [buttonClasses, setbuttonClasses] = useState(_enabled);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState(null);
    const handleEmail = ({target}) => {
        setEmail(target.value);
        validateField(target);
    };
    const validateField = (target) => {
        validateAccountForm[target.id]({
            email: email
        }, target);
    };
    const sendVerification = () => {
        setbuttonClasses(_disabled);
        setError(null);
        setMessage(null);
        MeteorCall('verifyUser', email)
        .then(() => {
            setMessage("verification email sent to " + email);
        })
        .catch((_error) => {
            setError(_error.reason);
        })
        .finally(() => {
            setbuttonClasses(_enabled);
        });
    };

    return (
        <VerifyForm
            setAccountActivity={props.setNoUserState}
            sendVerification={sendVerification}
            setEmail={handleEmail}
            buttonClasses={buttonClasses}
            error={error}
            message={message}
        />
    );
};
VerifyFormContainer.propTypes = {
    noUserState: PropTypes.string.isRequired,
    setNoUserState: PropTypes.func.isRequired
};
export default VerifyFormContainer;
