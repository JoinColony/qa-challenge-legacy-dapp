import { gql } from '@apollo/client';

export const ListActionsQuery = gql`
  query TestQuery {
    listActions @client {
      id
      type
      __typename
    }
  }
`;

export const GetUser = gql`
  query GetUser($walletAddress: ID!) {
    getUser(walletAddress: $walletAddress) @client {
      id
      walletAddress: id
      username
      __typename
    }
  }
`;
