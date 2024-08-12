import React from 'react';

import styles from './TransactionMeta.module.css';


const displayName = 'dashboard.ActionsPage.TransactionMeta';

interface Props {
  createdAt: number;
}

const TransactionMeta = ({ createdAt }: Props) => {
  const relativeTimeNow = new Intl.RelativeTimeFormat('en');
  const timeNow = new Date().getTime();
  const relativeCreatedAt = relativeTimeNow.format(
    -1 * Math.floor((timeNow - createdAt) / 1000 / 60 / 60 / 24),
    'day',
  );

  return (
    <ul className={styles.main}>
      {createdAt && (
        <li className={styles.items}>
          {relativeCreatedAt}
        </li>
      )}
    </ul>
  );
};

TransactionMeta.displayName = displayName;

export default TransactionMeta;
