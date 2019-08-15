/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

const axios = require('axios');

module.exports = {
  verifyUser: (req, res) => {
    const { session } = req;
    session.getNodes()
      .then(({ data }) => res.status(200).send(data))
      .catch(({ response }) => res.status(401).send(response.data));
  },
  createUser: (req, res) => {
    const { cookies, session, body: { username, password } } = req;

    session.getOAuth()
      .then(() => session.login(username, password))
      .then(
        ({ data }) => {
          // If MFA required
          if (+data.http_code === 202) {
            const { mfa: { access_token } } = data; // Extract access_token from response
            session.access_token = access_token;
          }
          session.save(cookies.neobank);
          res.send(data);
        },
      )
      .catch(
        ({ response }) => res.status(401).send(response.data),
      );
  },
  authenticateUser: (req, res) => {
    const { cookies, session, body: { answer } } = req;

    return session.authenticate(answer)
      .then(({ data }) => res.send(data))
      .catch(({ response }) => {
        session.killAll(cookies.neobank);
        res.status(401).send(response.data);
      });
  },
  getTransactions: (req, res) => {
    const { session } = req;
    const { url, headers, id } = session;
    return axios.get(`${url}/users/${id}/node/${req.params.nodeId}/trans`, { headers })
      .then(({ data }) => res.send(data))
      .catch(({ response }) => res.status(401).send(response.data));
  },
};

/* eslint-enable */
