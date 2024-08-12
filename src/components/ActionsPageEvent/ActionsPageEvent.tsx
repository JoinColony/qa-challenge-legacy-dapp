import React, { useState, useMemo, ReactNode } from 'react';

import TransactionStatus from '../TransactionStatus/TransactionStatus';
import TransactionMeta from '../TransactionMeta/TransactionMeta';
import UserMention from '../UserMention/UserMention';
import { Action, ActionTypes } from '../ActionsList/ActionsList';
import { capitalize } from '../../utils';

import styles from './ActionsPageEvent.module.css';

const displayName = 'dashboard.ActionsPageFeed.ActionsPageEvent';

export enum STATUS {
  Failed = 'failed',
  Pending = 'pending',
  Succeeded = 'succeeded',
  SystemMessage = 'systemMessage',
}

type User = {
  address: string;
  username: string;
};

type SimpleColony = {
  id: string;
  colonyAddress: string;
  name: string;
  [key: string]: any;
}

interface Props {
  action: Action;
  user: User;
  colony: SimpleColony;
}

const ActionsPageEvent = ({
  action: {
    type,
    createdAt,
    username,
    amount,
    tokenSymbol,
    domainName,
    targetDomainName,
    permissions,
    version,
  },
  user: { username: actorUsername },
  colony: { displayName: colonyDisplayName },
}: Props) => {

  let eventTitle = <span>Generic Event</span>;

  switch (type) {
    case ActionTypes.Mint:
      eventTitle = <span><UserMention username={actorUsername || ''} className={styles.mention} /> minted {amount || 0} {tokenSymbol || '???'} to the <UserMention username={colonyDisplayName || ''} className={styles.mention} showAtSymbol={false} /> colony</span>;
      break;
    case ActionTypes.Payment:
      eventTitle = <span><UserMention username={actorUsername || ''} className={styles.mention} /> paid {amount || 0} {tokenSymbol || '???'} from {capitalize(domainName || '')} to <UserMention username={username || ''} className={styles.mention} /></span>;
      break;
    case ActionTypes.Transfer:
      eventTitle = <span><UserMention username={actorUsername || ''} className={styles.mention} /> transferred {amount || 0} {tokenSymbol || '???'} from {capitalize(domainName || '')} to {capitalize(targetDomainName || '')}</span>;
      break;
    case ActionTypes.Reputation:
      eventTitle = <span><UserMention username={actorUsername || ''} className={styles.mention} /> awarded <UserMention username={username || ''} className={styles.mention} /> with a {amount || 0} points reputation award</span>;
      break;
    case ActionTypes.Permissions:
      eventTitle = <span><UserMention username={actorUsername || ''} className={styles.mention} /> assigned the {permissions?.replaceAll(',', ', ')} permissions in the {capitalize(domainName || '')} team to <UserMention username={username || ''} className={styles.mention} /></span>;
      break;
    case ActionTypes.Upgrade:
      eventTitle = <span><UserMention username={actorUsername || ''} className={styles.mention} /> has upgraded this colony to version {version}!</span>;
      break;
    case ActionTypes.Details:
      eventTitle = <span><UserMention username={actorUsername || ''} className={styles.mention} /> change the <UserMention username={colonyDisplayName || ''} className={styles.mention} showAtSymbol={false} /> colony's details</span>;
      break;
    case ActionTypes.Address:
      eventTitle = <span><UserMention username={actorUsername || ''} className={styles.mention} /> change the <UserMention username={colonyDisplayName || ''} className={styles.mention} showAtSymbol={false} /> colony's address book</span>;
      break;
    case ActionTypes.Team:
      eventTitle = <span><UserMention username={actorUsername || ''} className={styles.mention} /> add team: {capitalize(domainName || '')}</span>;
      break;

    default:
      break;
  }

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.status}>
          <TransactionStatus status={STATUS.Succeeded} />
        </div>
        <div className={styles.content}>
          <div className={styles.text}>
            {eventTitle}
          </div>
          <div className={styles.details}>
            <div className={styles.meta}>
              <TransactionMeta createdAt={createdAt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ActionsPageEvent.displayName = displayName;

export default ActionsPageEvent;
