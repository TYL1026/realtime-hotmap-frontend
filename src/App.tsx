import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import SideBar from './routers/SideBar';
import UberMap from './routers/UberMap';
import './App.css';

function App() {
  return (
    <SideBar>
    <UberMap />
  </SideBar>
  );
}

export default App;
