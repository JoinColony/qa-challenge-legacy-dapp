import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import ActionsList, {
  ClickHandlerProps as RedirectHandlerProps,
} from '../ActionsList/ActionsList';

import Form from '../Form/Form';
import Select from '../Select/Select';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import SpinnerLoader from '../Preloaders/SpinnerLoader';

import { GetActions } from '../../graphql';

import {
  SortOptions,
  SortSelectOptions,
  ActionTypeFilterOptions,
} from './sortOptions';

const ITEMS_PER_PAGE = 10;

import styles from './Actions.module.css';

interface SimpleColony {
  id: string;
  colonyAddress: string;
  name: string;
  [key: string]: any;
}

type Props = {
  colony: SimpleColony;
  selectedDomainId?: number;
};

const displayName = 'dashboard.ColonyActions';

const ColonyActions = ({
  colony: { colonyAddress, name: colonyName },
  colony,
  selectedDomainId,
}: Props) => {
  const [actionsSortOption, setActionsSortOption] = useState<string>(
    SortOptions.NEWEST,
  );
  const [actionsTypeFilterOption, setActionsTypeFilterOption] = useState<string>(
    'ALL',
  );

  const { data, loading, error, refetch } = useQuery(GetActions, {
    variables: {
      colonyAddress,
      actionType: actionsTypeFilterOption === 'ALL' ? undefined : actionsTypeFilterOption,
      domainId: selectedDomainId || undefined,
      limit: ITEMS_PER_PAGE,
      sort: actionsSortOption,
    },
  });

  if (loading) {
    return (
      <div className={styles.loadingSpinner}>
        <SpinnerLoader
          loadingText="Loading Actions"
          appearance={{ theme: 'primary', size: 'massive' }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.main}>
        <div className={styles.error}>Could not load actions</div>
      </div>
    );
  }


  if (!data?.getActions?.items?.length) {
    return (
      <div className={styles.main}>
        <div className={styles.noData}>No actions found</div>
      </div>
    );
  }

  const { canFetchMore, items: actions } = data.getActions;

  return (
    <div className={styles.main}>
      <div className={styles.bar}>
        <div className={styles.title}>
          Actions
        </div>

        <Form
          initialValues={{ filter: SortOptions.NEWEST }}
          onSubmit={() => undefined}
        >
          <div className={styles.filter}>
            <Select
              appearance={{
                alignOptions: 'left',
                theme: 'alt',
                unrestrictedOptionsWidth: 'true',
              }}
              elementOnly
              label="Sort Filter"
              name="sortFilter"
              options={SortSelectOptions}
              onChange={setActionsSortOption}
              placeholder="Sort Filter"
            />
          </div>
        </Form>

        <Form
          initialValues={{ filter: 'ALL' }}
          onSubmit={() => undefined}
        >
          <div className={styles.filter}>
            <Select
              appearance={{
                alignOptions: 'left',
                theme: 'alt',
                unrestrictedOptionsWidth: 'true',
              }}
              elementOnly
              label="Type Filter"
              name="actionTypeFilter"
              options={ActionTypeFilterOptions}
              onChange={setActionsTypeFilterOption}
              placeholder="Type Filter"
            />
          </div>
        </Form>
      </div>

      <ActionsList
        items={actions}
        // handleItemClick={handleActionRedirect}
      />

      {canFetchMore && (
        <LoadMoreButton
          onClick={() => {
            refetch({
              limit: actions.length + ITEMS_PER_PAGE,
            });
          }}
          isLoadingData={loading}
        />
      )}
    </div>
  );
};

ColonyActions.displayName = displayName;

export default ColonyActions;
