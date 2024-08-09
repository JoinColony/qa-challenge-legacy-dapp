import react from 'react';

import NaiveRouter from './components/NaiveRouter/NaiveRouter';
import DefaultLayout from './components/DefaultLayout/Default';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.layout}>
      <DefaultLayout>
        <NaiveRouter />
      </DefaultLayout>
    </div>
  );
}

export default App;
