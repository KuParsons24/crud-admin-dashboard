import './App.css';
import React from 'react';
import DbTable from './Components/DbTable';
import Layout from './Components/Layout';

function App() {
  return (
    <div>
      <Layout>
        <DbTable />
      </Layout>
    </div>
  );
}

export default App;
