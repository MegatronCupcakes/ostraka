import React from 'react';
import PropTypes from 'prop-types';
import {Random} from 'meteor/random';

import PostSupplementals from './postSupplementals';
import UserIdentifier from './userIdentifier';
import PostCaption from './postCaption';

const Image = (props) => {
    const carouselId = Random.id();
    return (
        <div className="mb-3 fade-in row align-items-start post">
            <div className="col">
                <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {props.images.map((image, index) => {
                            const _classes = index === 0 ? 'carousel-item active' : 'carousel-item';
                            return (
                                <div className={_classes} key={index} >
                                    <img src={image} className="d-block w-100" alt="oops... couldn't load this image :-("/>
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
            <div className="col">
                <UserIdentifier
                    postedBy={props.postedBy}
                    postedById={props.postedById}
                    postedByTag={props.postedByTag}
                    postedByProfilePic={props.postedByProfilePic}
                />
                <PostCaption
                    caption={props.caption}
                    tags={props.tags}
                    mentions={props.mentions}
                />
                <PostSupplementals
                    postId={props.postId}
                    likedType="Image"
                    tags={props.tags}
                    mentions={props.mentions}
                    likes={props.likes}
                    dislikes={props.dislikes}
                    comments={props.comments}
                />
            </div>
        </div>
    )
};
Image.propTypes = {
    postId: PropTypes.string,
    postedBy: PropTypes.string.isRequired,
    postedByTag: PropTypes.string.isRequired,
    postedById: PropTypes.string.isRequired,
    postedByProfilePic: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    caption: PropTypes.string,
    tags: PropTypes.array.isRequired,
    mentions: PropTypes.array.isRequired,
    likes: PropTypes.array.isRequired,
    dislikes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired
};
export default Image;
