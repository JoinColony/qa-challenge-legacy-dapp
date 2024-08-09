import React from 'react';

import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuItem from '../DropdownMenu/DropdownMenuItem/DropdownMenuItem';
import DropdownMenuSection from '../DropdownMenu/DropdownMenuSection/DropdownMenuSection';

interface Props {
  closePopover: () => void;
  handleDisconnect?: () => void;
}

const displayName = 'users.AvatarDropdown.AvatarDropdownPopover';

const AvatarDropdownPopover = ({
  closePopover,
  handleDisconnect,
}: Props) => {
  return (
    <DropdownMenu onClick={closePopover}>
      <DropdownMenuSection separator>
        <DropdownMenuItem>
          <a href='/profile'>My Profile</a>
        </DropdownMenuItem>
      </DropdownMenuSection>
      <DropdownMenuSection separator>
        <DropdownMenuItem>
          <button type="button" onClick={() => {
            if (handleDisconnect) {
              handleDisconnect();
            }
          }}>Logout</button>
        </DropdownMenuItem>
      </DropdownMenuSection>
    </DropdownMenu>
  );
};

AvatarDropdownPopover.displayName = displayName;

export default AvatarDropdownPopover;
