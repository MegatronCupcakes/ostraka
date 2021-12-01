import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import TagsAndMentions from '/imports/api/post/tagsAndMentions';
import {goTo} from '/imports/api/navStack/goTo';
import {useOnScreen} from '/imports/api/util/useOnScreen';
import {dateFormatter} from '/imports/api/util/dateFormatter';

const Comment = (props) => {
    const elementRef = useRef(null);
    const isOnScreen = useOnScreen(elementRef);

    useEffect(() => {
        if(props.visibleCallback && isOnScreen) props.visibleCallback();
    }, [isOnScreen]);

    const handleUserClick = () => {
        goTo(props.comment.userId, "profile", props.navStack, props.viewType, props.sharedById);
    };

    const timestamp = props.comment.createdAt ? (
        <span className="commentTimestamp">{dateFormatter(props.comment.createdAt)}</span>
    ) : (<></>)

    return (
        <div ref={elementRef}>
            <div>
                <span className="commentUserId" onClick={handleUserClick}>{props.comment.postedBy}</span>
                <span className="commentUserTag" onClick={handleUserClick}>@{props.comment.postedByTag}</span>
            </div>
            <div>
                {timestamp}
            </div>
            <div className="commentText">
                {TagsAndMentions(props.comment.comment, props.comment.tags, props.comment.tagIds, props.comment.mentions, props.comment.mentionIds, props.navStack, props.viewType, props.sharedById)}
            </div>            
        </div>
    );
};
Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    navStack: PropTypes.object.isRequired,
    viewType: PropTypes.string,
    sharedById: PropTypes.string,
    visibleCallback: PropTypes.func
};
export default Comment;
