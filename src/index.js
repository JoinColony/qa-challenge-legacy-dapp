import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, gql, ApolloProvider } from '@apollo/client';

import App from './App';
import './index.css';

const typeDefs = gql`
  extend type Query {
    getAuthStatus: Auth!
  }

  type Auth {
    isLoggedIn: Boolean!
  }
`;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs,
  resolvers: {
    Query: {
      getAuthStatus: () => {
        return {
          isLoggedIn: false,
        };
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
