import './App.css';
import React, { useEffect, useState } from 'react';
import DbTable from './Components/DbTable';
import Layout from './Components/Layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  let isMobile = (width <= 820);

  return (
    <Router basename='/'>
      <Layout isMobile={isMobile}>
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
