import { ReactNode } from 'react';

export type { Props } from './Select';

export type DropdownSize = 'normal' | 'medium' | 'mediumLarge' | 'large';

export interface Appearance {
  alignOptions?: 'left' | 'center' | 'right';
  borderedOptions?: 'true' | 'false';
  size?: DropdownSize;
  theme?: 'default' | 'alt' | 'grey' | 'grid';
  width?: 'content' | 'fluid' | 'strict';
  unrestrictedOptionsWidth?: 'true' | 'false';
}

export interface SelectOption {
  // Will override `label` for display - `label` still required for a11y
  children?: ReactNode;
  disabled?: boolean;
  label: string;
  value: any;
  labelElement?: ReactNode;
}
