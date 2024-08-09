import React from 'react';

import TotalFundsSelectedToken from './TotalFundsSelectedToken';

import styles from './TotalFunds.module.css';

export type Balances = {
  id: string;
  balance: string;
  name: string;
  symbol: string;
  isNative: boolean;
};

type Props = {
  balances?: Balances[];
};

const displayName = 'dashboard.ColonyTotalFunds';

const TotalFunds = ({ balances }: Props) => {
  return (
    <div className={styles.main}>
      <TotalFundsSelectedToken balances={balances} />
      <div className={styles.totalBalanceCopy}>
        Total balance
      </div>
    </div>
  );
};

TotalFunds.displayName = displayName;

export default TotalFunds;
