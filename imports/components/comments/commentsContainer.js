import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import CommentQuery from '/imports/api/comments/commentQuery';
import CommentAndActions from '/imports/components/comments/commentAndActions';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';

const CommentsContainer = (props) => {

    const {loading, error, data, fetchMore} = useQuery(CommentQuery, {variables: {parentId: props.parentId}, pollInterval: Meteor.settings.public.pollInterval});

    const moreChunks = useCallback(_.debounce((count) => {
        fetchMore({
            variables: {
                parentId: props.parentId,
                offset: count
            }
        });
    }, 100, true), []);

    let comments;

    if(props.parentId && loading){
        comments = (<Loading />);
    } else if(props.parentId && error){
        console.log("Error:", error);
        comments =( <Error message={error}/>);
    } else if(props.parentId && data.getComments && data.getComments.length > 0){
        comments = data.getComments.map((comment, index) => {
            const _visibleCallback = () => {
                if(index === data.getComments.length - 1){
                    moreChunks(data.getComments.length);
                }
            };
            return (
                <CommentAndActions
                    key={index}
                    comment={comment}
                    sharedById={props.sharedById}
                    viewType={props.viewType}
                    viewSize={props.viewSize}
                    noninteractive={props.noninteractive}
                    visibleCallback={_visibleCallback}
                    navStack={props.navStack}
                />
            )
        });
    } else {
        comments = (<></>);
    }

    return (
        <>
            {comments}
        </>
    )
};
CommentsContainer.propTypes = {
    parentId: PropTypes.string,
    sharedById: PropTypes.string,
    viewType: PropTypes.string, // "embed" and perhaps other specialized content views.
    viewSize: PropTypes.string,
    noninteractive: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default CommentsContainer;
