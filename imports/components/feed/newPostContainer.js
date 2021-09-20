import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import MeteorCall from '/imports/api/util/callPromise';
import AnalyzeNewPost from '/imports/api/post/analyzeNewPost';

import NewPost from './newPost';

const _defaultType = 'text';
const _postEnabled = "btn btn-primary col-auto";
const _postDisabled = _postEnabled + " disabled";

const _deleteEnabled = "btn btn-secondary col-auto";
const _deleteDisabled = _deleteEnabled + " disabled";

const _imageEnabled = "btn btn-primary col-auto";
const _imageDisabled = _imageEnabled + " disabled";

const _videoEnabled = "btn btn-primary col-auto";
const _videoDisabled = _videoEnabled + " disabled";

const NewPostContainer = (props) => {
    const [post, setPost] = useState("");
    const [cleanPost, setCleanPost] = useState(post);
    const [postType, setPostType] = useState(_defaultType);
    const [postUrl, setPostUrl] = useState("");
    const [postImages, setPostImages] = useState([]);
    const [postVideo, setPostVideo] = useState("");
    const [postMentions, setPostMentions] = useState([]);
    const [postTags, setPostTags] = useState([]);
    const [postErrors, setPostErrors] = useState([]);

    const [isPosting, setIsPosting] = useState(false);
    const [imageButtonClass, setImageButtonClass] = useState(_imageEnabled);
    const [videoButtonClass, setVideoButtonClass] = useState(_videoEnabled);
    const [postButtonClass, setPostButtonClass] = useState(_postEnabled);
    const [deleteButtonClass, setDeleteButtonClass] = useState(_deleteEnabled)

    const handlePostChange = ({target}) => {
        const _post = target.value;
        setPostErrors([]);
        // determine type of post: link, text, image, video
        const [type, url, mentions, tags, cleanPost, errors] = AnalyzeNewPost(_post);
        setPost(_post);
        setCleanPost(cleanPost);
        // if the user has attached images or video, don't override type.
        if(postType !== "image" && postType !== "video") setPostType(type);
        if(url && postType !== "image" && postType !== "video") setPostUrl(url);
        setPostMentions(mentions);
        setPostTags(tags);
        setPostErrors(errors);
    };

    const handleOnFocus = () => {
        setIsPosting(true);
    };

    const cleanUp = () => {
        setPost("");
        setCleanPost("");
        setPostType(_defaultType);
        setPostUrl("");
        setPostImages([]);
        setPostVideo("");
        setPostMentions([]);
        setPostTags([]);
        setPostErrors([]);

        setIsPosting(false);
        setImageButtonClass(_imageEnabled);
        setVideoButtonClass(_videoEnabled);
        setPostButtonClass(_postEnabled);
        setDeleteButtonClass(_deleteEnabled);
    };

    const handleDelete = () => {
        cleanUp();
    };

    const handlePost = () => {
        setPostButtonClass(_postDisabled);
        setDeleteButtonClass(_deleteDisabled);
        setImageButtonClass(_imageDisabled);
        setVideoButtonClass(_videoDisabled);
        MeteorCall('createPost', {
            caption: cleanPost,
            url: postUrl,
            type: postType,
            tags: postTags,
            mentions: postMentions,
            images: postImages,
            video: postVideo
        })
        .then(() => {
            // post was successful.
            cleanUp();
        })
        .catch((error) => {
            // error ocurred; enable buttons so user can make changes.
            setPostButtonClass(_postEnabled);
            setDeleteButtonClass(_deleteEnabled);
            setImageButtonClass(_imageEnabled);
            setVideoButtonClass(_videoEnabled);
        });
    };

    return (
        <NewPost
            post={cleanPost}
            setPost={handlePostChange}
            postType={postType}
            setPostType={setPostType}
            postUrl={postUrl}
            postImages={postImages}
            setPostImages={setPostImages}
            postVideo={postVideo}
            setPostVideo={setPostVideo}
            postMentions={postMentions}
            postTags={postTags}
            postFocus={handleOnFocus}
            isPosting={isPosting}
            setIsPosting={setIsPosting}
            imageButtonClass={imageButtonClass}
            videoButtonClass={videoButtonClass}
            postButtonClass={postButtonClass}
            deleteButtonClass={deleteButtonClass}
            handleDelete={handleDelete}
            handlePost={handlePost}
            postErrors={postErrors}
            navStack={props.navStack}
        />
    )
};
NewPostContainer.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default NewPostContainer;
