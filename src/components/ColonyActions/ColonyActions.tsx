import React, { useCallback, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import ActionsList, {
  ClickHandlerProps as RedirectHandlerProps,
} from '../ActionsList/ActionsList';

import Form from '../Form/Form';
import Select from '../Select/Select';
// import LoadMoreButton from '~core/LoadMoreButton';
import SpinnerLoader from '../Preloaders/SpinnerLoader';

import { GetActions } from '../../graphql';

import { SortOptions, SortSelectOptions } from './sortOptions';

const COLONY_TOTAL_BALANCE_DOMAIN_ID = 0;

import styles from './ColonyActions.module.css';

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

  const { data, loading, error } = useQuery(GetActions, {
    variables: {
      colonyAddress,
      sort: actionsSortOption,
    },
  });

  console.log({ data })

  // const ITEMS_PER_PAGE = 10;
  // const NUM_FETCH_ITEMS = 50;

  // const [dataPage, setDataPage] = useState<number>(1);

  /*
   * Slapfix intended to limit the number of items fetched at once from
   * The subpgraph. You can tinker with the NUM_FETCH_ITEMS and BATCH_THRESHOLD
   * values to get more milage out of this
   *
   * Also note, that this is a poor place to store this method, but it was
   * added under a time crunch.
   */
  // const getNumbersOfEntriesToFetch = () => {
  //   const BATCH_THRESHOLD = 10;
  //   let noOfFetches = 1;
  //   if (dataPage * ITEMS_PER_PAGE >= NUM_FETCH_ITEMS - BATCH_THRESHOLD) {
  //     noOfFetches += 1;
  //   }
  //   return noOfFetches * NUM_FETCH_ITEMS;
  // };



  // const handleDataPagination = useCallback(() => {
  //   setDataPage(dataPage + 1);
  // }, [dataPage]);

  // const actionsSort = useCallback(
  //   (first: FormattedAction, second: FormattedAction) => {
  //     switch (actionsSortOption) {
  //       case SortOptions.NEWEST:
  //         return second.createdAt.getTime() - first.createdAt.getTime();
  //       case SortOptions.OLDEST:
  //         return first.createdAt.getTime() - second.createdAt.getTime();
  //       case SortOptions.HAVE_ACTIVITY:
  //         return second.commentCount - first.commentCount;
  //       default:
  //         return 0;
  //     }
  //   },
  //   [actionsSortOption],
  // );

  // const sortedActionsData: FormattedAction[] = useMemo(
  //   () => filteredActions.sort(actionsSort),
  //   [actionsSort, filteredActions],
  // );

  // const paginatedActionData: FormattedAction[] = sortedActionsData.slice(
  //   0,
  //   ITEMS_PER_PAGE * dataPage,
  // );

  // const handleActionRedirect = useCallback(
  //   ({ transactionHash }: RedirectHandlerProps) =>
  //     history.push(`/colony/${colonyName}/tx/${transactionHash}`),
  //   [colonyName, history],
  // );

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


  if (!data?.getActions?.length) {
    return (
      <div className={styles.main}>
        <div className={styles.noData}>No actions found</div>
      </div>
    );
  }

  const actions = data.getActions;

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
              label="Filter"
              name="filter"
              options={SortSelectOptions}
              onChange={setActionsSortOption}
              placeholder="Filter"
            />
          </div>
        </Form>
      </div>

      <ActionsList
        items={actions}
        // handleItemClick={handleActionRedirect}
      />

      {/* {ITEMS_PER_PAGE * dataPage < actions.length && (
        <LoadMoreButton
          onClick={handleDataPagination}
          isLoadingData={oneTxActionsLoading || eventsActionsLoading}
        />
      )} */}
    </div>
  );
};

ColonyActions.displayName = displayName;

export default ColonyActions;
