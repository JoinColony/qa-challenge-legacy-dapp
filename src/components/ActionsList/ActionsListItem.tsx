import React, { useCallback, useMemo } from 'react';

import Tag from '../Tag/Tag';
import UserMention from '../UserMention/UserMention';

import { getMainClasses, removeValueUnits } from '../../utils';

import { ClickHandlerProps, Action } from './ActionsList';
import Avatar from '../Avatar/Avatar';
import InfoPopover from '../InfoPopover/InfoPopover';

import styles from './ActionsListItem.module.css';

const displayName = 'ActionsList.ActionsListItem';

interface Props {
  item: Action;
  handleOnClick?: (handlerProps: ClickHandlerProps) => void;
}

const popoverWidth = '100px';
const popoverDistance = '10px';

const ActionsListItem = ({
  item: {
    id,
    transactionHash,
    walletAddress,
    username,
    status,
    type,
    domainName,
    createdAt,
    amount,
    tokenSymbol,
  },
  handleOnClick,
}: Props) => {

  let title = <span>Generic Action</span>;

  switch (type) {
    case 'MINT':
      title = <span>Mint {amount || 0} {tokenSymbol || '???'}</span>;
      break;
    case 'PAYMENT':
      title = <span>Pay <UserMention username={username || ''} className={styles.mention} /> {amount || 0} {tokenSymbol || '???'}</span>;
      break;
    case 'TRANSFER':
      break;
    case 'PERMISSIONS':
      break;
    case 'UPGRADE':
      break;

    default:
      break;
  }

  const popoverPlacement = useMemo(() => {
    const offsetSkid = (-1 * removeValueUnits(popoverWidth)) / 2;
    return [offsetSkid, removeValueUnits(popoverDistance)];
  }, []);

  const handleSyntheticEvent = useCallback(
    () => handleOnClick && handleOnClick({ id, transactionHash }),
    [handleOnClick, id, transactionHash],
  );

  const stopPropagation = (event: { stopPropagation: () => any; }) => event.stopPropagation();

  const formatTimestamp = (timestamp: number) => {
    const dateParts = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).formatToParts(new Date(1711409193534));
    const day = dateParts.find((part) => part.type === 'day')?.value;
    const month = dateParts.find((part) => part.type === 'month')?.value;
    const year = dateParts.find((part) => part.type === 'year')?.value;
    return `${day} ${month} ${year}`;
  };

  return (
    <li data-test="actionItem">
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
        className={getMainClasses({}, styles, {
          noPointer: !handleOnClick,
        })}
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
                  seed={username || walletAddress}
                  size='s'
                />
              </div>
            </InfoPopover>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>
              {title}
            </span>
            {(typeof status !== 'undefined') && (
              <div className={styles.tagWrapper}>
                <Tag
                  text={status === 'TRUE' ? 'Passed' : 'Failed'}
                  appearance={{
                    theme: status === 'TRUE' ? 'primary' : 'dangerGhost',
                    colorSchema: status === 'TRUE' ? 'inverted' : 'plain',
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
