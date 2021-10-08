import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {SharedContentQuery} from '/imports/api/share/sharedContentQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import Back from '/imports/components/nav/back';
import NavContainer from '/imports/components/nav/navContainer';
import ContentWrapper from '/imports/components/layout/contentWrapper';
import SharedViewNav from '/imports/components/share/sharedViewNav';
import ViewSharedPost from '/imports/components/share/viewSharedPost';
import ViewSharedTopic from '/imports/components/share/viewSharedTopic';
import ViewSharedProfile from '/imports/components/share/viewSharedProfile';
import ViewSharedComment from '/imports/components/share/viewSharedComment';


const ViewSharedContentContainer = (props) => {
    const {loading, error, data} = useQuery(SharedContentQuery, {variables: {viewId: props.viewId, sharedById: props.sharedById}});
    if(loading){
        content = <Loading />
    } else if(error){
        content = <Error error={error.message}/>
    } else if(data && data.getSharedContent){
        const _noninteractive = false; //!props.currentUser;
        switch(data.getSharedContent.__typename){
            case "Post":
                content = (
                    <ViewSharedPost
                        post={data.getSharedContent}
                        sharedById={props.sharedById}
                        noninteractive={_noninteractive}
                        viewSize={props.viewType && props.viewType == "embed" ? "small" : "large"}
                        viewType={props.viewType}
                        navStack={props.navStack}
                    />
                );
                break;
            case "Comment":
                content = (
                    <ViewSharedComment
                        comment={data.getSharedContent}
                        sharedById={props.sharedById}
                        noninteractive={_noninteractive}
                        viewSize={props.viewType && props.viewType == "embed" ? "small" : "large"}
                        viewType={props.viewType}
                        navStack={props.navStack}
                    />
                )
                break;
            case "Tag":
                data.getSharedContent.active = true;
                content = (
                    <ViewSharedTopic
                        tag={data.getSharedContent}
                        noninteractive={_noninteractive}
                        viewSize={props.viewType && props.viewType == "embed" ? "small" : "large"}
                        sharedById={props.sharedById}
                        viewType={props.viewType}
                        navStack={props.navStack}
                    />
                );
                break;
            case "User":
                content = (
                    <ViewSharedProfile
                        user={data.getSharedContent}
                        sharedById={props.sharedById}
                        noninteractive={_noninteractive}
                        viewSize={props.viewType && props.viewType == "embed" ? "small" : "large"}
                        viewType={props.viewType}
                        navStack={props.navStack}
                    />
                );
                break;
        }
    } else {
        content = <Empty message={`oops, something went wrong :-(`}/>;
    }
    if(props.viewType){
        switch(props.viewType){
            case 'embed':
                return (
                    <ContentWrapper content={content} />
                );
                break;
        }
    } else {
        return (
            <>
            {_chooseNav(props.currentUser, props.navStack, props.noUserState, props.setNoUserState, props.setNoUserState, props.resetClientStore)}
            <Back navStack={props.navStack} />
            <ContentWrapper content={content} />
            </>
        );
    }
};
ViewSharedContentContainer.propTypes = {
    viewId: PropTypes.string.isRequired,
    sharedById: PropTypes.string.isRequired,
    viewType: PropTypes.string,
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
