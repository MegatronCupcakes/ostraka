import _ from 'underscore';
import {dismissModals} from '/imports/api/util/dismissModals';
import MeteorCall from '/imports/api/util/callPromise';

export const goTo = async (viewContent, contentType, navStack, viewType, sharedById) => {
    dismissModals();
    let navStackUpdate;
    switch(contentType){
        case "post":
            navStackUpdate = {navState: 'PostView', viewContent: viewContent, activeTag: null};
            break;
        case "profile":
            navStackUpdate = {navState: 'Profile', viewContent: _.isObject(viewContent) ? viewContent._id : viewContent, activeTag: null};
            break;
        case "tag":
            navStackUpdate = {navState: 'TagView', viewContent: viewContent, activeTag: null, tags: [viewContent]}
            break;
    };
    switch(viewType){
        case 'embed':
            window.open(await MeteorCall('createShareUrl', contentType, _.isObject(viewContent) ? viewContent._id : viewContent, sharedById), "_blank");
            break;
        default:
            if(window) window.scrollTo(0,0);  // scroll to top of window when rendering a new view.
            navStack.update(navStackUpdate);
            break;
    };
};
