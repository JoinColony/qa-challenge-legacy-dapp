import React from 'react';

import SpinnerLoader from '../Preloaders/SpinnerLoader';

// import NakedMole from '../../../../img/naked-mole-without-bg.svg';
import styles from './LoadingTemplate.module.css';

interface Props {
  loadingText?: string;
}

const LoadingTemplate = ({ loadingText = 'Loading' }: Props) => {
  return (
    <div className={styles.main}>
      <main className={styles.mainContent}>
          <div>
            <div className={styles.loaderContainer}>
              <SpinnerLoader
                loadingText={loadingText}
                appearance={{ theme: 'primary', size: 'massive' }}
              />
            </div>
          </div>
      </main>
    </div>
  );
};

export default LoadingTemplate;
