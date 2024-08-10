import React, { ComponentType } from 'react';

import ActionsListItem from './ActionsListItem';

import styles from './ActionsList.module.css';

const displayName = 'ActionsList';

export interface ClickHandlerProps {
  id: string;
  transactionHash: string;
}

export interface SimpleColony {
  id: string;
  colonyAddress: string;
  name: string;
  [key: string]: any;
}

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
  handleItemClick?: (handlerProps: ClickHandlerProps) => void;
}

const ActionsList = ({
  items,
  handleItemClick,
}: Props) => (
  <ul className={styles.main}>
    {items.map((item) => (
      <ActionsListItem
        key={item.id}
        item={item}
        handleOnClick={handleItemClick}
      />
    ))}
  </ul>
);

ActionsList.displayName = displayName;

export default ActionsList;
