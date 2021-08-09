import React from 'react';
import PropTypes from 'prop-types';

const Mentions = (props) => {
    const mentions = props.mentions.map((mention, index) => {
        return (
            <div className="mention" key={index} onClick={props.handleMentionClick}>@{mention}</div>
        )
    });
    return (
        <div className="col mentions">{mentions}</div>
    )
};
Mentions.propTypes = {
    mentions: PropTypes.array.isRequired,
    handleMentionClick: PropTypes.func.isRequired
};
export default Mentions;
