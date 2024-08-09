import React from 'react';
import isArray from 'lodash/isArray';

import { getMainClasses } from '../../utils';

import styles from './InputStatus.module.css';

export interface Appearance {
  theme?: 'fat' | 'underlined' | 'minimal' | 'dotted';
  direction?: 'horizontal';
  colorSchema?: 'dark' | 'grey' | 'transparent';
  statusSchema?: 'info';
  size?: 'small' | 'medium';
  textSpace?: 'wrap';
}

interface Props {
  /** Appearance object */
  appearance?: Appearance;

  /** Error text (if applicable) */
  error?: string;

  /** Status text (if applicable) */
  status?: string;

  /** Values for status text (react-intl interpolation) (if applicable) */
  touched?: boolean;
}

const displayName = 'InputStatus';

const InputStatus = ({
  appearance = {},
  error,
  status,
  touched,
}: Props) => {
  const getText = () => {
    if (status) {
      return status;
    }
    if (!!error && touched) {
      return error;
    }
    return null;
  };
  const text = getText();
  const Element = appearance.direction === 'horizontal' ? 'span' : 'p';
  return (
    <Element
      className={getMainClasses(appearance, styles, {
        error: !!error && !!touched && !status,
        hidden: !text,
      })}
    >
      {text}
    </Element>
  );
};

InputStatus.displayName = displayName;

export default InputStatus;
