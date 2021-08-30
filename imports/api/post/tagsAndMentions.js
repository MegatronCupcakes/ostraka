import React from 'react';
import _ from 'underscore';
import {dismissModals} from '/imports/api/util/dismissModals';

const TagsAndMentions = (text, tags, tagIds, mentions, mentionIds, navStack) => {
    // addToClickFn is an optional function allowing us to perform additional actions on click such as dismissing a modal.
    return _.flatten(text.split("\n").map((_string) => {
        return _string.split(" ");
    })).map((word, index) => {
        const _matchWord = word.substring(1).toLowerCase();
        if(word.startsWith('@') && _.contains(mentions, _matchWord)){
            const mentionIndex = mentions.indexOf(_matchWord);
            return <span className="mentionInPost" onClick={() => {_handleMentionClick(mentionIds[mentionIndex], navStack)}} key={index}>{word} </span>;
        } else if(word.startsWith('#') && _.contains(tags, _matchWord)){
            const tagIndex = tags.indexOf(_matchWord);
            const tag = {_id: tagIds[tagIndex], tag: tags[tagIndex]};
            return <span className="tagInPost" onClick={() => {_handleTagClick(tag, navStack)}} key={index}>{word} </span>;
        } else {
            return <span key={index}>{word} </span>;
        }
    });
};
export default TagsAndMentions;

const _handleTagClick = (tag, navStack) => {
    tag.active = true;
    dismissModals();
    _.defer(() => {
        navStack.update({navState: 'TagView', viewContent: tag, activeTag: null, tags: [tag]});
    });
};

const _handleMentionClick = (mentionId, navStack) => {
    dismissModals();
    _.defer(() => {
        navStack.update({navState: 'Profile', viewContent: mentionId, activeTag: null});
    });
};
