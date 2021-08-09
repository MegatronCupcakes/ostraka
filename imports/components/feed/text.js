import React from 'react';
import PropTypes from 'prop-types';

import PostSupplementals from './postSupplementals';
import UserIdentifier from './userIdentifier';
import PostCaption from './postCaption';

const Text = (props) => {

    return (
        <div className="mb-3 fade-in row align-items-start post">
            <div className="col">
                <PostCaption
                    caption={props.caption}
                    tags={props.tags}
                    mentions={props.mentions}
                />
            </div>
            <div className="col">
                <UserIdentifier
                    postedBy={props.postedBy}
                    postedByTag={props.postedByTag}
                    postedById={props.postedById}
                    postedByProfilePic={props.postedByProfilePic}
                />
                <PostSupplementals
                    postId={props.postId}
                    likedType="Text"
                    tags={props.tags}
                    mentions={props.mentions}
                    likes={props.likes}
                    dislikes={props.dislikes}
                    comments={props.comments}
                />
            </div>
        </div>
    )
};
Text.propTypes = {
    postedBy: PropTypes.string.isRequired,
    postedById: PropTypes.string.isRequired,
    postedByTag: PropTypes.string.isRequired,
    postedByProfilePic: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired
};
export default Text;
