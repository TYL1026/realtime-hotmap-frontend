import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import SideBar from './routers/SideBar';
import UberMap from './routers/UberMap';


function App() {
  return (
    <BrowserRouter>
      <SideBar>
      <Routes>
          <Route path="/" element={<UberMap />} />
        </Routes>
      </SideBar>
    </BrowserRouter>
  );
}

export default App;
