import {Meteor} from 'meteor/meteor';
import {ApolloServer} from 'apollo-server-express';
import {WebApp} from 'meteor/webapp';
import {getUser} from 'meteor/apollo';
import typeDefs from '/imports/apollo/schema.graphql';
import {getPost, getPosts, getTaggedPosts, getUserPosts} from '/imports/apollo/resolvers/posts';
import {getComments, getTaggedComments, getUserComments} from '/imports/apollo/resolvers/comments';
import {getProfile, getProfiles, getTrendingProfiles} from '/imports/apollo/resolvers/profiles';
import {getTopic, getTrendingTopics} from '/imports/apollo/resolvers/topics';
import {getSharedContent} from '/imports/apollo/resolvers/sharedContent';

const resolvers = {
    Topic: {
        __resolveType(obj, context, info){
            if(obj._type){
                return obj._type;
            } else {
                return null;
            }
        }
    },
    SharedContent: {
        __resolveType(obj, context, info){
            if(obj._type){
                return obj._type;
            } else {
                return null;
            }
        }
    },
    Query: {
        getPost: getPost,
        getPosts: getPosts,
        getComments: getComments,
        getTaggedPosts: getTaggedPosts,
        getTaggedComments: getTaggedComments,
        getUserPosts: getUserPosts,
        getUserComments: getUserComments,
        getProfile: getProfile,
        getProfiles: getProfiles,
        getTopic: getTopic,
        getTrendingTopics: getTrendingTopics,
        getTrendingProfiles: getTrendingProfiles,
        getSharedContent: getSharedContent
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => ({
        user: await getUser(req.headers.authorization)
    })
});

server.applyMiddleware({
    app: WebApp.connectHandlers,
    cors: true
});
