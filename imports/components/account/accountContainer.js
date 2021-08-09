import React, {useState} from 'react';
import PropTypes from 'prop-types';
import LoginFormContainer from './loginFormContainer';
import RegisterFormContainer from './registerFormContainer';
import RecoverFormContainer from './recoverFormContainer';
import VerifyFormContainer from './verifyFormContainer';

const AccountContainer = (props) => {
    switch(props.noUserState){
        case 'Login':
            return (
                <LoginFormContainer
                    noUserState={props.noUserState}
                    setNoUserState={props.setNoUserState}
                />
            );
        case 'Register':
            return (
                <RegisterFormContainer
                    noUserState={props.noUserState}
                    setNoUserState={props.setNoUserState}
                />
            );
        case 'Recover':
            return (
                <RecoverFormContainer
                    noUserState={props.noUserState}
                    setNoUserState={props.setNoUserState}
                />
            );
        case 'Verify':
            return (
                <VerifyFormContainer
                    noUserState={props.noUserState}
                    setNoUserState={props.setNoUserState}
                />
            );
    };
};
AccountContainer.propTypes = {
    noUserState: PropTypes.string.isRequired,
    setNoUserState: PropTypes.func.isRequired
};
export default AccountContainer;
