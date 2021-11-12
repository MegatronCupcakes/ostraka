import React from 'react';
import PropTypes from 'prop-types';
import TagsAndMentions from '/imports/api/post/tagsAndMentions';

const PostCaption = (props) => {
    return (
        <div className={props.viewSize ? `col-12 postCaption ${props.viewSize}` : "col-12 postCaption"}>
            {TagsAndMentions(props.caption, props.tags, props.tagIds, props.mentions, props.mentionIds, props.navStack, props.viewType, props.sharedById)}
        </div>
    );
};
PostCaption.propTypes = {
    viewSize: PropTypes.string,
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
