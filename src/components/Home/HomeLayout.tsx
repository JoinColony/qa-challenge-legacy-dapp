import React, { ReactChild } from 'react';
import { useQuery } from '@apollo/client';

// import ColonyDomainSelector from '~dashboard/ColonyHome/ColonyDomainSelector';
import ColonyTotalFunds from '../TotalFunds/TotalFunds';

import Button from '../Button/Button';

import { GetFullColony } from '../../graphql';
import styles from './HomeLayout.module.css';

type Props = {
  children?: ReactChild;
};

const displayName = 'dashboard.ColonyHome.ColonyHomeLayout';

const ColonyHomeLayout = ({
  children,
}: Props) => {
  const { data, loading } = useQuery(GetFullColony, { variables: { colonyAddress: '0xe00001' } });

  if (!data || loading) {
    return <div>Loading...</div>;
  }

  const { getColony: colony } = data;

  return (
    <div className={styles.main}>
      <div
        className={styles.mainContentGrid}
      >
        <div />
        <div className={styles.mainContent}>
          <ColonyTotalFunds balances={colony.tokens} />
          <div className={styles.contentActionsPanel}>
            <div className={styles.domainsDropdownContainer}>
              {/* <ColonyDomainSelector
                filteredDomainId={filteredDomainId}
                onDomainChange={onDomainChange}
                colony={colony}
              /> */}
            </div>
            <Button
              appearance={{ theme: 'primary', size: 'large' }}
              text="New Action"
              disabled
            />
          </div>
          {children}
        </div>
          <aside className={styles.rightAside} />
      </div>
    </div>
  );
};

ColonyHomeLayout.displayName = displayName;

export default ColonyHomeLayout;
