import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MeteorCall from '/imports/api/util/callPromise';
import AnalyzeNewPost from '/imports/api/post/analyzeNewPost';
import NewComment from './newComment'

const NewCommentContainer = (props) => {
    const [comment, setComment] = useState('');
    const [tags, setTags] = useState([]);
    const [mentions, setMentions] = useState([]);

    const handleCommentChange = ({target}) => {
        const [type, url, mentions, tags, cleanPost, errors] = AnalyzeNewPost(target.value);
        setComment(cleanPost);
        setTags(tags);
        setMentions(mentions);
    }
    const deleteComment = () => {
        setComment('');
        setTags([]);
        setMentions([]);
    };
    const publishComment = () => {
        if(Meteor.userId()){
            MeteorCall('comment', props.parentId, props.parentType, comment, tags, mentions)
            .catch((error) => {
                // show error
                console.log("LIKE ERROR:", error);
            })
            .then(() => {
                console.log("comment posted.");
            });
        }
    };

    return (
        <NewComment
            parentId={props.parentId}
            parentText={props.parentText}
            postedBy={props.postedBy}
            postedById={props.postedById}
            postedByTag={props.postedByTag}
            postedByProfilePic={props.postedByProfilePic}
            mentions={props.mentions}
            mentionIds={props.mentionIds}
            tags={props.tags}
            tagIds={props.tagIds}
            commentCount={props.commentCount}
            onChange={handleCommentChange}
            publishComment={publishComment}
            deleteComment={deleteComment}
            noninteractive={props.noninteractive}
            registeredUser={Meteor.userId() ? true : false}
            viewSize={props.viewSize}
            navStack={props.navStack}
        />
    );
};
NewCommentContainer.propTypes = {
    parentId: PropTypes.string,
    parentType: PropTypes.string.isRequired,
    parentText: PropTypes.string.isRequired,
    postedBy: PropTypes.string.isRequired,
    postedByTag: PropTypes.string.isRequired,
    postedById: PropTypes.string.isRequired,
    postedByProfilePic: PropTypes.string.isRequired,
    commentCount: PropTypes.number.isRequired,
    tags: PropTypes.array,
    tagIds: PropTypes.array,
    mentions: PropTypes.array,
    mentionIds: PropTypes.array,
    noninteractive: PropTypes.bool,
    viewSize: PropTypes.string,
    navStack: PropTypes.object.isRequired
};
export default NewCommentContainer;
