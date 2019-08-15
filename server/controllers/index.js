/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

const axios = require('axios');
const { Session } = require('../models');

const { clientID, clientSecret } = require('../config');

const session = new Session(clientID, clientSecret);

module.exports = {
  createUser: (req, res) => {
    const { body: { username, password } } = req;

    session.getOAuth()
      .then(() => session.login(username, password))
      .then(
        ({ data }) => {
          // If MFA required
          if (+data.http_code === 202) {
            const { mfa: { access_token } } = data; // Extract access_token from response
            session.access_token = access_token;
          }
          res.send(data);
        },
      )
      .catch(
        ({ response }) => res.status(401).send(response.data),
      );
  },
  authenticateUser: (req, res) => {
    const { body: { answer } } = req;

    return session.authenticate(answer)
      .then(({ data }) => res.send(data))
      .catch(({ response }) => res.status(401).send(response.data));
  },
  getTransactions: (req, res) => {
    const { url, headers, id } = session;
    return axios.get(`${url}/users/${id}/node/${req.params.nodeId}/trans`, { headers })
      .then(({ data }) => res.send(data))
      .catch(({ response }) => res.status(401).send(response.data));
  },
};

/* eslint-enable */
