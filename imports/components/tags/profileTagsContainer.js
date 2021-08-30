import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tags from './tags';
import {Empty} from '/imports/components/loadingStatus/loadingStatus';

const ProfileTagsContainer = (props) => {
    const handleTagClick = (tag) => {
        props.setActiveTag(tag);
    };
    if(props.tags && props.activeTag){
        return (
            <Tags
                tags={props.tags}
                activeTag={props.activeTag}
                handleTagClick={handleTagClick}
            />
        );
    } else {
        return <Empty message="no topics found"/>;
    }    
};
ProfileTagsContainer.propTypes = {
    navStack: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    activeTag: PropTypes.object,
    setActiveTag: PropTypes.func.isRequired
};
export default ProfileTagsContainer;
