import React, {useState} from 'react';
import PropTypes from 'prop-types';

const ContentWrapper = (props) => {
    return (
        <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2" style={{paddingTop: "1rem"}}>
            {props.content}
        </div>
    )
};
ContentWrapper.propTypes = {
    content: PropTypes.object.isRequired
};
export default ContentWrapper;
