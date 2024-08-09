import React, { ReactNode } from 'react';

import { getMainClasses } from '../../utils';

import styles from './InputLabel.module.css';

const displayName = 'InputLabel';

interface Appearance {
  theme?: 'fat' | 'underlined' | 'minimal' | 'dotted';
  direction?: 'horizontal';
  colorSchema?: 'dark' | 'grey' | 'transparent' | 'info';
  helpAlign?: 'right';
  size?: 'small' | 'medium';
}

interface Props {
  /** Appearance object */
  appearance?: Appearance;

  /** Extra node to render on the top right in the label */
  extra?: ReactNode;

  /** Help text (will appear next to label text) */
  help?: string;

  /** `id` attribute value of accompanied input field */
  inputId?: string;

  /** Label text */
  label: string;

  /** Should only be visible for screenreaders, but not for display users */
  screenReaderOnly?: boolean;
}

const InputLabel = ({
  appearance,
  help,
  extra,
  inputId = '',
  label: inputLabel,
  screenReaderOnly = false,
}: Props) => {
  return (
    <label
      className={getMainClasses(appearance, styles, {
        screenReaderOnly,
      })}
      id={inputId ? `${inputId}-label` : undefined}
      htmlFor={inputId || undefined}
    >
      <div>
        <span className={styles.labelText}>{inputLabel}</span>
        {help && <span className={styles.help}>{help}</span>}
      </div>
      {extra && <span>{extra}</span>}
    </label>
  );
};

InputLabel.displayName = displayName;

export default InputLabel;
