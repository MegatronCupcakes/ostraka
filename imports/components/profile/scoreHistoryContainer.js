import React, {useState} from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import ScoreHistory from '/imports/components/profile/scoreHistory';
import {HistoryQuery} from '/imports/api/history/historyQuery';
import {dismissModals} from '/imports/api/util/dismissModals';

const ScoreHistoryContainer = (props) => {
    const {loading, error, data} = useQuery(HistoryQuery, {variables: {_id: props.userId}, pollInterval: 1000});
    const _goToSupport = () => {
        dismissModals();
        props.navStack.update({navState: "Support", viewContent: null, activeTag: null});
    };
    if(loading){
        content = <Loading />
    } else if(error){
        content = <Error />
        console.log("ERROR:", error);
    } else if(data && data.getUserHistory){
        if(data.getUserHistory.length > 0){
            content = data.getUserHistory.map((record, index) => {
                return (
                    <ScoreHistory key={index} record={record}/>
                );
            });
        } else {
            content = props.userId === Meteor.userId() ? (
                <div className="emptyFeed">Nothing has impacted your score yet. For more information on how scoring works, please check the <span onClick={_goToSupport}>Support</span> section.</div>
            ) : (
                <div className="emptyFeed">Nothing has impacted this user's score yet. For more information on how scoring works, please check the <span onClick={_goToSupport}>Support</span> section.</div>
            );
        }
    }else {
        content = <Empty message="oops, something went wrong :-("/>;
    }
    return content;
};
ScoreHistoryContainer.propTypes = {
    userId: PropTypes.string.isRequired,
    navStack: PropTypes.object.isRequired
};
export default ScoreHistoryContainer;
