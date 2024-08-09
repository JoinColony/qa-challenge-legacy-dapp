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
