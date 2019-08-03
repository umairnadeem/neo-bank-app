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

let userId; // Storage for user ID and token

// Always use HTTPS to retrieve these from the server!
const info = {
  bank_name: 'fake',
  bank_id: '',
  bank_pw: '',
};

const bankCredentials = {
  type: 'ACH-US',
  info,
};

const authenticate = (res) => {
  if (res.status === 202) {
    axios.post(`${url}/users/${userId}/nodes`)
  }
}

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

    // Update user credentials
    info.bank_id = req.body.username;
    info.bank_pw = req.body.password;

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
        headers['X-SP-USER'] = `${oauth_key}|static_pin`; // Update OAuth token

        // Login to bank account
        return axios.post(`${url}/users/${userId}/nodes`, bankCredentials, { headers });
      })
      .then(authenticate)
      .catch(err => console.error(err.response.data));
  },
};
