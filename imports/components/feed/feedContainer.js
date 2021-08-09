import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useTracker} from 'meteor/react-meteor-data';

import NewPostContainer from './newPostContainer';
import Image from './image';
import Link from './link';
import Text from './text';
import Video from './video';

import {devContent} from '../../../tests/feed_data';

const FeedContainer = (props) => {
    let feedContent = devContent.map((post, index) => {
        let content;
        switch(post.type){
            case 'image':
            content = (
                <Image
                    key={index}
                    postId={post._id}
                    postedBy={post.postedBy}
                    postedByTag={post.postedByTag}
                    postedById={post.postedById}
                    postedByProfilePic={post.postedByProfilePic}
                    images={post.images}
                    caption={post.caption}
                    tags={post.tags}
                    mentions={post.mentions}
                    likes={post.likes}
                    dislikes={post.dislikes}
                    comments={post.comments}
                />
            );
            break;
            case 'link':
            content = (
                <Link
                    key={index}
                    postId={post._id}
                    postedBy={post.postedBy}
                    postedByTag={post.postedByTag}
                    postedById={post.postedById}
                    postedByProfilePic={post.postedByProfilePic}
                    url={post.url}
                    caption={post.caption}
                    tags={post.tags}
                    mentions={post.mentions}
                    likes={post.likes}
                    dislikes={post.dislikes}
                    comments={post.comments}
                />
            );
            break;
            case 'text':
            content = (
                <Text
                    key={index}
                    postId={post._id}
                    postedBy={post.postedBy}
                    postedById={post.postedById}
                    postedByTag={post.postedByTag}
                    postedByProfilePic={post.postedByProfilePic}
                    caption={post.caption}
                    tags={post.tags}
                    mentions={post.mentions}
                    likes={post.likes}
                    dislikes={post.dislikes}
                    comments={post.comments}
                />
            );
            break;
            case 'video':
            content = (
                <Video
                    key={index}
                    postId={post._id}
                    postedBy={post.postedBy}
                    postedById={post.postedById}
                    postedByTag={post.postedByTag}
                    postedByProfilePic={post.postedByProfilePic}
                    url={post.url}
                    caption={post.caption}
                    tags={post.tags}
                    mentions={post.mentions}
                    likes={post.likes}
                    dislikes={post.dislikes}
                    comments={post.comments}
                />
            );
            break;
        }
        return content;
    });
    return (
        <>
            <NewPostContainer />
            <div className="col-sm-12 col-md-6 offset-md-3 mb-3 ma-3">
                {feedContent}
            </div>
        </>
    )
};
FeedContainer.propTypes = {

};
export default FeedContainer;
