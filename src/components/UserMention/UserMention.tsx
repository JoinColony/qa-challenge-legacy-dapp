import React from 'react';

import styles from './UserMention.module.css';

interface Props {
  /** A user's username (ENS) */
  username: string;
  [key: string]: any;
}

const UserMention = ({
  username,
  showAtSymbol = true,
  ...props
}: Props) => {
  return (
    <span className={styles.mention} {...props}>
      {' '}
      {`${showAtSymbol ? '@' : ''}${username}`}
    </span>
  );
};

export default UserMention;
