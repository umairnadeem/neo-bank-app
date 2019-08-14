const Sequelize = require('sequelize');
const sequelize = require('./index');

const Session = sequelize.define('session', {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  access_token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  oauth_key: Sequelize.STRING,
  hash: Sequelize.STRING,
});

module.exports = Session;
