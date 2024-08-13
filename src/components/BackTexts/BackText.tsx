import React from 'react';

import { navigate } from '../NaiveRouter/NaiveRouter';

import styles from './BackText.module.css';

type Props = {
  name: string;
  displayName?: string;
  path?: string;
}

const BackText = ({
  name,
  displayName: colonyDisplayName,
  path = '/',
}: Props) => {
  if (!colonyDisplayName || !name) return null;
  return (
    <div className={styles.main}>
      <button
        className={styles.back}
        type="button"
        onClick={() => navigate(path)}
      >
        {`< Back to ${colonyDisplayName || name}`}
      </button>
    </div>
  );
};

export default BackText;
