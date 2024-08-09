import React from 'react';

import { getMainClasses } from '../../utils';

import styles from './SpinnerLoader.module.css';

export interface Appearance {
  size: 'small' | 'medium' | 'large' | 'huge' | 'massive';
  theme?: 'grey' | 'primary';
  layout?: 'horizontal';
}

interface Props {
  /** Appearance object */
  appearance?: Appearance;

  /** Text to display while loading */
  loadingText?: string;
}

const SpinnerLoader = ({
  appearance = { size: 'small', theme: 'grey' },
  loadingText,
}: Props) => {
  return (
    <div className={getMainClasses(appearance, styles)}>
      <div className={styles.loader} />
      {loadingText && (
        <div className={styles.loadingTextContainer}>
          <div>
            {loadingText}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinnerLoader;
