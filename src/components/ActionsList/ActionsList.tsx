import React, { ComponentType } from 'react';

import ActionsListItem from './ActionsListItem';

import styles from './ActionsList.module.css';

const displayName = 'ActionsList';

export enum ActionTypes {
  Mint = 'MINT',
  Payment = 'PAYMENT',
  Transfer = 'TRANSFER',
  Reputation = 'REPUTATION',
  Permissions = 'PERMISSIONS',
  Upgrade = 'UPGRADE',
  Details = 'DETAILS',
  Address = 'ADDRESS',
  Team = 'TEAM',
  Generic = 'GENERIC',
};

export interface Action {
  id: string;
  transactionHash: string;
  amount?: number;
  createdAt: number;
  data?: string;
  type: ActionTypes;
  status?: string;
  version?: number;
  permissions?: string;
  domainId: number;
  targetDomainId?: number;
  walletAddress?: string;
  username?: string
  tokenAddress?: string
  tokenName?: string
  tokenSymbol?: string
  domainName?: string
  domainColor?: string
  targetDomainName?: string
  targetDomainColor?: string
}

interface Props {
  items: Action[];
}

const ActionsList = ({
  items,
}: Props) => (
  <ul className={styles.main}>
    {items.map((item) => (
      <ActionsListItem
        key={item.id}
        item={item}
      />
    ))}
  </ul>
);

ActionsList.displayName = displayName;

export default ActionsList;
