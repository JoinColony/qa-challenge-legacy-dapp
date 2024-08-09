import { ApolloClient, InMemoryCache } from '@apollo/client';

import db from './db.ts';
import typeDefs from './typedefs.ts';
import { selectAllActions } from './queries.ts';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs,
  resolvers: {
    Query: {
      listActions: () => {
        const query = db.exec(selectAllActions);
        const columns = query[0].columns;
        const values = query[0].values;
        let rows: { [key: string]: any }[] = [];
        values.forEach(element => {
          let row: { [key: string]: any } = {
            __typename: 'Action',
          };
          for (let i = 0; i < columns.length; i++) {
            row[columns[i]] = element[i];
          }
          rows.push(row);
        });
        return rows;
      },
    },
  },
});

export default client;
