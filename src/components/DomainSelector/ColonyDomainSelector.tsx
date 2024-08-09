import React, { ReactNode, useCallback } from 'react';

import ColorTag, { Color } from '../ColorTag/ColorTag';
import Form from '../Form/Form';
import { SelectOption } from '../Select/types';
import DomainDropdown from '../DomainDropdown/DomainDropdown';

import styles from './ColonyDomainSelector.module.css';

interface FormValues {
  filteredDomainId: string;
}

type Domain = {
  id: string;
  nativeId: number;
  parent?: number;
  name: string;
  color?: Color;
  colonyId: string;
}

interface Props {
  filteredDomainId?: number;
  onDomainChange?: (domainId: number) => any;
  domains?: Domain[];
}

const displayName = 'dashboard.ColonyHome.DomainSelector';

const DomainSelector = ({
  filteredDomainId = 0,
  onDomainChange,
  domains = [],
}: Props) => {

  const getDomainColor = useCallback<(domainId: number | undefined) => Color>(
    (domainId) => {
      const rootDomainColor: Color = Color.LightPink;
      const defaultColor: Color = Color.Yellow;
      if (domainId === 1) {
        return rootDomainColor;
      }
      const domain = domains.find(
        ({ nativeId }) => nativeId === domainId,
      );
      return domain ? Color[domain?.color || Color.Yellow] : defaultColor;
    },
    [domains],
  );

  const renderActiveOption = useCallback<
    (option: SelectOption | undefined, label: string) => ReactNode
  >(
    (option, label) => {
      const value = option ? option.value : undefined;
      const color = getDomainColor(value);
      return (
        <div className={styles.activeItem}>
          <ColorTag color={color} />{' '}
          <div className={styles.activeItemLabel}>{label}</div>
        </div>
      );
    },
    [getDomainColor],
  );

  return (
    <Form<FormValues>
      initialValues={{
        filteredDomainId: String(filteredDomainId),
      }}
      onSubmit={() => {}}
    >
      <DomainDropdown
        domains={domains}
        name="filteredDomainId"
        currentDomainId={filteredDomainId}
        onDomainChange={onDomainChange}
        renderActiveOptionFn={renderActiveOption}
        showAllDomains
      />
    </Form>
  );
};

DomainSelector.displayName = displayName;

export default DomainSelector;
