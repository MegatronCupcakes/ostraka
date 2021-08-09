import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import MeteorCall from '../../api/util/callPromise';
import Tags from './tags';

const TagsContainer = (props) => {
    const handleTagClick = ({target}) => {
        console.log("tag click!");
    };
    return (
        <Tags
            tags={props.tags}
            handleTagClick={handleTagClick}
        />
    );
};
TagsContainer.propTypes = {
    postId: PropTypes.string,
    tags: PropTypes.array.isRequired
};
export default TagsContainer;
