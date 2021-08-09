import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Image from './image';
import Link from './link';
import Text from './text';
import Video from './video';

const PreviewContainer = (props) => {
    const user = Meteor.user();
    const name = user.profile.firstName + " " + user.profile.lastName;
    const profilePic = window.location.href + user.profile.profileImage;
    let content;

    switch(props.postType){
        case 'image':
        content = (
            <Image
                postedBy={name}
                postedById={user._id}
                postedByTag={user.profile.profileTag}
                postedByProfilePic={profilePic}
                images={props.postImages}
                caption={props.post}
                tags={props.postTags}
                mentions={props.postMentions}
                likes={[]}
                dislikes={[]}
                comments={[]}
            />
        );
        break;
        case 'link':
        content = (
            <Link
                postedBy={name}
                postedById={user._id}
                postedByTag={user.profile.profileTag}
                postedByProfilePic={profilePic}
                url={props.postUrl}
                caption={props.post}
                tags={props.postTags}
                mentions={props.postMentions}
                likes={[]}
                dislikes={[]}
                comments={[]}
            />
        );
        break;
        case 'text':
        content = (
            <Text
                postedBy={name}
                postedById={user._id}
                postedByTag={user.profile.profileTag}
                postedByProfilePic={profilePic}
                caption={props.post}
                tags={props.postTags}
                mentions={props.postMentions}
                likes={[]}
                dislikes={[]}
                comments={[]}
            />
        );
        break;
        case 'video':
        content = (
            <Video
                postedBy={name}
                postedById={user._id}
                postedByTag={user.profile.profileTag}
                postedByProfilePic={profilePic}
                url={props.postUrl}
                caption={props.post}
                tags={props.postTags}
                mentions={props.postMentions}
                likes={[]}
                dislikes={[]}
                comments={[]}
            />
        );
        break;
    }
    return content;
};
PreviewContainer.propTypes = {
    post: PropTypes.string,
    postType: PropTypes.string.isRequired,
    postUrl: PropTypes.string,
    postMentions: PropTypes.array.isRequired,
    postTags: PropTypes.array.isRequired,
    postImages: PropTypes.array.isRequired
};
export default PreviewContainer;
