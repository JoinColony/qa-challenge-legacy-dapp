import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
} from 'react';
import classnames from 'classnames';

import Button from '../Button/Button';
import ColorTag, { Color } from '../ColorTag/ColorTag';
import Heading from '../Heading/Heading';

import styles from './DomainDropdownItem.module.css';

const ENTER = 'Enter';

const COLONY_TOTAL_BALANCE_DOMAIN_ID = 0;
const ROOT_DOMAIN_ID = 1;

const ALLDOMAINS_DOMAIN_SELECTION = {
  id: String(COLONY_TOTAL_BALANCE_DOMAIN_ID),
  color: Color.Yellow,
  nativeId: COLONY_TOTAL_BALANCE_DOMAIN_ID,
  name: 'All Teams',
  parent: null,
};

type Domain = {
  id: string;
  nativeId: number;
  parent?: number;
  name: string;
  color?: Color;
  colonyId: string;
}

interface Props {
  /** Domain to render the entry for */
  domain: Domain | typeof ALLDOMAINS_DOMAIN_SELECTION;

  /** Toggle if mark the current domain with the "selected" highlight */
  isSelected: boolean;

  /** Optional method to trigger when clicking the "Edit Domain" button   */
  onDomainEdit?: (domainId: number) => any;
}

const displayName = `DomainDropdown.DomainDropdownItem`;

const DomainDropdownItem = ({
  domain: {
    color = Color.LightPink,
    nativeId,
    parent,
    name,
  },
  isSelected,
  onDomainEdit,
  domain,
}: Props) => {
  const handleEditDomain = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (evt) => {
      evt.stopPropagation();
      if (onDomainEdit) {
        onDomainEdit(nativeId);
      }
    },
    [onDomainEdit, nativeId],
  );

  const handleEditDomainKeyDown = useCallback<
    KeyboardEventHandler<HTMLButtonElement>
  >(
    (evt) => {
      if (evt.key === ENTER) {
        evt.stopPropagation();
        if (onDomainEdit) {
          onDomainEdit(nativeId);
        }
      }
    },
    [onDomainEdit, nativeId],
  );

  return (
    <div className={styles.main}>
      {parent && (
        <div className={styles.childDomainIcon} />
      )}
      <div className={styles.mainContent}>
        <div
          className={classnames(styles.title, {
            [styles.activeDomain]: isSelected,
          })}
        >
          <div className={styles.color}>
            <ColorTag color={color} />
          </div>
          <div
            className={styles.headingWrapper}
            data-test="domainDropdownItemName"
          >
            <Heading
              appearance={{ margin: 'none', size: 'normal', theme: 'dark' }}
              text={name}
            />
          </div>
          {nativeId === ROOT_DOMAIN_ID && (
            <div className={styles.rootText}>
              {'(Root)'}
            </div>
          )}
        </div>
      </div>
      <div className={styles.editButtonCol}>
        {
          /*
           * Hide the edit button if:
           * - the selected domain is "All Domains"
           * - the selected domain is "Root"
           * - we haven't provider a `onDomainEdit` method
           */
          nativeId !== COLONY_TOTAL_BALANCE_DOMAIN_ID &&
            nativeId !== ROOT_DOMAIN_ID &&
            onDomainEdit && (
              <div className={styles.editButton}>
                <Button
                  appearance={{ theme: 'blue' }}
                  onClick={handleEditDomain}
                  onKeyDown={handleEditDomainKeyDown}
                  tabIndex={0}
                  text="Edit"
                />
              </div>
            )
        }
      </div>
    </div>
  );
};

DomainDropdownItem.displayName = displayName;

export default DomainDropdownItem;
