import React from 'react';

import Avatar from '../Avatar/Avatar';

import styles from './DetailsWidgetUser.module.css';

const displayName = 'DetailsWidgetUser';

interface Props {
  walletAddress: string;
  username: string;
}

const DetailsWidgetUser = ({ walletAddress, username }: Props) => {
  return (
    <div className={styles.main}>
      <div className={styles.avatar}>
        <Avatar
          seed={`${username}+${walletAddress}`}
          data-username={username}
          data-wallet-address={walletAddress}
          size="s"
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.username}>
          {`@${username}`}
        </div>
        <div className={styles.address}>
          {walletAddress}
        </div>
      </div>
    </div>
  );
};

DetailsWidgetUser.displayName = displayName;

export default DetailsWidgetUser;
