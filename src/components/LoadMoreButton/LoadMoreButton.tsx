import React from 'react';

import Button, { Props as DefaultButtonProps } from '../Button/Button';

import styles from './LoadMoreButton.module.css';

interface Props extends DefaultButtonProps {
  isLoadingData: boolean;
}

const LoadMoreButton = ({ isLoadingData, ...props }: Props) => (
  <div className={styles.loadMoreButton}>
    <Button
      appearance={{ size: 'medium', theme: 'primary' }}
      text="Load More"
      loading={isLoadingData}
      {...props}
    />
  </div>
);

export default LoadMoreButton;
