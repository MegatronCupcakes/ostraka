import React from 'react';
import PropTypes from 'prop-types';

const Tags = (props) => {
    const tags = props.tags.map((tag, index) => {
        return (
            <div className="tag" key={index} onClick={props.handleTagClick}>#{tag}</div>
        )
    });
    return (
        <div className="col tags">{tags}</div>
    )
};
Tags.propTypes = {
    tags: PropTypes.array.isRequired,
    handleTagClick: PropTypes.func.isRequired
};
export default Tags;
