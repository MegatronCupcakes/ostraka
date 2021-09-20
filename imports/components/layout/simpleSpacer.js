import React, {useState} from 'react';
import PropTypes from 'prop-types';

const SimpleSpacer = (props) => {
    return (
        <div style={{paddingTop: "1rem"}}>
            {props.content}
        </div>
    )
};
SimpleSpacer.propTypes = {
    content: PropTypes.object.isRequired
};
export default SimpleSpacer;
