const Sequelize = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  mfa: Sequelize.STRING,
  hash: Sequelize.STRING,
});

module.exports = User;
