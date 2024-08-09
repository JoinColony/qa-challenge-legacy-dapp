import React, { HTMLAttributes } from 'react';

import { getMainClasses } from '../../../src/utils';

import styles from './DropdownMenu.module.css';

interface Appearance {
  theme?: 'dark';
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  /** Appearance object */
  appearance?: Appearance;
}

const displayName = 'DropdownMenu';

const DropdownMenu = ({ appearance, children, ...props }: Props) => (
  <div className={getMainClasses(appearance, styles)} {...props}>
    {children}
  </div>
);

DropdownMenu.displayName = displayName;

export default DropdownMenu;
