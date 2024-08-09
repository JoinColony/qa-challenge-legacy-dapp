import React, { useMemo } from 'react';
import classnames from 'classnames';

import Popover from '../Popover/Popover';
import Avatar from '../Avatar/Avatar';
import { removeValueUnits } from '../../../src/utils';
import AvatarDropdownPopover from './AvatarDropdownPopover';

import styles from './AvatarDropdown.module.css';

interface Props {
  walletAddress: string;
  handleDisconnect?: () => void;
}

const displayName = 'users.AvatarDropdown';

const refWidth = '63px';
const horizontalOffset = '20px';
const verticalOffset = '19px';

const AvatarDropdown = ({
  walletAddress,
  handleDisconnect,
}: Props) => {
  /*
   * @NOTE Offset Calculations
   * See: https://popper.js.org/docs/v2/modifiers/offset/
   *
   * Skidding:
   * The Width of the reference element (width) plus the horizontal offset
   * Note that all skidding, for bottom aligned elements, needs to be negative.
   *
   * Distace:
   * This is just the required offset in pixels. Since we are aligned at
   * the bottom of the screen, this will be added to the bottom of the
   * reference element.
   */
  const popoverOffset = useMemo(() => {
    const skid =
      removeValueUnits(refWidth) + removeValueUnits(horizontalOffset);
    return [-1 * skid, removeValueUnits(verticalOffset)];
  }, []);

  const popoverContent = ({ close }: { close: any }) => (
    <AvatarDropdownPopover
      closePopover={close}
      handleDisconnect={handleDisconnect}
    />
  );
  return (
    <Popover
      content={popoverContent}
      trigger="click"
      showArrow={false}
      popperOptions={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: popoverOffset,
            },
          },
        ],
      }}
    >
      {({ isOpen, toggle, ref, id }) => (
        <button
          id={id}
          ref={ref}
          className={classnames(styles.avatarButton, {
            [styles.activeDropdown]: isOpen,
          })}
          onClick={toggle}
          type="button"
          data-test="avatarDropdown"
        >
          {walletAddress && (
            <Avatar
              seed={walletAddress}
              size={'s'}
            />
          )}
        </button>
      )}
    </Popover>
  );
};

AvatarDropdown.displayName = displayName;

export default AvatarDropdown;
