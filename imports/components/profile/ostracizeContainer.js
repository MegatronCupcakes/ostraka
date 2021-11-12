import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {dismissModals} from '/imports/api/util/dismissModals';
import Ostracize from '/imports/components/profile/ostracize';
import MeteorCall from '/imports/api/util/callPromise';
import _ from 'underscore';

const OstracizeContainer = (props) => {
    const [message, setMessage] = useState({message: null, class: null});
    const handleCancel = () => {

    };
    const ostracizeUser = () => {
        MeteorCall('ostracizeUser', props.user._id)
        .catch((error) => {
            console.log("OSTRACIZE ERROR:", error);
            setMessage({...message, ...{message: "oops, something went wrong...", class: "danger"}});
        })
        .then(() => {
            setMessage({...message, ...{message: "vote cast successfully", class: "success"}});
            _.delay(() => {
                setMessage({...message, ...{message: null, class: null}});
                dismissModals();
            }, 3000);
        });
    };
    return (
        <Ostracize
            user={props.user}
            activeButton={!props.noninteractive && !_.isUndefined(Meteor.userId()) && !_.isNull(Meteor.userId()) && Meteor.userId() !== props.user._id}
            ostracizeUser={ostracizeUser}
            handleCancel={handleCancel}
            ostracizeCount={props.user.ostracizedBy ? props.user.ostracizedBy.length : 0}
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
