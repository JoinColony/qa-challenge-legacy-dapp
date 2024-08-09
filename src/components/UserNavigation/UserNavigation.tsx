import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';

import AvatarDropdown from '../AvatarDropdown/AvatarDropdown';
import styles from './UserNavigation.module.css';
import { GetUser } from '../../graphql';
import { randomBetweenNumbers } from '../../utils';

const displayName = 'pages.NavigationWrapper.UserNavigation';

const UserNavigation = () => {
  const [user, setUser] = useState<{ username: string; walletAddress: string; }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [simulatedError, setSimulatedError] = useState<boolean>(false);
  const [randomness, setRandomness] = useState<number | undefined>(undefined);

  const [getUser, { data, error }] = useLazyQuery(GetUser);

  const handleConnectWallet = useCallback(async () => {
    setLoading(true);
    setTimeout(() => {
      if (randomness && randomness % 5 === 0) {
        setSimulatedError(true);
        setLoading(false);
        setRandomness(randomBetweenNumbers(1, 5));
        return;
      }
      getUser({
        variables: {
          walletAddress: '0xa00005' // user: zoe
        },
      })
      setRandomness(0);
      setSimulatedError(false);
    }, 1000);
  }, [ randomness ]);

  const handleDisconnectWallet = useCallback(async () => {
    setUser(undefined);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (error) {
      setSimulatedError(true);
      setLoading(false);
      return;
    }
    if (data?.getUser?.walletAddress && data?.getUser?.username) {
      const newUser = data.getUser;
      setUser(newUser);
      setLoading(false);
    }
  }, [data, loading, error, simulatedError, randomness]);

  useEffect(() => {
    if (typeof randomness === 'undefined') {
      setRandomness(randomBetweenNumbers(1, 5));
    }
  }, [randomness]);

  return (
    <>
      <div className={styles.main}>
        {user ? (
          <AvatarDropdown
            username={user?.username || ''}
            walletAddress={user?.walletAddress || ''}
            handleDisconnect={handleDisconnectWallet}
          />
        ) : (
          <button
            type="button"
            className={simulatedError ? styles.connectWalletButtonError : styles.connectWalletButton}
            onClick={handleConnectWallet}
            aria-busy={loading}
          >
            {simulatedError ? 'Failed to Connect' : 'Connect Wallet'}
          </button>
        )}
      </div>
    </>
  );
};

UserNavigation.displayName = displayName;

export default UserNavigation;
