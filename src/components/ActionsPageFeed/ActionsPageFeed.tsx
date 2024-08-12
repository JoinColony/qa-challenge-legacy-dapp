import React, { useState, useMemo, ReactElement, ReactNode } from 'react';

import ActionsPageEvent from '../ActionsPageEvent/ActionsPageEvent';

import { Action } from '../ActionsList/ActionsList';

import styles from './ActionsPageFeed.module.css';

const displayName = 'ActionsPageFeed';

type User = {
  address: string;
  username: string;
};

type SimpleColony = {
  id: string;
  colonyAddress: string;
  name: string;
  [key: string]: any;
}

interface Props {
  action: Action;
  user: User;
  colony: SimpleColony;
}

const ActionsPageFeed = ({
  action,
  user,
  colony,
}: Props) => {
  return (
    <ActionsPageEvent
      action={action}
      user={user}
      colony={colony}
    />
  );
};

ActionsPageFeed.displayName = displayName;

export default ActionsPageFeed;
