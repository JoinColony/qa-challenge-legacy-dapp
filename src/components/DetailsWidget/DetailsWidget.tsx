import React, { ReactElement } from 'react';

import { Action, ActionTypes } from '../ActionsList/ActionsList';
import DetailsWidgetTeam from '../DetailsWidgetTeam/DetailsWidgetTeam';
import DetailsWidgetUser from '../DetailsWidgetUser/DetailsWidgetUser';
import Avatar from '../Avatar/Avatar';

import { capitalize } from '../../utils';

import styles from './DetailsWidget.module.css';

const displayName = 'dashboard.ActionsPage.DetailsWidget';

interface Props {
  action: Action;
}

const DetailsWidget = ({
  action: {
    type,
    domainName,
    domainColor,
    targetDomainName,
    targetDomainColor,
    username,
    walletAddress = '',
    amount,
    tokenSymbol,
    tokenName,
    tokenAddress,
    permissions,
  },
}: Props) => {

  let fromDomainLabel = 'Team';
  if (type === ActionTypes.Payment || type === ActionTypes.Transfer) {
    fromDomainLabel = 'From';
  }

  let showDomain = true;
  if (type === ActionTypes.Mint || type === ActionTypes.Upgrade || type === ActionTypes.Details || type === ActionTypes.Address) {
    showDomain = false;
  }

  let showUser = false;
  if (type === ActionTypes.Payment || type === ActionTypes.Reputation || type === ActionTypes.Permissions) {
    showUser = true;
  }

  let showAmount = false;
  if (
    type === ActionTypes.Payment ||
    type === ActionTypes.Mint ||
    type === ActionTypes.Reputation ||
    type === ActionTypes.Transfer
  ) {
    showAmount = true;
  }

  let showTokenAmount = true;
  if (type === ActionTypes.Reputation) {
    showTokenAmount = false;
  }

  return (
    <div>
      <div className={styles.item}>
        <div className={styles.label}>
          Action Type
        </div>
        <div className={styles.value}>
          <div className={styles.text}>
            {capitalize(type.toLowerCase())}
          </div>
        </div>
      </div>
      {showDomain && domainName && (
        <div className={styles.item}>
          <div className={styles.label}>
            {fromDomainLabel}
          </div>
          <div className={styles.value}>
            <div className={styles.text}>
              <DetailsWidgetTeam
                domainName={domainName}
                domainColor={domainColor}
              />
            </div>
          </div>
        </div>
      )}
      {targetDomainName && (
        <div className={styles.item}>
          <div className={styles.label}>
            To
          </div>
          <div className={styles.value}>
            <div className={styles.text}>
              <DetailsWidgetTeam
                domainName={targetDomainName}
                domainColor={targetDomainColor}
              />
            </div>
          </div>
        </div>
      )}
      {showUser && username && (
        <div className={styles.item}>
          <div className={styles.label}>
            To
          </div>
          <div className={styles.value}>
            <div className={styles.text}>
              <DetailsWidgetUser
                walletAddress={walletAddress}
                username={username}
              />
            </div>
          </div>
        </div>
      )}
      {showAmount && amount && (
        <div className={styles.item}>
          <div className={styles.label}>
            {showTokenAmount ? 'Amount' : 'Reputation Change'}
          </div>
            {showTokenAmount ? (
              <div className={styles.tokenContainer}>
                {tokenAddress && tokenName && (
                  <div className={styles.tokenAvatar}>
                    <Avatar
                      seed={`${tokenName}+${tokenAddress}`}
                      data-tokenname={tokenName}
                      data-tokenaddress={tokenAddress}
                      size="xxs"
                    />
                  </div>
                )}
                <div className={styles.value}>
                  {`${amount} ${tokenSymbol}`}
                </div>
              </div>
            ) : (
              <div className={styles.value}>
                <div className={styles.text}>
                  {`${amount} points`}
                </div>
              </div>
            )}
          </div>
        )}
      {permissions && (
        <div className={styles.item}>
          <div className={styles.label}>
            Roles
          </div>
          <div className={styles.value}>
            <div className={styles.permissions}>
              {permissions.split(',').map(capitalize).join(', ')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DetailsWidget.displayName = displayName;

export default DetailsWidget;
