import { ApolloClient, InMemoryCache } from '@apollo/client';

import db, { formatQueryResultRows } from './db';
import typeDefs, { TypeDefsNames } from './typedefs';
import {
  selectAllActions,
  getUser,
  getColony,
  getDomains,
  getTokens,
  getSingleAction,
  generateDynamicColonyActionsQuery,
} from './queries';
import {
  GetDomains,
  GetAllTokens,
} from '../graphql';

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
      },
      getColony: (_, { colonyAddress }) => {
        try {
          const query = db.exec(getColony.replace('$$id', colonyAddress));
          if (query?.length) {
            return formatQueryResultRows(query, TypeDefsNames.ExtendedColony)[0]; // only the first entry
          }
          return null;
        } catch (error) {
          console.log(error);
        }
      },
      getDomains: (_, { colonyAddress }) => {
        try {
          const query = db.exec(getDomains.replace('$$id', colonyAddress));
          if (query?.length) {
            return formatQueryResultRows(query, TypeDefsNames.Domain);
          }
          return null;
        } catch (error) {
          console.log(error);
        }
      },
      getAllTokens: () => {
        try {
          const query = db.exec(getTokens);
          if (query?.length) {
            return formatQueryResultRows(query, TypeDefsNames.Token);
          }
          return null;
        } catch (error) {
          console.log(error);
        }
      },
      getActions: (_, {
        colonyAddress,
        domainId,
        actionType,
        limit = 10,
        skip,
        sort = 'DESC',
      }) => {
        try {
          const query = db.exec(
            generateDynamicColonyActionsQuery({
              colonyId: colonyAddress,
              actionType,
              domainId,
              limit,
              skip,
              sort,
            }),
          );
          const items = formatQueryResultRows(query, TypeDefsNames.Action);
          return {
            items: items.slice(0, limit),
            canFetchMore: items.length > limit,
          };
        } catch (error) {
          console.log(error);
        }
      },
      getSingleAction: (_, { actionId }) => {
        try {
          const query = db.exec(getSingleAction.replace('$$id', actionId));
          if (query?.length) {
            return formatQueryResultRows(query, TypeDefsNames.Action)[0]; // only the first entry
          }
          return null;
        } catch (error) {
          console.log(error);
        }
      }
    },
    ExtendedColony: {
      nativeToken: (colony) => {
        try {
          return {
            id: colony.tokenAddress,
            name: colony.tokenName,
            symbol: colony.tokenSymbol,
            __typename: TypeDefsNames.Token,
          };
        } catch (error) {
          console.log(error);
        }
      },
      domains: async (colony, _, { client }) => {
        try {
          const { data } = await client.query({
            query: GetDomains,
            variables: { colonyAddress: colony.colonyAddress },
          });
          if (data?.getDomains) {
            return data.getDomains;
          }
          return null;
        } catch (error) {
          console.log(error);
        }
      },
      tokens: async (colony, _, { client }) => {
        try {
          const { data } = await client.query({ query: GetAllTokens });
          if (data?.getAllTokens) {
            const filteredTokens = data.getAllTokens
              .filter(({ id }: { id: string }) => id !== colony.tokenAddress)
              .map((token: any) => ({
                ...token,
                balance: 0,
                isNative: false,
                __typename: TypeDefsNames.TokenWithBalance,
              }));
            return [
              ...filteredTokens,
              {
                id: colony.tokenAddress,
                name: colony.tokenName,
                symbol: colony.tokenSymbol,
                balance: colony.tokenBalance,
                isNative: true,
                __typename: TypeDefsNames.TokenWithBalance,
              },
            ];
          }
          return null;
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
});

export default client;
