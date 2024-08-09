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
