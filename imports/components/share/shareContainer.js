import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
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

    const sharingSettings = getSettings().sharing;
    const [shareEnabled, setShareEnabled] = useState(
        _.some(_.keys(sharingSettings), (key) => {
            return sharingSettings[key];
        })
    );

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
            console.log("props.sharedContent.type:", props.sharedContent.type);
            const shareSettings = getSettings().sharing;
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
        // any special cancellation handling goes here
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
            viewSize={props.viewSize}
            registeredUser={Meteor.userId() ? true : false}
            navStack={props.navStack}

            shareEnabled={shareEnabled}
            setShareEnabled={setShareEnabled}
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
