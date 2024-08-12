import React, { useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { navigate } from '../NaiveRouter/NaiveRouter';
import LoadingTemplate from '../LoadingTemplate/LoadingTemplate';
import DefaultAction from './DefaultAction/DefaultAction';

import { GetSingleAction } from '../../graphql';


const displayName = 'dashboard.ActionsPage';

const ActionsPage = ({ actionId }: { actionId: string | null }) => {
  const handleNavigate = useCallback((path: string) => navigate(path), []);

  const { data, loading, error } = useQuery(GetSingleAction, {
    variables: { actionId },
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      handleNavigate(`/404`);
    }
  }, []);

  if (loading || !data.getSingleAction) {
    return <LoadingTemplate loadingText="Loading Action ..." />;
  }

  const { getSingleAction: action } = data;

  console.log({ action });

  return (
    <DefaultAction action={action} />
  );
};

ActionsPage.displayName = displayName;

export default ActionsPage;
