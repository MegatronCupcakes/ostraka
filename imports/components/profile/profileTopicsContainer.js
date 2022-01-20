import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import ProfileTagsContainer from '/imports/components/tags/profileTagsContainer';
import {TopicQuery} from '/imports/api/topic/topicQuery';
import PostView from '/imports/components/feed/postView';
import TopicViewComment from '/imports/components/comments/topicViewComment';

const ProfileTopicsContainer = (props) => {
    const [activeTag, setActiveTag] = useState(props.profileTags[0]);
    let topicContent;
    if(activeTag){
        const {loading, error, data, fetchMore} = useQuery(TopicQuery, {variables: {tagId: activeTag._id, offset: 0}, pollInterval: Meteor.settings.public.pollInterval});
        const moreChunks = useCallback(_.debounce((count) => {
            fetchMore({
                variables: {
                    tagId: activeTag._id,
                    offset: count
                }
            });
        }, 100, true), []);
        if(loading){
            topicContent = <Loading />;
        } else if(error){
            topicContent = <Error />;
        } else if(data && data.getTopic.length > 0){
            topicContent = data.getTopic.map((item, index) => {
                let component;
                const visibleCallback = () => {
                    if(index === data.getTopic.length - 1){
                        moreChunks(data.getTopic.length);
                    }
                };
                switch(item.__typename){
                    case 'Post':
                        component = (
                            <PostView
                                key={index}
                                viewSize="small"
                                navStack={props.navStack}
                                post={item}
                                visibleCallback={visibleCallback}
                            />
                        )
                        break;
                    case 'Comment':
                        component = (
                            <TopicViewComment
                                key={index}
                                comment={item}
                                viewSize={props.viewSize}
                                viewType={props.viewType}
                                navStack={props.navStack}
                                visibleCallback={visibleCallback}
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
            <ProfileTagsContainer
                navStack={props.navStack}
                tags={props.profileTags}
                activeTag={activeTag}
                setActiveTag={setActiveTag}
            />
            {topicContent}
        </>
    )
};
ProfileTopicsContainer.propTypes = {
    navStack: PropTypes.object.isRequired,
    profileTags: PropTypes.array.isRequired,
    viewSize: PropTypes.string,
    viewType: PropTypes.string
};
export default ProfileTopicsContainer;
