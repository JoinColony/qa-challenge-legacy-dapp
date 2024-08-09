import React, { ReactNode } from 'react';

import UserNavigation from '../UserNavigation/UserNavigation';

import styles from './SimpleNav.module.css';

interface Props {
  children: ReactNode;
}

const SimpleNav = ({ children }: Props) => {
  // Render UserNavigation in parent component (Default) on mobile.
  return (
    <div className={styles.wrapper} id="simpleNav">
      <div className={styles.nav}>
        <UserNavigation />
      </div>
      {children}
    </div>
  );
};

export default SimpleNav;
