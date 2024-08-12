import { ActionTypes } from "../components/ActionsList/ActionsList";

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

export const getSingleAction = `
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
    actions.targetDomainId,
    users.id as walletAddress,
    users.username,
    tokens.id as tokenAddress,
    tokens.name as tokenName,
    tokens.symbol as tokenSymbol,
    d.name as domainName,
    d.color as domainColor,
    td.name as targetDomainName,
    td.color as targetDomainColor,
    (SELECT COUNT(1) from actions) as totalCount
  FROM
    actions
    INNER JOIN users on users.id = actions.userId
    INNER JOIN domains d on d.nativeId = actions.domainId
    LEFT JOIN domains td on td.nativeId = actions.targetDomainId
    INNER JOIN tokens on tokens.id = actions.tokenId
  WHERE
    actions.id = "$$id"
  LIMIT 1;
`;

export const generateDynamicColonyActionsQuery = ({
  colonyId,
  domainId,
  actionType,
  limit,
  skip,
  sort = 'DESC',
}: {
    colonyId: string;
    domainId?: number;
    actionType?: ActionTypes;
    limit?: number;
    skip?: number;
    sort?: 'DESC' | 'ASC';
}) => {
  let whereClause = '';
  let limitClause = '';
  let skipClause = '';
  let sortClause = '';
  let baseQuery = `
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
      actions.targetDomainId,
      users.id as walletAddress,
      users.username,
      tokens.id as tokenAddress,
      tokens.name as tokenName,
      tokens.symbol as tokenSymbol,
      d.name as domainName,
      d.color as domainColor,
      td.name as targetDomainName,
      td.color as targetDomainColor,
      (SELECT COUNT(1) from actions) as totalCount
    FROM
      actions
      INNER JOIN users on users.id = actions.userId
      INNER JOIN domains d on d.nativeId = actions.domainId
      LEFT JOIN domains td on td.nativeId = actions.targetDomainId
      INNER JOIN tokens on tokens.id = actions.tokenId`;
  whereClause += `
    WHERE
      actions.colonyId = "${colonyId}"`;
  if (domainId) {
    whereClause += ` AND actions.domainId = ${domainId}`;
  }
  if (actionType) {
    whereClause += ` AND actions.type = "${actionType}"`;
  }
  sortClause += `
    ORDER BY
      actions.createdAt ${sort}`;
  if (limit) {
    limitClause += `
    LIMIT ${limit + 1}`;
  }
  if (skip) {
    skipClause += `
    OFFSET ${skip}`;
  }
  return baseQuery + whereClause + sortClause + limitClause + skipClause + ';\n';
};
