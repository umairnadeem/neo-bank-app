const models = require('../models');

/**
 * Verifies a user's session using cookies if exists, creates a new one otherwise
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware function
 */
const createSession = (req, res, next) => {
  // Extract existing cookie from request if exists
  const { cookies: { neobank } } = req;
  if (neobank) {
    models.find({ hash: neobank })
      .then((data) => {
        models.createUser(data.username, data.password);
      })
      .catch(err => console.error(err));
  }
  next();
};

export default createSession;
