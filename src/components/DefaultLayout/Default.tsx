import React, { ReactNode } from 'react';

import SimpleNav from '../SimpleNav';

import styles from './Default.module.css';

interface Props {
  children: ReactNode;
}

const displayName = 'pages.Default';

const Default = ({
  children,
}: Props) => {
  return (
    <div className={styles.main}>
      <SimpleNav>
        <div className={styles.content}>
          <div className={styles.children}>{children}</div>
        </div>
      </SimpleNav>
    </div>
  );
};

Default.displayName = displayName;

export default Default;
