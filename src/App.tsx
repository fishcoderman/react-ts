import React, { FC } from 'react';
import Home from './Home/index';
import About from './About/index';
import BasTable from "./Table/index"
import './App.css';

const App: FC = () => (
  <div className="App">
    <Home type="primary"> </Home>
    <About> </About>
    <BasTable></BasTable>
  </div>
);

export default App;