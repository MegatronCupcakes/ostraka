import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import PaginationContainer from '/imports/components/pagination/paginationContainer';
import {dismissModals} from '/imports/api/util/dismissModals';
import {dateFormatter} from '/imports/api/util/dateFormatter';

const ScoreHistory = (props) => {
    return (
        <div>
            <PaginationContainer
                count={props.count}
                pageSize={props.pageSize}
                offset={props.offset}
                setOffset={props.setOffset}
                content={(
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">date</th>
                                <th scope="col">action</th>
                                <th scope="col">value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.history.map((record, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{dateFormatter(record.createdAt)}</td>
                                        <td className="text-wrap">
                                            {_actionDisplay(record.trigger, props.currentUserId)}<br />
                                            {record.trigger.actionType} {_dependencyDisplay(record, props.currentUserId)}
                                        </td>
                                        <td className={record.appliedValue < 0 ? "text-danger" : "text-success"}>{record.appliedValue}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            />
        </div>
    );
};
ScoreHistory.propTypes = {
    count: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    setOffset: PropTypes.func.isRequired,
    history: PropTypes.array.isRequired,
    currentUserId: PropTypes.string
};
export default ScoreHistory;

const _actionDisplay = (trigger, currentUserId) => {
    let _targetType;
    switch(trigger.targetContentType){
        case 'image':
            _targetType = "post";
            break;
        case 'link':
            _targetType = "post";
            break;
        case 'text':
            _targetType = "post";
            break;
        case 'video':
            _targetType = "post";
            break;
        case 'shared':
            _targetType = "post";
            break;
        default:
            _targetType = trigger.targetContentType;
            break;
    }
    return `${trigger.actingUserId == currentUserId ? 'you' : '@' + trigger.actingUserTag} ${_verbDisplay(trigger.action)} ${_directObjectDisplay(trigger, currentUserId, _targetType)}`;
};

const _dependencyDisplay = (record, currentUserId) => {
    if(record.trigger.dependentRelationship.length > 1){
        return record.trigger.dependentRelationship.map((relationShip, index) => {
            if(index === record.trigger.dependentRelationship.length - 1){
                return (<span key={index}>{relationShip.userId === currentUserId ? 'you' : relationShip.userTag}</span>);
            } else {
                return (
                    <span key={index}>{relationShip.userId === currentUserId ? 'you' : relationShip.userTag} <i className={"bi bi-arrow-right-short"}></i> </span>
                );
            }
        });
    }
};

const _verbDisplay = (verb) => {
    if(verb === 'ostracize'){
        return 'voted to ostracize';
    } else {
        return `${verb}${verb.charAt(verb.length - 1) === 'e' ? 'd' : 'ed'}`    ;
    }
};

const _directObjectDisplay = (trigger, currentUserId, targetType) => {
    if(targetType === 'profile'){
        return currentUserId === trigger.targetUserId ? 'you' : '@' + trigger.targetUserTag;
    } else {
        return `${trigger.targetUserId == currentUserId ? 'your' : '@' + trigger.targetUserTag + '\'s'} ${targetType}`;
    }

}
