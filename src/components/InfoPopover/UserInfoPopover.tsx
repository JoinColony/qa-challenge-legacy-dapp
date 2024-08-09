import React from 'react';

import UserInfo from './UserInfo';

import styles from './InfoPopover.module.css';

interface Props {
  username: string;
  walletAddress: string;
}

const displayName = 'InfoPopover.UserInfoPopover';

const UserInfoPopover = ({ username, walletAddress }: Props) => (
  <div className={styles.main}>
    <div className={styles.section}>
      <UserInfo username={username} walletAddress={walletAddress} />
    </div>
  </div>
);

UserInfoPopover.displayName = displayName;

export default UserInfoPopover;
