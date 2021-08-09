import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import MeteorCall from '../../api/util/callPromise';
import Likes from './likes';

const _unclickedLike = 'bi bi-hand-thumbs-up';
const _clickedLike = 'bi bi-hand-thumbs-up-fill';

const _unclickedDislike = 'bi bi-hand-thumbs-down';
const _clickedDislike = 'bi bi-hand-thumbs-down-fill';

const _disabledLike = _unclickedLike + ' disabled';
const _disabledDislike = _unclickedDislike + ' disabled';

const LikesContainer = (props) => {
    const [likeThumbClass, setLikeThumbClass] = useState(_unclickedLike);
    const [dislikeThumbClass, setDislikeThumbClass] = useState(_unclickedDislike);

    const handleLikeClick = ({target}) => {
        // new post previews don't contain a likedId (because the post hasn't been posted yet);
        // prevent liking of un-posted content.
        if(props.likedId){
            MeteorCall('likePost', props.likedId, props.likedType, "like").
            catch((error) => {
                // show error
            })
            .then(() => {
                setLikeThumbClass(likeThumbClass === _unclickedLike ? _clickedLike : _unclickedLike);
                setDislikeThumbClass(_unclickedDislike);
            });
        }
    }

    const handleDislikeClick = ({target}) => {
        // new post previews don't contain a likedId (because the post hasn't been posted yet);
        // prevent disliking of un-posted content.
        if(props.likedId){
            MeteorCall('likePost', props.likedId, props.likedType, "dislike").
            catch((error) => {
                // show error
            })
            .then(() => {
                setDislikeThumbClass(dislikeThumbClass === _unclickedDislike ? _clickedDislike : _unclickedDislike);
                setLikeThumbClass(_unclickedLike);
            });
        }
    }

    return (
        <>
            <Likes
                likes={props.likes}
                thumbClass={likeThumbClass}
                thumbClick={handleLikeClick}
            />
            <Likes
                likes={props.dislikes}
                thumbClass={dislikeThumbClass}
                thumbClick={handleDislikeClick}
            />
        </>
    )
};
LikesContainer.propTypes = {
    likedId: PropTypes.string,
    likedType: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    dislikes: PropTypes.array.isRequired
};
export default LikesContainer;
