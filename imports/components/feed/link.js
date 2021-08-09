import React from 'react';
import PropTypes from 'prop-types';
import {ReactTinyLink} from 'react-tiny-link';

import PostSupplementals from './postSupplementals';
import UserIdentifier from './userIdentifier';
import PostCaption from './postCaption';

const Link = (props) => {

    return (
        <div className="mb-3 fade-in row align-items-start post">
            <div className="col">
                <ReactTinyLink
                    cardSize="large"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    url={props.url}
                    proxyUrl={window.location.href + "corsProxy"}
                />
            </div>
            <div className="col">
                <UserIdentifier
                    postedBy={props.postedBy}
                    postedByTag={props.postedByTag}
                    postedById={props.postedById}
                    postedByProfilePic={props.postedByProfilePic}
                />
                <PostCaption
                    caption={props.caption}
                    tags={props.tags}
                    mentions={props.mentions}
                />
                <PostSupplementals
                    postId={props.postId}
                    likedType="Link"
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
Link.propTypes = {
    postedBy: PropTypes.string.isRequired,
    postedByTag: PropTypes.string.isRequired,
    postedById: PropTypes.string.isRequired,
    postedByProfilePic: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    caption: PropTypes.string,
    comments: PropTypes.array.isRequired
};
export default Link;
