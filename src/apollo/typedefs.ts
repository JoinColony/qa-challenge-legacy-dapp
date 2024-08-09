import { gql } from '@apollo/client';

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

export enum TypeDefsNames {
  Action = 'Action',
}

export default typeDefs;
