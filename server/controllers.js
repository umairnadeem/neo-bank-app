/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

const axios = require('axios');

const url = 'https://uat-api.synapsefi.com/v3.1';

const { clientID, clientSecret } = require('./config');

const headers = {
  'Content-Type': 'application/json',
  'X-SP-GATEWAY': `${clientID}|${clientSecret}`,
  'X-SP-USER-IP': '127.0.0.1',
  'X-SP-USER': '|static_pin',
};

// Storage for user ID and token
let userId;
let access_token;

module.exports = {
  createUser: (req, res) => {
    const body = {
      logins: [
        {
          email: 'test@synapsefi.com',
        },
      ],
      phone_numbers: [
        '901.111.1111',
        'test@synapsefi.com',
      ],
      legal_names: [
        'Test User',
      ],
    };

    // Create user
    axios.post(`${url}/users`, body, { headers })
      .then(({ data }) => {
        const { refresh_token } = data;
        userId = data._id;

        // OAuth User
        return axios.post(`${url}/oauth/${userId}`, { refresh_token }, { headers });
      })
      .then(({ data }) => {
        const { oauth_key } = data;
        const newHeaders = { ...headers, 'X-SP-USER': `${oauth_key}|static_pin` }; // Update OAuth token

        // Always use HTTPS to retrieve these from the client!
        const info = {
          bank_name: 'fake',
          bank_id: req.body.username,
          bank_pw: req.body.password,
        };

        // Login to bank account
        return axios.post(`${url}/users/${userId}/nodes`, { type: 'ACH-US', info }, { headers: newHeaders });
      })
      .then(({ data }) => {
        access_token = data.mfa;
        res.send(data.http_code);
      })
      .catch(({ response }) => res.status(400).send(JSON.stringify(response.data)));
  },
  authenticateUser: (req, res) => axios.post(`${url}/users/${userId}/nodes`, { access_token, mfa_answer: req.body.answer }, headers)
    .then(({ data }) => {
      access_token = data.mfa;
      res.send(data.http_code);
    }),
};
