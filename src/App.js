import './App.css';
import React from 'react';
import DbTable from './Components/DbTable';
import Layout from './Components/Layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router basename='/crud'>
      <Layout>
        <Switch>
          <Route exact path='/'>
            <DbTable />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
