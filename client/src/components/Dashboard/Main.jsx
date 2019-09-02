import React from 'react';
import Accounts from './Accounts';
import Transactions from './Transactions';
import Graph from './Graph';

const Main = () => (
  <div className="main">
    <Accounts />
    <Transactions />
    <Graph />
  </div>
);

export default Main;
