import React from 'react';
import PropTypes from 'prop-types';
import TopicsContainer from '/imports/components/topics/topicsContainer';

const ViewSharedTopic = (props) => {
    if(props.postPreview){
        return (
            <div className="col-xs-12 col-sm-12 col-md-8 offset-md-2 mb-3 ma-3" style={{paddingTop: "1rem"}}>
                <TopicsContainer
                    tag={props.tag}
                    postPreview={props.postPreview}
                    navStack={props.navStack}
                />
            </div>
        )
    } else {
        return (
            <TopicsContainer
                tag={props.tag}
                postPreview={props.postPreview}
                navStack={props.navStack}
            />
        )
    }
};
ViewSharedTopic.propTypes = {
    tag: PropTypes.object.isRequired,
    postPreview: PropTypes.bool.isRequired,
    viewSize: PropTypes.string.isRequired,
    navStack: PropTypes.object.isRequired
};
export default ViewSharedTopic;
