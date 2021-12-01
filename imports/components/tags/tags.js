import React from 'react';
import PropTypes from 'prop-types';
import ShareContainer from '/imports/components/share/shareContainer';

const Tags = (props) => {
    const tags = props.tags.map((tag, index) => {
        const _handleUnfollowClick = () => {
            props.handleUnfollowClick(tag._id, tag.tag);
        };
        const _handleFollowClick = () => {
            props.handleFollowClick(tag._id, tag.tag);
        };
        return tag._id == props.activeTag._id ? (
            <span className="tag active" key={index}>
                <span style={{verticalAlign: "middle"}}>#{tag.tag}</span>
                <span style={{verticalAlign: "middle"}}>
                    <ShareContainer
                        sharedContent={props.activeTag}
                        sharedType="tag"
                        viewSize="small unpadded padLeft"
                        noninteractive={false}
                        navStack={props.navStack}
                    />
                </span>
                {tag.followed ? (
                    <span style={{verticalAlign: "middle"}}>
                        <i className="bi bi-trash userAction small unpadded padLeft" data-bs-toggle="tooltip" data-bs-placement="top" title="unfollow" onClick={_handleUnfollowClick}></i>
                    </span>
                ) : (
                    <span style={{verticalAlign: "middle"}}>
                        <i className="bi bi-plus-lg userAction small unpadded padLeft" data-bs-toggle="tooltip" data-bs-placement="top" title="follow" onClick={_handleFollowClick}></i>
                    </span>
                )}

            </span>
        ) : (
            <span className="tag" key={index} onClick={() => {props.handleTagClick(tag)}}><span style={{verticalAlign: "middle"}}>#{tag.tag}</span></span>
        );
    });
    return (
        <div className="row">
            <div className="col-xs-10 offset-xs-1 col-sm-8 offset-sm-2 tags justify-content-center" style={{paddingTop: "1em", textAlign: "center"}}>
                {tags}
            </div>
        </div>

    )
};
Tags.propTypes = {
    tags: PropTypes.array.isRequired,
    activeTag: PropTypes.object.isRequired,
    handleTagClick: PropTypes.func.isRequired,
    handleFollowClick: PropTypes.func.isRequired,
    handleUnfollowClick: PropTypes.func.isRequired,
    navStack: PropTypes.object.isRequired
};
export default Tags;
