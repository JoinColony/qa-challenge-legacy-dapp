import { useQuery } from '@apollo/client';

import NaiveRouter from './components/NaiveRouter/NaiveRouter';
import { ListActionsQuery } from './graphql';


function App() {
  const { data } = useQuery(ListActionsQuery);
  console.log({data});

  return (
    <div>
      <NaiveRouter />
    </div>
  );
}

export default App;
