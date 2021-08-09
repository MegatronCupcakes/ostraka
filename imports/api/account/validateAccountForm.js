import { passwordStrength } from 'check-password-strength';

const passwordStrengthOptions = [
    {
        id: 0,
        value: "too weak",
        minDiversity: 0,
        minLength: 0
    },
    {
        id: 1,
        value: "weak",
        minDiversity: 2,
        minLength: 6
    },
    {
        id: 2,
        value: "good",
        minDiversity: 4,
        minLength: 8
    },
    {
        id: 3,
        value: "strong",
        minDiversity: 4,
        minLength: 10
    }
];

export const testPasswordStrength = (password) => {
    return passwordStrength(password, passwordStrengthOptions).value;
};

/*
only show validation when input is not null or zero length; this prevents showing
validation after a user deletes the input value (which is expected when a user enters
and invalid value)

validatations are used against target.value instead of the React state values because the state
always seems to be a step behind.

formData is an object holding the state for each form element.  This is really only useful when
the value currently undergoing validation must be validated against another form value (e.g. Confirm Password)
*/
export const validateAccountForm = {
    firstInput: (formData, target) => {
        let _valid = (target.value !== null && target.value.length > 0) ? target.value.length > 0 : null;
        _validationFeedback(_valid, target);
    },
    lastInput: (formData, target) => {
        let _valid = (target.value !== null && target.value.length > 0) ? target.value.length > 0 : null;
        _validationFeedback(_valid, target);
    },
    emailInput: (formData, target) => {
        let _valid = (target.value !== null && target.value.length > 0) ? _validateEmail(target.value) : null;
        _validationFeedback(_valid, target);
    },
    passwordInput: (formData, target) => {
        let _valid = (target.value !== null && target.value.length > 0) ? testPasswordStrength(target.value) !== 'too weak' : null;
        _validationFeedback(_valid, target);
    },
    confirmInput: ({password}, target) => {
        let _valid = (password !== null && target.value !== null && target.value.length > 0) ? password === target.value : null;
        _validationFeedback(_valid, target);
    },
    loginPasswordInput: (formData, target) => {
        // since the password already exists we don't need to validate its strength.
        let _valid = (target.value !== null && target.value.length > 0) ? target.value.length > 0 : null;
        _validationFeedback(_valid, target);
    }
}

const _validationFeedback = (valid, target) => {
    if(valid !== null){
        if(valid){
            target.classList.add("is-valid");
            target.classList.remove("is-invalid");
        } else {
            target.classList.add("is-invalid");
            target.classList.remove("is-valid");
        };
    } else {
        // if valid is null it means zero length input; don't show validation feedback.
        target.classList.remove("is-invalid");
        target.classList.remove("is-valid");
    }
}

const _validateEmail = (emailAddress) => {
    /*
    validation RegEx borrowed from:
    https://github.com/robertsheacole/validateEmail/blob/master/validateEmail.js
    */
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(String(emailAddress).toLowerCase())){
        return true;
    }
    return false;
}
