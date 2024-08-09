import React, { useCallback } from 'react';

import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuItem from '../DropdownMenu/DropdownMenuItem/DropdownMenuItem';
import DropdownMenuSection from '../DropdownMenu/DropdownMenuSection/DropdownMenuSection';

import { navigate } from '../NaiveRouter/NaiveRouter';


interface Props {
  closePopover: () => void;
  handleDisconnect?: () => void;
}

const displayName = 'users.AvatarDropdown.AvatarDropdownPopover';

const AvatarDropdownPopover = ({
  closePopover,
  handleDisconnect,
}: Props) => {
  const handleNavigate = useCallback((path: string) => navigate(path), []);

  return (
    <DropdownMenu onClick={closePopover}>
      <DropdownMenuSection separator>
        <DropdownMenuItem>
          <button
            type="button"
            onClick={() => handleNavigate('/profile')}
          >
            My Profile
          </button>
        </DropdownMenuItem>
      </DropdownMenuSection>
      <DropdownMenuSection separator>
        <DropdownMenuItem>
          <button
            type="button"
            onClick={() => {
              if (handleDisconnect) {
                handleDisconnect();
              }
            }}
          >
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuSection>
    </DropdownMenu>
  );
};

AvatarDropdownPopover.displayName = displayName;

export default AvatarDropdownPopover;
