import React from 'react';
import PropTypes from 'prop-types';
import TagsAndMentions from '/imports/api/post/tagsAndMentions';

const PostCaption = (props) => {
    return (
        <div className="postCaption col-12">{TagsAndMentions(props.caption, props.tags, props.tagIds, props.mentions, props.mentionIds, props.navStack, props.viewType, props.sharedById)}</div>
    );
};
PostCaption.propTypes = {
    caption: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    tagIds: PropTypes.array.isRequired,
    mentions: PropTypes.array.isRequired,
    mentionIds: PropTypes.array.isRequired,
    navStack: PropTypes.object.isRequired,
    viewType: PropTypes.string,
    sharedById: PropTypes.string
};
export default PostCaption;
