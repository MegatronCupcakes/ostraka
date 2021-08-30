import React from 'react';
import PropTypes from 'prop-types';

export const Loading = (props) => {
    return <div className="emptyFeed">loading...</div>;
};

export const Empty = (props) => {
    return <div className="emptyFeed">{props.message}</div>;
};
Empty.propTypes = {
    message: PropTypes.string.isRequired
};

export const Error = (props) => {
    return <div className="emptyFeed">error :-(</div>;
};
