import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TopicViewComment from '/imports/components/comments/topicViewComment';

const ProfileCommentView = (props) => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-9 offset-md-1 mb-3 ma-3" style={{paddingTop: "1rem"}}>
            <TopicViewComment
                comment={props.comment}
                goToPost={props.goToPost}
                navStack={props.navStack}
            />
        </div>
    )
};
ProfileCommentView.propTypes = {
    comment: PropTypes.object.isRequired,
    goToPost: PropTypes.func.isRequired,
    navStack: PropTypes.object.isRequired
};
export default ProfileCommentView;
