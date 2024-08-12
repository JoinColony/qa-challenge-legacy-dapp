import React from 'react';

import { STATUS } from '../ActionsPageEvent/ActionsPageEvent';
import { getMainClasses } from '../../utils';

import styles from './TransactionStatus.module.css';

const displayName = 'dashboard.ActionsPage.TransactionStatus';

interface Props {
  status: STATUS;
}

const TransactionStatus = ({ status }: Props) => (
  <div className={styles.main}>
    <span className={getMainClasses({ theme: status }, styles)} />
  </div>
);

TransactionStatus.displayName = displayName;

export default TransactionStatus;
