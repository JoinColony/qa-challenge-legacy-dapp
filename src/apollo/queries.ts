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