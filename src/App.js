import React from 'react';
import './App.css';
import MyProvider from './Context/MyProvider';
import ActiveFilters from './Pages/ActiveFilters';
import Inputs from './Pages/Inputs';
import Table from './Pages/Table';

function App() {
  return (
    <MyProvider>
      <Inputs />
      <ActiveFilters />
      <Table />
    </MyProvider>
  );
}

export default App;
