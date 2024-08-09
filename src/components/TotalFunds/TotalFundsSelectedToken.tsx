import React, { useMemo, useState, useEffect } from 'react';

import TotalFundsPopover from './TotalFundsPopover';
import { Balances } from './TotalFunds';

import styles from './TotalFunds.module.css';

type Props = {
  balances?: Balances[];
  children?: React.ReactChild;
};

const displayName = 'dashboard.TotalFundsSelectedToken';

const TotalFundsSelectedToken = ({
  balances,
  children,
}: Props) => {

  const nativeToken = balances?.find(({ isNative }) => isNative);

  const [currentTokenAddress, setCurrentTokenAddress] = useState<string>(
    nativeToken?.id || '',
  );

  useEffect(() => {
    setCurrentTokenAddress(nativeToken?.id || '');
  }, [nativeToken]);

  const currentToken = useMemo(() => {
    return balances?.find(({ id }) => id === currentTokenAddress);
  }, [balances, currentTokenAddress]);

  return (
    <div className={styles.selectedToken}>
      <span className={styles.selectedTokenAmount}>
        {currentToken?.balance || '0'}
      </span>
      <TotalFundsPopover
        balances={balances}
        onSelectToken={setCurrentTokenAddress}
        currentTokenAddress={currentTokenAddress}
      >
        <button className={styles.selectedTokenSymbol} type="button">
          <span>{currentToken?.symbol}</span>
        </button>
      </TotalFundsPopover>
      {children}
    </div>
  );
};

TotalFundsSelectedToken.displayName = displayName;

export default TotalFundsSelectedToken;
