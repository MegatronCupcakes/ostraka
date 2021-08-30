import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import PostView from '/imports/components/feed/postView';

const PreviewContainer = (props) => {
    const user = Meteor.user();
    const name = user.profile.firstName + " " + user.profile.lastName;
    const profilePic = user.profile.profileImage;

    return (
        <PostView
            postPreview={true}
            post={{
                caption: props.post,
                url: props.postUrl,
                type: props.postType,
                mentions: props.postMentions,
                tags: props.postTags,
                images: props.postImages,
                postedByTag:  user.profile.profileTag,
                postedBy: user.profile.firstName + " " + user.profile.lastName,
                postedById: user._id,
                postedByProfilePic:  user.profile.profileImage,
                comments: [],
                likes: [],
                dislikes: [],
                tagIds: [],
                mentionIds: [],
                sharedBy: []
            }}
            navStack={props.navStack}
        />
    );
};
PreviewContainer.propTypes = {
    post: PropTypes.string,
    postType: PropTypes.string.isRequired,
    postUrl: PropTypes.string,
    postMentions: PropTypes.array.isRequired,
    postTags: PropTypes.array.isRequired,
    postImages: PropTypes.array.isRequired,
    navStack: PropTypes.object.isRequired
};
export default PreviewContainer;
