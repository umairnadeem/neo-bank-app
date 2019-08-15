const { models } = require('../db');

/**
 * Verifies a user's session using cookies if exists, creates a new one otherwise
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
module.exports.createSession = (req, res, next) => {
  // Extract existing cookie from request if exists
  const { cookies: { neobank } } = req;
  if (neobank) {
    models.User.find({ hash: neobank })
      .then((data) => {
        models.api.createUser(data.username, data.password);
      })
      .catch(err => console.error(err));
  } else {
    const cookie = models.utils.createRandom32String();
    res.cookie('neobank', cookie);
  }
  next();
};
