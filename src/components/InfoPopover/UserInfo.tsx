import React from 'react';

import UserMention from '../UserMention/UserMention';
import Avatar from '../Avatar/Avatar';

import styles from './InfoPopover.module.css';

interface Props {
  username: string;
  walletAddress: string;
}

const displayName = 'InfoPopover.UserInfo';

const UserInfo = ({
  username,
  walletAddress,
}: Props) => {
  return (
    <div className={styles.container}>
      <div>
        <Avatar
          size="s"
          seed={`${username}+${walletAddress}`}
        />
      </div>
      <div className={styles.textContainer}>
        {username && (
          <p className={styles.userName}>
            <UserMention username={username} />
          </p>
        )}
        <div className={styles.address}>
          {walletAddress}
        </div>
      </div>
    </div>
  );
};

UserInfo.displayName = displayName;

export default UserInfo;
