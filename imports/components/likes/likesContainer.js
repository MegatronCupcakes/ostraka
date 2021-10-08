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
    const [likeThumbClass, setLikeThumbClass] = useState(
        !Meteor.userId() || props.userId === Meteor.userId() || props.noninteractive ? _disabledLike : (props.liked ? _clickedLike : _unclickedLike)
    );
    const [dislikeThumbClass, setDislikeThumbClass] = useState(
        !Meteor.userId() || props.userId === Meteor.userId() || props.noninteractive ? _disabledDislike : (props.disliked ? _clickedDislike :_unclickedDislike)
    );

    const handleLikeClick = ({target}) => {
        // new post previews don't contain a likedId (because the post hasn't been posted yet);
        // prevent liking of un-posted content.
        if(Meteor.userId() && props.likedId && props.userId !== Meteor.userId()){
            const action = likeThumbClass === _unclickedLike ? "like" : "unlike";
            MeteorCall('likePost', props.likedId, props.likedType, action).
            catch((error) => {
                // show error
                console.log("LIKE ERROR:", error);
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
        if(props.likedId && props.userId !== Meteor.userId()){
            const action = dislikeThumbClass === _unclickedDislike ? "dislike" : "undislike";
            MeteorCall('likePost', props.likedId, props.likedType, action).
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
                count={props.likeCount}
                thumbClass={likeThumbClass}
                thumbClick={handleLikeClick}
                viewSize={props.viewSize}
                label="like"
            />
            <Likes
                count={props.dislikeCount}
                thumbClass={dislikeThumbClass}
                thumbClick={handleDislikeClick}
                viewSize={props.viewSize}
                label="dislike"
            />
        </>
    )
};
LikesContainer.propTypes = {
    viewSize: PropTypes.string,
    noninteractive: PropTypes.bool,
    userId: PropTypes.string,
    likedId: PropTypes.string,
    likedType: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    liked: PropTypes.bool.isRequired,
    dislikeCount: PropTypes.number.isRequired,
    disliked: PropTypes.bool.isRequired
};
export default LikesContainer;
