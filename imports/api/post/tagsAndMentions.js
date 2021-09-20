import React from 'react';
import _ from 'underscore';
import {goTo} from '/imports/api/navStack/goTo';

const TagsAndMentions = (text, tags, tagIds, mentions, mentionIds, navStack, viewType, sharedById) => {
    return _.flatten(text.split("\n").map((_string) => {
        return _string.split(" ");
    })).map((word, index) => {
        const _matchWord = word.substring(1).toLowerCase();
        if(word.startsWith('@') && _.contains(mentions, _matchWord)){
            const mentionIndex = mentions.indexOf(_matchWord);
            return <span className="mentionInPost" onClick={() => {_handleMentionClick(mentionIds[mentionIndex], navStack, viewType, sharedById)}} key={index}>{word} </span>;
        } else if(word.startsWith('#') && _.contains(tags, _matchWord)){
            const tagIndex = tags.indexOf(_matchWord);
            const tag = {_id: tagIds[tagIndex], tag: tags[tagIndex]};
            return <span className="tagInPost" onClick={() => {_handleTagClick(tag, navStack, viewType, sharedById)}} key={index}>{word} </span>;
        } else {
            return <span key={index}>{word} </span>;
        }
    });
};
export default TagsAndMentions;

const _handleTagClick = (tag, navStack, viewType, sharedById) => {
    tag.active = true;
    goTo(tag, "tag", navStack, viewType, sharedById);
};

const _handleMentionClick = (mentionId, navStack, viewType, sharedById) => {
    goTo(mentionId, "profile", navStack, viewType, sharedById);
};
