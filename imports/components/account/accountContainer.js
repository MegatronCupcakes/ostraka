import React, {useState} from 'react';
import PropTypes from 'prop-types';
import LoginFormContainer from './loginFormContainer';
import RegisterFormContainer from './registerFormContainer';
import RecoverFormContainer from './recoverFormContainer';
import VerifyFormContainer from './verifyFormContainer';

const AccountContainer = (props) => {
    let activity;
    switch(props.noUserState){
        case 'Login':
            activity = (
                <LoginFormContainer
                    noUserState={props.noUserState}
                    setNoUserState={props.setNoUserState}
                />
            );
            break;
        case 'Register':
            activity = (
                <RegisterFormContainer
                    noUserState={props.noUserState}
                    setNoUserState={props.setNoUserState}
                />
            );
            break;
        case 'Recover':
            activity = (
                <RecoverFormContainer
                    noUserState={props.noUserState}
                    setNoUserState={props.setNoUserState}
                />
            );
            break;
        case 'Verify':
            activity = (
                <VerifyFormContainer
                    noUserState={props.noUserState}
                    setNoUserState={props.setNoUserState}
                />
            );
            break;
    };
    return activity;
};
AccountContainer.propTypes = {
    noUserState: PropTypes.string.isRequired,
    setNoUserState: PropTypes.func.isRequired
};
export default AccountContainer;
