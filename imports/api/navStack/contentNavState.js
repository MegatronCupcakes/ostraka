import React, {useState} from 'react';
import {Meteor} from 'meteor/meteor';
import {useTracker} from 'meteor/react-meteor-data';
import _ from 'underscore';
import {isBad} from '/imports/api/util/isBad';
import {LocalStorage} from '/imports/api/util/localStorageAdapter';

const _defaultNavState = {navState: 'Feed', viewContent: null, activeTag: null, tags: null};
const _defaultNavStack = [_defaultNavState];

export class ContentNavState {
    constructor(currentUser){
        this._currentUser = currentUser;
        [this._contentState, this._setContentState] = useState(_defaultNavStack);
        this._storage = new LocalStorage('navStack');
    };
    // Nav State
    get current(){
        return _.last(this._contentState);
    };
    async update(state){
        //console.log("UPDATE\nsetting:", state, "\nprevious:", _.last(this._contentState));
        const currentState = this._contentState;
        if(!state.tags) state.tags = _getTags(this._currentUser);
        // prevent the user from filling the navStack with the same state over and over.
        // this is possible when viewing a profile if the user clicks the profile name/tag again.
        // in this event it makes the "back" arrow look like it does nothing as the previous state
        // is the same as the current state.
        if(!_.isEqual(_.last(this._contentState), state)) this._setContentState([...currentState, state]);
        // redirect if we're navigating away from a sharedView.
        if(window.location.href.includes("view")){
            await this._storage.set([...currentState, state])
            .catch((error) => {
                console.log("ERROR SETTING RESTORE POINT:", error);
            })
            _goHome();
        }
    };
    back(){
        if(this._contentState.length <= 1){
            this._setContentState(_defaultNavStack); // restore default state if the stack is or will be empty.
        } else {
            const currentState = this._contentState.pop(); // remove current state
            const priorState = this._contentState.pop(); // remove prior state
            this._setContentState([...this._contentState, priorState]);
        }
    };

    reset(){
        //[this._contentState, this._setContentState] = useState(_defaultNavStack);
        this._setContentState(_defaultNavStack);
    };

    async restore(){
        const _stack = await this._storage.get()
        .catch((error) => {
            console.log("ERROR GETTING RESTORE POINT:", error);
        });
        if(_stack){
            this._setContentState([...this._contentState, ..._stack]);
            this._storage.delete();
        }
    };

    // Tags
    get tags(){
        return _.isEmpty(this.current.tags) ? _getTags(this._currentUser) : this.current.tags;
    };
    get currentTag(){
        return _.findWhere(this.current.tags, {active: true});
    };
    setActiveTag(tag){
        const currentState = this._contentState.pop(); // get current state
        currentState.tags = currentState.tags.map((_tag, index) => {
            // set all tags to inactive unless it's the provided tag.
            _tag.active = _tag._id == tag._id;
            return _tag;
        });
        this._setContentState([...this._contentState, currentState]); //restore current (updated) state
    }
    // used to set tags for trending topics.
    setTags(tags){
        const currentState = this._contentState.pop(); // get current state
        currentState.tags = tags;
        this._setContentState([...this._contentState, currentState]); //restore current (updated) state
    }
    /*
    Some interfaces allow for toggling between viewContent items; in these instances (such as the Messaging Inbox)
    new objects should not get added to the navStack as the user cycles between viewContent items.  This allows the
    Back navigation to exit the activity rather than cycling threw all previously viewed viewContent items (e.g. a user
    can view all messages in the Messaging Inbox and then use Back to exit the Messaging Inbox).
    */
    setViewContent(viewContent){
        let currentState = _.last(this._contentState);
        if(currentState)
        this._contentState.pop(); // get current state
        currentState.viewContent = viewContent;
        this._setContentState([...this._contentState, currentState]); //restore current (updated) state
    }
    // search
    search(viewContent){
        const searching = this.current.navState === 'Search';
        const state = searching ? this._contentState.pop() : {navState: 'Search', viewContent: null, activeTag: null, tags: null};
        state.viewContent = viewContent;
        if(searching && isBad(viewContent)){
            // empty search query; go back
            this.back();
        } else {
            if(
                ((viewContent.charAt(0) === '@' || viewContent.charAt(0) === '@') && viewContent.length > 1) ||
                (viewContent.charAt(0) !== '@' && viewContent.charAt(0) !== '@' && viewContent.length > 1)
            )
            this._setContentState([...this._contentState, state]);
        }
    }
};

const _getTags = (currentUser) => {
    if(currentUser){
        let _tags = _.sortBy(currentUser.followedTopics, 'createdAt').reverse().map((_tag, index) => {
            _tag.active = false;
            return _tag;
        });
        if(_tags[0]) _tags[0].active = true;
        return _tags;
    } else {
        return [];
    }
}

const _goHome = () => {
    if(window.location.href.includes("view")){
        window.location = window.location.href.split("view")[0];
    }
};
