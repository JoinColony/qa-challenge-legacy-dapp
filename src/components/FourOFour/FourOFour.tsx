import React from 'react';
import { Helmet } from 'react-helmet';

// @ts-ignore
import logo from './logo.svg';
// @ts-ignore
import nakedMole from './naked-mole-404.svg';
import Heading from '../Heading/Heading';
import { navigate } from '../NaiveRouter/NaiveRouter';

import styles from './FourOFour.module.css';

const displayName = 'dashboard.FourOFour';

console.log(nakedMole);

const FourOFour = () => (
  <main className={styles.layoutMain}>
    <Helmet>
      <title>Page Not Found | 404</title>
    </Helmet>
    <div className={styles.herowrapper}>
      <header className={styles.header}>
        <figure className={styles.logo} role="presentation">
          <img src={logo} alt="Colony Logo" onClick={() => navigate('/')}/>
        </figure>
      </header>
      <div className={styles.title}>
        <Heading
          appearance={{ size: 'medium', weight: 'medium', margin: 'none' }}
          text="404!"
        />
      </div>
      <p className={styles.description}>
        Something went wrong! Have you tried turning it off and on again?
      </p>
    </div>
  </main>
);

FourOFour.displayName = displayName;

export default FourOFour;
