import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import TagsContainer from '../tags/tagsContainer';

import {TopicQuery} from '/imports/api/topic/topicQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import ContentWrapper from '/imports/components/layout/contentWrapper';
import PostView from '/imports/components/feed/postView';
import TopicViewComment from '/imports/components/comments/topicViewComment';

const TopicsContainer = (props) => {
    if(props.navStack.currentTag || props.tag){
        const _tagId = props.tag ? props.tag._id : props.navStack.currentTag._id;
        const {loading, error, data, fetchMore} = useQuery(TopicQuery, {variables: {tagId: _tagId}, pollInterval: 1000});

        const moreChunks = useCallback(_.debounce((count) => {
            fetchMore({
                variables: {offset: count}
            });
        }, 1000, true), []);

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
                                post={item}
                                sharedById={props.sharedById}
                                viewType={props.viewType}
                                viewSize="small"
                                noninteractive={props.noninteractive}
                                navStack={props.navStack}
                                visibleCallback={() => {if(index === data.getTopic.length - 1) moreChunks(data.getTopic.length)}}
                            />
                        );
                        break;
                    case 'Comment':
                        component = (
                            <TopicViewComment
                                comment={item}
                                sharedById={props.sharedById}
                                viewType={props.viewType}
                                noninteractive={props.noninteractive}
                                navStack={props.navStack}
                                viewSize={props.viewSize}
                                viewType={props.viewType}
                                visibleCallback={() => {if(index === data.getTopic.length - 1) moreChunks(data.getTopic.length)}}
                            />
                        );
                        break;
                }
                return (
                    <ContentWrapper content={component} key={index}/>
                );
            });
        } else {
            topicContent = <Empty message="oops, nothing found..."/>;
        }
    } else {
        // no tags found...
        topicContent = <Empty message="oops, nothing found..."/>;
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
    noninteractive: PropTypes.bool,
    navStack: PropTypes.object.isRequired,
    viewSize: PropTypes.string,
    sharedById: PropTypes.string,
    viewType: PropTypes.string,
};
export default TopicsContainer;
