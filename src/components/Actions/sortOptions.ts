import { ActionTypes } from '../ActionsList/ActionsList';

export enum SortOptions {
  NEWEST = 'DESC',
  OLDEST = 'ASC',
  HAVE_ACTIVITY = 'HAVE_ACTIVITY',
}

export type SortOptionType = SortOptions[keyof SortOptions];

export const SortSelectOptions = [
  {
    label: 'Newest',
    value: SortOptions.NEWEST,
  },
  {
    label: 'Oldest',
    value: SortOptions.OLDEST,
  },
];

export const ActionTypeFilterOptions = [
  {
    label: 'All',
    value: 'ALL',
  },
  {
    label: 'Payment',
    value: ActionTypes.Payment,
  },
  {
    label: 'Mint',
    value: ActionTypes.Mint,
  },
  {
    label: 'Transfer',
    value: ActionTypes.Transfer,
  },
  {
    label: 'Reputation',
    value: ActionTypes.Reputation,
  },
  {
    label: 'Permissions',
    value: ActionTypes.Permissions,
  },
  {
    label: 'Upgrade',
    value: ActionTypes.Upgrade,
  },
  {
    label: 'Details',
    value: ActionTypes.Details,
  },
  {
    label: 'Address',
    value: ActionTypes.Address,
  },
  {
    label: 'Teams',
    value: ActionTypes.Team,
  },
  {
    label: 'Generic',
    value: ActionTypes.Generic,
  },
];
