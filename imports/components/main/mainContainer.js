import React, {useState, useEffect} from 'react';
import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import {useTracker} from 'meteor/react-meteor-data';
import {InMemoryCache, ApolloProvider, ApolloClient, ApolloLink} from '@apollo/client';
import {BatchHttpLink} from '@apollo/client/link/batch-http';
import {MeteorAccountsLink} from 'meteor/apollo';
import {useDetectAdBlock} from 'adblock-detect-react';

import {ContentNavState} from '/imports/api/navStack/contentNavState';
import {Loading} from '/imports/components/loadingStatus/loadingStatus';
import Back from '/imports/components/nav/back';
import NavContainer from '../nav/navContainer';
import AccountContainer from '../account/accountContainer';
import FeedContainer from '../feed/feedContainer';
import TopicsContainer from '../topics/topicsContainer';
import PostView from '/imports/components/feed/postView';
import ViewSharedContentContainer from '/imports/components/share/viewSharedContentContainer';
import ProfileContainer from '/imports/components/profile/profileContainer';
import FriendsProfileContainer from '/imports/components/profile/friendsProfileContainer';
import TrendingProfilesContainer from '/imports/components/profile/trendingProfilesContainer';
import TrendingTopicsContainer from '/imports/components/topics/trendingTopicsContainer';

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

MeteorAccountsLink({headerName: 'meteor-login-token'});

const link = ApolloLink.from([
    new MeteorAccountsLink(),
    new BatchHttpLink({
        uri: '/graphql',
        batchMax: 10, // No more than 5 operations per batch
        batchInterval: 20 // Wait no more than 20ms after first batched operation
    })
]);

const client = new ApolloClient({
    uri: '/graphql',
    cache,
    link,
});

export default function MainContainer(props){
    const [noUserState, setNoUserState] = useState('Login');
    const [adsBlocked, setAdsBlocked] = useState(false);
    const [viewingPost, viewId] = _viewingPost(); // [false, null]

    const adBlockDetected = useDetectAdBlock();
    useEffect(() => {
        if(adBlockDetected) setAdsBlocked(true);
    }, []);
    useEffect(() => {

    }, []);


    const loggingIn = useTracker(() => Meteor.loggingIn(), []);
    const currentUser = useTracker(() => Meteor.user(), []);
    const resetClientStore = (currentUser) => {
        client.resetStore(); // make all active queries re-run when the log-out process completed
    };

    const navStack = new ContentNavState(currentUser);

    if(viewingPost){
        return (
            <ApolloProvider client={client}>
                <ViewSharedContentContainer
                    viewId={viewId}
                    navStack={navStack}
                    currentUser={currentUser}
                    noUserState={noUserState}
                    setNoUserState={setNoUserState}
                    resetClientStore={resetClientStore}
                />
            </ApolloProvider>
        );
    } else {

        let activity;

        if(loggingIn){
            activity = <Loading />;
        } else {
            if(!currentUser){
                activity = (
                    <AccountContainer
                        noUserState={noUserState}
                        setNoUserState={setNoUserState}
                    />);
            } else {
                // attempt restoration of navStack; does nothing if no saved restore point is found.
                navStack.restore();
                if(adsBlocked){
                    activity = <div className="fade-in">ads blocked.</div>;
                } else {
                    switch(navStack.current.navState){
                        case 'Loading':
                            activity = <Loading />;
                            break;
                        case 'Feed':
                            activity = (
                                <FeedContainer
                                    navStack={navStack}
                                />
                            );
                            break;
                        case 'Topics':
                            activity = (
                                <TopicsContainer
                                    navStack={navStack}
                                />
                            );
                            break;
                        case 'Profile':
                            activity = (
                                <>
                                    <Back
                                        navStack={navStack}
                                    />
                                    <ProfileContainer
                                        navStack={navStack}
                                        viewSize="large"
                                    />
                                </>
                            );
                            break;
                        case 'Friends':
                            activity = (
                                <FriendsProfileContainer
                                    navStack={navStack}
                                    profileIds={currentUser.profile.followedUsers}
                                />
                            );
                            break;
                        case 'Trending Topics':
                            if(navStack.currentTag){
                                activity = (
                                    <TopicsContainer
                                        navStack={navStack}
                                    />
                                );
                            } else {
                                activity = (
                                    <TrendingTopicsContainer
                                        navStack={navStack}
                                    />
                                );
                            }
                            break;
                        case 'Trending Users':
                            activity = (
                                <TrendingProfilesContainer
                                    navStack={navStack}
                                />
                            );
                            break;
                        case 'Settings':
                            activity = <div className="fade-in">settings</div>;
                            break;
                        case 'Search':
                            activity = <div className="fade-in">search results</div>;
                            break;
                        case 'PostView':
                            activity = (
                                <>
                                    <Back
                                        navStack={navStack}
                                    />
                                    <PostView
                                        navStack={navStack}
                                        viewSize="large"
                                    />
                                </>
                            );
                            break;
                        case 'TagView':
                            activity = (
                                <>
                                    <Back
                                        navStack={navStack}
                                    />
                                    <TopicsContainer
                                        navStack={navStack}
                                    />
                                </>
                            );
                        break;
                    }
                }
            }
        }
        return (
            <ApolloProvider client={client}>
                <NavContainer
                    user={currentUser}
                    noUserState={noUserState}
                    setNoUserState={setNoUserState}
                    navStack={navStack}
                    resetClientStore={resetClientStore}
                />
                {activity}
            </ApolloProvider>
        );
    }
}

const _detectAdBlock = () => {
    return new Promise((resolve, reject) => {
        try {
            adblockDetect((detectedBool) => {
                resolve(detectedBool);
            });
        } catch(error){
            reject(error);
        }
    });
};

const _viewingPost = () => {
    return window.location.href.indexOf("view") > -1 ? [true, window.location.href.substr(window.location.href.indexOf("?") + 1)] : [false, null];
}
