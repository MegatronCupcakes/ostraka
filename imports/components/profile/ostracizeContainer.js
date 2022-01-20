import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {dismissModals} from '/imports/api/util/dismissModals';
import Ostracize from '/imports/components/profile/ostracize';
import MeteorCall from '/imports/api/util/callPromise';
import _ from 'underscore';

const OstracizeContainer = (props) => {
    const [message, setMessage] = useState({message: null, class: null});
    const [disableButton, setDisableButton] = useState(false);
    const handleCancel = () => {

    };
    const ostracizeUser = () => {
        if(!props.user.ostracized){
            setDisableButton(true);
            MeteorCall('ostracizeUser', props.user._id)
            .then(() => {
                setMessage({...message, ...{message: "vote cast successfully", class: "success"}});
                _.delay(() => {
                    setMessage({...message, ...{message: null, class: null}});
                    setDisableButton(false);
                    dismissModals();
                }, 3000);
            })
            .catch((error) => {
                console.log("OSTRACIZE ERROR:", error);
                setMessage({...message, ...{message: "oops, something went wrong...", class: "danger"}});
            });
        }
    };
    return (
        <Ostracize
            user={props.user}
            activeButton={!props.noninteractive && !_.isUndefined(Meteor.userId()) && !_.isNull(Meteor.userId()) && Meteor.userId() !== props.user._id && !props.user.ostracized}
            disableButton={disableButton}
            ostracizeUser={ostracizeUser}
            handleCancel={handleCancel}
            message={message}
            viewSize={props.viewSize}
            noninteractive={props.noninteractive}
            navStack={props.navStack}
        />
    )
};
OstracizeContainer.propTypes = {
    user: PropTypes.object.isRequired,
    noninteractive: PropTypes.bool,
    viewSize: PropTypes.string,
    navStack: PropTypes.object.isRequired
};
export default OstracizeContainer;
