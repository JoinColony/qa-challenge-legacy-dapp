import React, { ReactNode } from 'react';
import { PopperOptions } from 'react-popper-tooltip';

import Popover from '../Popover/Popover';

import UserInfoPopover from './UserInfoPopover';

interface BasicUserContentProps {
  username: string;
  walletAddress: string;
}

export type Props = BasicUserContentProps & {
  /** Children elemnts or components to wrap the tooltip around */
  children?: ReactNode;
  /** Passed onto `Popover` component */
  popperOptions?: PopperOptions;
  /** How the popover gets triggered */
  trigger?: 'hover' | 'click' | 'disabled';
  /** Show an arrow around on the side of the popover */
  showArrow?: boolean;
  banned?: boolean;
};

const displayName = 'InfoPopover';

const InfoPopover = ({
  children,
  popperOptions,
  trigger = 'click',
  showArrow = true,
  banned = false,
  ...contentProps
}: Props) => {
  const { username, walletAddress } = contentProps;
  return (
    <Popover
      content={<UserInfoPopover username={username} walletAddress={walletAddress} />}
      popperOptions={popperOptions}
      trigger={trigger}
      showArrow={showArrow}
    >
      {children}
    </Popover>
  );
};

InfoPopover.displayName = displayName;

export default InfoPopover;
