import {Meteor} from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Ostracize from '/imports/components/profile/ostracize';
import MeteorCall from '/imports/api/util/callPromise';
import _ from 'underscore';

const OstracizeContainer = (props) => {
    const handleCancel = () => {

    };
    const ostracizeUser = () => {

    };
    return (
        <Ostracize
            user={props.user}
            activeButton={!props.noninteractive && !_.isUndefined(Meteor.userId()) && !_.isNull(Meteor.userId()) && Meteor.userId() !== props.user._id}
            ostracizeUser={ostracizeUser}
            handleCancel={handleCancel}
            ostracizeCount={props.user.ostracizedBy ? props.user.ostracizedBy.length : 0}
            displaySize={props.displaySize}
            noninteractive={props.noninteractive}
            navStack={props.navStack}
        />
    )
};
OstracizeContainer.propTypes = {
    user: PropTypes.object.isRequired,
    noninteractive: PropTypes.bool,
    displaySize: PropTypes.string,
    navStack: PropTypes.object.isRequired
};
export default OstracizeContainer;
