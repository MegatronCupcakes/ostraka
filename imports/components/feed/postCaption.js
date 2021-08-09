import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const PostCaption = (props) => {

    let postArray = props.caption.split(" ").map((word, index) => {
        if(word.startsWith('@') && _.contains(props.mentions, word.substring(1))){
            return <span className="mentionInPost" key={index}>{word} </span>;
        } else if(word.startsWith('#') && _.contains(props.tags, word.substring(1))){
            return <span className="tagInPost" key={index}>{word} </span>;
        } else {
            return <span key={index}>{word} </span>;
        }
    });
    return (
        <div>{postArray}</div>
    );
};
PostCaption.propTypes = {
    caption: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    mentions: PropTypes.array.isRequired
};
export default PostCaption;
