import { useQuery } from '@apollo/client';

import { ListActionsQuery } from './graphql';

import logo from './logo.svg';
import './App.css';

function App() {
  const { data } = useQuery(ListActionsQuery);
  console.log({data});

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React {data?.getAuthStatus?.isLoggedIn ? 'is logged in' : 'is not logged in'}
        </a>
      </header>
    </div>
  );
}

export default App;
