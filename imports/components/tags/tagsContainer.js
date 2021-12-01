import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import MeteorCall from '/imports/api/util/callPromise';
import {tagFollowMapper} from '/imports/api/tag/tagFollowMapper';
import Tags from '/imports/components/tags/tags';
import {Empty} from '/imports/components/loadingStatus/loadingStatus';

const TagsContainer = (props) => {
    const handleTagClick = (tag) => {
        if(!props.tag) props.navStack.setActiveTag(tag);
    };
    const handleFollowClick = (tagId, tag) => {
        MeteorCall('followTopic', tagId, tag).catch((error) => console.log("ERROR:", error));
    };
    const handleUnfollowClick = (tagId, tag) => {
        MeteorCall('unfollowTopic', tagId, tag).catch((error) => console.log("ERROR:", error));
    };
    if(props.tag || (props.navStack.tags && props.navStack.currentTag)){
        const _activeTag = props.tag ? props.tag : props.navStack.currentTag;
        return (
            <Tags
                tags={tagFollowMapper(props.tag ? [props.tag] : props.navStack.tags)}
                activeTag={_activeTag}
                handleTagClick={handleTagClick}
                handleFollowClick={handleFollowClick}
                handleUnfollowClick={handleUnfollowClick}
                navStack={props.navStack}
            />
        );
    } else {
        return <Empty message="no topics found"/>;
    }
};
TagsContainer.propTypes = {
    tag: PropTypes.object,
    navStack: PropTypes.object.isRequired
};
export default TagsContainer;
