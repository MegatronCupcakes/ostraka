import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import Image from './image';
import Link from './link';
import Text from './text';
import Video from './video';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import {GetPostById} from '/imports/api/post/postQuery';

const PostView = (props) => {

    let content;
    // if no post is specified (we only have an ID) then fetch the post via Apollo before displaying
    if(!props.post && _.isString(props.navStack.current.viewContent)){
        const {loading, error, data} = useQuery(GetPostById, {variables: {_id: props.navStack.current.viewContent}, pollInterval: 1000});
        if(loading){
            content = <Loading />
        } else if(error){
            content = <Error />
        } else if(data && data.getPost){
            content = _postContent(data.getPost, props);
        }else {
            content = <Empty message="oops, something went wrong :-("/>;
        }
    } else {
        content = _postContent(props.post ? props.post : props.navStack.current.viewContent, props);
    }
    if(props.viewSize && !props.postPreview){
        return (
            <div className="col-xs-12 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 mb-3 ma-3">
                {content}
            </div>
        )
    } else {
        return content;
    }
};
PostView.propTypes = {
    postPreview: PropTypes.bool,
    viewSize: PropTypes.string,
    post: PropTypes.object,
    navStack: PropTypes.object
};
export default PostView;

const _postContent = (post, props) => {
    let _content;
    switch(post.type){
        case 'image':
        _content = (
            <Image
                post={post}
                viewSize={props.viewSize}
                postPreview={props.postPreview}
                navStack={props.navStack}
            />
        );
        break;
        case 'link':
        _content = (
            <Link
                post={post}
                viewSize={props.viewSize}
                postPreview={props.postPreview}
                navStack={props.navStack}
            />
        );
        break;
        case 'text':
        _content = (
            <Text
                post={post}
                viewSize={props.viewSize}
                postPreview={props.postPreview}
                navStack={props.navStack}
            />
        );
        break;
        case 'video':
        _content = (
            <Video
                post={post}
                viewSize={props.viewSize}
                postPreview={props.postPreview}
                navStack={props.navStack}
            />
        );
        break;
    }
    return _content;
}
