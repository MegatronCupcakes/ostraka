import React from 'react';
import PropTypes from 'prop-types';

const Tags = (props) => {
    const tags = props.tags.map((tag, index) => {
        const _tagClasses = tag == props.activeTag ? 'tag active' : 'tag';
        return (
            <div className={_tagClasses} key={index} onClick={() => {props.handleTagClick(tag)}}>#{tag.tag}</div>
        )
    });
    return (
        <div className="col-xs-12 col-sm-12 col-md-6 offset-md-3 mb-3 ma-3">
            <div className="col-xs-12 col-sm-12 col-md-6 offset-md-3" style={{paddingTop: "1em"}}>
                <div className="tags" style={{textAlign: "center"}}>{tags}</div>
            </div>
        </div>
    )
};
Tags.propTypes = {
    tags: PropTypes.array.isRequired,
    activeTag: PropTypes.object.isRequired,
    handleTagClick: PropTypes.func.isRequired
};
export default Tags;
