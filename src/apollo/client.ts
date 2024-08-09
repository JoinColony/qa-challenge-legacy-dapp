import { ApolloClient, InMemoryCache } from '@apollo/client';

import db, { formatQueryResultRows } from './db';
import typeDefs, { TypeDefsNames } from './typedefs';
import {
  selectAllActions,
  getUser,
} from './queries';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs,
  resolvers: {
    Query: {
      listActions: () => {
        try {
          const query = db.exec(selectAllActions);
          return formatQueryResultRows(query, TypeDefsNames.Action);
        } catch (error) {
          console.log(error);
        }
      },
      getUser: (_, { walletAddress }) => {
        try {
          const query = db.exec(getUser.replace('$$id', walletAddress));
          if (query?.length) {
            return formatQueryResultRows(query, TypeDefsNames.User)[0]; // only the first entry
          }
          return null;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
});

export default client;
