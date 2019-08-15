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
  userId: Sequelize.STRING,
  oauth: Sequelize.STRING,
  access_token: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  mfa: Sequelize.STRING,
  hash: Sequelize.STRING,
});

User.sync();

module.exports = User;
