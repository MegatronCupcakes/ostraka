import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tags from './tags';
import {Empty} from '/imports/components/loadingStatus/loadingStatus';

const TagsContainer = (props) => {
    const handleTagClick = (tag) => {
        //props.navStack.update({navState: "TagView", viewContent: null, activeTag: tag, tags: [tag]});
        if(!props.tag) props.navStack.setActiveTag(tag);
    }
    if(props.tag || (props.navStack.tags && props.navStack.currentTag)){
        const _tags = props.tag ? [props.tag] : props.navStack.tags;
        const _activeTag = props.tag ? props.tag : props.navStack.currentTag;
        return (
            <Tags
                tags={_tags}
                activeTag={_activeTag}
                handleTagClick={handleTagClick}
            />
        );
    } else {
        return <Empty message="no topics found"/>;
    }
};
TagsContainer.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default TagsContainer;
