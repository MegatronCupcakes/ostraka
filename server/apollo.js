import { ApolloServer } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';
import { PostCollection } from '/imports/api/post/postCollection';
import typeDefs from '/imports/apollo/schema.graphql';

const resolvers = {
  Query: {
    getPost: (obj, { id }) => PostCollection.findOne(id),
    getPosts: () => PostCollection.find().fetch()
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  })
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  cors: true
});
