import React from 'react';

import UserMention from '../UserMention/UserMention';
import { Action, ActionTypes } from '../ActionsList/ActionsList';

import styles from './ActionTitle.module.css';

const displayName = 'ActionTitle';

interface Props {
  action: Action;
}

const ActionTitle = ({
  action: {
    username,
    type,
    domainName,
    targetDomainName,
    amount,
    tokenSymbol,
    permissions,
    version
  },
}: Props) => {

  let title = <span>Generic Action</span>;

  switch (type) {
    case ActionTypes.Mint:
      title = <span>Mint {amount || 0} {tokenSymbol || '???'}</span>;
      break;
    case ActionTypes.Payment:
      title = <span>Pay <UserMention username={username || ''} className={styles.mention} /> {amount || 0} {tokenSymbol || '???'}</span>;
      break;
    case ActionTypes.Transfer:
      title = <span>Move {amount || 0} {tokenSymbol || '???'} from {domainName} to {targetDomainName}</span>;
      break;
    case ActionTypes.Reputation:
      title = <span>Awarded <UserMention username={username || ''} className={styles.mention} /> with a {amount || 0} points reputation award</span>;
      break;
    case ActionTypes.Permissions:
      title = <span>Assign the {permissions?.replaceAll(',', ', ')} permissions in {domainName} to <UserMention username={username || ''} className={styles.mention} /></span>;
      break;
    case ActionTypes.Upgrade:
      title = <span>Upgrade to version {version}!</span>;
      break;
    case ActionTypes.Details:
      title = <span>Details changed</span>;
      break;
    case ActionTypes.Address:
      title = <span>Address book was updated</span>;
      break;
    case ActionTypes.Team:
      title = <span>New team: {domainName}</span>;
      break;

    default:
      break;
  }

  return title;
};

ActionTitle.displayName = displayName;

export default ActionTitle;
