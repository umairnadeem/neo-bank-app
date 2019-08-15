const db = require('../db');

class Model {
  constructor(tablename) {
    this.tablename = tablename;
  }
}

module.exports = Model;
