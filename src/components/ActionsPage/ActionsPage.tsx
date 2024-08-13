import React, { useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';

import { navigate } from '../NaiveRouter/NaiveRouter';
import LoadingTemplate from '../LoadingTemplate/LoadingTemplate';
import DefaultAction from './DefaultAction/DefaultAction';

import { GetSingleAction, GetUser, GetSimpleColony } from '../../graphql';
import { capitalize } from '../../utils';

const displayName = 'dashboard.ActionsPage';

const ActionsPage = ({ actionId }: { actionId: string | null }) => {
  const handleNavigate = useCallback((path: string) => navigate(path), []);

  const { data, loading, error } = useQuery(GetSingleAction, {
    variables: { actionId },
  });

  const {
    data: userData,
    loading: loadingUserData,
    error: errorUserData,
  } = useQuery(
    GetUser,
    { variables: { walletAddress: '0xa00005' } }, // user: zoe
  );

  const {
    data: colonyData,
    loading: loadingColonyData,
    error: errorColonyData,
  } = useQuery(
    GetSimpleColony,
    { variables: { colonyAddress: '0xe00001' } }, // user: serenity
  );

  useEffect(() => {
    if (error || errorUserData || errorColonyData) {
      console.error(error || errorUserData);
      handleNavigate(`/404`);
    }
  }, []);

  if (loading || loadingUserData || loadingColonyData || !data.getSingleAction) {
    return <LoadingTemplate loadingText="Loading Action ..." />;
  }

  const { getSingleAction: action } = data;
  const { getColony: colony } = colonyData;
  const { getUser: user } = userData;


  return (
    <>
    <Helmet>
      <title>{capitalize(action?.type?.toLowerCase())} Action | {colony?.displayName || colony?.name} Colony</title>
    </Helmet>
    <DefaultAction
      action={action}
      user={user}
      colony={colony}
    />
    </>
  );
};

ActionsPage.displayName = displayName;

export default ActionsPage;
