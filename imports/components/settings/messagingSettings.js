import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import ReactTags from 'react-tag-autocomplete';
import MeteorCall from '/imports/api/util/callPromise';
import {tagSearchClasses} from '/imports/api/messaging/tagSearchClasses';
import {ProfileTag, ProfileSuggestion} from '/imports/components/messaging/tagSearchComponents';

const MessagingSettings = (props) => {
    const handleAllowMessages = ({target}) => {
        props.saveSettingChange(target.id, target.checked);
        _.delay(() => {
            const tagSearches = document.getElementsByClassName("messagingListTagSearch");
            for(i = 0; i < tagSearches.length; i++){
                tagSearches[i].value = "";
            }
        }, 50);
    };
    const addTag = (newTag, listType) => {
        console.log("addTag!");
        const list = listType === "blockedUsers" ? props.settings.blockedUsers : props.settings.allowedUsers;
        props.saveSettingChange(listType, [...list, {...newTag, _id: newTag.id}]);
    };
    const removeTag = (tagIndex, listType) => {
        const list = listType === "blockedUsers" ? props.settings.blockedUsers : props.settings.allowedUsers;
        list.splice(tagIndex, 1);
        props.saveSettingChange(listType, list);
    };
    let tagInterface;
    if(props.settings.allowFromAny){
        tagInterface = (
            <div className="mb-3 col-12">
                <label className="form-label">blocked users</label>
                <ReactTags
                    placeholderText="search to block users"
                    tags={props.settings.blockedUsers}
                    suggestions={props.blockMatches}
                    onAddition={(newTag) => addTag(newTag, "blockedUsers")}
                    onDelete={(tagIndex) => removeTag(tagIndex, "blockedUsers")}
                    onInput={(query) => props.userQuery(query, "blockedUsers")}
                    classNames={tagSearchClasses}
                    allowBackspace={false}
                    tagComponent={ProfileTag}
                    suggestionComponent={ProfileSuggestion}
                />
            </div>
        );
    } else {
        tagInterface = (
            <div className="mb-3 col-12">
                <label className="form-label">allowed users</label>
                <ReactTags
                    placeholderText="search to allow users"
                    tags={props.settings.allowedUsers}
                    suggestions={props.allowMatches}
                    onAddition={(newTag) => addTag(newTag, "allowedUsers")}
                    onDelete={(tagIndex) => removeTag(tagIndex, "allowedUsers")}
                    onInput={(query) => props.userQuery(query, "allowedUsers")}
                    classNames={tagSearchClasses}
                    allowBackspace={false}
                    tagComponent={ProfileTag}
                    suggestionComponent={ProfileSuggestion}
                />
            </div>
        );
    }
    return (
        <>
            <div className="mb-3">
                <div className="form-check form-switch form-check-inline settingsSwitch">
                    <label className="form-check-label">
                        allow messages from anyone
                    </label>
                    <input className="form-check-input" type="checkbox" value="" id="allowFromAny" checked={props.settings.allowFromAny} onChange={handleAllowMessages}/>
                </div>
            </div>
            {tagInterface}
        </>
    );
};
MessagingSettings.propTypes = {
    saveSettingChange: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
    userQuery: PropTypes.func.isRequired,
    blockMatches: PropTypes.array.isRequired,
    allowMatches: PropTypes.array.isRequired,
    profileTagSearchError: PropTypes.string
};
export default MessagingSettings;
