import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import Profile from '/imports/components/profile/profile';
import ProfileQuery from '/imports/api/profile/profileQuery';

const ProfileContainer = (props) => {
    const {loading, error, data} = useQuery(ProfileQuery, {variables: {_id: props.navStack.current.viewContent}, pollInterval: 1000});
    const [activeTab, setActiveTab] = useState('posts');

    let content;

    const _getProfileComponent = (_user) => {
        return (
            <Profile
                navStack={props.navStack}
                user={_user}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                profileTags={_user.followedTopics ? _user.followedTopics : []}
            />
        )
    };

    if(props.user){
        content = _getProfileComponent(props.user);
    } else {
        if(loading){
            content = <Loading />
        } else if(error){
            content = <Error />
            console.log("ERROR:", error);
        } else if(data && data.getProfile){
            content = _getProfileComponent(data.getProfile);
        }else {
            content = <Empty message="oops, something went wrong :-("/>;
        }
    }

    return content;
};
ProfileContainer.propTypes = {
    user: PropTypes.object,
    viewSize: PropTypes.string,
    navStack: PropTypes.object.isRequired
};
export default ProfileContainer;
