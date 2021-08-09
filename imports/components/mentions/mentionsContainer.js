import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import MeteorCall from '../../api/util/callPromise';
import Mentions from './mentions';

const MentionsContainer = (props) => {
    const handleMentionClick = ({target}) => {
        console.log("mention click!");
    }
    return (
        <Mentions
            mentions={props.mentions}
            handleMentionClick={handleMentionClick}
        />
    );
};
MentionsContainer.propTypes = {
    postId: PropTypes.string,
    mentions: PropTypes.array.isRequired
};
export default MentionsContainer;
