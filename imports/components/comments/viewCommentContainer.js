import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {CommentByIdQuery} from '/imports/api/comments/commentQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import TopicViewComment from '/imports/components/comments/topicViewComment';

const ViewCommentContainer = (props) => {
    const {loading, error, data} = useQuery(CommentByIdQuery, {variables: {_id: props.navStack.current.viewContent}, pollInterval: 1000});
    let alternativeMessage;
    if(loading){
        return <Loading />;
    } else if(error){
        console.log("ERROR:", error);
        return <Error />;
    } else if(data && data.getCommentById){
        console.log("data.getCommentById:" + data.getCommentById);
        if(data.getCommentById.length < 1){
            return <Empty message="no notifications"/>;
        } else {
            return (
                <TopicViewComment
                    comment={data.getCommentById}
                    viewSize='medium'
                    viewType='CommentView'
                    sharedById=''
                    navStack={props.navStack}
                />
            );
        }
    } else {
        return <Empty message="oops, something went wrong :-("/>;
    }
};
ViewCommentContainer.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default ViewCommentContainer;
