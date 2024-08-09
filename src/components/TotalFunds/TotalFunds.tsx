import React from 'react';

import TotalFundsSelectedToken from './TotalFundsSelectedToken';

import styles from './TotalFunds.module.css';

export type Balances = {
  tokenAddress: string;
  tokenBalance: string;
  tokenName: string;
  tokenSymbol: string;
  isNative: boolean;
};

type Props = {
  balances?: Balances[];
};

const displayName = 'dashboard.ColonyTotalFunds';

const TotalFunds = ({ balances}: Props) => {
  return (
    <div className={styles.main}>
      <TotalFundsSelectedToken balances={balances} />
      <div className={styles.totalBalanceCopy}>
        Colony total balance
      </div>
    </div>
  );
};

TotalFunds.displayName = displayName;

export default TotalFunds;
