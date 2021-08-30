import React from 'react';
import PropTypes from 'prop-types';

// Apply Styling to Captions when no other imagery is available.

const TextBubble = (props) => {
    return (
        <div className="position-relative" style={{minHeight: '8rem'}}>
            <div className="blockquote text-center">
                {props.caption}
            </div>
        </div>
    );
};
TextBubble.propTypes = {
    caption: PropTypes.object.isRequired
}
export default TextBubble;
