import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {SharedContentQuery} from '/imports/api/share/sharedContentQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import Back from '/imports/components/nav/back';
import NavContainer from '/imports/components/nav/navContainer';
import SharedViewNav from '/imports/components/share/sharedViewNav';
import ViewSharedPost from '/imports/components/share/viewSharedPost';
import ViewSharedTopic from '/imports/components/share/viewSharedTopic';
import ViewSharedProfile from '/imports/components/share/viewSharedProfile';

const ViewSharedContentContainer = (props) => {
    const {loading, error, data} = useQuery(SharedContentQuery, {variables: {viewId: props.viewId}, pollInterval: 1000});
    if(loading){
        content = <Loading />
    } else if(error){
        content = <Error />
    } else if(data && data.getSharedContent){
        const _postPreview = false; //!props.currentUser;
        switch(data.getSharedContent.__typename){
            case "Post":
                content = (
                    <ViewSharedPost
                        post={data.getSharedContent}
                        postPreview={_postPreview}
                        viewSize="large"
                        navStack={props.navStack}
                    />
                );
                break;
            case "Tag":
                content = (
                    <ViewSharedTopic
                        tag={data.getSharedContent}
                        postPreview={_postPreview}
                        viewSize="large"
                        navStack={props.navStack}
                    />
                );
                break;
            case "User":
                content = (
                    <ViewSharedProfile
                        user={data.getSharedContent}
                        postPreview={_postPreview}
                        viewSize="large"
                        navStack={props.navStack}
                    />
                );
                break;
        }
    }else {
        content = <Empty message="oops, something went wrong :-("/>;
    }

    return (
        <>
            {_chooseNav(props.currentUser, props.navStack, props.noUserState, props.setNoUserState, props.setNoUserState, props.resetClientStore)}
            <Back
                navStack={props.navStack}
            />
            {content}
        </>
    );
};
ViewSharedContentContainer.propTypes = {
    viewId: PropTypes.string.isRequired,
    currentUser: PropTypes.object,
    navStack: PropTypes.object.isRequired,
    noUserState: PropTypes.string.isRequired,
    setNoUserState: PropTypes.func.isRequired,
    resetClientStore: PropTypes.func.isRequired
};
export default ViewSharedContentContainer;

const _chooseNav = (currentUser, navStack, noUserState, setNoUserState, resetClientStore) => {
    if(currentUser){
        return (
            <NavContainer
                user={currentUser}
                noUserState={noUserState}
                setNoUserState={setNoUserState}
                navStack={navStack}
                resetClientStore={resetClientStore}
            />
        );
    } else {
        return (
            <SharedViewNav
                navStack={navStack}
            />
        );
    }
};
