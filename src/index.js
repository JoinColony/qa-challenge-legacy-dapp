import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, gql, ApolloProvider } from '@apollo/client';

import initSqlJs from 'sql.js';
// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import binAsString from "!!binary-loader!./apollo/db.s3db";

import App from './App';
import './index.css';

let array = new Uint8Array(binAsString.length);
for (let i = 0; i < binAsString.length; i++) {
  array[i] = binAsString.charCodeAt(i);
}

const SQL = await initSqlJs({ locateFile: () => sqlWasm });
const db = new SQL.Database(array);

const typeDefs = gql`
  extend type Query {
    listActions: [Action]!
  }

  type Action {
    id: ID!
    transactionHash: String!
    amount: Int
    createdAt: Int!
    data: String
    type: String!
    status: Int
    version: Int
    permissions: String
    domainId: ID
    walletAddress: ID
    username: String
    tokenAddress: ID
    tokenName: String
    tokenSymbol: String
    domainName: String
    domainColor: String
  }
`;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs,
  resolvers: {
    Query: {
      listActions: () => {
        const query = db.exec(`
          SELECT
            actions.id,
            actions.id as transactionHash,
            actions.amount,
            actions.createdAt,
            actions.data,
            actions.type,
            actions.status,
            actions.version,
            actions.permissions,
            actions.domainId,
            users.id as walletAddress,
            users.username,
            tokens.id as tokenAddress,
            tokens.name as tokenName,
            tokens.symbol as tokenSymbol,
            domains.name as domainName,
            domains.color as domainColor
          FROM
            actions
            INNER JOIN users on users.id = actions.userId
            INNER JOIN domains on domains.nativeId = actions.domainId
            INNER JOIN tokens on tokens.id = actions.tokenId ;
        `);
        const columns = query[0].columns;
        const values = query[0].values;
        let rows = [];
        values.forEach(element => {
          let row = {};
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

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
