import React, { ReactNode } from 'react';

import BackText from '../BackTexts/BackText';
import { getMainClasses } from '../../utils';

import styles from './ProfileLayout.module.css';

interface Appearance {
  theme: 'alt';
}

interface Props {
  appearance?: Appearance;
  children: ReactNode;
  asideContent: ReactNode;
}

const displayName = 'pages.ProfileTemplate';

const ProfileTemplate = ({ appearance, children, asideContent }: Props) => (
  <div className={getMainClasses(appearance, styles)}>
    <div className={styles.backNavigation}>
      <BackText name="Colony Home" displayName="Colony Home" />
    </div>
    <aside className={styles.sidebar}>
      <div>{asideContent}</div>
    </aside>
    <div className={styles.mainContainer}>
      <main className={styles.mainContent}>{children}</main>
    </div>
  </div>
);

ProfileTemplate.displayName = displayName;

export default ProfileTemplate;
