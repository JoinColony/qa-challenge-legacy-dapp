import React, { ReactChild, useState } from 'react';
import { useQuery } from '@apollo/client';

import ColonyDomainSelector from '../DomainSelector/ColonyDomainSelector';
import ColonyTotalFunds from '../TotalFunds/TotalFunds';

import Button from '../Button/Button';

import { GetFullColony } from '../../graphql';
import styles from './HomeLayout.module.css';

type Props = {
  children?: ReactChild;
};

const displayName = 'dashboard.ColonyHome.HomeLayout';

const HomeLayout = ({
  children,
}: Props) => {
  const [selectedDomain, setSelectedDomain] = useState<number>(0);

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
              <ColonyDomainSelector
                filteredDomainId={selectedDomain}
                onDomainChange={setSelectedDomain}
                domains={colony.domains}
              />
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

HomeLayout.displayName = displayName;

export default HomeLayout;
