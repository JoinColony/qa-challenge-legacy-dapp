import React from 'react';

import Tag from '../../Tag/Tag';

import DetailsWidget from '../../DetailsWidget/DetailsWidget';
// import ActionsPageFeed from '~dashboard/ActionsPageFeed';
import { Action, ActionTypes } from '../../ActionsList/ActionsList';
import ActionTitle from '../../ActionTitle/ActionTitle';

import styles from './DefaultAction.module.css';

const displayName = 'dashboard.ActionsPage.DefaultAction';

interface Props {
  action: Action;
}

const DefaultAction = ({
  action: {
    id,
    transactionHash,
    walletAddress,
    username,
    status,
    type,
    domainName,
    targetDomainName,
    createdAt,
    amount,
    tokenSymbol,
    permissions,
    version
  },
  action,
}: Props) => {

  // const actionAndEventValues = {
  //   actionType: extendedActionType,
  //   initiator: (
  //     <span className={styles.titleDecoration}>
  //       <FriendlyName user={initiator} autoShrinkAddress />
  //     </span>
  //   ),
  //   recipient: (
  //     <span className={styles.titleDecoration}>
  //       <FriendlyName user={recipient} autoShrinkAddress colony={colony} />
  //     </span>
  //   ),
  //   amount: <Numeral value={decimalAmount} />,
  //   token,
  //   tokenSymbol: <span>{symbol || '???'}</span>,
  //   decimals: getTokenDecimalsWithFallback(decimals),
  //   fromDomain:
  //     domainMetadata ||
  //     (domains.find(
  //       ({ ethDomainId }) => ethDomainId === fromDomain,
  //     ) as OneDomain) ||
  //     fallbackFromDomain?.colonyDomain,
  //   toDomain:
  //     (domains.find(
  //       ({ ethDomainId }) => ethDomainId === toDomain,
  //     ) as OneDomain) || fallbackToDomain?.colonyDomain,
  //   newVersion,
  //   oldVersion,
  //   colonyName: (
  //     <FriendlyName
  //       colony={{
  //         ...colony,
  //         ...(colonyDisplayName ? { displayName: colonyDisplayName } : {}),
  //       }}
  //       autoShrinkAddress
  //     />
  //   ),
  //   roles,
  //   reputationChange: formattedReputationChange,
  //   reputationChangeNumeral: <Numeral value={formattedReputationChange} />,
  //   isSmiteAction: new Decimal(reputationChange).isNegative(),
  //   removedSafes,
  //   removedSafesString,
  //   addedSafeAddress: addedSafe && (
  //     <MaskedAddress address={addedSafe.contractAddress} />
  //   ),
  //   chainName: addedSafe && SAFE_NAMES_MAP[addedSafe.chainId],
  //   safeName: addedSafe?.safeName || (
  //     <span className={styles.user}>@{safeTransactionSafe?.safeName}</span>
  //   ),
  //   moduleAddress: addedSafe && (
  //     <MaskedAddress address={addedSafe.moduleContractAddress} />
  //   ),
  //   safeTransactionTitle: transactionsTitle || locationState?.title,
  //   safeTransactions: !isEmpty(safeTransactions)
  //     ? safeTransactions
  //     : locationState?.transactions,
  //   /*
  //    * The following references to firstSafeTransaction are only used in the event that there's only one safe transaction.
  //    * Multiple transactions has its own message.
  //    */
  //   safeTransactionAmount: (
  //     <>
  //       <Numeral value={firstSafeTransaction?.amount || ''} />
  //       <span> {firstSafeTransaction?.tokenData?.symbol}</span>
  //     </>
  //   ),
  //   safeTransactionRecipient: (
  //     <span className={styles.user}>
  //       @{firstSafeTransaction?.recipient?.profile.username}
  //     </span>
  //   ),
  //   safeTransactionNftToken: (
  //     <span className={styles.user}>
  //       {firstSafeTransaction?.nftData?.name ||
  //         firstSafeTransaction?.nftData?.tokenName}
  //     </span>
  //   ),
  //   safeTransactionFunctionName: firstSafeTransaction?.contractFunction || '',
  //   safeTransactionContractName:
  //     firstSafeTransaction?.contract?.profile.displayName ||
  //     formatMessage(unknownContractMSG),
  //   safeTransactionAddress: (
  //     <MaskedAddress
  //       address={firstSafeTransaction?.recipient?.profile.walletAddress || ''}
  //     />
  //   ),
  //   safeTransactionSafe,
  //   // id will be filterValue if an address was manually entered into the picker
  //   isSafeTransactionRecipientUser: !(
  //     firstSafeTransaction?.recipient?.id === 'filterValue'
  //   ),
  //   safeTransactionStatuses,
  // };

  // const actionAndEventValuesForDocumentTitle = {
  //   actionType: extendedActionType,
  //   initiator:
  //     initiator.profile?.displayName ??
  //     initiator.profile?.username ??
  //     initiator.profile?.walletAddress,
  //   recipient:
  //     recipient.profile?.displayName ??
  //     recipient.profile?.username ??
  //     recipient.profile?.walletAddress,
  //   amount: decimalAmount,
  //   tokenSymbol: symbol,
  //   newVersion,
  //   oldVersion,
  //   fromDomain: actionAndEventValues.fromDomain?.name,
  //   toDomain: actionAndEventValues.toDomain?.name,
  //   roles: roleTitle,
  //   reputationChange: actionAndEventValues.reputationChange,
  //   reputationChangeNumeral: actionAndEventValues.reputationChangeNumeral,
  //   chainName: addedSafe && SAFE_NAMES_MAP[addedSafe.chainId],
  //   safeTransactionTitle: transactionsTitle || locationState?.title,
  // };

  return (
    <div className={styles.main}>
      <div className={styles.upperContainer}>
        <p className={styles.tagWrapper}>
          <Tag
            text={status ? 'Passed' : 'Failed'}
            appearance={{
              theme: status ? 'primary' : 'dangerGhost',
              colorSchema: status ? 'inverted' : 'plain',
            }}
          />
        </p>
      </div>
      <hr className={styles.dividerTop} />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            <ActionTitle action={action} />
          </h1>
          {/* <ActionsPageFeed
            actionType={actionType}
            transactionHash={transactionHash as string}
            networkEvents={events}
            values={actionAndEventValues}
            actionData={colonyAction}
            colony={colony}
          /> */}
        </div>
        <div className={styles.details}>
          <DetailsWidget action={action} />
        </div>
      </div>
    </div>
  );
};

DefaultAction.displayName = displayName;

export default DefaultAction;
