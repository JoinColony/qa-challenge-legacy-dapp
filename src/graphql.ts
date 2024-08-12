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

export const GetDomains = gql`
  query GetDomains($colonyAddress: ID!) {
    getDomains(colonyAddress: $colonyAddress) @client {
      id
      nativeId
      parent
      name
      color
      colonyId
      __typename
    }
  }
`;

export const GetAllTokens = gql`
  query GetAllTokens {
    getAllTokens @client {
      id
      name
      symbol
      __typename
    }
  }
`;

export const GetSimpleColony = gql`
  query GetSimpleColony($colonyAddress: ID!) {
    getColony(colonyAddress: $colonyAddress) @client {
      id
      colonyAddress
      name
      displayName
      __typename
    }
  }
`;

export const GetFullColony = gql`
  query GetFullColony($colonyAddress: ID!) {
    getColony(colonyAddress: $colonyAddress) @client {
      id
      colonyAddress
      name
      displayName
      nativeToken @client {
        id
        name
        symbol
        __typename
      }
      domains @client {
        id
        nativeId
        parent
        name
        color
        colonyId
        __typename
      }
      tokens @client {
        id
        name
        symbol
        balance
        isNative
        __typename
      }
      __typename
    }
  }
`;

export const GetActions = gql`
  query GetActions(
    $colonyAddress: ID!,
    $domainId: Int,
    $actionType: String,
    $limit: Int,
    $sort: String
  ) {
    getActions(
      colonyAddress: $colonyAddress,
      domainId: $domainId,
      actionType: $actionType,
      limit: $limit,
      sort: $sort
    ) @client {
      items {
        id
        transactionHash
        amount
        createdAt
        data
        type
        status
        version
        permissions
        domainId
        domainName
        domainColor
        targetDomainId
        targetDomainName
        targetDomainColor
        walletAddress
        username
        tokenAddress
        tokenName
        tokenSymbol
        __typename
      }
      canFetchMore
    }
  }
`;

export const GetSingleAction = gql`
  query GetSingleAction($actionId: String) {
    getSingleAction(actionId: $actionId) @client {
      id
      transactionHash
      amount
      createdAt
      data
      type
      status
      version
      permissions
      domainId
      domainName
      domainColor
      targetDomainId
      targetDomainName
      targetDomainColor
      walletAddress
      username
      tokenAddress
      tokenName
      tokenSymbol
      __typename
    }
  }
`;
