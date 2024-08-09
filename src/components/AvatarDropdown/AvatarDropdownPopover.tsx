import React from 'react';

import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuItem from '../DropdownMenu/DropdownMenuItem/DropdownMenuItem';
import DropdownMenuSection from '../DropdownMenu/DropdownMenuSection/DropdownMenuSection';

interface Props {
  closePopover: () => void;
}

const displayName = 'users.AvatarDropdown.AvatarDropdownPopover';

const AvatarDropdownPopover = ({
  closePopover,
}: Props) => {
  return (
    <DropdownMenu onClick={closePopover}>
      <DropdownMenuSection separator>
        <DropdownMenuItem>
          <a href='/profile'>My Profile</a>
        </DropdownMenuItem>
      </DropdownMenuSection>
      <DropdownMenuItem>
        <a href='/logout'>Logout</a>
      </DropdownMenuItem>
    </DropdownMenu>
  );
};

AvatarDropdownPopover.displayName = displayName;

export default AvatarDropdownPopover;
