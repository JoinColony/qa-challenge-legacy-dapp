import React, { ReactNode, Dispatch, SetStateAction } from 'react';

import Popover from '../Popover/Popover';
import Avatar from '../Avatar/Avatar';
import { Balances } from './TotalFunds';

import styles from './TotalFundsPopover.module.css';


interface Props {
  onSelectToken?: Dispatch<SetStateAction<string>>;
  balances?: Balances[];
  children?: ReactNode;
  currentTokenAddress?: string;
}

const TotalFundsPopover = ({
  children,
  onSelectToken,
  balances,
  currentTokenAddress,
}: Props) => {
  return balances ? (
    <Popover
      content={({ close }) => (
        <ul className={styles.main}>
          {balances.map((balance) => (
            <li key={balance.id}>
              <button
                type="button"
                onClick={() => {
                  if (onSelectToken) {
                    onSelectToken(balance.id);
                  }
                  close();
                }}
              >
                <div className={styles.token}>
                  <div className={styles.tokenIconContainer}>
                    <Avatar
                      seed={`${balance?.name}+${balance?.id}`}
                      size="xs"
                    />
                  </div>
                  <div
                    className={
                      balance.id === currentTokenAddress
                        ? styles.tokenInfoContainerActive
                        : styles.tokenInfoContainer
                    }
                  >
                    <span className={styles.tokenSymbol}>
                      {balance.symbol || '???'}
                    </span>
                    <span className={styles.tokenBalance}>
                      {balance.balance || '0'}
                    </span>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
      trigger="click"
      showArrow={false}
      placement="bottom"
      popperOptions={{
        modifiers: [
          {
            name: 'offset',
            options: {
              /*
               * @NOTE Values are set manual, exactly as the ones provided in the figma spec.
               *
               * There's no logic to how they are calculated, so next time you need
               * to change them you'll either have to go by exact specs, or change
               * them until it "feels right" :)
               */
              offset: [106, 4],
            },
          },
        ],
      }}
    >
      {children}
    </Popover>
  ) : null;
};

TotalFundsPopover.displayName =
  'dashboard.ColonyTotalFunds.TotalFundsPopover';

export default TotalFundsPopover;
