import React, { ReactChild, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';

import ColonyDomainSelector from '../DomainSelector/ColonyDomainSelector';
import ColonyTotalFunds from '../TotalFunds/TotalFunds';
import SpinnerLoader from '../Preloaders/SpinnerLoader';
import Actions from '../Actions/Actions';

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
    return (
      <div className={styles.loadingSpinner}>
        <SpinnerLoader
          loadingText="Loading Colony"
          appearance={{ theme: 'primary', size: 'massive' }}
        />
      </div>
    );
  }

  const { getColony: colony } = data;

  return (
    <div className={styles.main}>
      <Helmet>
        <title>Colony Home | {colony?.displayName || colony?.name} Colony</title>
      </Helmet>
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
          <Actions
            colony={colony}
            selectedDomainId={selectedDomain}
          />
          {children}
        </div>
          <aside className={styles.rightAside} />
      </div>
    </div>
  );
};

HomeLayout.displayName = displayName;

export default HomeLayout;
