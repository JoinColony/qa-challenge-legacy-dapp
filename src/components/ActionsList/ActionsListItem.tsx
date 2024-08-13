import React, { useCallback, useMemo } from 'react';

import Tag from '../Tag/Tag';
import UserMention from '../UserMention/UserMention';
import { navigate } from '../NaiveRouter/NaiveRouter';
import { Action, ActionTypes } from './ActionsList';
import Avatar from '../Avatar/Avatar';
import InfoPopover from '../InfoPopover/InfoPopover';
import ActionTitle from '../ActionTitle/ActionTitle';

import { getMainClasses, removeValueUnits } from '../../utils';

import styles from './ActionsListItem.module.css';

const displayName = 'ActionsList.ActionsListItem';

interface Props {
  item: Action;
}

const popoverWidth = '100px';
const popoverDistance = '10px';

const ActionsListItem = ({
  item: {
    transactionHash,
    walletAddress,
    username,
    status,
    domainName,
    createdAt,
  },
  item,
}: Props) => {
  const handleNavigate = useCallback((path: string) => navigate(path), []);

  const popoverPlacement = useMemo(() => {
    const offsetSkid = (-1 * removeValueUnits(popoverWidth)) / 2;
    return [offsetSkid, removeValueUnits(popoverDistance)];
  }, []);

  const handleSyntheticEvent = useCallback(
    () => handleNavigate(`/tx/${transactionHash}`),
    [handleNavigate, transactionHash],
  );

  const stopPropagation = (event: { stopPropagation: () => any; }) => event.stopPropagation();

  const formatTimestamp = (timestamp: number) => {
    const dateParts = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).formatToParts(new Date(timestamp));
    const day = dateParts.find((part) => part.type === 'day')?.value;
    const month = dateParts.find((part) => part.type === 'month')?.value;
    return `${day} ${month}`;
  };

  return (
    <li>
      <div
        /*
         * @NOTE This is non-interactive element to appease the DOM Nesting Validator
         *
         * We're using a lot of nested components here, which themselves render interactive
         * elements.
         * So if this were say... a button, it would try to render a button under a button
         * and the validator would just yell at us some more.
         *
         * The other way to solve this, would be to make this list a table, and have the
         * click handler on the table row.
         * That isn't a option for us since I couldn't make the text ellipsis
         * behave nicely (ie: work) while using our core <Table /> components
         */
        role="button"
        tabIndex={0}
        className={getMainClasses({}, styles, {})}
        onClick={handleSyntheticEvent}
        onKeyPress={handleSyntheticEvent}
      >
        <div
          /*
           * Clicking on UserAvatar would redirect to Actions page and stop
           * interaction with popover.
           * stopPropagation prevents event being inherited by child
           */
          onClick={stopPropagation}
          onKeyPress={stopPropagation}
          role="button"
          tabIndex={0}
          className={styles.avatar}
        >
          {(walletAddress || username) && (
            <InfoPopover
              username={username || ''}
              walletAddress={walletAddress || ''}
              showArrow={false}
              popperOptions={{
                placement: 'bottom',
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: popoverPlacement,
                    },
                  },
                ],
              }}
            >
              <div>
                <Avatar
                  seed={`${username}+${walletAddress}`}
                  size='s'
                />
              </div>
            </InfoPopover>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>
              <ActionTitle action={item} />
            </span>
            {(typeof status !== 'undefined') && (
              <div className={styles.tagWrapper}>
                <Tag
                  text={status ? 'Passed' : 'Failed'}
                  appearance={{
                    theme: status? 'primary' : 'dangerGhost',
                    colorSchema: status ? 'inverted' : 'plain',
                  }}
                />
              </div>
            )}
          </div>
          <div className={styles.meta}>
            {createdAt && (
              <span className={styles.day}>
                {formatTimestamp(createdAt)}
              </span>
            )}
            {domainName && (
              <span className={styles.domain}>
                {domainName}
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

ActionsListItem.displayName = displayName;

export default ActionsListItem;
