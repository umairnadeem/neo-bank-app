/* eslint-disable camelcase */

const { models } = require('../db');

class Model {
  constructor(tablename) {
    this.tablename = tablename;
  }

  create(hash) {
    const { User } = models;
    const { id, oauth_key, access_token } = this;
    const payload = {
      userId: id,
      oauth: oauth_key,
      hash,
      access_token,
    };

    User.findOne({ where: { hash } })
      .then((obj) => {
        if (obj) {
          return obj.update(payload);
        }
        return User.create(payload);
      });
  }

  delete(hash) {
    const { User } = models;
    const { id } = this;

    User.destroy({ where: { hash } })
      .catch(() => console.error(`Cannot find ${id}`));
  }
}

module.exports = Model;

/* eslint-enable */
