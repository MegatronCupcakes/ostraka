import React from 'react';
import PropTypes from 'prop-types';
import {Random} from 'meteor/random';

import PostSupplementals from '/imports/components/feed/postSupplementals';
import UserIdentifier from '/imports/components/feed/userIdentifier';
import UserIdentifierGoToPost from '/imports/components/feed/userIdentifierGoToPost';
import PostCaption from '/imports/components/feed/postCaption';

const Image = (props) => {

    const carouselId = Random.id();
    const _imageClasses = props.viewSize ? 'postImage_' + props.viewSize : 'postImage_small';
    const _carouselClasses = props.viewSize ? 'carousel-inner postImage_' + props.viewSize : 'carousel-inner';

    const _handlePostClick = () => {
        props.setNavContentState([...props.navContentState, {navState: 'PostView', viewContent: props.post, activeTag: null}]);
    }

    const _userIdentifier = props.viewSize !== 'large' ? (
        <UserIdentifierGoToPost
            displaySize={props.post.viewSize}
            postedBy={props.post.postedBy}
            postedByTag={props.post.postedByTag}
            postedById={props.post.postedById}
            postedByProfilePic={props.post.postedByProfilePic}
            post={props.post}
            postPreview={props.postPreview}
            navStack={props.navStack}
        />
    ) : (
        <UserIdentifier
            displaySize={props.post.viewSize}
            postedBy={props.post.postedBy}
            postedByTag={props.post.postedByTag}
            postedById={props.post.postedById}
            postedByProfilePic={props.post.postedByProfilePic}
            postPreview={props.postPreview}
            navStack={props.navStack}
        />
    );

    return (
        <div className="mb-3 fade-in row align-items-left post">
            <div className="col-xs-12 col-sm-6 postImage_background">
                <div className="row">
                    <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
                        <div className={_carouselClasses}>
                            {props.post.images.map((image, index) => {
                                const _classes = index === 0 ? 'carousel-item active' : 'carousel-item';
                                return (
                                    <div className={_classes} key={index} >
                                        <img src={image} className="d-block w-100 rounded" alt="oops... couldn't load this image :-(" onClick={_handlePostClick} />
                                    </div>
                                );
                            })}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target={'#' + carouselId} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={'#' + carouselId} data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-6">
                {_userIdentifier}
                <PostCaption
                    caption={props.post.caption}
                    tags={props.post.tags}
                    tagIds={props.post.tagIds}
                    mentions={props.post.mentions}
                    mentionIds={props.post.mentionIds}
                    navStack={props.navStack}
                />
                <PostSupplementals
                    post={props.post}
                    viewSize={props.viewSize}
                    postPreview={props.postPreview}
                    navStack={props.navStack}
                />
            </div>
        </div>
    )
};
Image.propTypes = {
    post: PropTypes.object.isRequired,
    viewSize: PropTypes.string,
    postPreview: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default Image;
