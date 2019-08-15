const { models } = require('../db');
const { Session, utils } = require('../models');
const { clientID, clientSecret } = require('../config');

function createSession(req, res) {
  const session = new Session(clientID, clientSecret);
  const cookie = utils.createRandom32String();
  req.cookies.neobank = cookie;
  req.session = session;
  res.cookie('neobank', cookie);
}
/**
 * Verifies a user's session using cookies if exists, creates a new one otherwise
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
module.exports.verifyCookies = (req, res, next) => {
  // Extract existing cookie from request if exists
  console.log('middleware hit')
  const { cookies: { neobank } } = req;
  if (neobank) {
    models.User.findOne({ where: { hash: neobank } })
      .then((data) => {
        if (data) {
          const session = new Session(clientID, clientSecret);
          session.restore(data);
          req.session = session;
          return next();
        }
        createSession(req, res);
        return next();
      })
      .catch((err) => {
        console.error(err);
        next();
      });
  } else {
    createSession(req, res);
    next();
  }
};
