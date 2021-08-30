import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import TagsContainer from '../tags/tagsContainer';

import {TopicQuery} from '/imports/api/topic/topicQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import PostView from '/imports/components/feed/postView';
import TopicViewComment from '/imports/components/comments/topicViewComment';

const TopicsContainer = (props) => {
    if(props.navStack.currentTag || props.tag){
        const _tagId = props.tag ? props.tag._id : props.navStack.currentTag._id;
        const {loading, error, data} = useQuery(TopicQuery, {variables: {tagId: _tagId}, pollInterval: 1000});
        if(loading){
            topicContent = <Loading />;
        } else if(error){
            topicContent = <Error />;
        } else if(data && data.getTopic.length > 0){
            topicContent = data.getTopic.map((item, index) => {
                let component;
                switch(item.__typename){
                    case 'Post':
                    component = (
                        <PostView
                            key={index}
                            viewSize="small"
                            postPreview={props.postPreview}
                            navStack={props.navStack}
                            post={item}
                        />
                    )
                    break;
                    case 'Comment':
                    const goToPost = () => {
                        props.navStack.update({navState: "PostView", viewContent: item.parentId, activeTag: null});
                    }
                    component = (
                        <TopicViewComment
                            key={index}
                            comment={item}
                            goToPost={goToPost}
                            postPreview={props.postPreview}
                            navStack={props.navStack}
                        />
                    );
                    break;
                }
                return component;
            });
        } else {
            topicContent = <div></div>;
        }
    } else {
        // no tags found...
        topicContent = <div></div>;
    }

    return (
        <>
            <TagsContainer
                tag={props.tag}
                navStack={props.navStack}
            />
            {topicContent}
        </>
    );
};
TopicsContainer.propTypes = {
    tag: PropTypes.object,
    postPreview: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default TopicsContainer;
