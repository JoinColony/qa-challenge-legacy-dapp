import React, { useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';

import ProfileLayout from '../ProfileLayout/ProfileLayout';
import Sidebar from './Sidebar';
import UserMainSettings from './UserMainSettings';
import LoadingTemplate from '../LoadingTemplate/LoadingTemplate';
import { navigate } from '../NaiveRouter/NaiveRouter';

import { GetUser } from '../../graphql';

const displayName = 'users.UserProfileEdit';

export type User = {
  walletAddress: string;
  username: string;
};

const UserProfileEdit = () => {
  const { data, loading, error } = useQuery(
    GetUser,
    { variables: { walletAddress: '0xa00005' } }, // user: zoe
  );
  const handleNavigate = useCallback((path: string) => navigate(path), []);

  console.log({ data })

  useEffect(() => {
    if (error) {
      console.error(error);
      handleNavigate(`/404`);
    }
  }, []);

  if (loading || !data.getUser) {
    return <LoadingTemplate loadingText="Loading User ..." />;
  }

  const { getUser: user } = data;

  return (
    <ProfileLayout
      appearance={{ theme: 'alt' }}
      asideContent={<Sidebar user={user} />}
    >
      <Helmet>
        <title>User Profile | {user?.username}</title>
      </Helmet>
      <UserMainSettings user={user} />
    </ProfileLayout>
  );
};

UserProfileEdit.displayName = displayName;

export default UserProfileEdit;
