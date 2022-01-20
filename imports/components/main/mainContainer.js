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
import ContentWrapper from '/imports/components/layout/contentWrapper';
import SettingsContainer from '/imports/components/settings/settingsContainer';
import InboxContainer from '/imports/components/messaging/inboxContainer';
import NotificationsContainer from '/imports/components/notifications/notificationsContainer';
import ViewCommentContainer from '/imports/components/comments/viewCommentContainer';
import SearchContainer from '/imports/components/search/searchContainer';
import {typePolicies} from '/imports/apollo/typePolicies';
const cache = new InMemoryCache({typePolicies: typePolicies}).restore(window.__APOLLO_STATE__);

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
    const currentUser = useTracker(() => Meteor.user(), []);

    const adBlockDetected = useDetectAdBlock();
    useEffect(() => {
        if(adBlockDetected) {
            setAdsBlocked(true);
        };
    }, [currentUser]);


    const [noUserState, setNoUserState] = useState('Login');
    const [adsBlocked, setAdsBlocked] = useState(false);
    const [viewingPost, viewId, sharedById, viewType] = _viewingPost();

    const resetClientStore = async (currentUser) => {
        client.resetStore(); // make all active queries re-run when the log-out process completed
    };

    let navStack = new ContentNavState(currentUser);

    const logOut = () => {
        Meteor.logout(() => {
            client.cache.reset();
            setNoUserState('Login');
            navStack.reset();
        });
    };

    let activity = <Loading />;

    if(viewingPost){
        activity = (
            <ViewSharedContentContainer
                viewId={viewId}
                sharedById={sharedById}
                viewType={viewType}
                navStack={navStack}
                currentUser={currentUser}
                noUserState={noUserState}
                setNoUserState={setNoUserState}
                resetClientStore={resetClientStore}
            />
        );
    } else if(!currentUser){
        activity = (
            <AccountContainer
                noUserState={noUserState}
                setNoUserState={setNoUserState}
            />);
    } else {
        // attempt restoration of navStack; does nothing if no saved restore point is found.
        navStack.restore();
        // make sure we have our additional user info via subscription
        Meteor.subscribe('userData');
        if(adsBlocked){
            activity = (
                <ContentWrapper
                    content={(
                        <div className="fade-in">ads blocked.</div>
                    )}
                />
            );
        } else {
            switch(navStack.current.navState){
                case 'Search':
                    activity = (
                        <>
                            <Back
                                navStack={navStack}
                            />
                            <ContentWrapper
                                content={(
                                    <SearchContainer
                                        navStack={navStack}
                                    />
                                )}
                            />
                        </>
                    );
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
                            profileIds={_.uniq([...currentUser.followedUsers, ...currentUser.invited, currentUser.invitedBy])}
                        />
                    );
                    break;
                case 'Trending Topics':
                    activity = (
                        <TrendingTopicsContainer
                            navStack={navStack}
                        />
                    );
                    break;
                case 'Trending Users':
                    activity = (
                        <TrendingProfilesContainer
                            navStack={navStack}
                        />
                    );
                    break;
                case 'Inbox':
                    activity = (
                        <>
                            <Back
                                navStack={navStack}
                            />
                            <ContentWrapper
                                content={(
                                    <InboxContainer
                                        navStack={navStack}
                                    />
                                )}
                            />
                        </>
                    );
                    break;
                case 'Notifications':
                    activity = (
                        <>
                            <Back
                                navStack={navStack}
                            />
                            <ContentWrapper
                                content={(
                                    <NotificationsContainer
                                        navStack={navStack}
                                    />
                                )}
                            />
                        </>
                    );
                    break;
                case 'Settings':
                    activity = (
                        <>
                            <Back
                                navStack={navStack}
                            />
                            <SettingsContainer
                                navStack={navStack}
                            />
                        </>
                    );
                    break;
                case 'Support':
                    activity = <div className="fade-in">Support</div>;
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
                            <ContentWrapper
                                content={(
                                    <PostView
                                        navStack={navStack}
                                        viewSize="large"
                                    />
                                )}
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
                case 'CommentView':
                    activity = (
                        <>
                            <Back navStack={navStack} />
                            <ContentWrapper
                                content={(
                                    <ViewCommentContainer navStack={navStack} />
                                )}
                            />
                        </>
                    );
                    break;
            }
        }
    }
    const appContent = viewingPost ? (
        activity
    ) : (
        <>
            <NavContainer
                user={currentUser}
                noUserState={noUserState}
                setNoUserState={setNoUserState}
                navStack={navStack}
                logOut={logOut}
            />
            {activity}
        </>
    );
    return (        
        <ApolloProvider client={client}>
            {appContent}
        </ApolloProvider>
    );
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
    if(window.location.href.indexOf("view") > -1){
        const viewString = window.location.href.substr(window.location.href.indexOf("?") + 1);
        const viewId = viewString.split("&")[0];
        const sharedById = viewString.split("&")[1];
        const viewType = viewString.split("&")[2];
        //console.log("viewId:", viewId, "\nsharedById:", sharedById, "\nviewType:", viewType);
        return [true, viewId, sharedById, viewType];
    } else {
        return [false, null, null, null];
    }
}
