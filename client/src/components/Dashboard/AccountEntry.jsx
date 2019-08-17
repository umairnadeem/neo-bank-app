import React from 'react';
import PropTypes from 'prop-types';

const AccountEntry = ({ info: { nickname, balance: { amount, currency } } }) => (
  <div className="flex-col">
    <span>{ nickname }</span>
    <span>{ `$${amount} ${currency}` }</span>
  </div>
);

AccountEntry.propTypes = {
  info: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AccountEntry;
