import React from 'react';
import Accounts from './Accounts';
import Transactions from './Transactions';

const Main = () => (
  <div className="main">
    <Accounts />
    <Transactions />
    <Accounts />
    <Accounts />
  </div>
);

export default Main;
