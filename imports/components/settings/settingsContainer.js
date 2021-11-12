import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import MeteorCall from '/imports/api/util/callPromise';
import {validateAccountForm, testPasswordStrength} from '/imports/api/account/validateAccountForm'
import {isBad} from '/imports/api/util/isBad';
import {getSettings} from '/imports/api/settings/getSettings';
import Settings from '/imports/components/settings/settings';

const SettingsContainer = (props) => {
    const userSettings = getSettings();
    const user = Meteor.user({fields: {profile:1, emails:1}});
    const [activeMenu, setActiveMenu] = useState(isBad(props.navStack.current.viewContent) ? "profile" : props.navStack.current.viewContent); // profile, password, email, messaging, sharing, notifications
    //profile
    const [first, setFirst] = useState(user.profile.firstName);
    const [last, setLast] = useState(user.profile.lastName);
    const [location, setLocation] = useState(user.profile.location ? user.profile.location : "");
    const [profileError, setProfileError] = useState(null);
    const [profileButtonEnabled, setProfileButtonEnabled] = useState(false);
    const [profileValidity, setProfileValidity] = useState({
        first: user.profile.firstName ? true : false,
        last: user.profile.lastName ? true : false,
        location: user.profile.location ? true : false
    });
    //email
    const [email, setEmail] = useState(user.emails[0].address);
    const [emailError, setEmailError] = useState(null);
    const [emailButtonEnabled, setEmailButtonEnabled] = useState(false);
    const [emailValidity, setEmailValidity] = useState({
        email: user.emails[0].address ? true : false
    });
    //password
    const [passwordStrength, setPasswordStrength] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const [passwordButtonEnabled, setPasswordButtonEnabled] = useState(false);
    const [passwordValidity, setPasswordValidity] = useState({
        currentPassword: false,
        newPassword: false,
        confirm: false
    });

    const buttonEnabled = (fieldValidity) => {
        return _.every(_.keys(fieldValidity).map((key) => {return fieldValidity[key]}));
    };

    const handle = {
        first: ({target}) => {
            setFirst(target.value);
            setProfileValidity({...profileValidity, first: validateField(target)});
            setProfileButtonEnabled(buttonEnabled({...profileValidity, first: validateField(target)}));
        },
        last: ({target}) => {
            setLast(target.value);
            setProfileValidity({...profileValidity, last: validateField(target)});
            setProfileButtonEnabled(buttonEnabled({...profileValidity, last: validateField(target)}));
        },
        location: ({target}) => {
            setProfileButtonEnabled(setLocation(target.value));
            setProfileValidity({...profileValidity, location: validateField(target)});
            setProfileButtonEnabled(buttonEnabled({...profileValidity, location: validateField(target)}));
        },
        email: ({target}) => {
            setEmail(target.value);
            setEmailValidity({...emailValidity, email: validateField(target)});
            setEmailButtonEnabled(buttonEnabled({...emailValidity, email: validateField(target)}));
        },
        confirm: ({target}) => {
            setConfirm(target.value);
            setPasswordValidity({...passwordValidity, confirm: validateField(target)});
            setPasswordButtonEnabled(buttonEnabled({...passwordValidity, confirm: validateField(target)}));
        },
        newPassword: ({target}) => {
            setNewPassword(target.value);
            setPasswordStrength(testPasswordStrength(target.value));
            setPasswordValidity({...passwordValidity, newPassword: validateField(target)});
            setPasswordButtonEnabled(buttonEnabled({...passwordValidity, newPassword: validateField(target)}));
        },
        currentPassword: ({target}) => {
            setCurrentPassword(target.value);
            setPasswordValidity({...passwordValidity, currentPassword: validateField(target)});
            setPasswordButtonEnabled(buttonEnabled({...passwordValidity, currentPassword: validateField(target)}));
        }
    };
    const save = {
        profile: async () => {
            let success = true;
            setProfileError(null);
            await MeteorCall('updateProfileDetails', first, last, location)
            .catch((error) => {
                setProfileError(error.message);
                success = false;
            });
            return success;
        },
        email: async () => {
            let success = true;
            setEmailError(null);
            await MeteorCall('updateAccountEmail', email)
            .catch((error) => {
                setEmailError(error.message);
                success = false;
            });
            return success;
        },
        password: async () => {
            let success = true;
            setPasswordError(null);
            await MeteorCall('updateAccountPassword', currentPassword, newPassword, confirm)
            .catch((error) => {
                console.error("ERRoR:", error);
                setPasswordError(error.message);
                success = false;
            });
            return success;
        }
    };

    const validateField = (target) => {
        if(validateAccountForm[target.id]){
            return validateAccountForm[target.id]({
                first: first,
                last: last,
                email: email,
                password: newPassword,
                confirm: confirm,
                passwordStrength: passwordStrength
            }, target);
        } else {
            return true;
        }
    };

    return (
        <Settings
            userSettings={userSettings}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            first={first}
            last={last}
            location={location}
            profileError={profileError}
            profileButtonEnabled={profileButtonEnabled}
            email={email}
            emailError={emailError}
            emailButtonEnabled={emailButtonEnabled}
            passwordStrength={passwordStrength}
            passwordError={passwordError}
            passwordButtonEnabled={passwordButtonEnabled}
            handle={handle}
            save={save}
            currentPassword={currentPassword}
            newPassword={newPassword}
            confirm={confirm}
            navStack={props.navStack}
        />
    );
};
SettingsContainer.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default SettingsContainer;
