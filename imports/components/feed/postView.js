import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {useOnScreen} from '/imports/api/util/useOnScreen';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import {GetPostById} from '/imports/api/post/postQuery';
import PostSupplementals from '/imports/components/feed/postSupplementals';
import UserIdentifier from '/imports/components/profile/userIdentifier';
import UserIdentifierGoToPost from '/imports/components/profile/userIdentifierGoToPost';
import PostCaption from '/imports/components/feed/postCaption';
import Image from '/imports/components/feed/image';
import Link from '/imports/components/feed/link';
import Text from '/imports/components/feed/text';
import Video from '/imports/components/feed/video';
import SharedPost from '/imports/components/feed/sharedPost';

const PostView = (props) => {
    const elementRef = useRef(null);
    const isOnScreen = useOnScreen(elementRef);

    useEffect(() => {
        if(props.visibleCallback && isOnScreen) props.visibleCallback();
    }, [isOnScreen]);

    let content;
    // if no post is specified (we only have an ID) then fetch the post via Apollo before displaying;
    if(!props.post && (props.sharedContentId || _.isString(props.navStack.current.viewContent))){
        const lookUpId = props.sharedContentId ? props.sharedContentId : props.navStack.current.viewContent;
        const {loading, error, data} = useQuery(GetPostById, {variables: {_id: lookUpId}, pollInterval: Meteor.settings.public.pollInterval});
        if(loading){
            content = <Loading />
        } else if(error){
            content = <Error />
        } else if(data && data.getPost){
            content = postContent(data.getPost, props);
        }else {
            content = <Empty message="oops, something went wrong :-(" />;
        }
    } else {
        content = postContent(props.post ? props.post : props.navStack.current.viewContent, props);
    }
    return (
        <>
            <div ref={elementRef}>
                {content}
            </div>
        </>
    );
};
PostView.propTypes = {
    post: PropTypes.object,
    noninteractive: PropTypes.bool,
    viewSize: PropTypes.string,
    viewType: PropTypes.string, // "embed" and perhaps other specialized content views.
    sharedContentId: PropTypes.string,
    sharedById: PropTypes.string,
    navStack: PropTypes.object,
    visibleCallback: PropTypes.func
};
export default PostView;

export const postContent = (post, props) => {
    const frameId = props.viewType === "embed" ? props.post.viewId + props.sharedById : "";
    const _userIdentifier = props.viewSize !== 'large' ? (
        <UserIdentifierGoToPost
            viewSize={props.viewSize}
            viewType={props.viewType}
            sharedById={props.sharedById}
            post={post}
            noninteractive={props.noninteractive}
            navStack={props.navStack}
            date={post.createdAt}
        />
    ) : (
        <UserIdentifier
            viewSize={props.viewSize}
            viewType={props.viewType}
            sharedById={props.sharedById}
            postedBy={post.postedBy}
            postedByTag={post.postedByTag}
            postedById={post.postedById}
            postedByProfilePic={post.postedByProfilePic}
            noninteractive={props.noninteractive}
            navStack={props.navStack}
            date={post.createdAt}
        />
    );
    const _captionRow = post.type === "text" ? (
        <></>
    ) : (
        <div className="row">
            <PostCaption
                viewSize={props.viewSize}
                caption={post.caption}
                tags={post.tags}
                tagIds={post.tagIds}
                mentions={post.mentions}
                mentionIds={post.mentionIds}
                navStack={props.navStack}
                viewType={props.viewType}
                sharedById={props.sharedById}
            />
        </div>
    );
    let _content;
    switch(post.type){
        case 'image':
        _content = (
            <Image
                post={post}
                viewSize={props.viewSize}
                viewType={props.viewType}
                sharedById={props.sharedById}
                noninteractive={props.noninteractive}
                navStack={props.navStack}
            />
        );
        break;
        case 'link':
        _content = (
            <Link
                post={post}
                viewSize={props.viewSize}
                viewType={props.viewType}
                sharedById={props.sharedById}
                noninteractive={props.noninteractive}
                navStack={props.navStack}
            />
        );
        break;
        case 'text':
        _content = (
            <Text
                post={post}
                viewSize={props.viewSize}
                viewType={props.viewType}
                sharedById={props.sharedById}
                noninteractive={props.noninteractive}
                navStack={props.navStack}
            />
        );
        break;
        case 'video':
        _content = (
            <Video
                post={post}
                viewSize={props.viewSize}
                viewType={props.viewType}
                sharedById={props.sharedById}
                noninteractive={props.noninteractive}
                navStack={props.navStack}
            />
        );
        break;
        case 'shared':
        _content = (
            <SharedPost
                post={post}
                viewSize={props.viewSize}
                viewType={props.viewType}
                sharedById={props.sharedById}
                noninteractive={props.noninteractive}
                navStack={props.navStack}
            />
        )
        break;
    }
    return (
        <div id={frameId} className="row">
            <div className="col-md-6 col-sm-12">
                <div className={props.sharedContentId ? "fade-in row sharedPost" : "fade-in row post"} style={{paddingBottom: "0.5rem"}}>
                    {_content}
                </div>
            </div>
            <div className="col-md-6 col-sm-12">
                <div className="row" style={{paddingBottom: "0.5rem"}}>
                    {_userIdentifier}
                </div>
                {_captionRow}
                <div className="row" style={{paddingBottom: "0.5rem"}}>
                    <PostSupplementals
                        post={post}
                        viewSize={props.viewSize}
                        noninteractive={props.noninteractive}
                        navStack={props.navStack}
                        viewType={props.viewType}
                        sharedById={props.sharedById}
                    />
                </div>
            </div>
        </div>
    )
}
