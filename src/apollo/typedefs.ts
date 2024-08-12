import { gql } from '@apollo/client';

const typeDefs = gql`
  extend type Query {
    listActions: [Action]!
    getUser(walletAddress: ID!): User!
    getColony(colonyAddress: ID!) : ExndedColony!
    getDomains(colonyAddress: ID!): [Domain]!
    getAllTokens: [Token]!
    getActions(
      colonyAddress: ID!,
      domainId: Int,
      actionType: String,
      limit: Int,
      offset: Int,
      sort: String,
    ): GetActionsQuery!
    getSingleAction(actionId: String!): Action!
  }

  type GetActionsQuery {
    items: [Action]!
    canFetchMore: Boolean!
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
    targetDomainId: ID
    walletAddress: ID
    username: String
    tokenAddress: ID
    tokenName: String
    tokenSymbol: String
    domainName: String
    domainColor: String
    targetDomainName: String
    targetDomainColor: String
  }

  type User {
    id: ID!
    username: String!
  }

  type Colony {
    id: ID!
    colonyAddress: ID!
    name: String!
    displayName: String
    tokenAddress: ID!
    tokenName: String!
    tokenSymbol: String!
    tokenBalance: Int!
  }

  type ExndedColony {
    id: ID!
    colonyAddress: ID!
    name: String!
    displayName: String
    nativeToken: Token!
    domains: [Domain]!
    tokens: [TokenWithBalance!]!
  }

  type Domain {
    id: ID!
    nativeId: Int!
    parent: Int
    name: String!
    color: String
    colonyId: ID!
  }

  type Token {
    id: ID!
    name: String!
    symbol: String!
  }

  type TokenWithBalance {
    id: ID!
    name: String!
    symbol: String!
    balance: Int!
    isNative: Boolean!
  }
`;

export enum TypeDefsNames {
  Action = 'Action',
  User = 'User',
  Colony = 'Colony',
  ExtendedColony = 'ExtendedColony',
  Token = 'Token',
  TokenWithBalance = 'TokenWithBalance',
  Domain = 'Domain',
}

export default typeDefs;
