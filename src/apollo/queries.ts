export const selectAllActions = `
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
    INNER JOIN tokens on tokens.id = actions.tokenId
  ORDER BY
    actions.createdAt DESC;
`;

export const getUser = `
  SELECT
    *
  FROM
    users
  WHERE
    id = "$$id";
`;

export const getColony = `
  SELECT
    colonies.id,
    colonies.id as colonyAddress,
    colonies.name,
    colonies.displayName,
    tokens.id as tokenAddress,
    tokens.name as tokenName,
    tokens.symbol as tokenSymbol,
    colonies.balance as tokenBalance
  FROM
    colonies
    INNER JOIN tokens on tokens.id = colonies.tokenId
  WHERE
    colonies.id = "$$id";
`;

export const getDomains = `
  SELECT
    *
  FROM
    domains
  WHERE
    colonyId = "$$id"
  ORDER BY
    nativeId ASC;
`;

export const getTokens = `
  SELECT
    id,
    id as tokenAddress,
    name,
    symbol
  FROM
    tokens;
`;

export const getColonyActions = `
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
    INNER JOIN tokens on tokens.id = actions.tokenId
  WHERE
    actions.colonyId = "$$id"
  ORDER BY
    actions.createdAt $$sort;
`;
