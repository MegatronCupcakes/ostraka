import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { InMemoryCache, ApolloProvider, ApolloClient, ApolloLink } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { MeteorAccountsLink } from 'meteor/apollo';
import { useDetectAdBlock } from 'adblock-detect-react';

import NavContainer from '../nav/navContainer';
import AccountContainer from '../account/accountContainer';
import FeedContainer from '../feed/feedContainer';

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

MeteorAccountsLink({headerName: 'meteor-login-token'});

const link = ApolloLink.from([
  new MeteorAccountsLink(),
  new BatchHttpLink({
    uri: '/graphql'
  })
]);

const client = new ApolloClient({
  uri: '/graphql',
  cache,
  link,
});

export default function MainContainer(props){
    const [navState, setNavState] = useState('Feed');
    const [noUserState, setNoUserState] = useState('Login');
    const [adsBlocked, setAdsBlocked] = useState(false);

    const adBlockDetected = useDetectAdBlock();
    useEffect(() => {
        if(adBlockDetected) setAdsBlocked(true);
    }, []);

    const loggingIn = useTracker(() => Meteor.loggingIn(), []);
    const currentUser = useTracker(() => Meteor.user(), []);

    const resetClientStore = () => {
        client.resetStore(); // make all active queries re-run when the log-out process completed
    };

    let activity;

    if(loggingIn){
        activity = <div className="fade-in" style={{fontSize: "large", fontWeight: "bold", textAlign: "center"}}>LOADING...</div>;
    } else {
        if(!currentUser){
            activity = (
                <AccountContainer
                    noUserState={noUserState}
                    setNoUserState={setNoUserState}
                />);
        } else {
            if(adsBlocked){
                activity = <div className="fade-in">ads blocked.</div>;
            } else {
                switch(navState){
                    case 'Feed':
                    activity = (
                        <FeedContainer />
                    );
                    break;
                    case 'Topics':
                    activity = <div className="fade-in">topics</div>;
                    break;
                    case 'Profile':
                    activity = <div className="fade-in">profile</div>;
                    break;
                    case 'Friends':
                    activity = <div className="fade-in">friends</div>;
                    break;
                    case 'Trending Topics':
                    activity = <div className="fade-in">trending topics</div>;
                    break;
                    case 'Trending Users':
                    activity = <div className="fade-in">trending users</div>;
                    break;
                    case 'Settings':
                    activity = <div className="fade-in">settings</div>;
                    break;
                    case 'Search':
                    activity = <div className="fade-in">search results</div>;
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
                navState={navState}
                setNavState={setNavState}
                resetClientStore={resetClientStore}
            />
            {activity}
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
