import React from 'react';

import Heading from '../Heading/Heading';
import { User } from './UserProfileEdit';

import Avatar from '../Avatar/Avatar';

interface Props {
  user: User;
}

const displayName = 'users.UserProfileEdit.Sidebar';

const Sidebar = ({
  user: {
    username,
    walletAddress,
  },
}: Props) => (
  <>
    <Heading
      appearance={{ theme: 'dark', size: 'medium' }}
      text="Profile Picture"
    />
    <Avatar
      size='xl'
      seed={`${username}+${walletAddress}`}
    />
  </>
);

Sidebar.displayName = displayName;

export default Sidebar;
