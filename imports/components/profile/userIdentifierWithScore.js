import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {useOnScreen} from '/imports/api/util/useOnScreen';
import UserIdentifier from '/imports/components/profile/userIdentifier';
import Score from '/imports/components/profile/score';
import ShareContainer from '/imports/components/share/shareContainer';
import FollowContainer from '/imports/components/profile/followContainer';
import OstracizeContainer from '/imports/components/profile/ostracizeContainer';
import ScoreHistoryContainer from '/imports/components/profile/scoreHistoryContainer';

const UserIdentifierWithScore = (props) => {
    const elementRef = useRef(null);
    const isOnScreen = useOnScreen(elementRef);

    useEffect(() => {
        if(props.visibleCallback && isOnScreen) props.visibleCallback();
    }, [isOnScreen]);

    const modalId = props.user.viewId;
    const profileActions = props.noninteractive ? (<></>) : (
        <>
            <div style={{marginTop: "1rem"}}>
                <ShareContainer
                    sharedContent={props.user}
                    sharedType="profile"
                    viewSize={`profileAction ${props.viewSize}`}
                    noninteractive={props.noninteractive}
                    navStack={props.navStack}
                />
            </div>
            <div style={{paddingRight: "2rem", marginTop: "1rem"}}>
                <FollowContainer
                    user={props.user}
                    viewSize={`profileAction ${props.viewSize}`}
                    navStack={props.navStack}
                />
            </div>
            <div style={{paddingRight: "2rem", marginTop: "1rem"}}>
                <OstracizeContainer
                    user={props.user}
                    viewSize={`profileAction ${props.viewSize}`}
                    noninteractive={props.noninteractive}
                    navStack={props.navStack}
                />
            </div>
        </>
    );
    const scoreDisplay = props.noninteractive ? (
        <div style={{paddingRight: "2rem"}}>
            <Score
                reputationScore={props.user.reputationScore}
                viewSize={props.viewSize}
            />
        </div>
    ) : (
        <div style={{paddingRight: "2rem"}} data-bs-toggle="modal" data-bs-target={"#" + modalId}>
            <Score
                reputationScore={props.user.reputationScore}
                viewSize={props.viewSize}
            />
        </div>
    );
    const scoreHistoryModal = props.noninteractive ? (
        <></>
    ) : (
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={modalId + "_Label"} aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={modalId + "_ScoreHistory"}>{_modalUserDisplay(Meteor.userId(), props.user)} score history</h5>
                        <button type="button" className="btn-close dismissModal" aria-label="Close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <ScoreHistoryContainer
                            userId={props.user._id}
                            navStack={props.navStack}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><i className="bi bi-x-lg"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <div ref={elementRef} style={{paddingBottom: "1rem"}}>
            <UserIdentifier
                viewSize={props.viewSize}
                postedBy={props.user.profile.firstName + " " + props.user.profile.lastName}
                postedByTag={props.user.profile.profileTag}
                postedById={props.user._id}
                postedByProfilePic={props.user.profile.profileImage}
                navStack={props.navStack}
                location={props.user.profile.location}
            />
            <div className="d-flex flex-row-reverse bd-highlight" style={{}}>
                {profileActions}
                {scoreDisplay}
            </div>
            {scoreHistoryModal}
        </div>
    );
};
UserIdentifierWithScore.propTypes = {
    user: PropTypes.object.isRequired,
    noninteractive: PropTypes.bool.isRequired,
    viewSize: PropTypes.string,
    visibleCallback: PropTypes.func,
    navStack: PropTypes.object.isRequired
};
export default UserIdentifierWithScore;

const _modalUserDisplay = (currentUserId, modalUser) => {
    return currentUserId === modalUser._id ? 'your' : `@${modalUser.profile.profileTag}'s`;
}
