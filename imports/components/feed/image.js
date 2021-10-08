import React from 'react';
import PropTypes from 'prop-types';
import {Random} from 'meteor/random';
import {goTo} from '/imports/api/navStack/goTo';


const Image = (props) => {
    const carouselId = Random.id();
    const _handlePostClick = () => {
        goTo(props.post, "post", props.navStack, props.viewType, props.sharedById);
    };
    return (
        <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
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
    );
};
Image.propTypes = {
    post: PropTypes.object.isRequired,
    sharedById: PropTypes.string,
    viewType: PropTypes.string, // "embed" and perhaps other specialized content views.
    viewSize: PropTypes.string,
    noninteractive: PropTypes.bool,
    navStack: PropTypes.object.isRequired
};
export default Image;
