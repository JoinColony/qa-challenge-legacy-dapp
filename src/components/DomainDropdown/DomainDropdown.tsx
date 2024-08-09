import React, { ComponentProps, ReactNode, useCallback, useMemo } from 'react';

import Select from '../Select/Select';
import { SelectOption, DropdownSize } from '../Select/types';
import { Color } from '../ColorTag/ColorTag';

import DomainDropdownItem from './DomainDropdownItem';

const COLONY_TOTAL_BALANCE_DOMAIN_ID = 0;

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
  domains?: Domain[];

  /** Optional form element name */
  name?: string;

  /** Optional domain to emphasize the current selected domain */
  currentDomainId?: number;

  /** Optional callback triggereded when the domain is being changed via the dropdown */
  onDomainChange?: (domainId: number) => any;

  /** Optional method to trigger when clicking the "Edit Domain" button   */
  onDomainEdit?: (domainId: number) => any;

  /** Optional component to display in the footer of the dropdown */
  footerComponent?: ReactNode;

  /** The optional component (rendered via a function) to use as a trigger in order to open the dropdown */
  renderActiveOptionFn?: (
    activeOption: SelectOption | undefined,
    activeOptionLabel: string,
  ) => ReactNode;

  /** Optional method to filter the options array */
  filterOptionsFn?: (option: SelectOption) => boolean;

  /** Toggle if to display the "All Domains" entry */
  showAllDomains?: boolean;

  /** Toggle if to set the domain dropdown in a disabled state (won't open) */
  disabled?: boolean;

  /** Provides value for data-test prop in select button used on cypress testing */
  dataTest?: string;

  /** Provides value for data-test prop in select items used on cypress testing */
  itemDataTest?: string;

  /** Provides the option of setting a different dropdown size than the default one */
  dropdownSize?: DropdownSize;
}

const displayName = 'DomainDropdown';

const DomainDropdown = ({
  domains,
  name = 'selectedDomainId',
  currentDomainId,
  onDomainChange,
  onDomainEdit,
  footerComponent,
  renderActiveOptionFn,
  filterOptionsFn,
  showAllDomains = true,
  disabled = false,
  dataTest,
  itemDataTest,
  dropdownSize = 'mediumLarge',
}: Props) => {
  const handleSubmit = useCallback(
    (domainId: number) => {
      if (onDomainChange) {
        return onDomainChange(domainId);
      }
      return null;
    },
    [onDomainChange],
  );

  const options = useMemo<ComponentProps<typeof Select>['options']>(() => {
    const allDomainsOption: SelectOption = {
      children: (
        <DomainDropdownItem
          domain={ALLDOMAINS_DOMAIN_SELECTION}
          isSelected={currentDomainId === 0}
          onDomainEdit={onDomainEdit}
        />
      ),
      label: 'All Teams',
      value: '0',
    };
    const showAllDomainsOption = showAllDomains ? [allDomainsOption] : [];
    if (!domains) {
      return showAllDomainsOption;
    }
    const domainOptions = [
      ...showAllDomainsOption,
      ...domains
        .map((domain) => {
          const { nativeId, name: domainName } = domain;
          return {
            children: (
              <DomainDropdownItem
                domain={domain}
                isSelected={currentDomainId === nativeId}
                onDomainEdit={onDomainEdit}
              />
            ),
            label: domainName,
            value: `${nativeId}`,
          };
        }),
    ];
    if (filterOptionsFn) {
      return domainOptions.filter(filterOptionsFn);
    }
    return domainOptions;
  }, [
    domains,
    currentDomainId,
    onDomainEdit,
    showAllDomains,
    filterOptionsFn,
  ]);

  return (
    <Select
      appearance={{
        borderedOptions: 'true',
        size: dropdownSize,
        theme: 'alt',
        width: 'content',
      }}
      elementOnly
      label="Filter by Domain"
      name={name}
      onChange={(val) => {
        handleSubmit(Number(val));
      }}
      options={options}
      optionsFooter={footerComponent}
      renderActiveOption={renderActiveOptionFn}
      disabled={disabled}
      dataTest={dataTest}
      itemDataTest={itemDataTest}
    />
  );
};

DomainDropdown.displayName = displayName;

export default DomainDropdown;
