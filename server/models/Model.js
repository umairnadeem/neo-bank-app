const { models } = require('../db');

class Model {
  constructor(tablename) {
    this.tablename = tablename;
  }

  create(hash) {
    models.User.sync()
      .then(() => models.User.create({
        userId: this.id,
        oauth: this.oauth_key,
        hash,
      }));
  }
}

module.exports = Model;
