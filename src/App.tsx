import { useQuery } from '@apollo/client';

import NaiveRouter from './components/NaiveRouter/NaiveRouter';
import DefaultLayout from './components/DefaultLayout/Default';

import { ListActionsQuery, GetUser } from './graphql';
import styles from './App.module.css';

function App() {
  const { data } = useQuery(GetUser, { variables: { walletAddress: '0xa00005' } });
  console.log({data});

  return (
    <div className={styles.layout}>
      <DefaultLayout>
        <NaiveRouter />
      </DefaultLayout>
    </div>
  );
}

export default App;
