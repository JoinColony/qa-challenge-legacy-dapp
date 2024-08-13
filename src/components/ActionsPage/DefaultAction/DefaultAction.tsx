import React from 'react';

import Tag from '../../Tag/Tag';

import DetailsWidget from '../../DetailsWidget/DetailsWidget';
import { Action, ActionTypes } from '../../ActionsList/ActionsList';
import ActionTitle from '../../ActionTitle/ActionTitle';
import ActionsPageEvent from '../../ActionsPageEvent/ActionsPageEvent';
import BackText from '../../BackTexts/BackText';

import styles from './DefaultAction.module.css';

const displayName = 'dashboard.ActionsPage.DefaultAction';

type SimpleColony = {
  id: string;
  colonyAddress: string;
  name: string;
  [key: string]: any;
}

type User = {
  address: string;
  username: string;
};

interface Props {
  action: Action;
  user: User;
  colony: SimpleColony;
}

const DefaultAction = ({
  action: { status},
  action,
  user,
  colony: { name, displayName: colonyDisplayName },
  colony,
}: Props) => {

  return (
    <div className={styles.main}>
      <BackText name={name} displayName={colonyDisplayName} />
      <div className={styles.upperContainer}>
        <p className={styles.tagWrapper}>
          <Tag
            text={status ? 'Passed' : 'Failed'}
            appearance={{
              theme: status ? 'primary' : 'dangerGhost',
              colorSchema: status ? 'inverted' : 'plain',
            }}
          />
        </p>
      </div>
      <hr className={styles.dividerTop} />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            <ActionTitle action={action} />
          </h1>
          <ActionsPageEvent
            action={action}
            user={user}
            colony={colony}
          />
        </div>
        <div className={styles.details}>
          <DetailsWidget action={action} />
        </div>
      </div>
    </div>
  );
};

DefaultAction.displayName = displayName;

export default DefaultAction;
