import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import Share from '/imports/components/share/share';

const ShareContainer = (props) => {
    const shareContent = () => {
        if(Meteor.userId()){
            console.log("SHARE");
        }
    };
    const handleCancel = () => {
        console.log("CANCEL");
    };

    return (
        <Share
            post={props.post}
            shareContent={shareContent}
            handleCancel={handleCancel}
            shareCount={props.post.sharedBy.length}
            postPreview={props.postPreview}
            viewSize={"small"}
            registeredUser={Meteor.userId() ? true : false}
            navStack={props.navStack}
        />
    )
};
ShareContainer.propTypes = {
    post: PropTypes.object.isRequired,
    postPreview: PropTypes.bool,
    viewSize: PropTypes.string,
    navStack: PropTypes.object.isRequired
};
export default ShareContainer;
