const Sequelize = require('sequelize');
const sequelize = require('../connection');

// TODO: encrypt all sensitive information!
const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: Sequelize.INTEGER,
  oauth: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  mfa: Sequelize.STRING,
  hash: Sequelize.STRING,
});

module.exports = User;
