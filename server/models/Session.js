const Sequelize = require('sequelize');
const sequelize = require('./index');

const Session = sequelize.define('session', {
  userID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accessToken: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  OAuth: Sequelize.STRING,
  hash: Sequelize.STRING,
});
