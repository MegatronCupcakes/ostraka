import React from 'react';
import PropTypes from 'prop-types';
import PostCaption from '/imports/components/feed/postCaption';
import TextBubble from '/imports/components/feed/textBubble';

const Text = (props) => {

    const _caption = (
        <PostCaption
            caption={props.post.caption}
            tags={props.post.tags}
            tagIds={props.post.tagIds}
            mentions={props.post.mentions}
            mentionIds={props.post.mentionIds}
            noninteractive={props.noninteractive}
            navStack={props.navStack}
            viewType={props.viewType}
            sharedById={props.sharedById}
        />
    );
    return (
        <TextBubble
            caption={_caption}
        />
    )
};
Text.propTypes = {
    post: PropTypes.object.isRequired,
    sharedById: PropTypes.string,
    viewType: PropTypes.string, // "embed" and perhaps other specialized content views.
    viewSize: PropTypes.string,
    noninteractive: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default Text;
