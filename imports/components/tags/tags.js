import React from 'react';
import PropTypes from 'prop-types';
import ShareContainer from '/imports/components/share/shareContainer';

const Tags = (props) => {
    const tags = props.tags.map((tag, index) => {
        const _tagClasses = tag == props.activeTag ? 'tag active' : 'tag';
        return (
            <span className={_tagClasses} key={index} onClick={() => {props.handleTagClick(tag)}}>#{tag.tag}</span>
        )
    });
    return (
        <div className="row">
            <div className="col-xs-10 offset-xs-1 col-sm-8 offset-sm-2 tags justify-content-center" style={{paddingTop: "1em", textAlign: "center"}}>
                {tags}
            </div>
            <div className="clearfix col-xs-1 col-sm-2">
                <ShareContainer
                    sharedContent={props.activeTag}
                    sharedType="tag"
                    displaySize="medium"
                    noninteractive={false}
                    navStack={props.navStack}
                />
            </div>
        </div>

    )
};
Tags.propTypes = {
    tags: PropTypes.array.isRequired,
    activeTag: PropTypes.object.isRequired,
    handleTagClick: PropTypes.func.isRequired,
    navStack: PropTypes.object.isRequired
};
export default Tags;
