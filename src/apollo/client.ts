import { ApolloClient, InMemoryCache } from '@apollo/client';

import db, { formatQueryResultRows } from './db';
import typeDefs, { TypeDefsNames } from './typedefs';
import { selectAllActions } from './queries';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs,
  resolvers: {
    Query: {
      listActions: () => {
        const query = db.exec(selectAllActions);
        return formatQueryResultRows(query, TypeDefsNames.Action);
      },
    },
  },
});

export default client;
