import React from 'react';

import AvatarDropdown from '../AvatarDropdown/AvatarDropdown';
import styles from './UserNavigation.module.css';

const displayName = 'pages.NavigationWrapper.UserNavigation';

// TODO handle wallet connected state

const UserNavigation = () => {
  const walletAddress = '0x1234567890abcdef1234567890abcdef12345678';
  return (
    <>
      <div className={styles.main}>
        <button
          type="button"
          className={styles.connectWalletButton}
        >
          Connect Wallet
        </button>
        <AvatarDropdown
          walletAddress={walletAddress}
        />
      </div>
    </>
  );
};

UserNavigation.displayName = displayName;

export default UserNavigation;
