import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import MeteorCall from '/imports/api/util/callPromise';
import {tagFollowMapper} from '/imports/api/tag/tagFollowMapper';
import Tags from '/imports/components/tags/tags';
import {Empty} from '/imports/components/loadingStatus/loadingStatus';

const ProfileTagsContainer = (props) => {
    const handleTagClick = (tag) => {
        props.setActiveTag(tag);
    };
    const handleFollowClick = (tagId, tag) => {
        MeteorCall('followTopic', tagId, tag).catch((error) => console.log("ERROR:", error));
    };
    const handleUnfollowClick = (tagId, tag) => {
        MeteorCall('unfollowTopic', tagId, tag).catch((error) => console.log("ERROR:", error));
    };
    if(props.tags && props.activeTag){
        return (
            <Tags
                tags={tagFollowMapper(props.tags)}
                activeTag={props.activeTag}
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
ProfileTagsContainer.propTypes = {
    navStack: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    activeTag: PropTypes.object,
    setActiveTag: PropTypes.func.isRequired
};
export default ProfileTagsContainer;
