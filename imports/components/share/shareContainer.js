import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import Share from '/imports/components/share/share';

import ShareContent from '/imports/api/share/client/share';

import AnalyzeNewPost from '/imports/api/post/analyzeNewPost';
import {getSettings} from '/imports/api/settings/getSettings';
import {dismissModals} from '/imports/api/util/dismissModals';

const ShareContainer = (props) => {
    const [post, setPost] = useState("");
    const [cleanPost, setCleanPost] = useState(post);
    const [postMentions, setPostMentions] = useState([]);
    const [postTags, setPostTags] = useState([]);
    const [postErrors, setPostErrors] = useState([]);
    const [shareResults, setShareResults] = useState([]);

    const handleCaptionChange = ({target}) => {
        const _post = target.value;
        setPostErrors([]);
        const [type, url, mentions, tags, cleanPost, errors] = AnalyzeNewPost(_post);
        setPost(_post);
        setCleanPost(cleanPost);
        setPostMentions(mentions);
        setPostTags(tags);
        setPostErrors(errors);
    };

    const shareContent = () => {
        if(Meteor.userId()){
            const shareSettings = _.clone(getSettings().sharing);
            const shareToArray = _.filter(_.keys(shareSettings), (key) => {return shareSettings[key]});
            ShareContent(props.sharedContent, props.sharedType, shareToArray, cleanPost, postTags, postMentions)
            .then((_shareResults) => {
                setShareResults([...shareResults, ..._shareResults]);
            })
            .catch((error) => {
                console.log("ERROR:", error);
            });

        }
    };
    const handleCancel = () => {

    };

    return (
        <Share
            sharedContent={props.sharedContent}
            sharedType={props.sharedType}
            handleCaptionChange={handleCaptionChange}
            shareContent={shareContent}
            handleCancel={handleCancel}
            shareCount={props.sharedContent.shareCount}
            shareResults={shareResults}
            noninteractive={props.noninteractive}
            displaySize={props.viewSize}
            registeredUser={Meteor.userId() ? true : false}
            navStack={props.navStack}
        />
    )
};
ShareContainer.propTypes = {
    sharedContent: PropTypes.object.isRequired,
    sharedType: PropTypes.string.isRequired,
    noninteractive: PropTypes.bool,
    viewSize: PropTypes.string,
    navStack: PropTypes.object.isRequired
};
export default ShareContainer;
