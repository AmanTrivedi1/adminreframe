import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/user/getallusers',
  cache: new InMemoryCache(),
});

export default client;
